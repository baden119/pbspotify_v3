"use client";
import { login } from "@/lib/auth";
import { FaSpotify } from "react-icons/fa";
import { Unbounded } from "next/font/google";

const unbounded = Unbounded({
  weight: "300",
  subsets: ["latin"],
  preload: true,
});

export const SignInButton = () => {
  return (
    <button
      className="bg-babyPink flex items-center hover:bg-altBabyPink text-black text-xs p-1 mx-2 rounded-full md:py-5 md:px-10 md:text-base"
      onClick={() => login()}
    >
      <div className="hidden md:block md:mr-1">{<FaSpotify />}</div>
      <div className={`${unbounded.className}`}>Log in with Spotify</div>
    </button>
  );

  // <button onClick={() => login()}> Sign In To Spotify</button>;
};
