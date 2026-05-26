/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Radio, Battery, Activity, Cpu, RotateCw, CheckCircle, RefreshCw } from "lucide-react";
import { DiagnosticState } from "../types";

export default function SupportView() {
  const [diag, setDiag] = useState<DiagnosticState>({
    isConnected: true,
    batteryLevel: 94,
    firmwareVersion: "bionic-v2.8.4",
    electrodes: [
      { name: "CH-1 Upper Brachial", value: 45, status: "optimal" },
      { name: "CH-2 Median Nerve", value: 68, status: "optimal" },
      { name: "CH-3 Radial Intercept", value: 12, status: "optimal" },
      { name: "CH-4 Flexor Carpi", value: 85, status: "optimal" }
    ],
    activeGripMode: "Precision Pinch",
    calibrationProgress: 100
  });

  const gripModes = [
    { name: "Precision Pinch", desc: "Delicate thumb-to-index micro hold for pens or needles (High-frequency feedback)", activeChs: [40, 75, 15, 20] },
    { name: "Power Cylindrical", desc: "Full closed fist pressure hold for cups, bars, or dumbbells", activeChs: [85, 90, 80, 85] },
    { name: "Pointer Extension", desc: "Extended index finger with locked digits for screen clicking", activeChs: [10, 65, 90, 15] },
    { name: "Lateral Key Hold", desc: "Heavy mechanical side-thumb press for locks or papers", activeChs: [55, 30, 45, 70] }
  ];

  const [calibrating, setCalibrating] = useState(false);
  const [calibProgress, setCalibProgress] = useState(100);

  // Trigger calibration routine simulation
  const handleCalibrate = () => {
    if (calibrating) return;
    setCalibrating(true);
    setCalibProgress(0);
  };

  useEffect(() => {
    if (calibrating) {
      const interval = setInterval(() => {
        setCalibProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setCalibrating(false);
            // Randomize electrode tension values after calibrating
            setDiag((d) => ({
              ...d,
              electrodes: d.electrodes.map((el) => ({
                ...el,
                value: Math.floor(Math.random() * 60 + 20)
              }))
            }));
            return 100;
          }
          return prev + 5;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [calibrating]);

  // Adjust channel values slightly when choosing a specific grip to represent electrical muscle signals
  const selectGrip = (gripName: string, channels: number[]) => {
    setDiag((prev) => ({
      ...prev,
      activeGripMode: gripName,
      electrodes: prev.electrodes.map((el, index) => ({
        ...el,
        value: channels[index] || 50
      }))
    }));
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
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
          Smart Companion & Maintenance
        </span>
        <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Live Bionic Diagnostics
        </h2>
        <p className="mt-3 text-sm text-zinc-400 font-light">
          We configure each device with internal Bluetooth telemetry. Test the active companion dashboard below to calibrate surface neural electrodes and customize grip tension mapping.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Connection status & Muscle sensors telemetry */}
        <div className="lg:col-span-7 bg-zinc-900/30 border border-zinc-800 p-6 md:p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 block" />
                  <span className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-500 animate-ping opacity-70" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white font-display">Bluetooth Online</h3>
                  <p className="text-[10px] text-zinc-500 font-mono">ID: APEX_H_2408</p>
                </div>
              </div>

              {/* Connected details */}
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Battery className="h-4 w-4 text-emerald-400" />
                  <span>{diag.batteryLevel}%</span>
                </div>
                <span>FW: {diag.firmwareVersion}</span>
              </div>
            </div>

            {/* Electrode Channels Live feedback sliders */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                <span>Surface Myoelectric Channels (Live Input)</span>
                <span className="text-[9px] text-zinc-500 lowercase">(tension value microvolt)</span>
              </h4>

              {diag.electrodes.map((el) => (
                <div key={el.name} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-zinc-300">{el.name}</span>
                    <span className={el.value > 80 ? "text-amber-400" : "text-blue-400"}>
                      {el.value} μV
                    </span>
                  </div>
                  {/* Visual microvolt slider */}
                  <div className="bg-zinc-950 h-2 w-full rounded-full overflow-hidden border border-zinc-904/40">
                    <motion.div
                      className={`h-full rounded-full transition-all duration-300 ${
                        el.value > 80 ? "bg-amber-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${el.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trigger calibration panel */}
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-white font-display">Electrode Muscle Calibration</p>
              <p className="text-[10px] text-zinc-400 font-light max-w-xs">
                Rest your forearm and perform continuous fist clenching to realign high-gain sensors.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              {calibrating && (
                <div className="text-[10px] font-mono text-blue-400">
                  {calibProgress}%
                </div>
              )}
              <button
                type="button"
                onClick={handleCalibrate}
                disabled={calibrating}
                className="inline-flex items-center justify-center gap-1.5 font-semibold text-xs rounded-lg px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`h-3 w-3 ${calibrating ? "animate-spin text-blue-400" : ""}`} />
                {calibrating ? "Aligning..." : "Calibrate Sensors"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Grip mode select tracker */}
        <div className="lg:col-span-5 bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-white mb-1 flex items-center gap-2">
              <Cpu className="h-4.5 w-4.5 text-blue-400" />
              Grip Target Presets
            </h3>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide border-b border-zinc-800 pb-3 mb-4">
              CHOOSE A MODE TO TARGET MICRO-MOTORS
            </p>

            <div className="space-y-2.5">
              {gripModes.map((grip) => {
                const isActive = diag.activeGripMode === grip.name;
                return (
                  <button
                    key={grip.name}
                    onClick={() => selectGrip(grip.name, grip.activeChs)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-blue-500/10 border-blue-500 text-white shadow-md shadow-blue-500/5"
                        : "bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-display">{grip.name}</span>
                      {isActive && (
                        <span className="text-[9px] font-mono text-blue-400 font-semibold uppercase bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                          Engaged
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-light">
                      {grip.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick specs notice */}
          <div className="border-t border-zinc-800 pt-4 mt-6 flex items-center gap-2.5 text-[10px] font-mono text-zinc-500">
            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Telemetry certified with AES-256 secure local connection</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
