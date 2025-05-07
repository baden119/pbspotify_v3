import { DM_Sans } from "next/font/google";
import { Unbounded } from "next/font/google";

export const CreateDate = (date: string) => {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  }).format(new Date(date));
};

export const dm_sans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

export const unbounded = Unbounded({
  weight: "300",
  subsets: ["latin"],
  preload: true,
});

export const cellStyle =
  "px-1 border border-purple-400 text-sm md:text-base md:p-1";
