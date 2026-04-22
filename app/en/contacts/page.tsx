"use client";

import { useState, FormEvent } from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, PhoneCall, Mail, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";

// Імпортуємо англійські компоненти
import HeaderEn from "@/app/components/HeaderEn";
import FooterEn from "@/app/components/FooterEn";

export default function ContactsPageEn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (key.endsWith('[]')) {
        const cleanKey = key.replace('[]', '');
        if (!data[cleanKey]) data[cleanKey] = [];
        data[cleanKey].push(value);
      } else {
        data[key] = value;
      }
    });

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key] = data[key].join(', ');
      }
    });

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("An error occurred during submission. Please try again.");
      }
    } catch (error) {
      alert("Connection error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden">
      
      {/* АБСТРАКТНИЙ ФОН */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 dark:bg-blue-700 opacity-20 dark:opacity-30 blur-[100px]"></div>
      </div>

      <HeaderEn />

      <main className="py-16 md:py-24 relative z-10 max-w-7xl mx-auto px-6">
        
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
            Get in <span className="text-blue-600 dark:text-blue-400">touch</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We are always ready to answer your questions, provide a consultation, or help with the paperwork for your child's rehabilitation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* ІНФОРМАЦІЯ ТА КАРТА */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-5 space-y-8">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Our Contacts</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Address</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Zhytomyr, 8 Korabelna St.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Phone</p>
                    <a href="tel:+380674572828" className="text-slate-600 dark:text-slate-400 text-sm mt-1 hover:text-emerald-600 transition-colors block">(067) 457-28-28</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Email</p>
                    <a href="mailto:baby_house@ukr.net" className="text-slate-600 dark:text-slate-400 text-sm mt-1 hover:text-amber-600 transition-colors block">baby_house@ukr.net</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Working Hours</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Mon-Fri: 08:00 - 17:00<br/>Sat-Sun: Closed (Inpatient care 24/7)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Міні-карта */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-800">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.8152438531584!2d28.69466847648316!3d50.24407887154944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472c64bd2db8b98b%3A0x8683e9b13fb8053!2z0LLRg9C7LiDQmtC-0YDQsNCx0LXQu9GM0L3QsCwgOCwg0JbQuNGC0L7QvNC40YAsINCW0LjRgtC-0LzQuNGA0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDEwMDAw!5e0!3m2!1suk!2sua!4v1710000000000!5m2!1suk!2sua" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>

          {/* ФОРМА ЗВОРОТНОГО ЗВ'ЯЗКУ */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="lg:col-span-7">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 md:p-12 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-bl-full -z-10 pointer-events-none"></div>
              
              {isSubmitted ? (
                // СТАН УСПІШНОЇ ВІДПРАВКИ
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Form submitted successfully!</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
                    Thank you for contacting us. Our administrator will get in touch with you shortly to arrange all the details.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)} 
                    className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    Submit another form
                  </button>
                </motion.div>
              ) : (
                // ФОРМА
                <>
                  <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Appointment for Rehabilitation</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-8">Fill out the form, and our administrator will contact you to arrange the visit.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* 🛡️ HONEYPOT */}
                    <input type="text" name="bot_check" className="hidden" autoComplete="off" tabIndex={-1} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Patient's Full Name *</label>
                        <input type="text" name="Patient_Name" required className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date of Birth *</label>
                        <input 
                          type="text" 
                          name="Date_of_Birth" 
                          required 
                          pattern="\d{2}\.\d{2}\.\d{4}"
                          title="Please enter the date in DD.MM.YYYY format (e.g., 15.03.2020)"
                          className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400" 
                          placeholder="DD.MM.YYYY" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Contact Phone *</label>
                        <input type="tel" name="Phone" required className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400" placeholder="+38 (000) 000-00-00" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Electronic Referral</label>
                        <select name="Referral" className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white appearance-none">
                          <option value="Not specified">Select referral type...</option>
                          <option value="Inpatient medical rehabilitation">Inpatient medical rehabilitation</option>
                          <option value="Outpatient medical rehabilitation">Outpatient medical rehabilitation</option>
                          <option value="Inpatient palliative care">Inpatient palliative care</option>
                          <option value="Outpatient palliative care">Outpatient palliative care</option>
                          <option value="Without referral">Without referral</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Residential Address *</label>
                      <input type="text" name="Address" required className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400" placeholder="Region, City/Village, Street" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Need for specialist consultation:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                        {[
                          "PRM Doctor", "Physical Therapist", "Occupational Therapist", 
                          "Speech Therapist / Defectologist", "Psychologist", "Pediatric Neurologist", 
                          "Pediatric Psychiatrist", "Pediatric Orthopedist-Traumatologist"
                        ].map((doc) => (
                          <label key={doc} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" name="Consultation_Needed[]" value={doc} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{doc}</span>
                          </label>
                        ))}
                        <div className="sm:col-span-2 mt-2">
                           <input type="text" name="Consultation_Other" className="w-full px-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white placeholder:text-slate-400" placeholder="Other (specify specialist)..." />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Diagnosis (optional)</label>
                      <input type="text" name="Diagnosis" className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400" placeholder="Specify diagnosis..." />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Additional Information</label>
                      <textarea name="Additional_Information" rows={3} className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400 resize-none" placeholder="Add any information you consider important..."></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:bg-blue-400 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group mt-8"
                    >
                      {isSubmitting ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <>
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Submit form
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

            </div>
          </motion.div>
        </div>

      </main>

      <FooterEn />
    </div>
  );
}