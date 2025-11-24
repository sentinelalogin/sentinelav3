import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, cidade, rede_social } = body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // OR SEM QUEBRAS DE LINHA (FORMATO SUPABASE ACEITO)
    const query = 
      `nome.ilike.%${nome}%,cidade.ilike.%${cidade}%,rede_social.ilike.%${rede_social}%`;

    const { data, error } = await supabase
      .from("pessoas_relatadas")
      .select("*")
      .or(query);

    if (error) {
      console.error("ERRO SUPABASE:", error);
      return NextResponse.json({
        resultados: [],
        error: error.message,
      });
    }

    return NextResponse.json({ resultados: data ?? [] });

  } catch (e: any) {
    console.error("ERRO API:", e);
    return NextResponse.json({
      resultados: [],
      error: e.message,
    });
  }
}
