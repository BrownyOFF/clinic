"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Search, Download, FileText, Stethoscope, BookOpen } from "lucide-react";

// Імпортуємо англійські компоненти
import HeaderEn from "@/app/components/HeaderEn"; 
import FooterEn from "@/app/components/FooterEn";

// Повний масив усіх послуг (Англійською)
const servicesData = [
  // --- МЕДИЧНІ ПОСЛУГИ (Medical Services) ---
  { category: "Medical Services", code: "A67009", name: "Occupational Therapist Consultation", price: "300" },
  { category: "Medical Services", code: "A67015", name: "Ultrasound Diagnostics Doctor Consultation", price: "270" },
  { category: "Medical Services", code: "A67018", name: "Functional Diagnostics Doctor Consultation", price: "270" },
  { category: "Medical Services", code: "A67022", name: "PRM (Physical and Rehabilitation Medicine) Doctor Consultation", price: "200-500" },
  { category: "Medical Services", code: "A67009", name: "Initial Rehabilitation Examination by Occupational Therapist", price: "490" },
  { category: "Medical Services", code: "А67022", name: "Initial Rehabilitation Examination by Physical Therapist", price: "490" },
  { category: "Medical Services", code: "А67039", name: "Initial Rehabilitation Examination by PRM Doctor", price: "455" },
  { category: "Medical Services", code: "N67001", name: "Pediatric Neurologist Consultation", price: "265" },
  { category: "Medical Services", code: "96008-00", name: "Neurological Examination", price: "265" },
  { category: "Medical Services", code: "L67001", name: "Pediatric Orthopedist-Traumatologist Consultation", price: "270" },
  { category: "Medical Services", code: "A67004", name: "Pediatrician Consultation", price: "270" },
  { category: "Medical Services", code: "P67002", name: "Pediatric Psychiatrist Consultation", price: "270" },
  { category: "Medical Services", code: "96236-00", name: "Initial Mental State Examination", price: "575" },
  { category: "Medical Services", code: "96237-00", name: "Comprehensive Mental State Examination", price: "575" },
  { category: "Medical Services", code: "А67008", name: "Radiologist Consultation", price: "245" },
  { category: "Medical Services", code: "A67039", name: "Physical Therapist Consultation", price: "305" },
  { category: "Medical Services", code: "A67037", name: "Pediatric Surgeon Consultation", price: "255" },
  { category: "Medical Services", code: "96162-00", name: "Head Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Face Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Neck Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Collar Zone Massage", price: "85" },
  { category: "Medical Services", code: "96162-00", name: "Cervicothoracic Spine Massage", price: "85" },
  { category: "Medical Services", code: "96162-00", name: "Upper Limb, Shoulder and Scapular Region Massage", price: "100" },
  { category: "Medical Services", code: "96162-00", name: "Upper Limb Massage", price: "85" },
  { category: "Medical Services", code: "96162-00", name: "Shoulder Joint Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Elbow Joint Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Radiocarpal (Wrist) Joint Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Hand and Forearm Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Back Massage (from C7 to L1 vertebrae)", price: "100" },
  { category: "Medical Services", code: "96162-00", name: "Back Massage (from C7 to L5 vertebrae)", price: "100" },
  { category: "Medical Services", code: "96162-00", name: "Chest Massage", price: "115" },
  { category: "Medical Services", code: "96162-00", name: "Anterior Abdominal Wall Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Lumbosacral Region Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Segmental Massage of the Lumbosacral Region", price: "85" },
  { category: "Medical Services", code: "96162-00", name: "Spine Region Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Lower Limb and Lower Back Massage", price: "100" },
  { category: "Medical Services", code: "96162-00", name: "Hip Joint Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Knee Joint Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Ankle Joint Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "Foot and Lower Leg Massage", price: "70" },
  { category: "Medical Services", code: "96162-00", name: "General Massage for Infants and Toddlers", price: "130" },
  { category: "Medical Services", code: "96162-00", name: "Segmental Massage of the Cervicothoracic Spine", price: "85" },
  { category: "Medical Services", code: "96162-00", name: "Lower Limb Massage", price: "85" },
  { category: "Medical Services", code: "96115-00", name: "Therapeutic Exercises, Facial Muscles / Temporomandibular Joint", price: "130" },
  { category: "Medical Services", code: "96116-00", name: "Therapeutic Exercises, Eye Muscles", price: "130" },
  { category: "Medical Services", code: "96117-00", name: "Therapeutic Exercises, Esophageal Muscles", price: "130" },
  { category: "Medical Services", code: "96118-00", name: "Therapeutic Exercises, Shoulder Joint", price: "220" },
  { category: "Medical Services", code: "96119-00", name: "Therapeutic Exercises, Chest or Abdominal Muscles", price: "220" },
  { category: "Medical Services", code: "96120-00", name: "Therapeutic Exercises, Back or Neck Muscles", price: "220" },
  { category: "Medical Services", code: "96121-00", name: "Therapeutic Exercises, Arm Muscles", price: "230" },
  { category: "Medical Services", code: "96122-00", name: "Therapeutic Exercises, Elbow Joint", price: "220" },
  { category: "Medical Services", code: "96123-00", name: "Therapeutic Exercises, Hand Muscles, Wrist or Finger Joints", price: "225" },
  { category: "Medical Services", code: "96124-00", name: "Therapeutic Exercises, Hip Joint", price: "225" },
  { category: "Medical Services", code: "96125-00", name: "Therapeutic Exercises, Pelvic Diaphragm Muscles", price: "225" },
  { category: "Medical Services", code: "96126-00", name: "Therapeutic Exercises, Lower Limb Muscles", price: "230" },
  { category: "Medical Services", code: "96127-00", name: "Therapeutic Exercises, Knee Joint", price: "230" },
  { category: "Medical Services", code: "96128-00", name: "Therapeutic Exercises, Foot Muscles, Ankle or Toe Joints", price: "230" },
  { category: "Medical Services", code: "96129-00", name: "Therapeutic Exercises, Whole Body", price: "300" },
  { category: "Medical Services", code: "96130-00", name: "Skills Training related to Body Position / Mobility / Movements", price: "235" },
  { category: "Medical Services", code: "96131-00", name: "Skills Training related to Transferring", price: "220" },
  { category: "Medical Services", code: "96139-00", name: "Pool Exercises with Assistance", price: "260" },
  { category: "Medical Services", code: "96139-00", name: "Pool Exercises without Assistance", price: "260" },
  { category: "Medical Services", code: "96139-00", name: "Dynamic Proprioceptive Correction (K.A. Semenova Method)", price: "225" },
  { category: "Medical Services", code: "96139-00", name: "Training on an Orthopedic Verticalizer (Stander)", price: "140" },
  { category: "Medical Services", code: "96139-00", name: "Mechanotherapy on MOTOmed", price: "140" },
  { category: "Medical Services", code: "96139-00", name: "Suspension Rehabilitation Therapy", price: "200" },
  { category: "Medical Services", code: "96139-00", name: "\"Spider\" System Therapy", price: "200" },
  { category: "Medical Services", code: "96139-00", name: "Physical Therapy for Infants and Toddlers", price: "115" },
  { category: "Medical Services", code: "96139-00", name: "Postural Therapy (Positioning)", price: "160" },
  { category: "Medical Services", code: "96139-00", name: "Mechanotherapy on an Exercise Bike", price: "115" },
  { category: "Medical Services", code: "00000-00", name: "Kinesio Taping (1 area)", price: "215" },
  { category: "Medical Services", code: "00000-00", name: "Biodynamic Taping", price: "225" },
  { category: "Medical Services", code: "00000-00", name: "Cross Taping of Facial Muscles", price: "145" },
  { category: "Medical Services", code: "96142-00", name: "Skills Training related to using Assistive or Adaptive Devices", price: "165" },
  { category: "Medical Services", code: "96140-00", name: "Skills Training related to Self-Care", price: "165" },
  { category: "Medical Services", code: "96143-00", name: "Skills Training related to Independent Eating", price: "165" },
  { category: "Medical Services", code: "96112-00", name: "Skills Training related to Sensory/Sensorimotor/Neurosensory Functions", price: "165" },
  { category: "Medical Services", code: "96113-00", name: "Skills Training related to Memory, Orientation, Perception, or Attention", price: "165" },
  { category: "Medical Services", code: "96150-00", name: "Water Confidence Skills Training (children up to 3 years)", price: "165" },
  { category: "Medical Services", code: "96153-00", name: "Hydrotherapy", price: "200" },
  { category: "Medical Services", code: "96151-00", name: "Allied Medical Intervention: Physiotherapy (Paraffin-Ozokerite Applications for Facial Muscles)", price: "120" },
  { category: "Medical Services", code: "96151-00", name: "Allied Medical Intervention: Physiotherapy (Paraffin-Ozokerite Applications for Upper or Lower Limbs)", price: "195" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Irradiation with Various Light Sources)", price: "80" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Direct Current Drug Electrophoresis...)", price: "110" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Pulsed Electromagnetic Field)", price: "110" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Myostimulation of Any Area, 1st procedure)", price: "400" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Myostimulation of Any Area, 2nd-10th procedures)", price: "235" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Individual Aerosol Therapy / Inhalations)", price: "80" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Vibrotherapy)", price: "75" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Hardware Foot Massage)", price: "75" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Ultrasound Therapy)", price: "125" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Local Darsonvalization)", price: "100" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Ultratonotherapy)", price: "100" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Magnetotherapy)", price: "100" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Singlet-Oxygen Therapy)", price: "60" },
  { category: "Medical Services", code: "961151-00", name: "Allied Medical Intervention: Physiotherapy (Inhalations with Singlet-Oxygen Mixture)", price: "60" },
  { category: "Medical Services", code: "11000-00", name: "Electroencephalography (EEG)", price: "465" },
  { category: "Medical Services", code: "11003-00", name: "Electroencephalography (EEG) duration ≥ 3 hours", price: "1140" },
  { category: "Medical Services", code: "11006-00", name: "Electroencephalography (EEG) of the Temporo-Sphenoidal Region", price: "465" },
  { category: "Medical Services", code: "92011-00", name: "Electroencephalographic (EEG) Video and Radiotelemetric Monitoring", price: "1205" },
  { category: "Medical Services", code: "11700-00", name: "Electrocardiography (ECG)", price: "290" },
  { category: "Medical Services", code: "55028-00", name: "Head Ultrasound (Neurosonography)", price: "245" },
  { category: "Medical Services", code: "55036-00", name: "Abdominal Ultrasound", price: "315" },
  { category: "Medical Services", code: "55038-00", name: "Urinary Tract Ultrasound", price: "110" },
  { category: "Medical Services", code: "55065-00", name: "Pelvic Ultrasound", price: "145" },
  { category: "Medical Services", code: "55084-00", name: "Urinary Bladder Ultrasound", price: "110" },
  { category: "Medical Services", code: "55113-00", name: "1D (M-mode) and 2D Real-time Heart Ultrasound (Echocardiography)", price: "175" },
  { category: "Medical Services", code: "55816-00", name: "Hip Joint Region Ultrasound", price: "245" },
  { category: "Medical Services", code: "00000-00", name: "Thyroid Gland Ultrasound", price: "175" },
  { category: "Medical Services", code: "00000-00", name: "Thymus Gland Ultrasound", price: "175" },
  { category: "Medical Services", code: "90908-00", name: "Ultrasound of Other Body Region", price: "175" },
  { category: "Medical Services", code: "58900-00", name: "Abdominal X-ray", price: "120" },
  { category: "Medical Services", code: "57712-00", name: "Hip Joints X-ray", price: "160" },
  { category: "Medical Services", code: "58500-00", name: "Chest X-ray", price: "120" },
  { category: "Medical Services", code: "58112-00", name: "Spine X-ray, 2 segments", price: "155" },
  { category: "Medical Services", code: "58115-00", name: "Spine X-ray, 3 segments", price: "155" },
  { category: "Medical Services", code: "58108-00", name: "Spine X-ray, 4 segments", price: "155" },
  { category: "Medical Services", code: "57506-00", name: "Humerus X-ray", price: "120" },
  { category: "Medical Services", code: "57506-01", name: "Elbow X-ray", price: "120" },
  { category: "Medical Services", code: "57512-00", name: "Elbow and Humerus X-ray", price: "120" },
  { category: "Medical Services", code: "57512-01", name: "Elbow and Forearm X-ray", price: "120" },
  { category: "Medical Services", code: "57506-03", name: "Wrist X-ray", price: "120" },
  { category: "Medical Services", code: "57506-04", name: "Hand X-ray", price: "120" },
  { category: "Medical Services", code: "57512-03", name: "Hand and Wrist X-ray", price: "120" },
  { category: "Medical Services", code: "57512-02", name: "Hand, Wrist, and Forearm X-ray", price: "120" },
  { category: "Medical Services", code: "58700-00", name: "Urinary Tract and Kidneys X-ray", price: "120" },
  { category: "Medical Services", code: "-", name: "Patient Accommodation (1 day)", price: "410" },
  { category: "Medical Services", code: "-", name: "Inpatient Accommodation for Accompanying Persons... (1 day with VAT)", price: "410" },
  { category: "Medical Services", code: "-", name: "Five-Meals-a-Day for Patient (by age category)", price: "220-340" },
  { category: "Medical Services", code: "-", name: "Patient Meals - Lunch (by age category)", price: "95-175" },
  { category: "Medical Services", code: "-", name: "Catering Service (Lunch) for Accompanying Persons... (with VAT)", price: "215" },
  { category: "Medical Services", code: "-", name: "Three-Meals-a-Day for Accompanying Persons... (with VAT)", price: "340" },

  // --- ОСВІТНІ ПОСЛУГИ (Educational Services) ---
  { category: "Educational Services", code: "ОП-01", name: "Psychologist Consultation", price: "225" },
  { category: "Educational Services", code: "ОП-02", name: "Special Education Teacher Consultation", price: "230" },
  { category: "Educational Services", code: "ОП-03", name: "Speech Therapist Consultation", price: "230" },
  { category: "Educational Services", code: "ОП-04", name: "Social Educator Consultation", price: "150" },
  { category: "Educational Services", code: "ОП-05", name: "Psychological Diagnostics", price: "300" },
  { category: "Educational Services", code: "ОП-06", name: "Speech Therapy Examination", price: "215" },
  { category: "Educational Services", code: "ОП-07", name: "Defectological (Special Education) Examination", price: "235" },
  { category: "Educational Services", code: "ОП-08", name: "Corrective and Developmental Session with a Psychologist", price: "260" },
  { category: "Educational Services", code: "ОП-09", name: "Corrective and Developmental Session with a Speech Therapist", price: "240" },
  { category: "Educational Services", code: "ОП-10", name: "Corrective and Developmental Session with a Special Education Teacher", price: "235" },
  { category: "Educational Services", code: "ОП-11", name: "Corrective and Developmental Session in the Art Studio", price: "205" },
  { category: "Educational Services", code: "ОП-12", name: "Corrective and Developmental Session using Blotography", price: "185" },
  { category: "Educational Services", code: "ОП-13", name: "Corrective and Developmental Session using the Montessori Method", price: "170" },
  { category: "Educational Services", code: "ОП-14", name: "Corrective and Developmental Session using Music Therapy", price: "165" },
  { category: "Educational Services", code: "ОП-15", name: "Corrective and Developmental Session using Classical Sand Therapy", price: "110" },
  { category: "Educational Services", code: "ОП-16", name: "Orofacial Massage (Massage of Facial Muscles)", price: "175" },
  { category: "Educational Services", code: "ОП-17", name: "Speech Therapy Tongue Massage", price: "175" },
  { category: "Educational Services", code: "ОП-18", name: "Educator's Educational Service", price: "215" },
  { category: "Educational Services", code: "96134-00", name: "Sound Production Skills Training", price: "180" },
  { category: "Educational Services", code: "96135-00", name: "Speech Skills Training", price: "180" },
  { category: "Educational Services", code: "96136-00", name: "Speech Fluency Skills Training", price: "180" },
  { category: "Educational Services", code: "96137-00", name: "Language Skills Training", price: "180" },
  { category: "Educational Services", code: "96184-00", name: "Developmental Tests", price: "460" },
  { category: "Educational Services", code: "96238-00", name: "Examination of the Cognitive and/or Behavioral Sphere", price: "460" },
];

