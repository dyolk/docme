'use client';

/* ── Microservice HA Architecture (参考图风格) ─────────── */

const PAD_X = 28;
const PAD_Y = 24;
const BOX_W = 108;
const BOX_H = 44;
const STACK_GAP = 8;
const GAP_X = 28;
const GAP_Y = 36;
const ROW_H = BOX_H * 3 + STACK_GAP * 2 + 24; // 3-stack height + padding

/* Grid helpers */
function bx(col: number) {
  return PAD_X + col * (BOX_W + GAP_X);
}
function by(row: number) {
  return PAD_Y + row * (ROW_H + GAP_Y);
}

/* Layout columns (left -> right) */
const COLS = 8;
const ROWS = 3;
const SVG_W = PAD_X * 2 + COLS * BOX_W + (COLS - 1) * GAP_X;
const SVG_H = PAD_Y * 2 + ROWS * ROW_H + (ROWS - 1) * GAP_Y + 80;
const ASPECT_PERCENT = (SVG_H / SVG_W) * 100;

/* Color palette — 统一蓝青色 */
const C = {
  primary: '#0891b2',   // cyan-600
  dark: '#164e63',      // cyan-900
  light: '#cffafe',     // cyan-100
  border: '#67e8f9',    // cyan-300
  text: '#0e7490',      // cyan-700
  line: '#22d3ee',      // cyan-400
  muted: '#94a3b8',     // slate-400
};

interface StackNode {
  label: string;
  sub?: string;
  count?: number; // how many stacked boxes
}

interface Zone {
  title: string;
  col: number;
  row: number;
  width: number; // in columns
  height: number; // in rows
  nodes: StackNode[];
}

const zones: Zone[] = [
  {
    title: '', col: 0, row: 0, width: 0.8, height: 1,
    nodes: [{ label: '多端用户', sub: 'APP / PC / H5' }],
  },
  {
    title: '', col: 1, row: 0, width: 0.9, height: 1,
    nodes: [
      { label: 'CDN' },
      { label: 'WAP' },
      { label: '防火墙' },
    ],
  },
  {
    title: 'Nginx 集群', col: 2, row: 0, width: 0.9, height: 1,
    nodes: [
      { label: 'Nginx' },
      { label: 'Nginx' },
      { label: 'Nginx' },
    ],
  },
  {
    title: '网关集群', col: 3, row: 0, width: 0.9, height: 1,
    nodes: [
      { label: 'Gateway' },
      { label: 'Gateway' },
      { label: 'Gateway' },
    ],
  },
  {
    title: '认证授权中心', col: 3, row: -0.85, width: 1.6, height: 0.55,
    nodes: [
      { label: 'JWT', sub: 'OAuth2.0' },
      { label: 'SpringSecurity' },
    ],
  },
  {
    title: '服务注册中心', col: 4.5, row: -0.85, width: 1.2, height: 0.55,
    nodes: [
      { label: 'Nacos' },
      { label: 'Nacos' },
    ],
  },
  {
    title: 'A 服务集群', col: 4.2, row: 0, width: 0.8, height: 1,
    nodes: [
      { label: 'Service A' },
      { label: 'Service A' },
      { label: 'Service A' },
    ],
  },
  {
    title: 'B 服务集群', col: 5.2, row: 0, width: 0.8, height: 1,
    nodes: [
      { label: 'Service B' },
      { label: 'Service B' },
      { label: 'Service B' },
    ],
  },
  {
    title: 'MQ 集群', col: 6.2, row: 0, width: 0.8, height: 0.45,
    nodes: [{ label: 'MQ' }],
  },
  {
    title: '全文检索', col: 6.2, row: 0.5, width: 0.8, height: 0.45,
    nodes: [{ label: 'ElasticSearch' }],
  },
  {
    title: '任务管理', col: 6.2, row: 1.05, width: 0.8, height: 0.45,
    nodes: [{ label: '任务管理' }],
  },
  {
    title: '第三方服务', col: 7.2, row: 0, width: 0.8, height: 0.45,
    nodes: [
      { label: '短信服务' },
      { label: '邮件服务' },
    ],
  },
  {
    title: '缓存集群', col: 2.5, row: 1.15, width: 1.5, height: 0.55,
    nodes: [
      { label: 'Redis' },
      { label: 'Redis' },
      { label: 'Redis' },
    ],
  },
  {
    title: '关系型数据库', col: 4.2, row: 1.15, width: 1.6, height: 0.55,
    nodes: [
      { label: 'MySQL 从库' },
      { label: 'MySQL 主库' },
      { label: 'MySQL 从库' },
    ],
  },
  {
    title: '对象存储', col: 6, row: 1.15, width: 1.2, height: 0.55,
    nodes: [
      { label: 'OSS' },
      { label: 'MinIO' },
    ],
  },
];

