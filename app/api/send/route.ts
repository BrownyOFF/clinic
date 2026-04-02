import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Беремо токен бота та ID чату з безпечних змінних
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Не налаштовані ключі Telegram");
      return NextResponse.json({ error: 'Помилка конфігурації' }, { status: 500 });
    }

    // Формуємо красивий текст повідомлення
    let messageText = `🏥 <b>НОВА АНКЕТА З САЙТУ</b> 🏥\n\n`;
    
    for (const [key, value] of Object.entries(body)) {
      if (value) {
        messageText += `<b>${key.replace(/_/g, ' ')}:</b> ${value}\n`;
      }
    }

    // Відправляємо запит напряму до Telegram API
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML', // Дозволяє робити жирний текст
      }),
    });

    if (!response.ok) {
      throw new Error('Помилка відправки в Telegram');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}