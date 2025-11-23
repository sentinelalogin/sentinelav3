"use client";

import { supabaseClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const client = supabaseClient();
  const router = useRouter();

  async function handleLogout() {
    await client.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Sair
    </button>
  );
}