export default function PaidServicesPageEn() {
  const [searchTerm, setSearchTerm] = useState("");

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Фільтрація послуг за пошуком
  const filteredServices = servicesData.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const medicalServices = filteredServices.filter(s => s.category === "Medical Services");
  const educationalServices = filteredServices.filter(s => s.category === "Educational Services");

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden">
      
      {/* АБСТРАКТНИЙ ФОН */}
      <div className="fixed inset-0 -z-50 h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 dark:bg-blue-700 opacity-20 dark:opacity-30 blur-[100px]"></div>
      </div>

      <HeaderEn />

      <main className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ШАПКА СТОРІНКИ */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
            Paid Services
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            Transparent prices for additional medical and educational services at our center. Check the price list online or download the official document.
          </p>
          
          <a 
            href="/documents/pricelist.pdf" 
            download="PriceList_Sails_of_Life.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition shadow-sm"
          >
            <Download size={18} />
            Download full price list (PDF)
          </a>
        </motion.div>

        {/* ПАНЕЛЬ ПОШУКУ */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for a service (e.g., massage, ultrasound...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
            />
          </div>
        </motion.div>

        {/* ТАБЛИЦІ */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="space-y-12">
          
          {/* Блок Медичних послуг */}
          {medicalServices.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                  <Stethoscope size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Medical Services</h2>
              </div>
              
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto max-h-[600px]">
                  <table className="w-full text-left border-collapse relative">
                    <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10">
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        <th className="px-6 py-4 font-semibold w-24">Code</th>
                        <th className="px-6 py-4 font-semibold">Service Name</th>
                        <th className="px-6 py-4 font-semibold text-right w-32">Price (UAH)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                      {medicalServices.map((service, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">{service.code}</td>
                          <td className="px-6 py-4 text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{service.name}</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white whitespace-nowrap">{service.price} ₴</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Блок Освітніх послуг */}
          {educationalServices.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Educational Services</h2>
              </div>
              
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto max-h-[600px]">
                  <table className="w-full text-left border-collapse relative">
                    <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10">
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        <th className="px-6 py-4 font-semibold w-24">Code</th>
                        <th className="px-6 py-4 font-semibold">Service Name</th>
                        <th className="px-6 py-4 font-semibold text-right w-32">Price (UAH)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                      {educationalServices.map((service, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">{service.code}</td>
                          <td className="px-6 py-4 text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{service.name}</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white whitespace-nowrap">{service.price} ₴</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Якщо нічого не знайдено */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400">No services found for your query. Try changing your search terms.</p>
            </div>
          )}

        </motion.div>
      </main>

      <FooterEn />
    </div>
  );
}