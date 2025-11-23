"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();
  const client = supabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form className="bg-white p-6 rounded shadow w-full max-w-sm" onSubmit={handleLogin}>
      <h1 className="text-xl font-bold mb-4">Entrar</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        className="w-full p-3 border rounded mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full p-3 bg-pink-600 text-white rounded">
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
