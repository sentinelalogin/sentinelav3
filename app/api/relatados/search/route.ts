
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const body = await req.json();
  const { nome, cidade, rede_social, telefone } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from('pessoas_relatadas')
    .select('*')
    .ilike('nome_busca', `%${nome}%`);

  return NextResponse.json({ resultados: data });
}
