import Link from "next/link";

const sunIcon = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-auth-bg md:grid md:grid-cols-[1.05fr_1fr] md:items-stretch">
      <div className="bg-[linear-gradient(155deg,var(--color-hero-from)_0%,var(--color-hero-mid)_45%,var(--color-hero-to)_100%)] relative hidden flex-col justify-between overflow-hidden p-[56px_60px] text-white md:flex">
        <div className="absolute -top-[140px] right-[-120px] h-[420px] w-[420px] rounded-full bg-white/12" />
        <div className="absolute bottom-[-110px] left-[-80px] h-[300px] w-[300px] rounded-full bg-white/10" />
        <div className="relative flex items-center gap-[13px]">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-white/22">
            {sunIcon}
          </div>
          <span className="font-display text-[21px] font-semibold tracking-[0.5px]">OpenDayCare</span>
        </div>
        <div className="relative">
          <h1 className="font-display mb-[18px] text-[42px] leading-[1.12] font-semibold">
            El día de cada niño,<br />compartido con su familia.
          </h1>
          <p className="max-w-[430px] text-[17px] leading-[1.6] text-white/92">
            Publicá momentos, gestioná las salas y mantené a las familias cerca, desde un solo lugar.
          </p>
        </div>
        <div className="relative text-sm text-white/90">🌿 Guardería Sala Soles</div>
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-[392px]">
          <h2 className="font-display mb-[6px] text-[30px] font-semibold text-ink">Iniciar sesión</h2>
          <p className="mb-7 text-[15px] text-soft">Ingresá para ver el día de hoy.</p>

          <div className="mb-2 text-xs font-bold tracking-[0.7px] text-soft">EMAIL</div>
          <input
            type="email"
            defaultValue="caro@opendaycare.com"
            className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-auth-line bg-white px-4 py-[14px] text-[15px] text-ink"
          />
          <div className="mb-2 text-xs font-bold tracking-[0.7px] text-soft">CONTRASEÑA</div>
          <input
            type="password"
            placeholder="••••••••"
            className="mb-[10px] w-full rounded-[14px] border-[1.5px] border-auth-line bg-white px-4 py-[14px] text-[15px] text-ink placeholder:text-auth-placeholder"
          />
          <div className="mb-5 text-right">
            <a href="#" className="text-[13.5px] font-bold text-accent-strong">¿Olvidaste tu contraseña?</a>
          </div>

          <a
            href="#"
            className="block w-full rounded-[15px] bg-gradient-to-b from-btn-from to-btn-to py-[15px] text-center text-[16px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)]"
          >
            Iniciar sesión
          </a>

          <p className="mt-6 text-center text-[14.5px] text-soft">
            ¿Te invitó la guardería? <Link href="/activate" className="font-extrabold text-accent-strong">Activá tu cuenta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
