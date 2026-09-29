import { children, type Child } from "@/app/lib/mock-data";

// ponytail: module-level store — SPA nav keeps it, full reload resets to mocks
let kids: Child[] = [...children];

export function getKids(): Child[] {
  return kids;
}

export function addKid(child: Child): Child[] {
  kids = [child, ...kids];
  return kids;
}
