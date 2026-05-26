/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NavigationTab = "Home" | "Story" | "Products" | "Help" | "Support";

export interface ProstheticProduct {
  id: string;
  name: string;
  category: "Upper Limb" | "Lower Limb";
  tagline: string;
  description: string;
  features: string[];
  batteryLife: string;
  weight: string;
  material: string;
  availableColors: { name: string; hex: string }[];
}

export interface AppointmentInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  limbType: "Below Elbow" | "Above Elbow" | "Below Knee" | "Above Knee";
  customMessage: string;
  status: "Scheduled" | "Approved" | "Contacting";
  appointmentDate: string;
}

export interface DiagnosticState {
  isConnected: boolean;
  batteryLevel: number;
  firmwareVersion: string;
  electrodes: { name: string; value: number; status: "optimal" | "warning" | "error" }[];
  activeGripMode: string;
  calibrationProgress: number;
}
