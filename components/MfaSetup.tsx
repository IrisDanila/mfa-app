// src/components/MfaSetup.tsx
'use client';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function MfaSetup({ userEmail }: { userEmail: string }) {
  const [qrCodeData, setQrCodeData] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const generateSecret = async () => {
      const response = await fetch(`/api/mfa/setup?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      setSecret(data.secret);
      
      QRCode.toDataURL(data.otpauthUrl, (err, url) => {
        if (!err) setQrCodeData(url);
      });
    };
    
    generateSecret();
  }, [userEmail]);

  const verifyToken = async () => {
    const response = await fetch('/api/mfa/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, token })
    });
    
    const { valid } = await response.json();
    setVerificationStatus(valid ? 'Verified successfully!' : 'Invalid code');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Setup MFA</h2>
      {qrCodeData && (
        <div className="mb-4">
          <img src={qrCodeData} alt="QR Code" className="mx-auto" />
        </div>
      )}
      <p className="mb-4 text-sm text-gray-600">
        Scan this QR code with Google Authenticator or Authy
      </p>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter 6-digit code"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={verifyToken}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Verify Code
      </button>
      {verificationStatus && (
        <p className={`mt-4 ${verificationStatus.includes('Invalid') ? 'text-red-500' : 'text-green-500'}`}>
          {verificationStatus}
        </p>
      )}
    </div>
  );
}