/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Shield, Zap, Activity, Award, ArrowRight, CheckCircle } from "lucide-react";

import { NavigationTab } from "../types";

interface HeroViewProps {
  key?: string;
  onNavigate: (tab: NavigationTab) => void;
}

export default function HeroView({ onNavigate }: HeroViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-12 w-full gap-12 max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16 items-center"
    >
      {/* Left Column: Copy */}
      <div className="lg:col-span-7 flex flex-col justify-end text-left">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 text-blue-500 font-semibold tracking-tighter text-sm"
        >
          <span className="w-8 h-[1px] bg-blue-500"></span>
          SEEN ON SHARK TANK INDIA
        </motion.div>

        <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] leading-[0.88] font-black tracking-tighter mb-6 text-white uppercase">
          SIMPLE.<br />SMART.<br /><span className="text-blue-500">RESILIENT.</span>
        </h1>

        <p className="max-w-xl text-neutral-400 text-base md:text-lg leading-relaxed mb-8">
          Simple, smart bionic prosthetics engineered for people who refuse to stop fighting. Light, intuitive, and built with military-grade carbon weave and active 12-channel surface muscle calibration.
        </p>

        <div className="flex flex-wrap gap-4 items-center mb-10">
          <button
            onClick={() => onNavigate("Help")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-600/20"
          >
            Try a Free Fitting
          </button>
          <button
            onClick={() => onNavigate("Products")}
            className="border border-neutral-700 hover:border-neutral-500 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all cursor-pointer bg-neutral-900/40 hover:bg-neutral-900"
          >
            Explore Bionic Range
          </button>
        </div>

        {/* Highlight points in editorial wireframe boxes */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-t border-neutral-900 pt-8 max-w-xl">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900/60 border border-neutral-800 text-blue-500">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-200">Neural Grip Adapt</p>
              <p className="text-[10px] text-neutral-500 font-mono">12-Channel EMG Sensors</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900/60 border border-neutral-800 text-blue-500">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-200">Aerospace Carbons</p>
              <p className="text-[10px] text-neutral-500 font-mono">Vacuum Laser Sintered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Area with bionic telemetry representation */}
      <div className="lg:col-span-5 w-full flex flex-col justify-end">
        
        {/* Schematic Box */}
        <div className="relative w-full aspect-square bg-neutral-950 border border-neutral-900 rounded-3xl p-6 overflow-hidden flex flex-col justify-between">
          
          {/* Subtle design grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
          
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 text-[10px] font-mono whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-neutral-500 uppercase tracking-widest">Model Link / EMG-X1</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-600">SYS_REV_2026</span>
          </div>

          {/* Incredible dynamic SVG bionic wireframe */}
          <div className="my-auto py-4 flex items-center justify-center relative z-10 select-none">
            <svg viewBox="0 0 200 200" className="w-56 h-56 text-neutral-800">
              {/* Circular scanner rings of Editorial system */}
              <motion.circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              />

              <motion.circle
                cx="100"
                cy="100"
                r="68"
                fill="none"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="1"
                strokeDasharray="80 30 10 30"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              />

              {/* Central components */}
              <path d="M 50 160 Q 70 140 100 140 Q 130 140 150 160 Z" fill="rgba(23, 23, 23, 0.7)" stroke="currentColor" strokeWidth="1" />
              <line x1="100" y1="140" x2="100" y2="105" stroke="currentColor" strokeWidth="1.5" />
              
              <circle cx="100" cy="105" r="12" fill="#000000" stroke="#3b82f6" strokeWidth="1.5" />
              <circle cx="100" cy="105" r="4" fill="#3b82f6" />

              {/* Finger lines representing electrical telemetry */}
              <path d="M 90 98 Q 72 90 60 76" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="60" cy="76" r="3" fill="#3b82f6" />

              <path d="M 96 95 Q 85 64 85 40" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="85" cy="40" r="2" fill="currentColor" />

              <path d="M 100 93 Q 100 60 100 32" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="1.5" />
              <circle cx="100" cy="32" r="3" fill="#3b82f6" />

              <path d="M 104 95 Q 115 64 115 42" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="115" cy="42" r="2" fill="currentColor" />
            </svg>

            {/* Float values boxes */}
            <div className="absolute top-2 right-2 bg-neutral-900/90 border border-neutral-800 rounded px-2 py-0.5 text-[8px] font-mono text-neutral-400 uppercase tracking-widest">
              X-1 Phantom
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-neutral-900 pt-4 z-10 font-mono text-[9px] text-neutral-600">
            <span>SYS: INTU_LOCK_V1</span>
            <span className="text-emerald-500 font-bold uppercase tracking-wide">Ready for Calibration</span>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
