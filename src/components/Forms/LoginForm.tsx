'use client';
import { useActionState } from 'react';
import { logInAction } from './actions';
export default function LoginForm() {
  const [state, action, pending] = useActionState(logInAction, {});
  return <main className="mx-auto max-w-md p-8">
    <h1 className="mb-6 text-2xl font-bold">Sign in</h1>
    <form action={action} className="flex flex-col gap-4">
      <label htmlFor="email">Email</label>
      <input className="rounded border p-3 text-black" id="email" name="email" type="email" autoComplete="email" required />
      <label htmlFor="password">Password</label>
      <input className="rounded border p-3 text-black" id="password" name="password" type="password" autoComplete="current-password" required />
      {state.error && <p role="alert">{state.error}</p>}
      <button className="rounded bg-primary p-3 text-white disabled:opacity-50" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
    </form>
  </main>;
}
