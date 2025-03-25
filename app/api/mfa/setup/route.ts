// app/api/mfa/setup/route.ts
import { authenticator } from 'otplib';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') || 'user@example.com';
  
  const secret = authenticator.generateSecret(); // Generam un nou cod secret
  const serviceName = 'MFA App'; // Numele serviciului pentru care generam codul
  
  const otpauthUrl = authenticator.keyuri(email, serviceName, secret); // Generam URL-ul pentru autentificare
  
  return NextResponse.json({ // Returnam codul si url-ul pentru qrcode 
    secret, 
    otpauthUrl
  });
}