"use server";
import { Main } from "./main";
import { auth } from "@/auth";
export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return <Main sessionData={session} />;
  }

  return <Main sessionData={null} />;
}
