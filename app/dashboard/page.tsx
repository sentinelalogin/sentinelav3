import { supabaseServer } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardPage() {
  const supabase = supabaseServer();
  const { data: relatos } = await supabase
    .from("relatos")
    .select("id, titulo, conteudo, criado_em, relatado:relatado_id (nome, cidade, link_social)")
    .order("criado_em", { ascending: false });

  return (
    <div className="p-6">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-pink-600">Painel Sentinela V3</h1>
        <LogoutButton />
      </header>

      <h2 className="text-lg mt-6 font-bold">Relatos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {(relatos || []).map((item) => (
          <div key={item.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold text-lg">{item.titulo}</h3>
            <p className="text-sm text-gray-600">{item.relatado?.cidade}</p>
            <p className="mt-2 text-gray-800">{item.conteudo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
