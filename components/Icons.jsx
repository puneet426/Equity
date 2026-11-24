const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export const Phone = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...S} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const WhatsApp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.8-1.2s.2-1.1.1-1.2-.2-.2-.4-.3z" />
  </svg>
);

export const Mail = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...S} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

export const Instagram = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...S} {...p}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.3" />
    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const Linktree = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.736 5.853l4.005-4.117 2.325 2.38-4.2 4.005h5.908v3.305h-5.937l4.229 4.108-2.325 2.334-5.74-5.769-5.741 5.769-2.325-2.325 4.229-4.108H2.226V8.121h5.909l-4.2-4.004 2.324-2.381 4.005 4.117V0h3.472zm-3.472 10.306h3.472V24h-3.472z" />
  </svg>
);

export const MapPin = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...S} {...p}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const LinkedIn = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export const Arrow = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...S} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Star = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
  </svg>
);

export const Stars = ({ className = "stars" }) => (
  <span className={className} aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
  </span>
);

/* small glyphs for the "how classes run" cards */
export const Glyphs = [
  (p) => (<svg viewBox="0 0 32 32" aria-hidden="true" {...S} strokeWidth={1.8} {...p}><circle cx="11" cy="11" r="4" /><circle cx="22" cy="12" r="3" /><path d="M3.5 26c.8-4.6 3.8-7 7.5-7s6.7 2.4 7.5 7M18 19.6c3.6-.9 7.6.6 8.8 6.4" /></svg>),
  (p) => (<svg viewBox="0 0 32 32" aria-hidden="true" {...S} strokeWidth={1.8} {...p}><path d="M16 4a8 8 0 0 0-4.5 14.6V22h9v-3.4A8 8 0 0 0 16 4zM12.5 26h7" /></svg>),
  (p) => (<svg viewBox="0 0 32 32" aria-hidden="true" {...S} strokeWidth={1.8} {...p}><path d="M6 5h14l6 6v16H6z" /><path d="M20 5v6h6M10.5 17h11M10.5 22h7" /></svg>),
  (p) => (<svg viewBox="0 0 32 32" aria-hidden="true" {...S} strokeWidth={1.8} {...p}><path d="M5 7h22v14H14l-6 5v-5H5z" /><path d="M14 12a2.2 2.2 0 1 1 3 2c-.7.3-1 .8-1 1.4M16 18h.01" /></svg>),
  (p) => (<svg viewBox="0 0 32 32" aria-hidden="true" {...S} strokeWidth={1.8} {...p}><circle cx="16" cy="17" r="10" /><path d="M16 11v6l4 3M13 3h6" /></svg>),
  (p) => (<svg viewBox="0 0 32 32" aria-hidden="true" {...S} strokeWidth={1.8} {...p}><path d="M4 27l7-10 6 5 11-15" /><path d="M21 7h7v7" /></svg>),
];
