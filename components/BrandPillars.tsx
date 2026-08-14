"use client";

import { useT } from "@/features/i18n/I18nProvider";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function RocketIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 2c2.5 2 4 5.5 4 9 0 2-.5 3.5-1.5 5l-2.5 3-2.5-3C8.5 14.5 8 13 8 11c0-3.5 1.5-7 4-9z" />
      <circle cx="12" cy="9" r="1.5" />
      <path d="M8.5 13.5 6 16l1 3 3-2" />
      <path d="M15.5 13.5 18 16l-1 3-3-2" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.6" />
      <path d="M4 4v4.6h4.6" />
      <path d="M4 13a8 8 0 0 0 13.7 4.7L20 15.4" />
      <path d="M20 20v-4.6h-4.6" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg {...ICON_PROPS}>
      <line x1="3" y1="7" x2="14" y2="7" />
      <line x1="3" y1="12" x2="18" y2="12" />
      <line x1="3" y1="17" x2="11" y2="17" />
      <circle cx="20" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

const PILLARS = [
  { icon: RocketIcon, titleKey: "home.pillars.action.title", descKey: "home.pillars.action.description" },
  { icon: RefreshIcon, titleKey: "home.pillars.evolution.title", descKey: "home.pillars.evolution.description" },
  { icon: SpeedIcon, titleKey: "home.pillars.agility.title", descKey: "home.pillars.agility.description" },
  { icon: TargetIcon, titleKey: "home.pillars.focus.title", descKey: "home.pillars.focus.description" },
] as const;

/**
 * Franja de "pilares de marca" (ver guía de marca: Acción, Evolución,
 * Agilidad, Enfoque), inspirada en la sección inferior del mockup
 * "Aplicación en portal web". A diferencia del mockup (que muestra
 * servicios genéricos de agencia), acá se usa el contenido real de la
 * guía de marca de RaframGo — no se inventan servicios que no ofrecemos.
 */
export default function BrandPillars() {
  const t = useT();

  return (
    <div className="grid grid-cols-2 gap-8 border-t border-slate-100 py-10 sm:grid-cols-4">
      {PILLARS.map(({ icon: Icon, titleKey, descKey }) => (
        <div key={titleKey} className="flex items-start gap-3">
          <span className="text-brand">
            <Icon />
          </span>
          <div>
            <p className="font-bold text-slate-900">{t(titleKey)}</p>
            <p className="mt-0.5 text-sm text-muted">{t(descKey)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
