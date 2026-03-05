(function() {
    'use strict';

    const DEBOUNCE_DELAY = 1000;
    const MAX_INPUT_LENGTH = 2048;
    const QR_SIZE = 300;

    const elements = {
        input: document.getElementById('text-input'),
        charCount: document.getElementById('char-count'),
        qrContainer: document.getElementById('qr-container'),
        qrCanvas: document.getElementById('qr-canvas'),
        qrHint: document.getElementById('qr-hint')
    };

    let debounceTimer = null;

    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(debounceTimer);
                func(...args);
            };
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(later, wait);
        };
    }

    function updateCharCount() {
        const length = elements.input.value.length;
        elements.charCount.textContent = length;
        
        if (length > MAX_INPUT_LENGTH * 0.9) {
            elements.charCount.parentElement.style.color = '#f87171';
        } else {
            elements.charCount.parentElement.style.color = '';
        }
    }

    function clearQRCode() {
        const ctx = elements.qrCanvas.getContext('2d');
        ctx.clearRect(0, 0, elements.qrCanvas.width, elements.qrCanvas.height);
        elements.qrCanvas.style.display = 'none';
        elements.qrContainer.classList.remove('has-qr');
        elements.qrHint.style.display = 'none';
    }

    function showPlaceholder() {
        clearQRCode();
    }

    async function generateQRCode(text) {
        if (!text || text.trim() === '') {
            showPlaceholder();
            return;
        }

        try {
            await QRCode.toCanvas(elements.qrCanvas, text, {
                width: QR_SIZE,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                },
                errorCorrectionLevel: 'M'
            });

            elements.qrCanvas.style.display = 'block';
            elements.qrContainer.classList.add('has-qr');
            elements.qrHint.style.display = 'flex';

        } catch (error) {
            console.error('QR Code generation failed:', error);
            showPlaceholder();
        }
    }

    const debouncedGenerate = debounce((text) => {
        generateQRCode(text);
    }, DEBOUNCE_DELAY);

    function handleInput() {
        const text = elements.input.value;
        updateCharCount();
        
        if (text.trim() === '') {
            showPlaceholder();
            clearTimeout(debounceTimer);
        } else {
            debouncedGenerate(text);
        }
    }

    function init() {
        elements.input.addEventListener('input', handleInput);
        
        elements.input.addEventListener('paste', () => {
            setTimeout(() => {
                const text = elements.input.value;
                if (text.trim() !== '') {
                    clearTimeout(debounceTimer);
                    generateQRCode(text);
                }
            }, 0);
        });

        updateCharCount();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
