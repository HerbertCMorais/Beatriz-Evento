// ========== B&B LINDEZAS — SVG Stickers & Icons ==========

const Logo = ({mono=false}) => (
  <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="6" y="36" width="6" height="18" rx="2" fill={mono?"#fff":"#2a0a18"}/>
    <rect x="12" y="40" width="3" height="10" rx="1" fill={mono?"#fff":"#2a0a18"}/>
    <rect x="15" y="42" width="12" height="6" rx="1.5" fill={mono?"#fff":"#2a0a18"}/>
    <rect x="108" y="36" width="6" height="18" rx="2" fill={mono?"#fff":"#2a0a18"}/>
    <rect x="105" y="40" width="3" height="10" rx="1" fill={mono?"#fff":"#2a0a18"}/>
    <rect x="93" y="42" width="12" height="6" rx="1.5" fill={mono?"#fff":"#2a0a18"}/>
    <rect x="27" y="43" width="66" height="4" rx="1" fill={mono?"#fff":"#2a0a18"}/>
    <path d="M60 32 C 52 22, 38 28, 44 40 C 48 48, 60 54, 60 54 C 60 54, 72 48, 76 40 C 82 28, 68 22, 60 32 Z" stroke={mono?"#fff":"#2a0a18"} strokeWidth="3" fill="none" strokeLinejoin="round"/>
    <text x="36" y="76" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="14" fill={mono?"#ffd6e8":"#d97aae"} letterSpacing="2">B &amp; B</text>
  </svg>
);

const Dumbbell = ({hue=0}) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{filter:`hue-rotate(${hue}deg)`}}>
    <defs>
      <linearGradient id={`dbG${hue}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffa3cd"/><stop offset="1" stopColor="#e64096"/>
      </linearGradient>
      <linearGradient id={`dbG2_${hue}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff90c2"/><stop offset="1" stopColor="#d11d77"/>
      </linearGradient>
    </defs>
    <rect x="40" y="90" width="120" height="22" rx="6" fill={`url(#dbG2_${hue})`} stroke="#9c0e58" strokeWidth="3"/>
    <rect x="20" y="60" width="34" height="82" rx="10" fill={`url(#dbG${hue})`} stroke="#9c0e58" strokeWidth="3"/>
    <rect x="6" y="74" width="22" height="54" rx="8" fill={`url(#dbG2_${hue})`} stroke="#9c0e58" strokeWidth="3"/>
    <rect x="146" y="60" width="34" height="82" rx="10" fill={`url(#dbG${hue})`} stroke="#9c0e58" strokeWidth="3"/>
    <rect x="172" y="74" width="22" height="54" rx="8" fill={`url(#dbG2_${hue})`} stroke="#9c0e58" strokeWidth="3"/>
    <rect x="26" y="68" width="4" height="22" rx="2" fill="#ffd6e8" opacity=".8"/>
    <rect x="152" y="68" width="4" height="22" rx="2" fill="#ffd6e8" opacity=".8"/>
  </svg>
);

const HeartSticker = () => (
  <svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M60 8 C 80 -4, 118 6, 112 40 C 108 70, 80 96, 60 102 C 40 96, 12 70, 8 40 C 2 6, 40 -4, 60 8 Z" fill="#fff4cc"/>
    <path d="M60 28 C 70 14, 96 18, 92 42 C 88 60, 70 78, 60 82 C 50 78, 32 60, 28 42 C 24 18, 50 14, 60 28 Z" fill="#ff4fa6"/>
  </svg>
);

const EuVouSticker = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><path id="arc" d="M 60 140 Q 300 -20 540 140" fill="none"/></defs>
    <path d="M 40 140 Q 300 -40 560 140 L 560 175 Q 300 5 40 175 Z" fill="#fff4cc" stroke="#ff4fa6" strokeWidth="6"/>
    <text fontFamily="'Luckiest Guy', cursive" fontSize="86" fill="#e91e84" letterSpacing="4">
      <textPath href="#arc" startOffset="50%" textAnchor="middle">EU VOU!</textPath>
    </text>
  </svg>
);

