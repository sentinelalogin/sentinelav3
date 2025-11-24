import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { pessoa_id } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    let query = supabase
      .from("relatos")
      .select("*")
      .order("criado_em", { ascending: false });

    // Se quiser filtrar por pessoa específica
    if (pessoa_id) {
      query = query.eq("pessoa_id", pessoa_id);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Erro ao buscar relatos:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Erro interno:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
