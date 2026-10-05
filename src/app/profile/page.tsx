import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
const resultSchema = z.object({ status: z.literal('success'), data: z.object({ user: z.object({ name: z.string(), email: z.string().email(), role: z.string() }) }) });
export default async function Profile() {
  const token = (await cookies()).get('jwt')?.value;
  if (!token) redirect('/login');
  const response = await fetch(`${process.env.API_URL || 'http://localhost:4000/api'}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }, cache: 'no-store', signal: AbortSignal.timeout(10000),
  });
  if (response.status === 401) redirect('/login');
  if (!response.ok) throw new Error('Unable to load your profile.');
  const { data: { user } } = resultSchema.parse(await response.json());
  return <main className="mx-auto max-w-lg p-8"><h1 className="text-2xl font-bold">Your profile</h1>
    <dl className="mt-6"><dt>Name</dt><dd>{user.name}</dd><dt>Email</dt><dd>{user.email}</dd><dt>Role</dt><dd>{user.role}</dd></dl>
    <p className="mt-6">The dashboard contains demonstration data. Event administration is not implemented.</p>
  </main>;
}
