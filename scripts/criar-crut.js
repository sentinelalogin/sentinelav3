// scripts/criar-crut.js

const fs = require("fs");
const path = require("path");

function criarArquivo(caminho, conteudo) {
  const dir = path.dirname(caminho);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(caminho, conteudo);
  console.log("Criado:", caminho);
}

// ===== Rotas API =====

criarArquivo(
  "app/api/relatados/search/route.ts",
  `
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
    .ilike('nome_busca', \`%\${nome}%\`);

  return NextResponse.json({ resultados: data });
}
`
);

criarArquivo(
  "app/api/relatados/create/route.ts",
  `
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('pessoas_relatadas')
    .insert([body])
    .select();

  return NextResponse.json({ data, error });
}
`
);

criarArquivo(
  "app/api/relatos/create/route.ts",
  `
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('relatos')
    .insert([body])
    .select();

  return NextResponse.json({ data, error });
}
`
);

// ===== Modais =====

criarArquivo(
  "components/modals/ModalBuscar.tsx",
  `
export default function ModalBuscar() {
  return <div>ModalBuscar</div>;
}
`
);

criarArquivo(
  "components/modals/ModalResultados.tsx",
  `
export default function ModalResultados() {
  return <div>ModalResultados</div>;
}
`
);

criarArquivo(
  "components/modals/ModalCadastroPessoa.tsx",
  `
export default function ModalCadastroPessoa() {
  return <div>ModalCadastroPessoa</div>;
}
`
);

criarArquivo(
  "components/modals/ModalRelato.tsx",
  `
export default function ModalRelato() {
  return <div>ModalRelato</div>;
}
`
);

console.log("\\nEstrutura CRUT criada com sucesso!");
