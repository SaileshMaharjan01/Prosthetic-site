/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, UserPlus, Menu, X, Home } from "lucide-react";
import Logo from "./components/Logo";
import HeroView from "./components/HeroView";
import StoryView from "./components/StoryView";
import ProductsView from "./components/ProductsView";
import HelpView from "./components/HelpView";
import SupportView from "./components/SupportView";
import { NavigationTab } from "./types";
// @ts-ignore
import robotArmLight from "./assets/images/robot_arm_light_1779809932480.png";
// @ts-ignore
import robotArmDark from "./assets/images/robot_arm_dark_1779809952695.png";

const navItems = [
  { id: "Home" as NavigationTab, label: "Home" },
  { id: "Story" as NavigationTab, label: "Purpose" },
  { id: "Products" as NavigationTab, label: "Products" },
  { id: "Support" as NavigationTab, label: "Diagnostics" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPullingDown, setIsPullingDown] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Custom function to navigate to tab with visual scroll back
  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleThemeToggle = () => {
    setIsPullingDown(true);
    setTimeout(() => {
      setIsDarkMode(prev => !prev);
      setTimeout(() => {
        setIsPullingDown(false);
      }, 50);
    }, 300); // 300ms matches pull transition
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white flex flex-col justify-between selection:bg-blue-600 selection:text-white pb-6 scroll-smooth">
      
      {/* Hero background container with requested blur effect and crossfade transitions */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <div className="blur-overlay blur-overlay-top" />
        <div className="blur-overlay blur-overlay-bottom" />
        
        {/* Day Background (White) */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-1000 ease-in-out ${
            isPullingDown ? "pull-down" : "bg-front"
          }`}
          style={{ 
            backgroundImage: `url(${robotArmLight})`,
            opacity: isDarkMode ? 0 : 1,
            zIndex: isDarkMode ? 0 : 1
          }}
        />
        
        {/* Night Background (Black) */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-1000 ease-in-out ${
            isPullingDown ? "pull-down" : "bg-front"
          }`}
          style={{ 
            backgroundImage: `url(${robotArmDark})`,
            opacity: isDarkMode ? 1 : 0,
            zIndex: isDarkMode ? 1 : 0
          }}
        />
      </div>

      {/* Vertical Rail Text from Editorial Theme */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[9px] tracking-[0.45em] text-white/50 uppercase select-none pointer-events-none z-20">
        Engineering Resilience — Since 2024
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        
        {/* Top Header Navigation using the high-end LinkFlow pill-island design adapted for dark theme */}
        <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between gap-4 z-30">
          
          {/* Logo Brand with elegant TM superscript */}
          <button
            onClick={() => handleTabChange("Home")}
            className="flex items-center gap-3 text-white focus:outline-none group cursor-pointer"
            title="Go to Home"
          >
            <div className="bg-neutral-200 p-1.5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Logo size={14} fill="rgb(84, 84, 84)" />
            </div>
            <div className="text-left">
              <span className="block font-display text-sm font-bold tracking-tight text-neutral-200">
                Aurosthetics<sup className="text-[10px] font-medium ml-0.5">TM</sup>
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-neutral-500 uppercase">Smart Systems</span>
            </div>
          </button>

          {/* Desktop Nav: Pill Island design integrated beautifully */}
          <div className="hidden lg:flex items-center gap-1 bg-neutral-900/50 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-md border border-neutral-800">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`text-xs uppercase tracking-widest px-4 py-2 transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? "font-bold text-white bg-neutral-800/80 rounded-full px-4"
                    : "font-medium text-neutral-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => handleTabChange("Help")}
              className={`ml-2 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors cursor-pointer ${
                activeTab === "Help" ? "bg-blue-500" : "bg-blue-600"
              }`}
            >
              Try fitting
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-6 text-neutral-300 z-30">
            {/* Skeuomorphic Glassy Theme Toggle matching user's reference image exactly */}
            <div className="flex items-center justify-center py-2">
              <button
                onClick={handleThemeToggle}
                className="relative flex items-center h-10 w-28 rounded-full glossy-toggle-track cursor-pointer select-none transition-all duration-300"
                style={{
                  borderColor: isDarkMode ? 'var(--active-toggle)' : 'rgba(255,255,255,0.18)',
                  boxShadow: isDarkMode ? '0 0 15px rgba(245, 248, 234, 0.45), inset 0 3px 6px rgba(0, 0, 0, 0.4)' : undefined
                }}
                title={isDarkMode ? "Switch to daylight mode" : "Switch to night mode"}
              >
                {/* Glass Slider Track Inside Labels */}
                <div className="absolute inset-0 flex items-center justify-between px-3.5 pointer-events-none select-none text-[10px] sm:text-xs font-semibold tracking-tight">
                  <span className={`text-white transition-all duration-500 absolute right-4 uppercase tracking-[0.05em] ${isDarkMode ? 'opacity-0 translate-x-3 scale-75' : 'opacity-95 translate-x-0 scale-100 font-bold text-neutral-100'}`}>
                    Light
                  </span>
                  <span className={`text-neutral-200 transition-all duration-500 absolute left-4 uppercase tracking-[0.05em] ${isDarkMode ? 'opacity-95 translate-x-0 scale-100 font-bold' : 'opacity-0 -translate-x-3 scale-75'}`}>
                    Dark
                  </span>
                </div>
                
                {/* Sliding bulb/knob with skeuomorphic 3D glass gloss and glare reflection, larger than track */}
                <motion.div
                  animate={{ x: isDarkMode ? 60 : 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 24 }}
                  className="absolute left-[2px] top-1/2 -translate-y-1/2 z-11 flex items-center justify-center w-11 h-11 rounded-full glossy-toggle-knob cursor-pointer transition-shadow"
                >
                  {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-sky-200 drop-shadow-[0_0_8px_rgba(186,230,253,0.85)]">
                      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 1 1-16.941-11.97.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-yellow-350 drop-shadow-[0_0_10px_rgba(253,224,71,0.9)]">
                      <circle cx={12} cy={12} r={4} fill="rgba(253,224,71,0.4)" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.72-12.72l-1.41 1.41" />
                    </svg>
                  )}
                </motion.div>
              </button>
            </div>

            <button
              onClick={() => handleTabChange("Help")}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:text-white transition-opacity cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-blue-500" />
              Sign Me Up
            </button>

            <button
              onClick={() => handleTabChange("Support")}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:text-white transition-opacity cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-blue-500" />
              Enter Simulation
            </button>

            {/* Mobile Toggle Drawer */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900/70 backdrop-blur-md border border-neutral-800 text-white transition-all duration-300 hover:bg-neutral-800 cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <Menu
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  menuOpen
                    ? "opacity-0 rotate-90 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />

              <X
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  menuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </button>
          </div>
        </header>

        {/* Mobile Overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>

        {/* Mobile Drawer */}
        <div
          className={`lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-neutral-950/95 border-l border-neutral-900 shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-28 px-8 pb-8">
            <div className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`text-xl font-semibold text-left py-4 border-b border-neutral-900 hover:text-blue-400 transition-all duration-300 cursor-pointer ${
                    activeTab === item.id ? "text-blue-500" : "text-neutral-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Mode Changer Drawer Entry */}
              <div className="py-5 border-b border-neutral-900 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-neutral-200">Simulation Lighting</span>
                  <span className="block text-[9px] font-mono tracking-wider text-neutral-500 uppercase mt-0.5">Physical Day/Night</span>
                </div>
                <button
                  onClick={handleThemeToggle}
                  className="relative flex items-center h-10 w-28 rounded-full glossy-toggle-track cursor-pointer select-none transition-all duration-300"
                  style={{
                    borderColor: isDarkMode ? 'var(--active-toggle)' : 'rgba(255,255,255,0.18)',
                    boxShadow: isDarkMode ? '0 0 15px rgba(245, 248, 234, 0.45), inset 0 3px 6px rgba(0, 0, 0, 0.4)' : undefined
                  }}
                  title={isDarkMode ? "Switch to daylight mode" : "Switch to night mode"}
                >
                  {/* Glass Slider Track Inside Labels */}
                  <div className="absolute inset-0 flex items-center justify-between px-3.5 pointer-events-none select-none text-[10px] font-semibold tracking-tight">
                    <span className={`text-white transition-all duration-500 absolute right-4 uppercase tracking-[0.05em] ${isDarkMode ? 'opacity-0 translate-x-3 scale-75' : 'opacity-95 translate-x-0 scale-100 font-bold text-neutral-100'}`}>
                      Light
                    </span>
                    <span className={`text-neutral-200 transition-all duration-500 absolute left-4 uppercase tracking-[0.05em] ${isDarkMode ? 'opacity-95 translate-x-0 scale-100 font-bold' : 'opacity-0 -translate-x-3 scale-75'}`}>
                      Dark
                    </span>
                  </div>
                  
                  {/* Sliding bulb/knob with skeuomorphic 3D glass gloss and glare reflection */}
                  <motion.div
                    animate={{ x: isDarkMode ? 60 : 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 24 }}
                    className="absolute left-[2px] top-1/2 -translate-y-1/2 z-11 flex items-center justify-center w-11 h-11 rounded-full glossy-toggle-knob cursor-pointer transition-shadow"
                  >
                    {isDarkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-sky-200 drop-shadow-[0_0_8px_rgba(186,230,253,0.85)]">
                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 1 1-16.941-11.97.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-yellow-350 drop-shadow-[0_0_10px_rgba(253,224,71,0.9)]">
                        <circle cx={12} cy={12} r={4} fill="rgba(253, 224, 71, 0.4)" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.72-12.72l-1.41 1.41" />
                      </svg>
                    )}
                  </motion.div>
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-5">
              <button
                onClick={() => handleTabChange("Help")}
                className="flex items-center gap-3 text-sm font-semibold text-neutral-300 hover:text-white text-left cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-blue-500" />
                Sign Me Up / Fit Consultation
              </button>

              <button
                onClick={() => handleTabChange("Support")}
                className="flex items-center gap-3 text-sm font-semibold text-neutral-300 hover:text-white text-left cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-blue-500" />
                Enter Telemetry Simulation
              </button>

              <button
                onClick={() => handleTabChange("Help")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-full transition-colors cursor-pointer text-center"
              >
                Try live fitting
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Container Area */}
        <main className="flex-1 flex flex-col justify-center items-center py-4 px-4 sm:px-8">
          <AnimatePresence mode="wait">
            {activeTab === "Home" && (
              <HeroView key="home-key" onNavigate={handleTabChange} />
            )}
            {activeTab === "Story" && (
              <StoryView key="story-key" />
            )}
            {activeTab === "Products" && (
              <ProductsView key="products-key" />
            )}
            {activeTab === "Help" && (
              <HelpView key="help-key" />
            )}
            {activeTab === "Support" && (
              <SupportView key="support-key" />
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Footer Rail combining stats & customizable simulation actions */}
        <footer className="w-full max-w-7xl mx-auto px-6 md:px-12 py-8 border-t border-neutral-900/80 flex flex-col md:flex-row justify-between items-center gap-8 mt-12 bg-black/40 backdrop-blur-sm">
          <div className="flex flex-wrap gap-10 md:gap-16">
            <div>
              <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-1 font-mono">Weight Capacity</p>
              <p className="text-xs font-mono text-neutral-300">1.2 KG / ULTRA-LITE</p>
            </div>
            <div>
              <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-1 font-mono">Battery Endurance</p>
              <p className="text-xs font-mono text-neutral-300">48H ACTIVE CHARGE</p>
            </div>
            <div>
              <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-1 font-mono">Active Controller</p>
              <p className="text-xs font-mono text-neutral-300">NEURO-SYNC v4.0</p>
            </div>
          </div>
          
          <div className="text-center md:text-right space-y-2">
            <p className="text-[9px] tracking-wider text-neutral-500 font-mono uppercase">
              2026 AUROSTHETICS LABS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex justify-center md:justify-end gap-3 text-[10px] text-neutral-400 font-mono">
              <button onClick={() => handleTabChange("Story")} className="hover:text-blue-400 transition-colors">Science</button>
              <span>•</span>
              <button onClick={() => handleTabChange("Help")} className="hover:text-blue-400 transition-colors">Fitting</button>
              <span>•</span>
              <button onClick={() => handleTabChange("Support")} className="hover:text-blue-400 transition-colors">Companion Dashboard</button>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
