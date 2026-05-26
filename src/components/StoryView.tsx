/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Check, ShieldCheck, Cpu, Eye, Users } from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

export default function StoryView() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const milestones: Milestone[] = [
    {
      id: 0,
      title: "1. Residual 3D Scan",
      subtitle: "Done from anywhere inside 5 minutes",
      description: "No plaster casts, no heavy travel. Complete a simple video scan of your residual limb using any modern smartphone camera. Our system creates a high-density 3D photogrammetry surface map with sub-millimeter precision.",
      icon: <Eye className="h-5 w-5" />
    },
    {
      id: 1,
      title: "2. Load-Adapted AI Sockets",
      subtitle: "Tailored comfortable socket design",
      description: "Every body is built differently. Our proprietary algorithmic model analyzes tissue load lines to craft a socket blueprint that redistributes force patterns evenly, entirely eliminating hot spots and chafing.",
      icon: <Cpu className="h-5 w-5" />
    },
    {
      id: 2,
      title: "3. Direct Carbon-Weave Printing",
      subtitle: "Aerospace light, battlefield strong",
      description: "We use professional selective laser sintering with aerospace-grade carbon fiber fill. The results are incredibly sleek, waterproof shells that weigh less than regular footwear while handling heavy athletic exertion.",
      icon: <ShieldCheck className="h-5 w-5" />
    },
    {
      id: 3,
      title: "4. Neural Calibration",
      subtitle: "Intuitive bionic response",
      description: "Slip it on. Our sensitive 12-channel EMG electrode system registers even subtle muscle flutters. Use our companion app to map custom muscle signals directly into specific hand grips or foot pivots in real-time.",
      icon: <Flame className="h-5 w-5" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      {/* Narrative Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
          Our Core Mission
        </span>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Made for those who keep fighting
        </h2>
        <p className="mt-4 text-base text-zinc-400 font-light leading-relaxed">
          Standard prosthetics are either too primitive and heavy, or incredibly expensive. We set out to change this after experiencing the problem firsthand. Featured on **Shark Tank India**, we've built a scalable technology stack to assemble durable, smart, custom-fit prosthetics at a fraction of standard healthcare costs.
        </p>
      </div>

      {/* Interactive Core Advantage Feature Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-medium text-white mb-2">Patient-First Care</h3>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Every step is guided by experienced clinical prosthetists working in unison with software engineers to perfect your customized fit.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
            <Flame className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-medium text-white mb-2">Designed for Action</h3>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Waterproof shells, heavy shock dampers, and long-lasting modular batteries. Build to hold dumbbells, ride bikes, and walk on uneven terrain.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-medium text-white mb-2">Smart Muscle Intercept</h3>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Onboard processor senses muscle firing signals and intelligently identifies intentions, letting you open/close grips in fractions of a second.
          </p>
        </div>
      </div>

      {/* The Journey Section - Interactive Stepper */}
      <div className="bg-zinc-900/25 border border-zinc-800/80 rounded-3xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-zinc-800/60 gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-white">The Fitting Journey</h3>
            <p className="text-xs text-zinc-500 font-mono mt-1">HOW WE DELIVER A PERFECT FIT IN UNDER A WEEK</p>
          </div>

          {/* Buttons indicators */}
          <div className="flex flex-wrap gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800/80">
            {milestones.map((m, index) => (
              <button
                key={m.id}
                onClick={() => setActiveStage(index)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                  activeStage === index
                    ? "bg-blue-500 text-white font-medium"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Stage {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Content detail with animation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
              {milestones[activeStage].subtitle}
            </span>

            <h4 className="font-display text-2xl font-bold text-white tracking-tight">
              {milestones[activeStage].title}
            </h4>

            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              {milestones[activeStage].description}
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <Check className="h-4 w-4 text-emerald-500" /> Fully remote options available
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <Check className="h-4 w-4 text-emerald-500" /> Approved by active amputee focus groups
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs aspect-square rounded-2xl border border-zinc-800 bg-zinc-950/80 flex flex-col items-center justify-center p-8 overflow-hidden group">
              {/* Spinning background rings */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 pointer-events-none" />
              <div className="absolute -inset-10 bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />

              {/* Dynamic animated icon */}
              <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 mb-6 relative z-10 shadow-lg shadow-black">
                {milestones[activeStage].icon}
              </div>

              {/* Blueprint aesthetic illustration */}
              <div className="w-full h-16 relative flex items-center justify-center border-t border-dashed border-zinc-800 pt-4 mt-2">
                <div className="absolute left-1/2 top-4 -translate-x-1/2 w-32 border-b border-blue-500/30 font-mono text-[9px] text-blue-500/70 text-center pb-1">
                  DIMENSION SYNC
                </div>
                <div className="flex justify-between w-full font-mono text-[8px] text-zinc-600 px-4">
                  <span>X: {((activeStage + 1) * 31.5).toFixed(1)}mm</span>
                  <span>Y: {((activeStage + 2) * 44.8).toFixed(1)}mm</span>
                </div>
              </div>

              {/* Simulated scan green line */}
              {activeStage === 0 && (
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-blue-500/60 shadow-lg shadow-blue-500"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                />
              )}
              {activeStage === 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 border border-purple-500/20 rounded-full animate-ping pointer-events-none" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
