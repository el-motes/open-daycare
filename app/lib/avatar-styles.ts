import type { AvatarColor } from "@/app/lib/mock-data";

export const avatarStyles: Record<AvatarColor, string> = {
  sky: "bg-child-avatar-bg text-child-avatar-ink",
  pink: "bg-child-avatar-pink-bg text-child-avatar-pink-ink",
  green: "bg-child-avatar-green-bg text-child-avatar-green-ink",
  yellow: "bg-child-avatar-yellow-bg text-child-avatar-yellow-ink",
  violet: "bg-child-avatar-violet-bg text-child-avatar-violet-ink",
  blue: "bg-child-avatar-blue-bg text-child-avatar-blue-ink",
};

export const parentAvatarStyles: Record<AvatarColor, string> = {
  sky: "bg-child-avatar-bg text-white",
  pink: "bg-child-avatar-pink-bg text-white",
  green: "bg-child-avatar-green-bg text-white",
  yellow: "bg-child-avatar-yellow-bg text-white",
  violet: "bg-child-avatar-violet-bg text-white",
  blue: "bg-child-avatar-blue-bg text-white",
};
