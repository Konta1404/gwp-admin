'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
const schema = z.object({ email: z.string().trim().email(), password: z.string().min(1) });
export type LoginState = { error?: string };
export async function logInAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = schema.safeParse({ email: formData.get('email'), password: formData.get('password') });
  if (!parsed.success) return { error: 'Enter a valid email and password.' };
  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:4000/api'}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data), cache: 'no-store', signal: AbortSignal.timeout(10000),
    });
    const result = z.object({ status: z.literal('success'), token: z.string().min(1) }).safeParse(await response.json());
    if (!response.ok || !result.success) return { error: 'Sign-in failed. Check your credentials and retry.' };
    (await cookies()).set('jwt', result.data.token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 86400,
    });
  } catch { return { error: 'Authentication service is unavailable. Please retry.' }; }
  redirect('/profile');
}
