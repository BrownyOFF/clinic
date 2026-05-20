"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, RefreshCw, FileText, Phone, Clipboard } from "lucide-react";
import HeaderEn from "@/app/components/HeaderEn";
import FooterEn from "@/app/components/FooterEn";

interface Question {
  id: string;
  text: string;
  type: "single" | "multi";
  options: {
    value: string;
    label: string;
    desc?: string;
  }[];
}

const questions: Question[] = [
  {
    id: "needs",
    text: "What is the main problem or medical need of the child?",
    type: "single",
    options: [
      { value: "rehab_injury", label: "Recovery after injury, surgery, or illness", desc: "Rehabilitation of the musculoskeletal or nervous system" },
      { value: "rehab_chronic", label: "Chronic pain, limited joint mobility", desc: "Need for motor function improvement" },
      { value: "palliative", label: "Severe incurable illness", desc: "Symptom relief, care, pain management, quality of life support for the child" },
      { value: "child_neuro", label: "Developmental delays or neurological disorders", desc: "For children: cerebral palsy, developmental delays, Down syndrome, etc." },
      { value: "other", label: "Other or general preventive check-up", desc: "Consultation with PRM doctors" },
    ],
  },
  {
    id: "referral",
    text: "Do you have an electronic referral from a doctor?",
    type: "single",
    options: [
      { value: "yes", label: "Yes, we have an active electronic referral", desc: "Issued by a pediatrician, family doctor, or specialist" },
      { value: "planning", label: "No, but we plan to obtain it soon", desc: "We will contact our physician" },
      { value: "no_idea", label: "No, and we don't know how or whom to contact", desc: "Need consultation regarding formatting" },
    ],
  },
  {
    id: "symptoms",
    text: "Select additional symptoms or conditions (choose multiple):",
    type: "multi",
    options: [
      { value: "pain", label: "Severe pain syndrome", desc: "Constant pain interfering with sleep and movement" },
      { value: "care", label: "Need for caregiver assistance", desc: "The child cannot perform self-care independently based on age" },
      { value: "dysphagia", label: "Swallowing or breathing issues", desc: "Difficulty eating or respiratory failure" },
      { value: "mobility", label: "Limited mobility", desc: "Need to restore walking skills or mobilize limbs" },
      { value: "exhaustion", label: "High family stress level", desc: "Need for psychological support for parents/guardians" },
    ],
  },
];

