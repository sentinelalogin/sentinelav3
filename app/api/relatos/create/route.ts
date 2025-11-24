import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Cliente público (ANON) — sem cookies
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Até você implementar login, vamos usar um usuário "fake" temporário
    const usuarioId = body.usuario_id ?? "00000000-0000-0000-0000-000000000000";

    const { data, error } = await supabase
      .from("relatos")
      .insert({
        pessoa_id: body.pessoa_id,
        tipo: body.tipo,
        descricao: body.descricao,
        usuario_id: usuarioId,
      })
      .select();

    if (error) {
      console.error("Erro ao inserir:", error);
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
