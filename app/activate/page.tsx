import Link from "next/link";

export default function ActivateAccountPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-auth-bg p-10">
      <div className="w-full max-w-[440px]">
        <div className="mb-[22px] flex h-[58px] w-[58px] items-center justify-center rounded-[18px] bg-[linear-gradient(155deg,var(--color-logo-from),var(--color-logo-to))] shadow-[0_12px_26px_-10px_rgba(238,129,100,.65)]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>
        <h1 className="font-display mb-2 text-[32px] leading-[1.15] font-semibold text-ink">Bienvenida a OpenDayCare</h1>
        <p className="mb-[26px] text-[15.5px] leading-[1.55] text-soft">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar la cuenta.
        </p>

        <div className="mb-[22px] flex items-center gap-[14px] rounded-[16px] border-[1.5px] border-auth-line bg-white px-4 py-[14px]">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-child-avatar-bg font-display text-[19px] font-semibold text-child-avatar-ink">M</div>
          <div>
            <div className="text-[13px] text-soft">Te invitaron a seguir a</div>
            <div className="font-display text-[17px] font-semibold text-ink">Mateo · Sala Soles</div>
          </div>
        </div>

        <div className="mb-2 text-xs font-bold tracking-[0.7px] text-soft">CÓDIGO DE INVITACIÓN</div>
        <input
          defaultValue="7K4P9"
          className="font-display mb-[18px] w-full rounded-[14px] border-[1.5px] border-auth-line bg-white px-4 py-[14px] text-[18px] font-bold tracking-[3px] text-ink"
        />
        <div className="mb-2 text-xs font-bold tracking-[0.7px] text-soft">EMAIL</div>
        <input
          type="email"
          defaultValue="lucia.fernandez@gmail.com"
          className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-auth-line bg-white px-4 py-[14px] text-[15px] text-ink"
        />
        <div className="mb-2 text-xs font-bold tracking-[0.7px] text-soft">CREAR CONTRASEÑA</div>
        <input
          type="password"
          defaultValue="contraseña"
          className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-card-hover bg-white px-4 py-[14px] text-[15px] text-ink"
        />

        <label className="mb-6 flex cursor-pointer items-start gap-3 rounded-[14px] bg-auth-check-bg px-4 py-[14px]">
          <input type="checkbox" defaultChecked className="sr-only" />
          <span className="mt-px flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-auth-check">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="text-[14px] leading-[1.45] text-auth-check-ink">
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.
          </span>
        </label>

        <a
          href="#"
          className="block w-full rounded-[15px] bg-gradient-to-b from-btn-from to-btn-to py-[15px] text-center text-[16px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)]"
        >
          Activar mi cuenta
        </a>
        <p className="mt-[22px] text-center text-[14.5px] text-soft">
          ¿Ya tenés cuenta? <Link href="/login" className="font-extrabold text-accent-strong">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}