export default function ScreeningPageEn() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelect = (questionId: string, value: string, type: "single" | "multi") => {
    if (type === "single") {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    } else {
      const currentList = (answers[questionId] as string[]) || [];
      if (currentList.includes(value)) {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: currentList.filter((item) => item !== value),
        }));
      } else {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: [...currentList, value],
        }));
      }
    }
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetScreening = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
    setCopied(false);
  };

  const getRecommendation = () => {
    const needs = answers["needs"] as string;
    const referral = answers["referral"] as string;
    const symptoms = (answers["symptoms"] as string[]) || [];

    let careType = "child_rehab";

    if (needs === "palliative" || symptoms.includes("dysphagia") || (needs === "other" && symptoms.includes("pain") && symptoms.includes("care"))) {
      careType = "palliative";
    } else if (needs === "child_neuro" || needs === "rehab_injury" || needs === "rehab_chronic") {
      careType = "child_rehab";
    } else {
      careType = "consultation";
    }

    return {
      careType,
      referral,
      symptoms,
    };
  };

  const rec = getRecommendation();

  const handleCopy = () => {
    const text = `Primary Screening Results - "Sails of Life" Center:
- Patient: Child
- Referral: ${
      rec.referral === "yes"
        ? "Has electronic referral"
        : rec.referral === "planning"
        ? "Plans to obtain referral"
        : "No referral"
    }
- Recommended Care Path: ${
      rec.careType === "palliative"
        ? "Palliative Medical Care for Children"
        : rec.careType === "child_rehab"
        ? "Comprehensive Child Rehabilitation"
        : "PRM Doctor / Specialist Consultation"
    }
- Conditions: ${rec.symptoms.length > 0 ? rec.symptoms.join(", ") : "none specified"}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeQuestion = questions[currentStep];
  const isAnswered = activeQuestion
    ? activeQuestion.type === "single"
      ? !!answers[activeQuestion.id]
      : ((answers[activeQuestion.id] as string[]) || []).length > 0
    : false;

  const progressPercentage = ((currentStep) / questions.length) * 100;

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <HeaderEn />

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Header Banner */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">
            Care & Support
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mt-4 tracking-tight leading-none">
            Primary Screening
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base md:text-lg max-w-xl mx-auto font-medium">
            Answer {questions.length} simple questions to determine the optimal care pathway and prepare the necessary documents list for the child.
          </p>
        </div>

        {/* Progress Bar */}
        {!showResult && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
              <span>Step {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(progressPercentage)}% completed</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              />
            </div>
          </div>
        )}

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl p-6 md:p-10 transition-colors duration-500">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {activeQuestion.text}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {activeQuestion.options.map((option) => {
                    const isSelected =
                      activeQuestion.type === "single"
                        ? answers[activeQuestion.id] === option.value
                        : ((answers[activeQuestion.id] as string[]) || []).includes(option.value);

                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(activeQuestion.id, option.value, activeQuestion.type)}
                        className={`text-left p-5 rounded-2xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group ${
                          isSelected
                            ? "bg-blue-50/50 border-blue-500 dark:bg-blue-950/20 dark:border-blue-400"
                            : "border-slate-100 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-bold text-slate-900 dark:text-white text-base md:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {option.label}
                          </span>
                          {option.desc && (
                            <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 font-medium">
                              {option.desc}
                            </p>
                          )}
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            isSelected
                              ? "border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400 text-white"
                              : "border-slate-200 dark:border-slate-700 bg-transparent"
                          }`}
                        >
                          {isSelected && <CheckCircle2 size={16} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition ${
                      currentStep === 0
                        ? "text-slate-350 dark:text-slate-600 cursor-not-allowed"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-850 hover:bg-slate-200"
                    }`}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  
                  <button
                    onClick={nextStep}
                    disabled={!isAnswered}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition shadow-lg ${
                      isAnswered
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20"
                        : "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed shadow-none"
                    }`}
                  >
                    {currentStep === questions.length - 1 ? "Get Recommendation" : "Next"} <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                  <CheckCircle2 size={32} className="flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Screening successfully completed!</h3>
                    <p className="text-sm font-medium opacity-90">Below are the recommended actions and required documents checklist for your case.</p>
                  </div>
                </div>

                {/* Recommendation Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recommended Care Path:</h4>
                    <p className="text-2xl font-black text-slate-950 dark:text-white mt-1">
                      {rec.careType === "palliative" && "Palliative Medical Care for Children"}
                      {rec.careType === "child_rehab" && "Comprehensive Child Rehabilitation"}
                      {rec.careType === "consultation" && "PRM Doctor / Specialist Consultation"}
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-4">
                    <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileText size={18} className="text-blue-600 dark:text-blue-400" />
                      Required Package of Documents:
                    </h5>

                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-350 font-medium">
                      {rec.careType === "palliative" && (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            <span>Electronic referral from a pediatrician, family doctor, or attending physician for **palliative care for children** (NHSU package).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            <span>LCC (Medical Consultative Commission) decision/conclusion establishing palliative status of the child.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            <span>Medical card extract (Form 027/o) detailing primary diagnosis and pain management/support scheme.</span>
                          </li>
                        </>
                      )}

                      {rec.careType === "child_rehab" && (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            <span>Electronic referral from a pediatrician, family doctor, or specialist (neurologist, orthopedist, etc.) to a **PRM (Physical and Rehabilitation Medicine) doctor**.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            <span>Medical card extract (Form 027/o) after surgery, illness, or injury.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            <span>Child birth certificate and parent/guardian ID.</span>
                          </li>
                        </>
                      )}

                      {rec.careType === "consultation" && (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            <span>Referral from a primary care doctor for a free consultation, or booking a paid outpatient appointment with a PRM doctor.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            <span>Any available child's imaging (MRI, CT, X-ray, ultrasound), lab reports, or previous medical summaries.</span>
                          </li>
                        </>
                      )}
                    </ul>

                    {rec.referral !== "yes" && (
                      <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 rounded-xl border border-amber-150 dark:border-amber-900/30 flex items-start gap-2 text-xs font-semibold">
                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <div>
                          <span>Since you do not have an electronic referral, you need to contact your pediatrician or family doctor. Without a referral, services in the center may be provided on a paid outpatient basis.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={handleCopy}
                    className="flex-1 min-w-[200px] py-3.5 px-6 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-semibold text-sm transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Clipboard size={16} />
                    {copied ? "Copied!" : "Copy Result"}
                  </button>

                  <a
                    href="/en/for-patient/documents"
                    className="flex-1 min-w-[200px] py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FileText size={16} /> More about documents
                  </a>

                  <a
                    href={`/en/contacts?careType=${rec.careType}&referral=${rec.referral}&symptoms=${rec.symptoms.join(",")}&needs=${answers.needs || ""}`}
                    className="flex-1 min-w-[200px] py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    <Phone size={16} /> Book appointment
                  </a>
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={resetScreening}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-450 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <RefreshCw size={12} /> Restart screening
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <FooterEn />
    </div>
  );
}
