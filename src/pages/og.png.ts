import type { APIRoute } from 'astro';
import { shareImage } from '../lib/card';

export const GET: APIRoute = () => new Response(new Uint8Array(shareImage()), { headers: { 'Content-Type': 'image/png' } });
