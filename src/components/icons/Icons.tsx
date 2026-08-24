import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function UtensilsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 2v8a2 2 0 0 0 2 2v10" />
      <path d="M6 2v6M10 2v6" />
      <path d="M18 2c-1.7 1.4-2.5 3-2.5 6 0 2.2 1 3.6 2.5 4V22" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 8h12l1 13H5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function BikeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M5.5 17.5 10 8h4l4.5 9.5M10 8 8 5H6" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <circle cx="17" cy="9" r="2.6" />
      <path d="M15.8 14.2c2.7.5 4.7 2.5 4.7 5.8" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 20c8 0 15-6 16-16C11 5 4 12 4 20Z" />
      <path d="M5 19c4-4 8-7 13-11" />
    </svg>
  );
}

export function PlateIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 20s-7.5-4.6-9.7-9.1C.7 7.8 2.4 4.6 5.6 4c2-.4 3.9.5 5 2.1.9-1.6 2.9-2.5 5-2.1 3.2.6 4.9 3.8 3.3 6.9C19.5 15.4 12 20 12 20Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9l-5.6 3.2 1.4-6.3-4.8-4.3 6.4-.6L12 3Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2.2 2C9.8 20.4 3.6 14.2 3 6.2 2.9 5 3.8 4 4 4Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 6.5 8 6 8-6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M14 8.5h2.5V5.2c-.4-.1-1.8-.2-3.1-.2-3 0-4.4 1.9-4.4 4.6v2.4H6v3.6h3v8.4h3.6v-8.4h3l.5-3.6h-3.5V10c0-.9.3-1.5 1.4-1.5Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M14 4c.5 2.3 2 3.7 4.3 3.9v2.7c-1.6 0-3-.5-4.3-1.4v6.4a5.4 5.4 0 1 1-4.7-5.4v2.8a2.6 2.6 0 1 0 2 2.6V4h2.7Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6.5 17.5 4 20l2.6-.7A8.5 8.5 0 1 0 4 12a8.4 8.4 0 0 0 1.2 4.4l1.3 1.1Z" />
      <path d="M9.2 9.6c.2-.6.5-.6.8-.6h.5c.2 0 .4 0 .5.4.2.5.6 1.5.6 1.6.1.1.1.3 0 .5-.1.1-.2.3-.3.4l-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.2 1.7 1.9 1.1.9 2 1.2 2.3 1.3.3.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.3.1.4.1 1-.2 1.5-.3.5-1.4 1.1-2.4 1-1.9-.3-3.9-1.3-5.4-2.7-1.3-1.2-2.2-2.6-2.6-3.5-.4-.9-.3-1.7.1-2.3Z" />
    </svg>
  );
}
