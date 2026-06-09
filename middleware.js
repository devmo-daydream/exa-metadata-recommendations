export const config = {
  matcher: '/((?!_next/static|_vercel|favicon\\.ico|robots\\.txt).*)',
};

const USER = 'exa';
const PASS = 'exa+daydream2026!';

export default function middleware(request) {
  const auth = request.headers.get('authorization');

  if (auth && auth.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.split(' ')[1]);
      const idx = decoded.indexOf(':');
      const user = decoded.slice(0, idx);
      const pwd = decoded.slice(idx + 1);
      if (user === USER && pwd === PASS) {
        return; // allow request through
      }
    } catch (_) {}
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Exa Metadata Recommendations"',
      'Content-Type': 'text/plain',
    },
  });
}
