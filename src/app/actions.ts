"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleSubmit(address: string | null) {
  if (address === null) return;

  const data = {
    address,
    isLoggedIn: true,
  };

  cookies().set("app@auth", JSON.stringify(data));
  redirect("/private");
}
