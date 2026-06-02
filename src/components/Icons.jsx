// Lucide-style inline SVG icons (1.5px stroke, currentColor)
const Svg = ({ size = 18, stroke = 1.5, children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
)

export const IconChevronLeft  = (p) => <Svg {...p}><polyline points="15 6 9 12 15 18"/></Svg>
export const IconChevronRight = (p) => <Svg {...p}><polyline points="9 6 15 12 9 18"/></Svg>
export const IconChevronDown  = (p) => <Svg {...p}><polyline points="6 9 12 15 18 9"/></Svg>
export const IconPlus  = (p) => <Svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>
export const IconMinus = (p) => <Svg {...p}><line x1="5" y1="12" x2="19" y2="12"/></Svg>
export const IconMail  = (p) => <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 6 12 13 21 6"/></Svg>
export const IconPhone = (p) => <Svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></Svg>
export const IconMapPin = (p) => <Svg {...p}><path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></Svg>
export const IconClock = (p) => <Svg {...p}><circle cx="12" cy="12" r="9"/><polyline points="12 6 12 12 16 14"/></Svg>
export const IconHelp = (p) => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.5c-1 .5-1 1-1 2"/><line x1="12" y1="17" x2="12" y2="17.01"/></Svg>
export const IconInstagram = (p) => <Svg {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.51"/></Svg>
export const IconFacebook = (p) => <Svg {...p}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></Svg>
export const IconMenu = (p) => <Svg {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Svg>
export const IconX = (p) => <Svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>

// Hand-drawn botanical sprig
export const BotanicalSprig = ({ side = 'left', size = 110, opacity = 0.35, style }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 110 154" fill="none"
    stroke="#2C1810" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"
    style={{ opacity, transform: side === 'right' ? 'scaleX(-1)' : undefined, pointerEvents: 'none', ...style }}>
    <path d="M55 145 Q50 110 60 80 Q72 50 60 20"/>
    <path d="M58 122 Q40 118 30 105"/><path d="M30 105 Q42 108 52 119"/>
    <path d="M60 95 Q42 92 32 78"/><path d="M32 78 Q44 82 56 92"/>
    <path d="M62 70 Q46 66 38 52"/><path d="M38 52 Q50 56 60 66"/>
    <path d="M62 110 Q80 108 92 92"/><path d="M92 92 Q78 92 64 106"/>
    <path d="M64 60 Q82 56 92 40"/><path d="M92 40 Q78 44 66 56"/>
    <circle cx="60" cy="20" r="3.5"/><circle cx="64" cy="14" r="2.2"/>
    <circle cx="56" cy="14" r="2.2"/><circle cx="62" cy="9" r="2"/>
  </svg>
)