// ---- Decorative blobs / shapes ----
const Blob = ({className, style}) => (
  <svg className={className} style={style} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="currentColor" d="M40,-65C53,-58,66,-49,72,-37C78,-25,77,-12,73,-1C70,11,64,22,57,32C50,43,42,53,31,60C20,67,7,71,-5,72C-17,73,-29,71,-39,64C-48,57,-56,46,-62,33C-68,20,-71,5,-69,-9C-67,-23,-60,-36,-50,-46C-40,-56,-27,-63,-12,-69C3,-75,18,-79,29,-78C40,-77,28,-72,40,-65Z" transform="translate(100 100)"/>
  </svg>
);

const SparkleSVG = ({className, style}) => (
  <svg className={className} style={style} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="currentColor" d="M12 0 L14 9 L24 12 L14 15 L12 24 L10 15 L0 12 L10 9 Z"/>
  </svg>
);

// ---- Icons (stroked) ----
const Icon = ({d, size=24, sw=2.2}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);
const IconUpload = (p) => <Icon {...p} d={<><path d="M12 16V4"/><path d="M5 11l7-7 7 7"/><path d="M4 20h16"/></>}/>;
const IconDownload = (p) => <Icon {...p} d={<><path d="M12 4v12"/><path d="M5 13l7 7 7-7"/><path d="M4 20h16"/></>}/>;
const IconShare = (p) => <Icon {...p} d={<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></>}/>;
const IconRefresh = (p) => <Icon {...p} d={<><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></>}/>;
const IconCalendar = (p) => <Icon {...p} d={<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></>}/>;
const IconClock = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>}/>;
const IconPin = (p) => <Icon {...p} d={<><path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></>}/>;
const IconTicket = (p) => <Icon {...p} d={<><path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M13 5v14" strokeDasharray="2 2"/></>}/>;
const IconHeart = (p) => <Icon {...p} d={<path d="M12 21s-7-4.5-9.5-9C.7 8.6 2.6 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 4.4 0 6.3 4.6 4.5 8C19 16.5 12 21 12 21z"/>}/>;
const IconStar = (p) => <Icon {...p} d={<path d="M12 3l2.6 6.3 6.8.6-5.2 4.5 1.6 6.6L12 17.8 6.2 21l1.6-6.6L2.6 9.9l6.8-.6z"/>}/>;
const IconBolt = (p) => <Icon {...p} d={<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>}/>;
const IconUsers = (p) => <Icon {...p} d={<><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="7" r="2.8"/><path d="M16 13.5c3 .3 5 2.4 5 5"/></>}/>;
const IconCamera = (p) => <Icon {...p} d={<><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6l2-3h4l2 3"/></>}/>;
const IconInstagram = (p) => <Icon {...p} d={<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></>}/>;
const IconWhatsapp = (p) => <Icon {...p} d={<path d="M21 12a9 9 0 0 1-14 7.6L3 21l1.4-4A9 9 0 1 1 21 12z"/>}/>;
const IconChevron = (p) => <Icon {...p} d={<path d="M6 9l6 6 6-6"/>}/>;
const IconCheck = (p) => <Icon {...p} d={<path d="M4 12l5 5 11-12"/>}/>;
const IconMusic = (p) => <Icon {...p} d={<><path d="M9 18V6l12-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>}/>;
const IconGift = (p) => <Icon {...p} d={<><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 13h18M12 8v13"/><path d="M12 8s-2-5-5-5-2 5 5 5zM12 8s2-5 5-5 2 5-5 5z"/></>}/>;

Object.assign(window, {
  Logo, Dumbbell, HeartSticker, EuVouSticker, Blob, SparkleSVG,
  IconUpload, IconDownload, IconShare, IconRefresh, IconCalendar, IconClock,
  IconPin, IconTicket, IconHeart, IconStar, IconBolt, IconUsers, IconCamera,
  IconInstagram, IconWhatsapp, IconChevron, IconCheck, IconMusic, IconGift,
});
