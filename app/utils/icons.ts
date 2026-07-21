/**
 * Central icon registry. Each entry is an array of SVG inner markup strings
 * rendered inside a 24x24 viewBox by <BaseIcon>. Keeps us dependency-free and
 * makes adding icons a one-line change.
 */
export type IconName = keyof typeof ICONS

export const ICONS = {
  'arrow-right': ['<path d="M5 12h14M13 6l6 6-6 6"/>'],
  'arrow-up-right': ['<path d="M7 17 17 7M8 7h9v9"/>'],
  whatsapp: [
    '<path d="M20 12a8 8 0 0 1-11.9 7L4 20l1.1-4A8 8 0 1 1 20 12Z"/>',
    '<path d="M9 9c0 3 2 5 5 5.5.6.1 1.2-.3 1.4-.9.1-.4-.1-.7-.5-.9l-1.2-.6c-.3-.1-.6 0-.8.2-.5-.2-1-.7-1.2-1.2.2-.2.3-.5.2-.8l-.6-1.2c-.2-.4-.5-.6-.9-.5-.6.2-1 .8-.9 1.4Z"/>',
  ],
  spark: ['<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>'],
  sparkles: [
    '<path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z"/>',
    '<path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z"/>',
  ],
  shirt: ['<path d="M8 3l4 2 4-2 4 3-2.5 3H18v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9H4.5L2 6l4-3Z"/>'],
  printer: [
    '<path d="M7 8V4h10v4"/>',
    '<path d="M5 8h14a2 2 0 0 1 2 2v6h-4v4H7v-4H3v-6a2 2 0 0 1 2-2Z"/>',
    '<path d="M7 16h10"/>',
  ],
  palette: [
    '<path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 2-2 2 2 0 0 1 2-2h1a4 4 0 0 0 4-4A9 9 0 0 0 12 3Z"/>',
    '<circle cx="8" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="10" r="1"/>',
  ],
  layers: ['<path d="M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 18l9 5 9-5"/>'],
  needle: ['<path d="M19 5 5 19M15 5h4v4M8 13l3 3"/>'],
  bolt: ['<path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/>'],
  glow: ['<circle cx="12" cy="12" r="4"/>', '<path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'],
  scissors: ['<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8 8l12 10M20 6 9.5 14"/>'],
  clock: ['<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'],
  'map-pin': ['<path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z"/>', '<circle cx="12" cy="10" r="2.5"/>'],
  check: ['<path d="M4 12l5 5 11-11"/>'],
  'check-circle': ['<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>'],
  menu: ['<path d="M4 7h16M4 12h16M4 17h16"/>'],
  close: ['<path d="M6 6l12 12M18 6 6 18"/>'],
  globe: ['<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/>'],
  heart: ['<path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z"/>'],
  instagram: ['<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1"/>'],
  tiktok: ['<path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46"/>', '<path d="M14 4c.5 2.5 2 4 4.5 4.2"/>'],
  facebook: ['<path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8Z"/>'],
  youtube: ['<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M11 9.5l4 2.5-4 2.5Z"/>'],
  link: ['<path d="M9 12a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6h-1"/>', '<path d="M15 12a3 3 0 0 1-3 3H9a3 3 0 0 1 0-6h1"/>'],
} as const
