// app/api/mfa/setup/route.ts
import { authenticator } from 'otplib';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') || 'user@example.com';
  
  const secret = authenticator.generateSecret();
  const serviceName = 'MFA App';
  
  const otpauthUrl = authenticator.keyuri(email, serviceName, secret);
  
  return NextResponse.json({
    secret,
    otpauthUrl
  });
}