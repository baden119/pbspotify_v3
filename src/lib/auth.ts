/*
NextAuth setup adapted from YouTube Tutorial.
https://www.youtube.com/watch?v=n-fVrzaikBQ
https://github.com/machadop1407/nextjs-15-authentication-next-auth
*/

"use server";
import { signIn, signOut } from "@/auth";

export const login = async () => {
  await signIn("SpotifyProvider", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};