# Portfolio sayt

## Ishga tushirish
Eng oson yo'l: `ISHGA_TUSHIRISH.bat` faylini ikki marta bosing (Windows). Sayt o'zi ochiladi.

Yoki Visual Studio orqali:
1. Visual Studio'da shu papkani oching (File > Open > Folder).
2. Terminalni oching (View > Terminal).
3. Yozing: `npm start`
4. Brauzerda oching: http://localhost:3000

Kutubxona o'rnatish shart emas (`npm install` kerak emas).

## Telegram botni ulash
1. Telegram'da @BotFather ga yozing, `/newbot` buyrug'i bilan bot yarating, token oling.
2. O'zingizning botingizga bir marta "salom" yozing.
3. Chat ID olish uchun @userinfobot ga yozing, u raqamingizni aytadi.
4. Papkadagi `.env` faylini oching va `BOT_TOKEN=` dan keyin tokenni, `CHAT_ID=` dan keyin raqamni yozing (bo'sh joy qoldirmang).
5. Serverni to'xtatib (Ctrl+C), qayta `npm start` qiling.

## Ma'lumotlarni o'zgartirish
Barcha matnlar `public/index.html` ichida. Ranglar `public/style.css` boshida (`:root`).
