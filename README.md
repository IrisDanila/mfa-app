# MFA App

This is a simple **Multi-Factor Authentication (MFA)** application built with **Next.js**. It demonstrates how to implement TOTP-based MFA using the `otplib` library and QR code generation.

## Features

- **MFA Setup**: Generates a secret key and displays a QR code that can be scanned with any TOTP-compatible app (e.g., Google Authenticator, Authy, Microsoft Authenticator).
- **Token Verification**: Verifies the 6-digit TOTP code entered by the user.
- **API Endpoints**:
  - `/api/mfa/setup`: Generates the secret and `otpauth://` URL for the QR code.
  - `/api/mfa/verify`: Validates the TOTP code against the secret.

## Technologies Used

- **Next.js**: Framework for building the app.
- **otplib**: Library for generating and verifying TOTP codes.
- **qrcode**: Library for generating QR codes.
- **Tailwind CSS**: For styling the UI.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mfa-app

2. Install dependencies:
    npm install

3. Running the App:
    npm run dev