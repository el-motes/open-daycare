"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import AddKidDialog from "@/app/components/add-kid-dialog";
import type { Child } from "@/app/lib/mock-data";
import { addKid as addToStore, getKids } from "@/app/lib/kids-store";
import { avatarStyles } from "@/app/lib/avatar-styles";

function parentsLabel(count: number) {
  if (count === 0) return "sin padres vinculados";
  if (count === 1) return "1 padre vinculado";
  return `${count} padres vinculados`;
}

export default function KidsPage() {
  const [kids, setKids] = useState<Child[]>(getKids());
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = kids.filter((child) =>
    child.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  function handleAdd(child: Child) {
    setKids(addToStore(child));
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[880px] px-5 pb-20 pt-16 md:px-10 md:pt-[34px]">
          <div className="mb-[22px] flex items-end justify-between gap-4">
            <div>
              <div className="mb-1 text-[12.5px] font-extrabold tracking-[.8px] text-accent">GESTIÓN</div>
              <h1 className="font-display text-[30px] font-semibold text-ink">Niños</h1>
            </div>
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="flex items-center gap-2 rounded-[14px] bg-gradient-to-b from-btn-from to-btn-to px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.7)]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Agregar niño
            </button>
          </div>

          <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-line bg-panel px-4 py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-placeholder-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              placeholder="Buscar niño…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-none bg-transparent text-[15px] text-ink outline-none"
            />
          </div>

          <div className="mb-3.5 flex items-center gap-3">
            <span className="text-[12.5px] font-extrabold tracking-[.8px] text-ink">SALA SOLES</span>
            <span className="text-[13px] text-meta">{kids.length} niños</span>
            <span className="h-px flex-1 bg-divider" />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {filtered.map((child) => (
              <Link
                key={child.id}
                href={`/kids/${child.id}`}
                className="flex min-w-0 items-center gap-3.5 rounded-[18px] border border-line bg-panel p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,.5)] hover:border-card-hover hover:-translate-y-[2px]"
              >
                <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-full font-display text-[19px] font-semibold ${avatarStyles[child.avatar]}`}>
                  {child.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[16px] font-semibold text-ink">{child.name}</div>
                  <div className="text-[13px] text-meta">{child.ageLabel} · {parentsLabel(child.parents.length)}</div>
                </div>
                {child.allergyTag ? (
                  <span className="flex-none rounded-full bg-badge-allergy-bg px-[9px] py-[5px] text-[11px] font-extrabold text-badge-allergy-ink">
                    {child.allergyTag}
                  </span>
                ) : child.parents.length === 0 ? (
                  <span className="flex-none rounded-full bg-badge-link-bg px-[9px] py-[5px] text-[11px] font-extrabold text-badge-link-ink">
                    VINCULAR
                  </span>
                ) : (
                  <svg className="flex-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-chevron)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          {dialogOpen && (
            <AddKidDialog
              listLength={kids.length}
              onClose={() => setDialogOpen(false)}
              onAdd={handleAdd}
            />
          )}
        </div>
      </main>
    </div>
  );
}
