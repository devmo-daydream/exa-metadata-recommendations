export const config = {
  matcher: '/((?!_vercel|favicon\\.ico|robots\\.txt).*)',
};

const PASS = 'exa+daydream2026!';
const TOKEN = 'pTr8qNk2vXmH9w4YxBz7';
const COOKIE = 'exa-auth';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export default async function middleware(request) {
  const url = new URL(request.url);

  // Handle login form submission
  if (url.pathname === '/login' && request.method === 'POST') {
    const form = await request.formData();
    const submitted = form.get('password');
    if (submitted === PASS) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/',
          'Set-Cookie': `${COOKIE}=${TOKEN}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return loginPage(true);
  }

  // Check for valid auth cookie
  const cookieHeader = request.headers.get('cookie') || '';
  if (cookieHeader.includes(`${COOKIE}=${TOKEN}`)) {
    return; // allow request through to the static site
  }

  // No valid auth: show login page in place
  return loginPage(false);
}

function loginPage(showError) {
  const errorHtml = showError
    ? '<div class="err">Incorrect password. Try again.</div>'
    : '';
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Exa Metadata Recommendations · daydream</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Raleway',sans-serif;background:#FFF9F4;color:#232323;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;-webkit-font-smoothing:antialiased}
  body::before{content:'';position:fixed;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#C3F2D0 0%,#B3EAFF 53%,#FEE3CC 100%);z-index:1}
  .gate{background:#FFFFFB;border:1px solid #E8E2DC;border-radius:18px;padding:38px 34px 32px;width:100%;max-width:380px;box-shadow:0 8px 32px rgba(0,0,0,.06)}
  .brand{display:flex;align-items:center;gap:10px;margin-bottom:26px}
  .brand svg{display:block;flex-shrink:0}
  .brand b{font-weight:700;font-size:15px}
  h1{font-family:'Inter',sans-serif;font-size:22px;font-weight:700;line-height:1.2;margin-bottom:6px;letter-spacing:-.01em}
  p.sub{font-size:13.5px;color:#6B6B6B;margin-bottom:22px;line-height:1.5}
  form{display:flex;flex-direction:column;gap:8px}
  label{font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#6B6B6B;margin-bottom:4px}
  input[type="password"]{font-family:'Raleway';font-size:15px;padding:12px 14px;border:1.5px solid #E8E2DC;border-radius:10px;background:#FFFFFB;color:#232323;outline:none;transition:border-color .15s;width:100%}
  input[type="password"]:focus{border-color:#C49AFF}
  button{font-family:'Raleway';font-size:14px;font-weight:700;padding:12px 18px;border-radius:10px;border:none;background:#232323;color:#FFFFFB;cursor:pointer;margin-top:10px;transition:background .15s,color .15s}
  button:hover{background:#EED1FF;color:#4a1a7a}
  .err{background:#fff4e5;border:1px solid #e89a2c;border-radius:9px;padding:10px 13px;font-size:13px;color:#9a6313;margin-bottom:16px}
  .foot{margin-top:24px;padding-top:18px;border-top:1px solid #E8E2DC;font-size:11.5px;color:#8a8a8a;text-align:center}
  .foot b{color:#232323;font-weight:700}
</style>
</head>
<body>
<div class="gate">
  <div class="brand">
    <svg width="22" height="22" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="78" height="78" rx="9" fill="url(#g)"/><rect x="1" y="1" width="78" height="78" rx="9" stroke="#232323" stroke-width="2"/><path d="M57.875 20.0347C57.875 20.0347 34.659 55.5902 27.0008 55.5902C19.3426 55.5902 29.2975 33.7213 41.2151 33.7213C52.4402 33.7213 27.0666 55.5902 36.5631 55.5902C42.1563 55.5902 51.2626 43.146 51.2626 43.146" stroke="#232323" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="g" x1="0" y1="40" x2="80" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#C3F2D0"/><stop offset=".53" stop-color="#B3EAFF"/><stop offset="1" stop-color="#FEE3CC"/></linearGradient></defs></svg>
    <b>daydream</b>
  </div>
  <h1>Exa Metadata Recommendations</h1>
  <p class="sub">Enter the password to view the recommendations.</p>
  ${errorHtml}
  <form method="POST" action="/login">
    <label for="pw">Password</label>
    <input type="password" id="pw" name="password" autocomplete="current-password" autofocus required />
    <button type="submit">Unlock</button>
  </form>
  <div class="foot">Built by <b>daydream</b> for Exa.</div>
</div>
</body>
</html>`;
  return new Response(html, {
    status: showError ? 401 : 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
