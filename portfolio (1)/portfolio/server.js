// Oddiy server: saytni ko'rsatadi va forma xabarini Telegram botga yuboradi.
const http = require('http');
const fs = require('fs');
const path = require('path');

// .env faylidagi sozlamalarni o'qish
try {
  for (const line of fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {}
const { BOT_TOKEN, CHAT_ID, PORT = 3000 } = process.env;

const PUBLIC = path.join(__dirname, 'public');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
      if (body.length > 1e5) return res.writeHead(413).end();
    }
    try {
      const { name, contact, message } = JSON.parse(body);
      if (!name || !contact || !message) throw new Error('bo\'sh maydon');
      if (!BOT_TOKEN || !CHAT_ID) return res.writeHead(500).end('.env to\'ldirilmagan');
      const text = `Saytdan yangi xabar\nIsm: ${name}\nAloqa: ${contact}\n\n${message}`.slice(0, 4000);
      const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text })
      });
      return res.writeHead(r.ok ? 200 : 502).end(r.ok ? 'ok' : 'telegram xatosi');
    } catch {
      return res.writeHead(400).end('xato');
    }
  }

  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(PUBLIC, urlPath === '/' ? 'index.html' : urlPath);
  if (!file.startsWith(PUBLIC)) return res.writeHead(403).end();
  fs.readFile(file, (err, data) => {
    if (err) return res.writeHead(404).end('Topilmadi');
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(data);
  });
}).listen(PORT, () => console.log(`Sayt ishga tushdi: http://localhost:${PORT}`));
