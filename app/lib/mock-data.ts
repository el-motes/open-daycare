export type ParentStatus = "active" | "pending";

export type AvatarColor =
  | "sky"
  | "pink"
  | "green"
  | "yellow"
  | "violet"
  | "blue";

export type Parent = {
  name: string;
  initials: string;
  relation: string; // "Mamá" | "Papá"
  status: ParentStatus;
  avatar: AvatarColor;
};

export type Child = {
  id: string; // slug URL: "mateo-fernandez"
  name: string;
  initials: string;
  ageLabel: string; // "3 años"
  allergyTag?: string; // "MANÍ" | "LACTOSA"
  allergyNotes?: string; // texto del panel
  birthDate: string; // "12 mar 2022"
  room: string; // "Soles"
  enrolledAt: string; // "feb 2025"
  avatar: AvatarColor;
  parents: Parent[];
};

export const children: Child[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    initials: "M",
    ageLabel: "3 años",
    allergyTag: "MANÍ",
    allergyNotes:
      "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    birthDate: "12 mar 2022",
    room: "Soles",
    enrolledAt: "feb 2025",
    avatar: "sky",
    parents: [
      { name: "Lucía Fernández", initials: "L", relation: "Mamá", status: "active", avatar: "violet" },
      { name: "Diego Fernández", initials: "D", relation: "Papá", status: "pending", avatar: "blue" },
    ],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    initials: "S",
    ageLabel: "2 años",
    birthDate: "23 jul 2023",
    room: "Soles",
    enrolledAt: "mar 2025",
    avatar: "pink",
    parents: [
      { name: "Carla Méndez", initials: "C", relation: "Mamá", status: "active", avatar: "pink" },
    ],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    initials: "B",
    ageLabel: "3 años",
    birthDate: "5 oct 2022",
    room: "Soles",
    enrolledAt: "ene 2025",
    avatar: "green",
    parents: [
      { name: "Ana Ruiz", initials: "A", relation: "Mamá", status: "active", avatar: "yellow" },
      { name: "Rodrigo Ruiz", initials: "R", relation: "Papá", status: "active", avatar: "blue" },
    ],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    initials: "V",
    ageLabel: "2 años",
    birthDate: "14 abr 2023",
    room: "Soles",
    enrolledAt: "abr 2025",
    avatar: "yellow",
    parents: [],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    initials: "T",
    ageLabel: "3 años",
    allergyTag: "LACTOSA",
    allergyNotes:
      "Alergia a la lactosa. Evitar leche y derivados. Toma leche de almendras.",
    birthDate: "2 dic 2022",
    room: "Soles",
    enrolledAt: "feb 2025",
    avatar: "violet",
    parents: [
      { name: "Mariana Díaz", initials: "M", relation: "Mamá", status: "active", avatar: "green" },
    ],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    initials: "E",
    ageLabel: "2 años",
    birthDate: "19 jun 2023",
    room: "Soles",
    enrolledAt: "mar 2025",
    avatar: "pink",
    parents: [
      { name: "Julián Castro", initials: "J", relation: "Papá", status: "active", avatar: "sky" },
    ],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    initials: "L",
    ageLabel: "3 años",
    birthDate: "8 feb 2022",
    room: "Soles",
    enrolledAt: "ene 2025",
    avatar: "sky",
    parents: [
      { name: "Silvia Romero", initials: "S", relation: "Mamá", status: "pending", avatar: "violet" },
    ],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    initials: "O",
    ageLabel: "2 años",
    birthDate: "27 nov 2023",
    room: "Soles",
    enrolledAt: "may 2025",
    avatar: "green",
    parents: [
      { name: "Gonzalo Vega", initials: "G", relation: "Papá", status: "active", avatar: "yellow" },
    ],
  },
];

export function parentStatusLabel(parent: Parent): string {
  if (parent.status === "pending") return "invitación enviada";
  return parent.relation === "Papá" ? "activo" : "activa";
}
