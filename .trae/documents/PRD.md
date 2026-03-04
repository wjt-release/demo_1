# Product Requirements Document (PRD): Minimalist QR Code Generator

## 1. Product Overview
A minimalist, online tool for instantly generating QR codes from text or URLs. The core value proposition is speed, simplicity, and privacy—no registration, login, or installation required.

## 2. User Stories
- As a user, I want to paste a URL or type text into a clear input box so that I can generate a QR code.
- As a user, I want the QR code to appear instantly (or with minimal delay) as I type/paste, without clicking a "Generate" button.
- As a user, I want to be able to right-click the generated QR code image to save it as a PNG or JPG file.
- As a user, I want the interface to be clean and free of distractions.
- As a user, I want the tool to work seamlessly on my desktop, tablet, and mobile phone.
- As a user, I want to be assured that my data is processed locally and not stored on a server.

## 3. Functional Requirements

### 3.1 Input
- **Input Field**: A prominent, large text input area.
- **Placeholder**: "Paste your URL or text here".
- **Supported Content**: HTTP/HTTPS URLs, plain text.
- **Validation**: Basic validation to ensure content is not empty.

### 3.2 QR Code Generation
- **Trigger**: Automatic generation upon input change (debounced, e.g., 500ms delay after typing stops).
- **Library**: Use a reliable client-side QR code generation library (e.g., `qrcode.js` or `qrcode-generator`).
- **Output Format**: Canvas or Image (Data URI) to allow saving.

### 3.3 Display & Interaction
- **Visibility**: The QR code should be displayed prominently near the input box.
- **Saving**: 
  - Primary: Users can right-click the image and select "Save Image As...".
  - Secondary (Optional but recommended): A "Download PNG" button for better accessibility.
- **Error Handling**: Visual feedback if input is invalid or too long for a single QR code (though modern libraries handle large data well, limits should be considered).

### 3.4 User Interface (UI)
- **Style**: Minimalist. Focus on the input and the output.
- **Layout**: Centered content. Input above, QR code below (or side-by-side on large screens).
- **Responsiveness**: Adapts to screen size.

## 4. Non-Functional Requirements
- **Performance**: Load time under 1 second. Generation time under 200ms.
- **Privacy/Security**: All processing must happen client-side (in the browser). No data transmission to backend servers.
- **Compatibility**: Works in all modern browsers (Chrome, Firefox, Safari, Edge).
- **Accessibility**: Semantic HTML, proper contrast, keyboard navigation.

## 5. Success Metrics
- Successful QR code generation (user enters text -> QR appears).
- User ability to save the image.
- Zero server-side data storage.
