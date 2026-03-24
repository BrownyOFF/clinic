// components/Facts.tsx
"use client"; // Також Client Component

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const facts = [
  { id: 1, title: 'Комплексний підхід', desc: 'Центр забезпечує як реабілітаційну, так і паліативну допомогу дітям з важкими та хронічними захворюваннями.', img: '/images/fact1.jpg' },
  { id: 2, title: 'Мультидисциплінарна команда', desc: 'У центрі працюють лікарі, реабілітологи, психологи, логопеди, соціальні працівники та медичні сестри.', img: '/images/fact2.jpg' },
  { id: 3, title: 'Індивідуальні програми', desc: 'Кожна дитина отримує індивідуально розроблений план лікування та догляду відповідно до своїх потреб.', img: '/images/fact3.jpg' },
  { id: 4, title: 'Сучасне обладнання', desc: 'Центр оснащений сучасною реабілітаційною та діагностичною апаратурою.', img: '/images/fact4.jpg' },
  { id: 5, title: 'Паліативна підтримка', desc: 'Надається не лише медична допомога, а й психологічна та емоційна підтримка для дитини та її родини.', img: '/images/fact5.jpg' },
  { id: 6, title: 'Освітні програми', desc: 'Центр організовує навчання та тренінги для батьків, доглядульників та медичних працівників.', img: '/images/fact6.jpg' },
  { id: 7, title: 'Доброзичливість до дітей', desc: 'Інтер\'єри закладу оформлені в затишному, дружньому до дитини стилі.', img: '/images/fact7.jpg' },
  { id: 8, title: 'Соціальна адаптація', desc: 'Фахівці допомагають дітям інтегруватися в суспільство, навчання, розвивати навички спілкування.', img: '/images/fact8.jpg' },
  { id: 9, title: 'Психологічна допомога родині', desc: 'Центр підтримує не лише дитину, а й її батьків та братів/сестер.', img: '/images/fact9.jpg' },
  { id: 10, title: 'Співпраця з БФ', desc: 'Заклад співпрацює з фондами та громадськими організаціями для підтримки пацієнтів.', img: '/images/fact10.jpg' },
  { id: 11, title: 'Безперервність допомоги', desc: 'Медичне спостереження та догляд можуть тривати як у стаціонарі, так і вдома.', img: '/images/fact11.jpg' },
  { id: 12, title: 'Віра в якість життя', desc: 'Головна мета центру — не лише продовжити життя дитини, а зробити його повноцінним.', img: '/images/fact12.jpg' },
];

const Facts = () => {
  // Явно вказуємо тип : Variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 18,
        duration: 0.8
      }
    },
  };

  return (
    <section className="bg-slate-50 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-950 mb-16 tracking-tight max-w-3xl mx-auto">
          12 фактів про Центр медичної реабілітації <span className="text-blue-700">Вітрила Життя</span>
        </h2>
        
        {/* Ми додаємо анімацію не на всю сітку, а на кожну картку окремо */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {facts.map((fact, index) => (
            <motion.div 
              key={fact.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 group"
              variants={cardVariants}
              initial="hidden" // Починаємо як "прихований"
              whileInView="visible" // Запускаємо анімацію появу "whileInView" (коли в області видимості)
              viewport={{ once: true, amount: 0.2 }} // Тільки один раз (при першому скролі) і коли 20% картки видно
              // Можна також додати затримку для staggered ефекту, якщо це сітка,
              // але simple approach per card працює краще для скролу.
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image 
                  src={fact.img} 
                  alt={fact.title} 
                  fill
                  className="object-cover object-center group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-blue-900 mb-4 tracking-tight">
                  {fact.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {fact.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facts;