/* Monitoring zone (top right corner) */
const monitorZone = {
  title: '监控体系',
  nodes: [
    { label: 'Spring Boot Admin', sub: '服务监控' },
    { label: 'SkyWalking', sub: 'APM 链路' },
    { label: 'ELK', sub: '日志系统' },
  ],
};

export function DevSecOpsCycle() {
  return (
    <div className="w-full relative" style={{ paddingBottom: `${ASPECT_PERCENT}%` }}>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,1 L6,3 L0,5 Z" fill={C.line} />
          </marker>
          <marker id="arrD" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,1 L6,3 L0,5 Z" fill={C.line} />
          </marker>
        </defs>

        {/* ==== ZONES (dashed boxes) ==== */}
        {zones.map((z) => {
          const x = bx(z.col);
          const y = by(z.row);
          const w = z.width * (BOX_W + GAP_X) - GAP_X + 16;
          const h = z.height * (ROW_H + GAP_Y) - GAP_Y + 16;
          return (
            <g key={z.title}>
              <rect
                x={x - 8}
                y={y - 8}
                width={w}
                height={h}
                rx="10"
                fill="rgba(8,145,178,0.03)"
                stroke={C.border}
                strokeWidth="1"
                strokeDasharray="5 4"
                opacity="0.6"
              />
              {z.title && (
                <text
                  x={x + w / 2 - 8}
                  y={y - 12}
                  textAnchor="middle"
                  fill={C.text}
                  fontSize="10"
                  fontWeight="700"
                  opacity="0.7"
                >
                  {z.title}
                </text>
              )}
            </g>
          );
        })}

        {/* ==== NODES ==== */}
        {zones.flatMap((z) =>
          z.nodes.map((n, i) => {
            const zoneX = bx(z.col);
            const zoneY = by(z.row);
            const stackH = z.nodes.length * BOX_H + (z.nodes.length - 1) * STACK_GAP;
            const startY = zoneY + (z.height * ROW_H - stackH) / 2;
            const x = zoneX + (z.width * (BOX_W + GAP_X) - GAP_X - BOX_W) / 2;
            const y = startY + i * (BOX_H + STACK_GAP);

            return (
              <g key={`${z.title}-${n.label}-${i}`}>
                {/* box */}
                <rect
                  x={x}
                  y={y}
                  width={BOX_W}
                  height={BOX_H}
                  rx="8"
                  fill="rgba(255,255,255,0.7)"
                  stroke={C.primary}
                  strokeWidth="1.2"
                />
                {/* label */}
                <text
                  x={x + BOX_W / 2}
                  y={y + BOX_H / 2 + (n.sub ? -2 : 4)}
                  textAnchor="middle"
                  fill={C.dark}
                  fontSize="11"
                  fontWeight="700"
                >
                  {n.label}
                </text>
                {n.sub && (
                  <text
                    x={x + BOX_W / 2}
                    y={y + BOX_H / 2 + 12}
                    textAnchor="middle"
                    fill={C.text}
                    fontSize="9"
                    fontWeight="500"
                  >
                    {n.sub}
                  </text>
                )}
              </g>
            );
          })
        )}

        {/* ==== MONITORING ZONE (top right) ==== */}
        {(() => {
          const mx = bx(6.8);
          const my = by(-0.85);
          const mw = 2 * (BOX_W + GAP_X) - GAP_X + 16;
          const mh = 0.55 * (ROW_H + GAP_Y) - GAP_Y + 16;
          return (
            <g>
              <rect
                x={mx - 8}
                y={my - 8}
                width={mw}
                height={mh}
                rx="10"
                fill="rgba(8,145,178,0.03)"
                stroke={C.border}
                strokeWidth="1"
                strokeDasharray="5 4"
                opacity="0.6"
              />
              <text x={mx + mw / 2 - 8} y={my - 12} textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" opacity="0.7">
                {monitorZone.title}
              </text>
              {monitorZone.nodes.map((n, i) => {
                const nx = mx + i * (BOX_W + 12) + 8;
                const ny = my + (mh - BOX_H) / 2;
                return (
                  <g key={n.label}>
                    <rect x={nx} y={ny} width={BOX_W} height={BOX_H} rx="8" fill="rgba(255,255,255,0.7)" stroke={C.primary} strokeWidth="1.2" />
                    <text x={nx + BOX_W / 2} y={ny + BOX_H / 2 - 2} textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="700">{n.label}</text>
                    <text x={nx + BOX_W / 2} y={ny + BOX_H / 2 + 12} textAnchor="middle" fill={C.text} fontSize="9" fontWeight="500">{n.sub}</text>
                  </g>
                );
              })}
            </g>
          );
        })()}

        {/* ==== CONNECTION LINES ==== */}
        {/* Users -> CDN/WAP/Firewall */}
        <path d={`M ${bx(0) + BOX_W} ${by(0) + ROW_H / 2} L ${bx(1)} ${by(0) + ROW_H / 2}`} stroke={C.line} strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.6" />
        {/* CDN stack -> Nginx */}
        <path d={`M ${bx(1) + BOX_W} ${by(0) + ROW_H / 2} L ${bx(2)} ${by(0) + ROW_H / 2}`} stroke={C.line} strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.6" />
        {/* Nginx -> Gateway */}
        <path d={`M ${bx(2) + BOX_W} ${by(0) + ROW_H / 2} L ${bx(3)} ${by(0) + ROW_H / 2}`} stroke={C.line} strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.6" />
        {/* Gateway -> Auth (up) */}
        <path d={`M ${bx(3) + BOX_W / 2} ${by(0)} L ${bx(3) + BOX_W / 2} ${by(-0.85) + 0.55 * ROW_H}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.5" strokeDasharray="3 3" />
        {/* Auth -> Gateway (down) */}
        <path d={`M ${bx(3) + BOX_W / 2 + 4} ${by(-0.85) + 0.55 * ROW_H} L ${bx(3) + BOX_W / 2 + 4} ${by(0)}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.5" strokeDasharray="3 3" />
        {/* Gateway -> Nacos (up-right) */}
        <path d={`M ${bx(3) + BOX_W} ${by(0) + 20} L ${bx(4.5)} ${by(-0.85) + 0.55 * ROW_H / 2}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.5" strokeDasharray="3 3" />
        {/* Nacos -> Gateway (down-left) */}
        <path d={`M ${bx(4.5)} ${by(-0.85) + 0.55 * ROW_H / 2 + 4} L ${bx(3) + BOX_W} ${by(0) + 24}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.5" strokeDasharray="3 3" />
        {/* Gateway -> Service A */}
        <path d={`M ${bx(3) + BOX_W} ${by(0) + ROW_H / 2 - 10} L ${bx(4.2)} ${by(0) + ROW_H / 2 - 10}`} stroke={C.line} strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.6" />
        {/* Gateway -> Service B */}
        <path d={`M ${bx(3) + BOX_W} ${by(0) + ROW_H / 2 + 10} L ${bx(5.2)} ${by(0) + ROW_H / 2 + 10}`} stroke={C.line} strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.6" />
        {/* Service A <-> B (feign) */}
        <path d={`M ${bx(4.2) + BOX_W} ${by(0) + ROW_H / 2} L ${bx(5.2)} ${by(0) + ROW_H / 2}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.5" strokeDasharray="3 3" />
        {/* Service B -> MQ / ES / Task */}
        <path d={`M ${bx(5.2) + BOX_W} ${by(0) + ROW_H / 2 - 20} L ${bx(6.2)} ${by(0) + ROW_H / 2 - 20}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.5" />
        <path d={`M ${bx(5.2) + BOX_W} ${by(0) + ROW_H / 2} L ${bx(6.2)} ${by(0) + ROW_H / 2}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.5" />
        <path d={`M ${bx(5.2) + BOX_W} ${by(0) + ROW_H / 2 + 20} L ${bx(6.2)} ${by(0) + ROW_H / 2 + 20}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.5" />
        {/* Service B -> 3rd party */}
        <path d={`M ${bx(5.2) + BOX_W} ${by(0) + 20} L ${bx(7.2)} ${by(0) + 20}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.4" strokeDasharray="4 3" />
        <path d={`M ${bx(5.2) + BOX_W} ${by(0) + ROW_H - 20} L ${bx(7.2)} ${by(0) + ROW_H - 20}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.4" strokeDasharray="4 3" />
        {/* Gateway -> Cache (down) */}
        <path d={`M ${bx(3) + BOX_W / 2} ${by(0) + ROW_H} L ${bx(3) + BOX_W / 2} ${by(1.15)}`} stroke={C.line} strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.5" />
        {/* Service A -> DB (down) */}
        <path d={`M ${bx(4.2) + BOX_W / 2} ${by(0) + ROW_H} L ${bx(4.2) + BOX_W / 2} ${by(1.15)}`} stroke={C.line} strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.5" />
        {/* Service B -> OSS (down-right) */}
        <path d={`M ${bx(5.2) + BOX_W / 2} ${by(0) + ROW_H} L ${bx(6) + BOX_W / 2} ${by(1.15)}`} stroke={C.line} strokeWidth="1.2" markerEnd="url(#arr)" opacity="0.5" />
        {/* Monitor -> Service lines (dashed) */}
        <path d={`M ${bx(6.8)} ${by(-0.85) + 0.55 * ROW_H / 2} L ${bx(5.2) + BOX_W / 2} ${by(0)}`} stroke={C.border} strokeWidth="1" opacity="0.3" strokeDasharray="4 3" />

        {/* ==== LABELS ON ARROWS ==== */}
        <text x={(bx(2) + bx(3)) / 2 + BOX_W / 2} y={by(0) + ROW_H / 2 - 6} textAnchor="middle" fill={C.text} fontSize="9" fontWeight="600" opacity="0.7">负载均衡</text>
        <text x={(bx(3) + bx(4.2)) / 2 + BOX_W / 2} y={by(0) + ROW_H / 2 - 22} textAnchor="middle" fill={C.text} fontSize="9" fontWeight="600" opacity="0.7">路由转发</text>
        <text x={(bx(4.2) + bx(5.2)) / 2 + BOX_W / 2} y={by(0) + ROW_H / 2 - 6} textAnchor="middle" fill={C.text} fontSize="9" fontWeight="600" opacity="0.7">Feign</text>
        <text x={bx(3) + BOX_W / 2 + 4} y={(by(0) + by(1.15)) / 2 + ROW_H / 2} textAnchor="start" fill={C.text} fontSize="9" fontWeight="600" opacity="0.7">缓存</text>
        <text x={bx(4.2) + BOX_W / 2 + 4} y={(by(0) + by(1.15)) / 2 + ROW_H / 2} textAnchor="start" fill={C.text} fontSize="9" fontWeight="600" opacity="0.7">持久化</text>
        <text x={bx(3) + BOX_W / 2 + 12} y={(by(0) + by(-0.85)) / 2} textAnchor="start" fill={C.text} fontSize="9" fontWeight="600" opacity="0.7">鉴权</text>
        <text x={(bx(3) + bx(4.5)) / 2 + BOX_W / 2 + 10} y={by(-0.85) + 0.55 * ROW_H / 2 - 6} textAnchor="middle" fill={C.text} fontSize="9" fontWeight="600" opacity="0.7">注册 / 发现</text>

        {/* ==== TRAFFIC DOTS ==== */}
        <circle r="2.5" fill={C.primary} opacity="0.8">
          <animateMotion dur="1.8s" repeatCount="indefinite" path={`M ${bx(0) + BOX_W} ${by(0) + ROW_H / 2} L ${bx(1)} ${by(0) + ROW_H / 2}`} />
        </circle>
        <circle r="2.5" fill={C.primary} opacity="0.8">
          <animateMotion dur="1.8s" repeatCount="indefinite" path={`M ${bx(1) + BOX_W} ${by(0) + ROW_H / 2} L ${bx(2)} ${by(0) + ROW_H / 2}`} />
        </circle>
        <circle r="2.5" fill={C.primary} opacity="0.8">
          <animateMotion dur="1.8s" repeatCount="indefinite" path={`M ${bx(2) + BOX_W} ${by(0) + ROW_H / 2} L ${bx(3)} ${by(0) + ROW_H / 2}`} />
        </circle>
        <circle r="2.5" fill="#f59e0b" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path={`M ${bx(3) + BOX_W} ${by(0) + ROW_H / 2 - 10} L ${bx(4.2)} ${by(0) + ROW_H / 2 - 10}`} />
        </circle>
        <circle r="2.5" fill="#f59e0b" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path={`M ${bx(3) + BOX_W} ${by(0) + ROW_H / 2 + 10} L ${bx(5.2)} ${by(0) + ROW_H / 2 + 10}`} />
        </circle>

      </svg>
    </div>
  );
}
