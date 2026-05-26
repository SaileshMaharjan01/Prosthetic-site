/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Zap, Radio, Settings, ShieldAlert, Cpu, Hammer, Flame } from "lucide-react";
import { ProstheticProduct } from "../types";

export default function ProductsView() {
  const products: ProstheticProduct[] = [
    {
      id: "apex-hand-v2",
      name: "Apex Hand v2",
      category: "Upper Limb",
      tagline: "Ultra-dexterous multi-grip neural bionic hand",
      description: "Equipped with high-precision miniature DC coreless motors on each finger and active thumb pivot. Senses minor forearm tension through 12-channel surface EMG arrays to select and apply fine grip patterns.",
      features: [
        "12 distinct programmable grip configurations",
        "Pliant silicone grip pads for secure handling of glass or keys",
        "Dynamic self-governing crush protection",
        "Dual-axis motorized thumb pivot"
      ],
      batteryLife: "18 Hours (Full Active Use)",
      weight: "430 grams (Lighter than natural hand)",
      material: "Aerospace Titanium Core & High-Impact Polycarbonate Shell",
      availableColors: [
        { name: "Stealth Obsidian", hex: "#18181b" },
        { name: "Bionic Cobalt", hex: "#1d4ed8" },
        { name: "Apex Purple", hex: "#7c3aed" },
        { name: "Fighter Gold", hex: "#d97706" }
      ]
    },
    {
      id: "titan-leg-v4",
      name: "Zephyr Kinetic Leg v4",
      category: "Lower Limb",
      tagline: "Active micro-step carbon running & walking limb",
      description: "Designed for those who run, hike, and refuse to sit still. Incorporates state-of-the-art hydraulic assist cylinders and a springy carbon fiber curve plate to recycle dynamic energy into a clean mechanical spring step.",
      features: [
        "Self-charging kinetic energy harvesting",
        "Active terrain pitch slope sensor integration",
        "Sub-millisecond hydraulic pressure calibration",
        "Mud-proof and fully submersible (IP69K rating)"
      ],
      batteryLife: "36 Hours (Kinetic Self-charging assist)",
      weight: "1.1 kg (Includes shock absorber suite)",
      material: "Pre-preg Carbon Fiber & Aircraft-grade 7075 Aluminium Alloys",
      availableColors: [
        { name: "Carbon Weave", hex: "#27272a" },
        { name: "Kinetic Lime", hex: "#22c55e" },
        { name: "Impact Red", hex: "#dc2626" },
        { name: "Silver Frost", hex: "#94a3b8" }
      ]
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState<ProstheticProduct>(products[0]);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(
    products[0].availableColors[0]
  );

  const handleProductChange = (prod: ProstheticProduct) => {
    setSelectedProduct(prod);
    setSelectedColor(prod.availableColors[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      {/* Tab Header Selector */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-8">
        <div>
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">Bionic Catalogue</span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-1">
            Engineered Bionic Range
          </h2>
        </div>

        {/* Product Toggle Buttons */}
        <div className="flex bg-zinc-900/80 p-1 border border-zinc-800 rounded-xl">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProductChange(p)}
              className={`px-4 py-2 rounded-lg text-xs font-display font-medium transition-all duration-200 cursor-pointer ${
                selectedProduct.id === p.id
                  ? "bg-blue-500 text-white shadow"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {p.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main product showcase split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* LEFT COLUMN: Graphic Configuration Preview (Pure black placeholder with customizable colors!) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden">
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px)] opacity-5 pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Live Mock Shader
            </span>
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-blue-400">
              <Radio className="h-3 w-3 animate-pulse" />
              SENSING ACTIVE
            </div>
          </div>

          {/* Render Vector Bionic Shell based on active product */}
          <div className="my-10 flex items-center justify-center relative">
            <div
              className="absolute inset-0 rounded-full blur-[80px] opacity-10 transition-all duration-500"
              style={{ backgroundColor: selectedColor.hex }}
            />

            {selectedProduct.id === "apex-hand-v2" ? (
              // Bionic Hand Vector Layout
              <svg viewBox="0 0 100 100" className="w-48 h-48 text-zinc-800 transition-colors duration-300">
                {/* Metacarpal bones backplate with selected color accent */}
                <rect x="35" y="45" width="30" height="28" rx="6" fill="#18181b" stroke="#27272a" strokeWidth="1" />
                
                {/* Selected Color Shell overlay */}
                <path
                  d="M 38 48 Q 50 42 62 48 L 60 68 Q 50 72 40 68 Z"
                  fill={`${selectedColor.hex}22`}
                  stroke={selectedColor.hex}
                  strokeWidth="1.5"
                  className="transition-colors duration-500"
                />

                {/* Wrist assembly */}
                <circle cx="50" cy="82" r="8" fill="#09090b" stroke="#27272a" strokeWidth="1" />
                <path d="M 45 82 L 40 95 L 60 95 L 55 82 Z" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />

                {/* Finger links with selected accent pivots */}
                {/* Index */}
                <line x1="40" y1="45" x2="38" y2="25" stroke="#3f3f46" strokeWidth="2" />
                <circle cx="38" cy="25" r="2.5" fill={selectedColor.hex} />
                {/* Middle */}
                <line x1="47" y1="44" x2="47" y2="20" stroke="#3f3f46" strokeWidth="2" />
                <circle cx="47" cy="20" r="2.5" fill={selectedColor.hex} />
                {/* Ring */}
                <line x1="53" y1="44" x2="55" y2="22" stroke="#3f3f46" strokeWidth="2" />
                <circle cx="55" cy="22" r="2.5" fill={selectedColor.hex} />
                {/* Pinky */}
                <line x1="60" y1="47" x2="64" y2="28" stroke="#3f3f46" strokeWidth="2" />
                <circle cx="64" cy="28" r="2.5" fill={selectedColor.hex} />
                {/* Motor Thumb */}
                <path d="M 35 60 Q 22 56 18 42" fill="none" stroke="#3f3f46" strokeWidth="2" />
                <circle cx="18" cy="42" r="3.5" fill={selectedColor.hex} />
              </svg>
            ) : (
              // Bionic Leg Vector Layout
              <svg viewBox="0 0 100 100" className="w-48 h-48 text-zinc-800 transition-colors duration-300">
                {/* Socket top rim */}
                <ellipse cx="50" cy="15" rx="16" ry="6" fill="#18181b" stroke="#27272a" strokeWidth="1" />
                
                {/* Structural carbon socket */}
                <path
                  d="M 34 15 Q 36 34 45 45 L 55 45 Q 64 34 66 15 Z"
                  fill={`${selectedColor.hex}22`}
                  stroke={selectedColor.hex}
                  strokeWidth="1.5"
                  className="transition-colors duration-500"
                />

                {/* Central pylon piston */}
                <line x1="50" y1="45" x2="50" y2="72" stroke="#3f3f46" strokeWidth="3" />
                <rect x="47" y="52" width="6" height="12" fill="#52525b" stroke="#71717a" strokeWidth="0.5" />

                {/* Active Hydraulic ankle node selector */}
                <circle cx="50" cy="74" r="5" fill="#18181b" stroke={selectedColor.hex} strokeWidth="1.5" />

                {/* Spring runner carbon blade feet */}
                <path
                  d="M 50 78 C 30 80 25 88 56 94"
                  fill="none"
                  stroke={selectedColor.hex}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-colors duration-500"
                />
              </svg>
            )}
          </div>

          {/* Interactive Shell Swatches Selection */}
          <div className="border-t border-zinc-900 pt-4">
            <p className="text-xs font-mono text-zinc-400 mb-2">Configure Outer Armor Finish:</p>
            <div className="flex gap-2">
              {selectedProduct.availableColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`relative flex items-center justify-center h-8 w-8 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                    selectedColor.name === color.name ? "border-white scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor.name === color.name && (
                    <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  )}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10px] font-mono text-zinc-500">
              Active Selection: <span className="text-zinc-300">{selectedColor.name}</span>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Performance Specs & Features */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8 bg-zinc-900/30 border border-zinc-800 p-6 md:p-8 rounded-2xl">
          <div>
            <span className="text-xs font-mono text-blue-400 font-semibold">{selectedProduct.category}</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-1 leading-tight">
              {selectedProduct.name}
            </h3>
            <p className="text-sm text-zinc-400 mt-2 font-light">
              {selectedProduct.tagline}
            </p>

            <p className="text-sm text-zinc-300 mt-5 leading-relaxed font-light">
              {selectedProduct.description}
            </p>

            {/* List key advantages */}
            <div className="mt-6 space-y-3">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Features & Capabilites:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProduct.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span className=" leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Engineering Specifications Panel */}
          <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-6">
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Weight Grade</p>
              <p className="text-xs font-medium text-white font-display mt-0.5">{selectedProduct.weight}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Active Battery</p>
              <p className="text-xs font-medium text-white font-display mt-0.5">{selectedProduct.batteryLife}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Primary Material</p>
              <p className="text-xs font-medium text-white font-display mt-0.5 truncate" title={selectedProduct.material}>
                {selectedProduct.material.split(" & ")[0]}
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
