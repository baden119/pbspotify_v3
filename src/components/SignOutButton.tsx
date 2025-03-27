"use client";
import { logout } from "@/lib/auth";
import { FaSpotify } from "react-icons/fa";
import { Unbounded } from "next/font/google";

const unbounded = Unbounded({
  weight: "300",
  subsets: ["latin"],
  preload: true,
});

export const SignOutButton = ({
  displayName,
}: {
  displayName: string | null;
}) => {
  if (displayName) {
    return (
      <button
        className="bg-babyPink flex items-center hover:bg-altBabyPink text-black text-xs p-1 mx-2 rounded-full md:py-5 md:px-10 md:text-base"
        onClick={() => logout()}
      >
        <div className="hidden md:block md:mr-1">{<FaSpotify />}</div>
        <div className={`${unbounded.className}`}>
          Log Out {displayName.toUpperCase()}
        </div>
      </button>
    );
  }
};
