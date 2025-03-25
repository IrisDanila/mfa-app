// app/api/mfa/verify/route.ts
import { authenticator } from 'otplib';
import { NextResponse } from 'next/server';

export async function POST(request: Request) { 
  const { secret, token } = await request.json();
  
  try {
    //Verificam daca token-ul(codul introdus de utilizator) este valid
    const isValid = authenticator.check(token, secret); 
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }
}