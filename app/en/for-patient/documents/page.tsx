"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle, Info, Stethoscope, BriefcaseMedical } from "lucide-react";

// Імпортуємо англійські компоненти
import HeaderEn from "@/app/components/HeaderEn";
import FooterEn from "@/app/components/FooterEn";

export default function DocumentsPageEn() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500">
      <div className="fixed inset-0 -z-50 h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      <HeaderEn />

      <main className="py-20 max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">How to Receive Rehabilitation Services</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Please review the list of documents required before your visit to our center. Choose your referral path:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* ШЛЯХ 1: Постанова КМУ 309 */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center shrink-0">
                <BriefcaseMedical size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Through the Social Protection Fund</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Under CMU Resolution No. 309</p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-400 p-4 rounded-r-lg mb-8">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                To receive a referral, these documents must be submitted to the local branch of the Fund for Social Protection of Persons with Disabilities.
              </p>
            </div>

            <ul className="space-y-5">
              {[
                "Application from parents or legal representatives of the child.",
                "Copy of the child's birth certificate.",
                "Document confirming the child's disability.",
                "Child with a disability certificate.",
                "Individual Rehabilitation Program (IRP) specifying the types of rehabilitation.",
                "Passport and taxpayer identification number of a parent (legal representative)."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ШЛЯХ 2: Програма НСЗУ */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-xl shadow-blue-200/50 dark:shadow-none border border-blue-100 dark:border-blue-900/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                <Stethoscope size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Electronic Referral</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Under NHSU Packages (No. 25, 53, 54)</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-sm">1</span> 
                  E-referral from a doctor:
                </h3>
                <ul className="space-y-3 ml-8 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong className="text-slate-800 dark:text-slate-200">Package No. 25:</strong> Pediatrician, family doctor, or medical specialist.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Packages No. 53 & 54:</strong> Pediatric neurologist, PRM doctor, pediatric orthopedist-traumatologist.</li>
                </ul>
                <p className="text-xs text-slate-500 mt-2 ml-8 flex items-center gap-1"><Info size={14}/> The referral must include the diagnosis and the type of rehabilitation.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-sm">2</span> 
                  Medical documentation:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 ml-2"><CheckCircle className="text-blue-500 shrink-0 mt-0.5" size={18} /> <span className="text-slate-700 dark:text-slate-300">Extract from the child's developmental history (anamnesis, pathologies).</span></li>
                  <li className="flex items-start gap-3 ml-2"><CheckCircle className="text-blue-500 shrink-0 mt-0.5" size={18} /> <span className="text-slate-700 dark:text-slate-300">Examination results (MRI, CT, Ultrasound, etc.).</span></li>
                  <li className="flex items-start gap-3 ml-2"><CheckCircle className="text-blue-500 shrink-0 mt-0.5" size={18} /> <span className="text-slate-700 dark:text-slate-300">Child's vaccination records.</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-sm">3</span> 
                  Personal documents:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 ml-2"><CheckCircle className="text-blue-500 shrink-0 mt-0.5" size={18} /> <span className="text-slate-700 dark:text-slate-300">Child's birth certificate.</span></li>
                  <li className="flex items-start gap-3 ml-2"><CheckCircle className="text-blue-500 shrink-0 mt-0.5" size={18} /> <span className="text-slate-700 dark:text-slate-300">Passport and taxpayer identification number of a parent.</span></li>
                </ul>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <FooterEn />
    </div>
  );
}