"use client";

import { FormEvent, useState } from "react";
import { handleSubmit } from "./actions";

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);

  async function handleAddress(event: FormEvent) {
    event.preventDefault();

    if (!window.ethereum) {
      console.error("Web3 not detected");
      return;
    }

    const data = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!Array.isArray(data) || data.length === 0) {
      console.error("Address invalid");
      return;
    }

    const address = data[0];
    if (typeof address !== "string" || address.length === 0) {
      console.error("Address invalid");
      return;
    }

    setAddress(address);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <div className="flex gap-2">
        <button onClick={handleAddress}>Get address</button>
        <span>{address || "Waiting"}</span>
      </div>

      <form action={() => handleSubmit(address)}>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
