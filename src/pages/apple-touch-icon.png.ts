import type { APIRoute } from 'astro';
import { touchIcon } from '../lib/card';

export const GET: APIRoute = () => new Response(new Uint8Array(touchIcon()), { headers: { 'Content-Type': 'image/png' } });
