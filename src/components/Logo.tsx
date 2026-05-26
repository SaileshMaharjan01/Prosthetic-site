/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react"

interface LogoProps {
  className?: string;
  size?: number | string;
  fill?: string;
}

export default function Logo({ className = "", size = 20, fill = "#ffffff" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill={fill}
        d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
      />
    </svg>
  );
}
