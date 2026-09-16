import { notFound } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import { children, parentStatusLabel } from "@/app/lib/mock-data";
import { avatarStyles, parentAvatarStyles } from "@/app/lib/avatar-styles";

export default async function ChildProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const child = children.find((c) => c.id === id);
  if (!child) notFound();

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[820px] px-5 pb-20 pt-16 md:px-10 md:pt-[34px]">
          <Link href="/kids" className="mb-5 flex items-center gap-[7px] text-sm font-bold text-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Volver a Niños
          </Link>

          <div className="flex flex-wrap items-start gap-[26px]">
            <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
              <div className="flex items-center gap-[18px]">
                <div className={`flex h-[84px] w-[84px] flex-none items-center justify-center rounded-full font-display text-[34px] font-semibold ${avatarStyles[child.avatar]}`}>
                  {child.initials}
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-[28px] font-semibold text-ink">{child.name}</h1>
                  <p className="mt-[3px] text-[15px] text-soft">{child.ageLabel} · Sala {child.room}</p>
                </div>
                <a href="#" className="rounded-[12px] border-[1.5px] border-line bg-panel px-4 py-[9px] text-sm font-bold text-nav">Editar</a>
              </div>

              {child.allergyNotes && (
                <div className="flex gap-3.5 rounded-2xl bg-allergy-panel-bg px-[18px] py-4">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[11px] bg-allergy-panel-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                      <path d="M12 9v4M12 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <div className="mb-0.5 text-[15px] font-extrabold text-allergy-panel-title">Alergias y notas</div>
                    <div className="text-[14.5px] leading-[1.5] text-allergy-panel-text">{child.allergyNotes}</div>
                  </div>
                </div>
              )}

              <div className="overflow-hidden rounded-2xl border border-line bg-panel">
                <div className="flex justify-between border-b border-line-soft px-[18px] py-[15px]">
                  <span className="text-[14.5px] text-soft">Fecha de nacimiento</span>
                  <span className="text-[14.5px] font-extrabold text-ink">{child.birthDate}</span>
                </div>
                <div className="flex justify-between border-b border-line-soft px-[18px] py-[15px]">
                  <span className="text-[14.5px] text-soft">Sala</span>
                  <span className="text-[14.5px] font-extrabold text-ink">{child.room}</span>
                </div>
                <div className="flex justify-between px-[18px] py-[15px]">
                  <span className="text-[14.5px] text-soft">Ingreso</span>
                  <span className="text-[14.5px] font-extrabold text-ink">{child.enrolledAt}</span>
                </div>
              </div>
            </div>

            <div className="flex w-[300px] flex-none flex-col gap-3.5">
              <a href="#" className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-ink px-3 py-[13px] text-[15px] font-extrabold text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
                Resumen del día
              </a>

              <div className="rounded-2xl border border-line bg-panel px-[18px] py-4">
                <div className="mb-3.5 text-[12.5px] font-extrabold tracking-[.8px] text-label-ink">PADRES VINCULADOS</div>
                <div className="flex flex-col gap-3.5">
                  {child.parents.map((parent) => (
                    <div key={parent.name} className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-full font-display text-[16px] font-semibold ${parentAvatarStyles[parent.avatar]}`}>
                        {parent.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[14.5px] font-extrabold text-ink">{parent.name}</div>
                        <div className="text-[12.5px] text-meta">{parent.relation} · {parentStatusLabel(parent)}</div>
                      </div>
                      {parent.status === "active" ? (
                        <span className="flex-none rounded-full bg-logro-bg px-[9px] py-1 text-[10.5px] font-extrabold text-logro-ink">ACTIVA</span>
                      ) : (
                        <span className="flex-none rounded-full bg-badge-pending-bg px-[9px] py-1 text-[10.5px] font-extrabold text-badge-pending-ink">PENDIENTE</span>
                      )}
                    </div>
                  ))}
                  <a href="#" className="flex items-center gap-3 pt-2">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-placeholder-line text-placeholder-ink">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                    <span className="text-[14.5px] font-extrabold text-accent-strong">Vincular otro padre</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
