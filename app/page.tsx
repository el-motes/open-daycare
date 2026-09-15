"use client";

import { useState } from "react";

type PostType = "logro" | "actividad" | "anuncio";

type Post = {
  childName: string;
  initials: string;
  time: string;
  type: PostType;
  audience: string;
  text: string;
  hearts: number;
  comments: number;
  photoLabel?: string;
};

const posts: Post[] = [
  {
    childName: "Mateo",
    initials: "M",
    time: "14:20",
    type: "logro",
    audience: "familia de Mateo",
    text: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    hearts: 3,
    comments: 1,
  },
  {
    childName: "Mateo",
    initials: "M",
    time: "09:40",
    type: "actividad",
    audience: "familia de Mateo",
    text: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    hearts: 5,
    comments: 2,
    photoLabel: "Foto · pintando con témperas",
  },
  {
    childName: "Anuncio general",
    initials: "",
    time: "07:50",
    type: "anuncio",
    audience: "toda la sala",
    text: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    hearts: 8,
    comments: 0,
  },
];

const postStyles: Record<
  PostType,
  { label: string; badge: string; dot: string; ink: string; avatarBg: string; avatarInk: string }
> = {
  logro: {
    label: "LOGRO",
    badge: "bg-logro-bg",
    dot: "bg-logro-ink",
    ink: "text-logro-ink",
    avatarBg: "bg-child-avatar-bg",
    avatarInk: "text-child-avatar-ink",
  },
  actividad: {
    label: "ACTIVIDAD",
    badge: "bg-actividad-bg",
    dot: "bg-actividad-ink",
    ink: "text-actividad-ink",
    avatarBg: "bg-child-avatar-bg",
    avatarInk: "text-child-avatar-ink",
  },
  anuncio: {
    label: "ANUNCIO",
    badge: "bg-anuncio-bg",
    dot: "bg-anuncio-ink",
    ink: "text-anuncio-ink",
    avatarBg: "bg-anuncio-bg",
    avatarInk: "text-anuncio-ink",
  },
};

const navItems = [
  {
    label: "Feed",
    href: "#",
    active: true,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    label: "Niños",
    href: "#",
    active: false,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
      </svg>
    ),
  },
  {
    label: "Avisos",
    href: "#",
    active: false,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),
  },
  {
    label: "Mi cuenta",
    href: "#",
    active: false,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

function SidebarContent() {
  return (
    <>
      <a href="#" className="flex items-center gap-[11px] px-2 pt-1 pb-[22px]">
        <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[12px] bg-[linear-gradient(155deg,var(--color-logo-from),var(--color-logo-to))]">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>
        <div>
          <div className="font-display text-[17px] leading-none font-semibold text-ink">OpenDayCare</div>
          <div className="mt-0.5 text-[11.5px] text-meta">Sala Soles</div>
        </div>
      </a>
      <a href="#" className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-b from-btn-from to-btn-to px-3 py-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.75)]">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Nueva publicación
      </a>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px] ${
              item.active ? "bg-accent-tint font-extrabold text-accent" : "font-semibold text-nav"
            }`}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>
      <div className="mt-2.5 border-t border-line pt-3.5">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-avatar font-display text-[16px] font-semibold text-white">C</div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold text-ink">Caro Giménez</div>
            <div className="text-xs text-meta">Maestra · Soles</div>
          </div>
          <a href="#" title="Cerrar sesión" className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-bg text-soft">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="sticky top-0 hidden h-screen w-[248px] flex-none flex-col border-r border-line bg-panel px-4 py-6 md:flex">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[248px] flex-col border-r border-line bg-panel px-4 py-6">
            <SidebarContent />
          </aside>
        </div>
      )}

      <button
        type="button"
        aria-label="Abrir menú"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-[12px] border border-line bg-panel text-nav md:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[760px] px-5 pb-20 pt-16 md:px-10 md:pt-[34px]">
          <header className="mb-6">
            <div className="mb-1 text-[12.5px] font-extrabold tracking-[.8px] text-accent">GUARDERÍA · SALA SOLES</div>
            <h1 className="font-display text-[30px] font-semibold text-ink">Buenas, Caro</h1>
            <p className="mt-[5px] text-[14.5px] text-soft">12 niños · martes 17 jun</p>
          </header>

          <a href="#" className="mb-6 flex items-center gap-3.5 rounded-[18px] border border-line bg-panel px-[18px] py-3.5 shadow-[0_4px_14px_-10px_rgba(120,90,60,.4)]">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-avatar font-display text-[16px] font-semibold text-white">C</div>
            <span className="flex-1 text-[15px] text-meta">Compartí un momento…</span>
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-accent-tint text-accent-soft">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </span>
          </a>

          <div className="mb-3.5 flex items-center gap-3.5">
            <span className="text-[12.5px] font-extrabold tracking-[.8px] text-label-ink">PUBLICADO HOY</span>
            <span className="h-px flex-1 bg-divider" />
          </div>

          <div className="flex flex-col gap-4">
            {posts.map((post) => {
              const styles = postStyles[post.type];
              return (
                <article key={`${post.type}-${post.time}`} className="rounded-[20px] border border-line bg-panel px-[22px] py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,.5)]">
                  <div className="mb-3.5 flex items-center gap-3">
                    <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-full font-display text-[17px] font-semibold ${styles.avatarBg} ${styles.avatarInk}`}>
                      {post.type === "anuncio" ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
                        </svg>
                      ) : (
                        post.initials
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-display text-[16.5px] font-semibold text-ink">{post.childName}</div>
                      <div className="text-[12.5px] text-meta">{post.time} · publicado por vos</div>
                    </div>
                    <div className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${styles.badge}`}>
                      <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
                      <span className={`text-xs font-extrabold tracking-[.5px] ${styles.ink}`}>{styles.label}</span>
                    </div>
                  </div>
                  <div className="mb-2.5 text-[12.5px] text-meta">Para: {post.audience}</div>
                  <p className="text-[15.5px] leading-[1.55] text-ink-soft">{post.text}</p>
                  {post.photoLabel && (
                    <a href="#" className="mt-3.5 flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-placeholder-line bg-placeholder-bg text-placeholder-ink">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
                      </svg>
                      <span className="text-[13.5px]">{post.photoLabel}</span>
                    </a>
                  )}
                  <div className="mt-4 flex items-center gap-[18px] border-t border-line-soft pt-3.5">
                    <span className="flex items-center gap-[7px] text-sm font-bold text-accent-soft">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="var(--color-accent-soft)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
                      </svg>
                      {post.hearts}
                    </span>
                    <a href="#" className="flex items-center gap-[7px] text-sm font-bold text-soft">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
                      </svg>
                      {post.comments}
                    </a>
                    <span className="flex-1" />
                    <a href="#" className="text-sm font-extrabold text-accent-strong">Editar</a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
