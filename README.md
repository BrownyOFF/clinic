# 🏥 Сайт КНП «Центр медичної реабілітації та паліативної допомоги дітям» Житомирської обласної ради (Медичний центр "Вітрила")

*(🇬🇧 English translation below)*

## 📌 Про проект

Цей проект — сучасний, швидкий та багатомовний веб-сайт для **Комунального некомерційного підприємства «Центр медичної реабілітації та паліативної допомоги дітям» Житомирської обласної ради** (також відомого як Медичний Центр "Вітрила").

Головна мета проекту — забезпечити пацієнтів та їхні родини зручним доступом до інформації про послуги, спеціалістів, новини та контакти закладу, незалежно від пристрою чи мови. Проект розроблено з акцентом на високу продуктивність, SEO-оптимізацію, доступність та безпеку.

### 👤 Розробник
Проект розроблено та підтримується: **[Галас Тимур](https://github.com/BrownyOFF)**

---

## ☁️ Хостинг та Інфраструктура

Сайт розгорнуто та хоститься на платформі **Cloudflare** (Cloudflare Pages / Workers). 
Це рішення забезпечує:
- **Глобальну CDN:** Сайт завантажується миттєво з найближчого до користувача сервера.
- **Edge Runtime:** API-роути виконуються "на краю" (Edge), що гарантує мінімальну затримку при відправці форм.
- **Безпеку:** Вбудований захист Cloudflare від DDoS-атак та автоматичне управління SSL-сертифікатами.

---

## 🏗 Архітектура та Принцип роботи

Сайт побудований на базі сучасного фреймворку **Next.js 16+** з використанням **App Router**.

### 1. Багатомовність (i18n через Ручний роутинг)
Проект підтримує дві мови: **Українську** (основна) та **Англійську**.
- Щоб уникнути зайвого навантаження від важких бібліотек локалізації та мати 100% контроль над SEO, реалізовано **ручний роутинг**.
- Основна (українська) версія знаходиться безпосередньо в кореневій директорії `app/`.
- Англійська версія є точним дзеркалом і знаходиться в директорії `app/en/`.
- Компоненти інтерфейсу дублюються (наприклад, `Header.tsx` та `HeaderEn.tsx`), що дозволяє незалежно налаштовувати дизайн та контент для різних мов.
- SEO-зв'язок (canonical та hreflang) чітко прописаний у файлах `layout.tsx` для правильного індексування пошуковими системами Google.

### 2. Керування контентом (Безбазовий підхід)
Сайт не використовує традиційну реляційну чи NoSQL базу даних (як MySQL чи MongoDB) або складні CMS.
- Весь динамічний контент (новини, списки лікарів, послуги, факти) зберігається **локально у статичних TypeScript-файлах** (директорія `app/data/`).
- Наприклад, дані новин лежать у `app/data/news.ts` та `app/data/newsEn.ts`.
- **Переваги:** Нульовий час відгуку бази даних, абсолютна стійкість до зламів бази даних, легке версіонування контенту через Git.

### 3. Server-Side Rendering (SSR) та Client Components
- Архітектура Next.js App Router дозволяє за замовчуванням рендерити компоненти на сервері (**Server Components**), віддаючи клієнту готовий HTML. Це кардинально покращує швидкість завантаження (FCP, LCP) та SEO.
- Директива `"use client";` використовується строго дозовано — лише для тих компонентів, де потрібна інтерактивність користувача (кліки, форми, каруселі) або клієнтський стан (анімації Framer Motion, керування темами).

### 4. Обробка форм та Сповіщення (API Edge)
Форми зворотного зв'язку (наприклад, запис на прийом) працюють через захищений API-роут (`app/api/send/route.ts`), який виконується в Edge-середовищі Cloudflare:
- **Telegram Bot API:** Основний канал. Дані миттєво відправляються в Telegram-чат адміністратора/реєстратури.
- **Google Apps Script:** Резервний канал. Дані дублюються в Google Script, який пересилає їх на email закладу.
- **Анти-спам (Honeypot):** У форми вбудовано приховане поле `bot_check`. Якщо спам-бот його заповнює, сервер блокує відправку, повертаючи фейковий успішний статус, щоб бот не намагався обійти захист.

### 5. Дизайн, UI та Анімації
- **Стилізація:** Використовується **Tailwind CSS v4**. Верстка побудована за принципом **Mobile-first** — інтерфейс ідеально адаптується під екрани мобільних телефонів, планшетів та десктопів.
- **Темна тема:** Повна підтримка темного режиму через класи `dark:` та керування станом бібліотекою `next-themes`.
- **Анімації:** Плавні переходи сторінок та поява елементів при скролінгу реалізовані за допомогою **Framer Motion** (`motion`, `AnimatePresence`).
- **Іконки:** Використовуються легковажні векторні SVG іконки від **Lucide React**.

---

## 🚀 Встановлення та Запуск (Для розробників)

### Попередні вимоги
- Node.js (рекомендується версія 20+)
- npm (або yarn / pnpm)
- Обліковий запис Cloudflare (для деплою)

### 1. Клонування та встановлення залежностей
```bash
git clone <URL_репозиторію>
cd site
npm install
```

### 2. Налаштування змінних оточення
Створіть файл `.env.local` у корені проекту та додайте ключі для роботи форм:
```env
TELEGRAM_BOT_TOKEN="ваш_токен_бота"
TELEGRAM_CHAT_ID="id_чату"
GOOGLE_SCRIPT_URL="url_вашого_google_script"
```

### 3. Запуск у режимі розробки
```bash
npm run dev
```
Відкрийте [http://localhost:3000](http://localhost:3000) у вашому браузері.

### 4. Збірка для продакшену
```bash
npm run build
npm run start
```

---

## 📂 Структура проекту

```text
app/
├── api/             # Edge API роути (наприклад, /api/send для форм)
├── components/      # Спільні UI компоненти (Header, Footer, каруселі, кнопки)
├── data/            # Локальні дані контенту у форматі TypeScript (новини, лікарі)
├── en/              # Англійська версія сайту (повне дзеркало української структури)
├── dlya-patsiyenta/ # Розділ "Для пацієнта" (документи, платні послуги, реабілітація)
├── komanda/         # Розділ "Команда" (профілі спеціалістів)
├── kontakty/        # Розділ "Контакти" (карта, телефони, форма зв'язку)
├── napryamky/       # Розділ "Напрямки" (медичні напрямки закладу)
├── novyny/          # Розділ "Новини" (список новин та динамічні сторінки [slug])
├── pro-nas/         # Розділ "Про нас" (історія, місія, фотогалерея)
├── vakansiyi/       # Розділ "Вакансії"
├── layout.tsx       # Головний layout української версії (шрифти, метадані, провайдери)
└── page.tsx         # Головна (домашня) сторінка української версії
```

## 📝 Правила розробки (Code Style)
1. **TypeScript:** Строга типізація є обов'язковою. Уникайте використання `any`. Завжди створюйте `interface` або `type` для вхідних даних (props) компонентів та структур даних.
2. **Tailwind CSS:** Всі стилі (відступи, кольори, типографіка, сітка) пишуться виключно класами Tailwind. Завжди забезпечуйте коректний вигляд у темній темі (префікс `dark:`).
3. **Іменування:** Код (назви змінних, функцій, компонентів, файлів, класів) пишеться виключно англійською мовою.
4. **Коментарі та документація:** Для забезпечення прозорості в команді, коментарі до складної логіки та документація (як цей файл) ведуться українською мовою.

---
---

# 🏥 Website of the Municipal Non-Profit Enterprise "Center for Medical Rehabilitation and Palliative Care for Children" of the Zhytomyr Regional Council (Medical Center "Vitryla")

## 📌 About the Project

This project is a modern, fast, and multilingual website for the **Municipal Non-Profit Enterprise "Center for Medical Rehabilitation and Palliative Care for Children" of the Zhytomyr Regional Council** (also known as Medical Center "Vitryla").

The main goal of the project is to provide patients and their families with convenient access to information about services, specialists, news, and contact details of the institution, regardless of device or language. The project is designed with a focus on high performance, SEO optimization, accessibility, and security.

### 👤 Developer
Project developed and maintained by: **[Timur Halas](https://github.com/BrownyOFF)**

---

## ☁️ Hosting and Infrastructure

The website is deployed and hosted on the **Cloudflare** platform (Cloudflare Pages / Workers).
This solution provides:
- **Global CDN:** The website loads instantly from the server closest to the user.
- **Edge Runtime:** API routes run "on the edge" (Edge), ensuring minimal latency when submitting forms.
- **Security:** Built-in Cloudflare protection against DDoS attacks and automated SSL certificate management.

---

## 🏗 Architecture and Operation Principle

The website is built on the modern **Next.js 16+** framework using the **App Router**.

### 1. Multilingualism (i18n via Manual Routing)
The project supports two languages: **Ukrainian** (primary) and **English**.
- To avoid the overhead of heavy localization libraries and to have 100% control over SEO, **manual routing** is implemented.
- The primary (Ukrainian) version is located directly in the root directory `app/`.
- The English version is an exact mirror and is located in the `app/en/` directory.
- UI components are duplicated (e.g., `Header.tsx` and `HeaderEn.tsx`), allowing independent configuration of design and content for different languages.
- SEO linking (canonical and hreflang) is explicitly defined in the `layout.tsx` files for proper indexing by Google search engines.

### 2. Content Management (Databaseless Approach)
The website does not use a traditional relational or NoSQL database (like MySQL or MongoDB) or a complex CMS.
- All dynamic content (news, lists of doctors, services, facts) is stored **locally in static TypeScript files** (`app/data/` directory).
- For example, news data is located in `app/data/news.ts` and `app/data/newsEn.ts`.
- **Advantages:** Zero database response time, absolute resistance to database hacking, easy content versioning via Git.

### 3. Server-Side Rendering (SSR) and Client Components
- The Next.js App Router architecture allows components to be rendered on the server (**Server Components**) by default, delivering ready-made HTML to the client. This dramatically improves loading speed (FCP, LCP) and SEO.
- The `"use client";` directive is used strictly minimally — only for components that require user interactivity (clicks, forms, carousels) or client state (Framer Motion animations, theme management).

### 4. Form Processing and Notifications (Edge API)
Feedback forms (e.g., making an appointment) operate via a secure API route (`app/api/send/route.ts`) that runs in the Cloudflare Edge environment:
- **Telegram Bot API:** Primary channel. Data is instantly sent to the administrator/registry Telegram chat.
- **Google Apps Script:** Backup channel. Data is duplicated to a Google Script, which forwards it to the institution's email.
- **Anti-spam (Honeypot):** A hidden field `bot_check` is built into the forms. If a spambot fills it in, the server blocks the submission, returning a fake success status so the bot doesn't try to bypass the protection.

### 5. Design, UI, and Animations
- **Styling:** **Tailwind CSS v4** is used. Layout is built on the **Mobile-first** principle — the interface perfectly adapts to screens of mobile phones, tablets, and desktops.
- **Dark Theme:** Full support for dark mode via `dark:` classes and state management using the `next-themes` library.
- **Animations:** Smooth page transitions and appearance of elements on scrolling are implemented using **Framer Motion** (`motion`, `AnimatePresence`).
- **Icons:** Lightweight vector SVG icons from **Lucide React** are used.

---

## 🚀 Installation and Launch (For Developers)

### Prerequisites
- Node.js (version 20+ recommended)
- npm (or yarn / pnpm)
- Cloudflare account (for deployment)

### 1. Cloning and installing dependencies
```bash
git clone <repository_URL>
cd site
npm install
```

### 2. Setting up environment variables
Create a `.env.local` file in the root of the project and add keys for form operation:
```env
TELEGRAM_BOT_TOKEN="your_bot_token"
TELEGRAM_CHAT_ID="chat_id"
GOOGLE_SCRIPT_URL="your_google_script_url"
```

### 3. Running in development mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Building for production
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```text
app/
├── api/             # Edge API routes (e.g., /api/send for forms)
├── components/      # Shared UI components (Header, Footer, carousels, buttons)
├── data/            # Local content data in TypeScript format (news, doctors)
├── en/              # English version of the site (full mirror of Ukrainian structure)
├── dlya-patsiyenta/ # "For Patient" section (documents, paid services, rehabilitation)
├── komanda/         # "Team" section (specialist profiles)
├── kontakty/        # "Contacts" section (map, phones, contact form)
├── napryamky/       # "Directions" section (medical directions of the institution)
├── novyny/          # "News" section (list of news and dynamic [slug] pages)
├── pro-nas/         # "About Us" section (history, mission, photo gallery)
├── vakansiyi/       # "Vacancies" section
├── layout.tsx       # Main layout of the Ukrainian version (fonts, metadata, providers)
└── page.tsx         # Main (home) page of the Ukrainian version
```

## 📝 Development Rules (Code Style)
1. **TypeScript:** Strict typing is mandatory. Avoid using `any`. Always create an `interface` or `type` for component input data (props) and data structures.
2. **Tailwind CSS:** All styles (margins, colors, typography, grid) are written exclusively with Tailwind classes. Always ensure correct appearance in dark theme (`dark:` prefix).
3. **Naming:** Code (variable names, functions, components, files, classes) is written exclusively in English.
4. **Comments and documentation:** To ensure transparency in the team, comments on complex logic and documentation (like this file) are kept in Ukrainian (and English if necessary).
