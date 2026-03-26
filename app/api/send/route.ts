import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Налаштування підключення до вашої пошти
    // Якщо у вас Gmail, Ukr.net або пошта домену — вкажіть дані нижче
    const transporter = nodemailer.createTransport({
      host: 'smtp.ukr.net', // Для Gmail. Для Ukr.net: smtp.ukr.net
      port: 465,
      secure: true, // true для порту 465
      auth: {
        user: 'noreply.vitrylazhyttia@ukr.net', // Ваша офіційна пошта
        pass: process.env.EMAIL_PASS,     // ПАРОЛЬ ДОДАТКУ (не звичайний пароль!)
      },
    });

    // 2. Формуємо текст листа (зручна таблиця)
    const htmlContent = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #2563eb;">Нова анкета пацієнта з сайту</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${Object.entries(body).map(([key, value]) => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">${key.replace(/_/g, ' ')}:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${value}</td>
            </tr>
          `).join('')}
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">Це повідомлення відправлено автоматично з розділу контактів вашого сайту.</p>
      </div>
    `;

    // 3. Відправка
    await transporter.sendMail({
      from: '"Сайт Вітрила Життя" <noreply.vitrylazhyttia@ukr.net>',
      to: ['3brownjohn3@gmail.com', 'noreply.vitrylazhyttia@ukr.net'],
      subject: `Анкета: ${body.ПІБ_пацієнта || 'Запис на реабілітацію'}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SMTP Error:', error);
    return NextResponse.json({ error: 'Помилка при відправці пошти' }, { status: 500 });
  }
}