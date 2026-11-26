// 1) Navbar: bo'limlarni almashtirish
const pages = [...document.querySelectorAll('.page')];
const links = [...document.querySelectorAll('nav a')];
function show() {
  const id = (location.hash || '#kirish').slice(1);
  const hit = pages.some(p => p.id === id) ? id : 'kirish';
  pages.forEach(p => p.classList.toggle('on', p.id === hit));
  links.forEach(a => a.setAttribute('aria-current', a.hash === '#' + hit ? 'page' : 'false'));
  window.scrollTo(0, 0);
}
addEventListener('hashchange', show);
show();

// 2) Bosh sahifadagi animatsiya: prompt yoziladi, natija chiqadi
const prompt_ = 'Telegram orqali buyurtma qabul qiladigan bot yarat';
const steps = ['Loyiha papkasi tayyor', 'bot.py yaratildi', "Ishga tushirish yo'riqnomasi qo'shildi"];
const typed = document.getElementById('typed');
const out = document.getElementById('out');
const wait = ms => new Promise(r => setTimeout(r, ms));
let run = 0;
async function play() {
  const me = ++run;
  const fast = matchMedia('(prefers-reduced-motion: reduce)').matches;
  typed.textContent = '';
  out.innerHTML = '';
  for (const ch of prompt_) {
    if (me !== run) return;
    typed.textContent += ch;
    if (!fast) await wait(45);
  }
  await wait(fast ? 0 : 400);
  for (const s of steps) {
    if (me !== run) return;
    const li = document.createElement('li');
    li.textContent = '✓ ' + s;
    out.append(li);
    if (!fast) await wait(600);
  }
}
document.querySelector('.demo').addEventListener('click', play);
play();

// 3) Bog'lanish formasi: Telegram botga yuborish
const form = document.getElementById('form');
const status = document.getElementById('status');
form.addEventListener('submit', async e => {
  e.preventDefault();
  status.textContent = 'Yuborilmoqda...';
  try {
    const r = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    if (!r.ok) throw new Error();
    status.textContent = 'Xabaringiz yuborildi. Rahmat!';
    form.reset();
  } catch {
    status.textContent = "Yuborib bo'lmadi. Birozdan keyin qayta urinib ko'ring.";
  }
});
