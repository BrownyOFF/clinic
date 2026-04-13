import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Отримуємо ключі
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // 1. ДІАГНОСТИКА: Перевіряємо, чи бачить Cloudflare ключі
    if (!botToken || !chatId) {
      console.error("Помилка ключів:", { botToken: !!botToken, chatId: !!chatId });
      return NextResponse.json(
        { error: `Ключі не знайдені в Cloudflare! Token: ${botToken ? 'Є' : 'НЕМАЄ'}, ChatID: ${chatId ? 'Є' : 'НЕМАЄ'}` },
        { status: 500 }
      );
    }

    // 2. Формуємо повідомлення
    let message = `Нова заявка з сайту!\n\n`;
    for (const [key, value] of Object.entries(data)) {
      message += `*${key}:* ${value}\n`;
    }

    // 3. Відправляємо в Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    // 4. Якщо Telegram відмовив (наприклад, невірний ID групи)
    if (!response.ok) {
      const tgError = await response.text();
      console.error("Помилка від Telegram:", tgError);
      return NextResponse.json({ error: `Telegram відхилив запит: ${tgError}` }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Внутрішня помилка сервера:", error);
    return NextResponse.json({ error: `Внутрішня помилка: ${error.message}` }, { status: 500 });
  }
}