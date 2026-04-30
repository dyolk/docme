'use client';

import { motion } from 'framer-motion';

const phases = [
  { id: 'code', label: '编码', sub: 'CODE', x: 40, y: 120, color: '#22d3ee' },
  { id: 'commit', label: '提交', sub: 'COMMIT', x: 140, y: 40, color: '#a78bfa' },
  { id: 'build', label: '构建测试', sub: 'BUILD & TEST', x: 260, y: 40, color: '#f472b6' },
  { id: 'artifact', label: '制品', sub: 'ARTIFACT', x: 380, y: 120, color: '#fb923c' },
  { id: 'deploy', label: '部署', sub: 'DEPLOY', x: 300, y: 200, color: '#34d399' },
  { id: 'runtime', label: '运行', sub: 'RUNTIME', x: 160, y: 200, color: '#60a5fa' },
];

export function DevSecOpsCycle() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 420 260"
        className="w-full h-auto max-w-[420px]"
        style={{ filter: 'drop-shadow(0 0 12px rgba(34,211,238,0.15))' }}
      >
        <defs>
          {/* Glow filter */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for the infinity loop */}
          <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="25%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#f472b6" />
            <stop offset="75%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>

          {/* Gradient for the return path */}
          <linearGradient id="returnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>

          {/* Arrow marker */}
          <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 L2,3 Z" fill="#fb923c" />
          </marker>
          <marker id="arrowCyan" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 L2,3 Z" fill="#22d3ee" />
          </marker>
        </defs>

        {/* Outer faint track for the ∞ shape */}
        <path
          d="M 40 120 
             C 40 40, 140 40, 200 80 
             C 260 120, 340 120, 380 120
             C 420 120, 420 40, 340 40
             C 260 40, 200 80, 140 120
             C 80 160, 40 200, 40 120 Z"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="2"
        />

        {/* Main infinity loop (top half: code -> commit -> build -> artifact) */}
        <path
          id="topLoop"
          d="M 40 120 C 40 40, 140 40, 200 80 C 260 120, 340 120, 380 120"
          fill="none"
          stroke="url(#infinityGrad)"
          strokeWidth="3"
          filter="url(#neonGlow)"
          markerEnd="url(#arrowOrange)"
        />

        {/* Return loop (bottom half: artifact -> deploy -> runtime -> code) */}
        <path
          id="bottomLoop"
          d="M 380 120 C 340 200, 260 200, 200 160 C 140 120, 80 120, 40 120"
          fill="none"
          stroke="url(#returnGrad)"
          strokeWidth="3"
          filter="url(#neonGlow)"
          markerEnd="url(#arrowCyan)"
        />

        {/* Animated traveling dot on top loop */}
        <circle r="4" fill="#fff" filter="url(#neonGlow)">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 40 120 C 40 40, 140 40, 200 80 C 260 120, 340 120, 380 120"
          />
        </circle>

        {/* Animated traveling dot on bottom loop */}
        <circle r="4" fill="#fff" filter="url(#neonGlow)">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            begin="1.5s"
            path="M 380 120 C 340 200, 260 200, 200 160 C 140 120, 80 120, 40 120"
          />
        </circle>

        {/* Phase nodes */}
        {phases.map((p, i) => (
          <g key={p.id}>
            {/* Outer glow ring */}
            <circle cx={p.x} cy={p.y} r="18" fill="none" stroke={p.color} strokeWidth="1" opacity="0.3" />
            <circle cx={p.x} cy={p.y} r="22" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0.15" />
            
            {/* Core node circle */}
            <circle cx={p.x} cy={p.y} r="10" fill={p.color} />
            <circle cx={p.x} cy={p.y} r="10" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.2" />
            
            {/* Inner white dot */}
            <circle cx={p.x} cy={p.y} r="3" fill="#fff" />

            {/* Connecting line to label */}
            <line
              x1={p.x}
              y1={p.y}
              x2={p.x + (i === 0 ? -12 : i === 3 ? 12 : 0)}
              y2={p.y + (i < 3 ? -28 : 28)}
              stroke={p.color}
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Label group */}
            <g transform={`translate(${p.x + (i === 0 ? -12 : i === 3 ? 12 : 0)}, ${p.y + (i < 3 ? -36 : 36)})`}>
              <text
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize="11"
                fontWeight="700"
              >
                {p.label}
              </text>
              <text
                textAnchor="middle"
                fill={p.color}
                fontSize="8"
                fontWeight="600"
                dy="12"
                opacity="0.8"
              >
                {p.sub}
              </text>
            </g>
          </g>
        ))}

        {/* Center label */}
        <text
          x="210"
          y="128"
          textAnchor="middle"
          fill="rgba(255,255,255,0.12)"
          fontSize="14"
          fontWeight="800"
          letterSpacing="2"
        >
          DEVSECOPS
        </text>
      </svg>
    </div>
  );
}
