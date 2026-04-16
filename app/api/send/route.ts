import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Отримуємо ключі
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    // Новий ключ для Google Script (додайте його в .env та Cloudflare)
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    // 1. ДІАГНОСТИКА: Перевіряємо, чи бачить Cloudflare ключі (Телеграм)
    if (!botToken || !chatId) {
      console.error("Помилка ключів:", { botToken: !!botToken, chatId: !!chatId });
      return NextResponse.json(
        { error: `Ключі не знайдені в Cloudflare! Token: ${botToken ? 'Є' : 'НЕМАЄ'}, ChatID: ${chatId ? 'Є' : 'НЕМАЄ'}` },
        { status: 500 }
      );
    }

   // 2. Формуємо повідомлення (БЕЗПЕЧНИЙ HTML) для Телеграму
    let message = `<b>Нова заявка з сайту!</b>\n\n`;
    for (const [key, value] of Object.entries(data)) {
      message += `<b>${key}:</b> ${value}\n`;
    }

    // 3. Відправляємо в Telegram
    try {
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        const tgError = await response.text();
        console.error("Помилка від Telegram:", tgError);
        // Ми не зупиняємо виконання (не робимо return), щоб спрацювала пошта
      }
    } catch (tgNetError) {
      console.error("Мережева помилка Telegram:", tgNetError);
    }

    // 4. ВІДПРАВКА НА ПОШТУ (GOOGLE APPS SCRIPT)
    if (googleScriptUrl) {
      try {
        const mailResponse = await fetch(googleScriptUrl, {
          method: 'POST',
          // ВАЖЛИВО: Для Google Scripts обов'язково text/plain, щоб уникнути помилки CORS
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(data), // Передаємо сирі дані, скрипт сам їх розбере
        });

        if (!mailResponse.ok) {
          console.error("Помилка від Google Script:", await mailResponse.text());
        }
      } catch (mailError) {
        console.error("Мережева помилка відправки на пошту:", mailError);
      }
    } else {
      console.warn("Попередження: GOOGLE_SCRIPT_URL не знайдено, резервна копія на пошту не відправлена.");
    }

    // 5. Завжди повертаємо успіх на фронтенд, якщо хоча б дійшли до кінця
    return NextResponse.json({ success: true });
    
  } catch (error: any) {
    console.error("Внутрішня помилка сервера:", error);
    return NextResponse.json({ error: `Внутрішня помилка: ${error.message}` }, { status: 500 });
  }
}