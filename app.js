(function() {
    'use strict';

    const DEBOUNCE_DELAY = 1000;
    const QR_SIZE = 256;
    const MAX_TEXT_LENGTH = 2953;

    const elements = {
        input: document.getElementById('input-text'),
        qrContainer: document.getElementById('qr-container'),
        qrPlaceholder: document.getElementById('qr-placeholder'),
        qrCanvasWrapper: document.getElementById('qr-canvas-wrapper'),
        downloadBtn: document.getElementById('download-btn'),
        toast: document.getElementById('toast')
    };

    let debounceTimer = null;
    let currentCanvas = null;

    function init() {
        if (!checkQRLibrary()) {
            showToast('二维码库加载失败，请刷新页面重试', 'error');
            return;
        }

        elements.input.addEventListener('input', handleInput);
        elements.input.addEventListener('paste', handlePaste);
        elements.input.addEventListener('keydown', handleKeydown);
        elements.downloadBtn.addEventListener('click', handleDownload);

        elements.input.focus();
    }

    function checkQRLibrary() {
        return typeof QRCodeLib !== 'undefined';
    }

    function handleInput(e) {
        const text = e.target.value.trim();
        
        clearTimeout(debounceTimer);

        if (!text) {
            clearQRCode();
            return;
        }

        debounceTimer = setTimeout(() => {
            generateQRCode(text);
        }, DEBOUNCE_DELAY);
    }

    function handlePaste(e) {
        setTimeout(() => {
            const text = elements.input.value.trim();
            if (text) {
                clearTimeout(debounceTimer);
                generateQRCode(text);
            }
        }, 0);
    }

    function handleKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const text = elements.input.value.trim();
            if (text) {
                clearTimeout(debounceTimer);
                generateQRCode(text);
            }
        }
    }

    function generateQRCode(text) {
        if (!checkQRLibrary()) {
            showToast('二维码库未加载', 'error');
            return;
        }

        if (text.length > MAX_TEXT_LENGTH) {
            showToast('文本过长，建议缩短内容', 'error');
            return;
        }

        try {
            clearQRCode();

            const container = document.createElement('div');
            container.style.display = 'none';
            document.body.appendChild(container);

            QRCodeLib.toCanvas(text, {
                width: QR_SIZE,
                margin: 4,
                errorCorrectionLevel: 'H',
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            }, function(error, canvas) {
                document.body.removeChild(container);

                if (error) {
                    console.error('QR Code generation error:', error);
                    showToast('生成失败，请重试', 'error');
                    return;
                }

                displayQRCode(canvas);
            });

        } catch (error) {
            console.error('QR Code generation error:', error);
            showToast('生成失败，请重试', 'error');
        }
    }

    function displayQRCode(canvas) {
        currentCanvas = canvas;

        elements.qrCanvasWrapper.innerHTML = '';
        elements.qrCanvasWrapper.appendChild(canvas);

        elements.qrPlaceholder.classList.add('hidden');
        elements.qrCanvasWrapper.classList.add('visible');
        elements.qrContainer.classList.add('has-qr');

        elements.downloadBtn.disabled = false;

        showToast('二维码已生成', 'success');
    }

    function clearQRCode() {
        currentCanvas = null;
        elements.qrCanvasWrapper.innerHTML = '';
        elements.qrCanvasWrapper.classList.remove('visible');
        elements.qrPlaceholder.classList.remove('hidden');
        elements.qrContainer.classList.remove('has-qr');
        elements.downloadBtn.disabled = true;
    }

    function handleDownload() {
        if (!currentCanvas) {
            showToast('请先生成二维码', 'error');
            return;
        }

        try {
            const timestamp = new Date().toISOString()
                .replace(/[:.]/g, '-')
                .slice(0, 19);
            const filename = `qrcode-${timestamp}.png`;

            const link = document.createElement('a');
            link.download = filename;
            link.href = currentCanvas.toDataURL('image/png');
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('下载成功', 'success');
        } catch (error) {
            console.error('Download error:', error);
            showToast('下载失败，请右键保存图片', 'error');
        }
    }

    function showToast(message, type = 'info') {
        elements.toast.textContent = message;
        elements.toast.className = `toast ${type} show`;

        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
