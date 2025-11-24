import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { pessoa_id, tipo, descricao, usuario_id } = body;

    if (!pessoa_id) {
      return NextResponse.json(
        { error: "pessoa_id é obrigatório" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("relatos")
      .insert({
        pessoa_id: pessoa_id,   // <-- AGORA CORRETO
        tipo: tipo,
        descricao: descricao,
        usuario_id: usuario_id ?? null,
      })
      .select();

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
