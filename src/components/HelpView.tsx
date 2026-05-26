/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ClipboardList, Send, Calendar, Clock, Smile, Sparkles, X } from "lucide-react";
import { AppointmentInquiry } from "../types";

export default function HelpView() {
  const [appointments, setAppointments] = useState<AppointmentInquiry[]>([]);
  
  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [limbType, setLimbType] = useState<"Below Elbow" | "Above Elbow" | "Below Knee" | "Above Knee">("Below Elbow");
  const [customMessage, setCustomMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState<AppointmentInquiry | null>(null);

  // Load existing registrations from local storage on load
  useEffect(() => {
    const saved = localStorage.getItem("prosthetic_appointments");
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please provide name, email, and phone contact.");
      return;
    }

    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const newInquiry: AppointmentInquiry = {
        id: "AP-" + Math.floor(Math.random() * 90000 + 10000),
        fullName,
        email,
        phone,
        limbType,
        customMessage,
        status: "Scheduled",
        appointmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] // 7 days from now
      };

      const updated = [newInquiry, ...appointments];
      setAppointments(updated);
      localStorage.setItem("prosthetic_appointments", JSON.stringify(updated));
      setJustSubmitted(newInquiry);

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setCustomMessage("");
      setIsSubmitting(false);
    }, 1200);
  };

  const handleDelete = (id: string) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("prosthetic_appointments", JSON.stringify(updated));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
          Get Fitted For Free
        </span>
        <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Request a Personal Consultation
        </h2>
        <p className="mt-3 text-sm text-zinc-400 font-light">
          Fill out the brief form below. Our care team will reach out within 24 hours to schedule a detailed 1-on-1 scan consultation with a licensed clinical prosthetist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Request Registry Form */}
        <div className="lg:col-span-7 bg-zinc-900/30 border border-zinc-800 p-6 md:p-8 rounded-2xl">
          <h3 className="font-display text-lg font-medium text-white mb-6 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-blue-400" />
            Patient Consultation Intake
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-white px-4 py-2.5 rounded-lg outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-white px-4 py-2.5 rounded-lg outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-white px-4 py-2.5 rounded-lg outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1.5">
                  Amputation Target *
                </label>
                <select
                  value={limbType}
                  onChange={(e: any) => setLimbType(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500 text-sm text-zinc-300 px-4 py-2.5 rounded-lg outline-none transition-all"
                >
                  <option value="Below Elbow">Upper: Below Elbow (Bionic Hand)</option>
                  <option value="Above Elbow">Upper: Above Elbow</option>
                  <option value="Below Knee">Lower: Below Knee (Kinetic Foot)</option>
                  <option value="Above Knee">Lower: Above Knee</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1.5">
                Tell us your story / core athletic goals
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={4}
                placeholder="What movements or hobbies do you want to reclaim? Let our team know how we can tailor your shell load fits."
                className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-white px-4 py-2.5 rounded-lg outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition-all cursor-pointer shadow-md"
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" /> Inserting Registration...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Request Free Fit Ticket
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Confirmation Slot, QR & My Registered Tickets */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active generated fitting ticket card (Shown upon submission) */}
          <AnimatePresence mode="wait">
            {justSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-blue-950/20 border-2 border-dashed border-blue-500/50 p-6 rounded-2xl relative overflow-hidden"
              >
                <button
                  onClick={() => setJustSubmitted(null)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                  title="Close receipt"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1.5 text-blue-400 font-mono text-xs mb-3">
                  <Sparkles className="h-4 w-4 animate-bounce" />
                  <span>REGISTRATION CONFIRMED</span>
                </div>

                <h4 className="font-display text-lg font-bold text-white mb-1">
                  Fit Ticket Generated!
                </h4>
                <p className="text-xs text-zinc-400 leading-normal mb-6">
                  Save this slot identification. A care agent will contact you shortly using your registered phone: <span className="text-zinc-200">{justSubmitted.phone}</span>
                </p>

                {/* Simulated QR Code Receipt design */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex gap-4 items-center mb-4">
                  <div className="bg-white p-1 rounded shrink-0">
                    {/* Retro line pattern representing a QR code scan spot */}
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect width="48" height="48" fill="white" />
                      <rect x="2" y="2" width="10" height="10" fill="black" />
                      <rect x="36" y="2" width="10" height="10" fill="black" />
                      <rect x="2" y="36" width="10" height="10" fill="black" />
                      <rect x="18" y="18" width="12" height="12" fill="black" />
                      <path d="M 6 18 H 14 M 6 24 H 36 M 18 30 H 42 M 30 10 H 34 M 42 36 V 42" stroke="black" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 leading-relaxed">
                    <p className="text-white font-semibold">TICKET ID: {justSubmitted.id}</p>
                    <p>TYPE: {justSubmitted.limbType}</p>
                    <p>DATE PROPOSED: {justSubmitted.appointmentDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 mt-2">
                  <Check className="h-3.5 w-3.5" /> Checked against residual constraints
                </div>
              </motion.div>
            ) : (
              <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 text-center space-y-3">
                <div className="h-10 w-10 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-full flex items-center justify-center mx-auto">
                  <Smile className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white font-display">No active Ticket to show</h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    Complete the intake form to register a consultation and print custom ticket slots.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* List of registered fittings in local storage */}
          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
              My Requests / Tickets ({appointments.length})
            </h4>

            {appointments.length === 0 ? (
              <p className="text-xs text-zinc-600 italic font-mono">No previous registrations found on this browser storage.</p>
            ) : (
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {appointments.map((appt) => (
                  <div key={appt.id} className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white font-display">{appt.fullName}</p>
                      <p className="text-[10px] font-mono text-zinc-400 mt-0.5 uppercase">
                        {appt.limbType} • <span className="text-blue-400">{appt.id}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase">
                        Scheduled
                      </span>
                      <button
                        onClick={() => handleDelete(appt.id)}
                        className="text-zinc-600 hover:text-red-400 text-xs transition-colors p-1"
                        title="Cancel this ticket registration"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </motion.div>
  );
}
