"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { AvatarColor, Child } from "@/app/lib/mock-data";

const AVATAR_PALETTE: AvatarColor[] = ["sky", "pink", "green", "yellow", "violet"];
const MONTHS_SHORT = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

type Props = {
  listLength: number;
  onClose: () => void;
  onAdd: (child: Child) => void;
};

type FormErrors = {
  name?: string;
  birthDate?: string;
};

const INPUT_CLASS =
  "w-full rounded-[14px] border-[1.5px] border-auth-line bg-white px-4 py-[13px] text-[15px] text-ink outline-none placeholder:text-auth-placeholder";

function FieldLabel({ text }: { text: string }) {
  return <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-soft">{text}</div>;
}

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ +/g, "-");
}

function parseBirthDate(value: string): Date | null {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value.trim())) return null;
  const [day, month, year] = value.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) return null;
  return date;
}

function ageLabel(birth: Date): string {
  const now = new Date();
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months -= 1;
  if (months < 12) return "menos de 1 año";
  const years = Math.floor(months / 12);
  return years === 1 ? "1 año" : `${years} años`;
}

function formatBirthDate(date: Date): string {
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

function buildChild(input: {
  name: string;
  birthDate: Date;
  allergies: string;
  notes: string;
  listLength: number;
}): Child {
  const now = new Date();
  const firstAllergen = input.allergies.split(",")[0].trim();
  return {
    id: slugify(input.name),
    name: input.name.trim(),
    initials: input.name.trim().charAt(0).toUpperCase(),
    ageLabel: ageLabel(input.birthDate),
    allergyTag: firstAllergen ? firstAllergen.toUpperCase() : undefined,
    allergyNotes: input.allergies.trim() || undefined,
    birthDate: formatBirthDate(input.birthDate),
    room: "Soles",
    enrolledAt: `${MONTHS_SHORT[now.getMonth()]} ${now.getFullYear()}`,
    avatar: AVATAR_PALETTE[input.listLength % AVATAR_PALETTE.length],
    parents: [],
  };
}

export default function AddKidDialog({ listLength, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [allergies, setAllergies] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = "El nombre es obligatorio.";
    const birth = parseBirthDate(birthDate);
    if (!birth) errs.birthDate = "Formato inválido: dd/mm/aaaa.";
    else if (birth > new Date()) errs.birthDate = "La fecha no puede ser futura.";
    setErrors(errs);
    if (!birth || errs.name || errs.birthDate) return;
    onAdd(
      buildChild({
        name,
        birthDate: birth,
        allergies,
        notes,
        listLength,
      })
    );
    setName("");
    setBirthDate("");
    setAllergies("");
    setNotes("");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/45 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[520px] overflow-hidden rounded-[24px] border border-line bg-auth-bg shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between border-b border-line px-[26px] py-5">
            <button type="button" onClick={onClose} className="text-[15px] font-bold text-soft">
              Cancelar
            </button>
            <span className="font-display text-[18px] font-semibold text-ink">Agregar niño</span>
            <button type="submit" className="text-[15px] font-extrabold text-accent">
              Guardar
            </button>
          </div>

          <div className="px-[26px] py-6">
            <FieldLabel text="NOMBRE COMPLETO" />
            <input
              placeholder="Ej. Martina López"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${INPUT_CLASS} ${errors.name ? "mb-1" : "mb-[18px]"}`}
            />
            {errors.name && (
              <div className="mb-[18px] text-[12.5px] font-bold text-allergy-panel-title">{errors.name}</div>
            )}

            <div className="mb-[18px] flex gap-[14px]">
              <div className="flex-1">
                <FieldLabel text="FECHA DE NACIMIENTO" />
                <input
                  placeholder="dd/mm/aaaa"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={`${INPUT_CLASS} ${errors.birthDate ? "mb-1" : ""}`}
                />
                {errors.birthDate && (
                  <div className="mt-1 text-[12.5px] font-bold text-allergy-panel-title">{errors.birthDate}</div>
                )}
              </div>
              <div className="flex-1">
                <FieldLabel text="SALA" />
                <div className="relative">
                  <select
                    defaultValue="Soles"
                    className={`${INPUT_CLASS} appearance-none font-bold`}
                  >
                    <option value="Soles">Soles</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#B0A290"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            <FieldLabel text="ALERGIAS (ETIQUETAS)" />
            <input
              placeholder="Ej. Maní, Lactosa"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className={`${INPUT_CLASS} mb-[18px]`}
            />

            <FieldLabel text="NOTAS MÉDICAS" />
            <textarea
              placeholder="Indicaciones, medicación, contactos…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${INPUT_CLASS} min-h-[90px] resize-y leading-[1.5]`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
