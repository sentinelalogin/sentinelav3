"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";

import ModalBuscar from "../../components/modals/ModalBuscar";
import ModalResultados from "../../components/modals/ModalResultados";
import ModalCadastroPessoa from "../../components/modals/ModalCadastroPessoa";
import ModalRelato from "../../components/modals/ModalRelato";

export default function DashboardPage() {
  const [openBuscar, setOpenBuscar] = useState(false);
  const [openResultados, setOpenResultados] = useState(false);
  const [openCadastroPessoa, setOpenCadastroPessoa] = useState(false);
  const [openRelato, setOpenRelato] = useState(false);

  const [resultados, setResultados] = useState<any[]>([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState<any>(null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Painel Sentinela V3</h1>

      <div className="space-y-4">
        {/* BOTÃO BUSCAR */}
        <Button className="w-full" onClick={() => setOpenBuscar(true)}>
          Buscar Relatado
        </Button>

        {/* BOTÃO NOVO RELATO – AGORA ABRE DIRETO */}
        <Button
          className="w-full"
          onClick={() => {
            setOpenRelato(true); // AGORA ABRE SEM EXIGIR SELEÇÃO
          }}
        >
          Novo Relato
        </Button>

        <Button variant="secondary" className="w-full">
          Nova Consulta (em breve)
        </Button>
      </div>

      {/* MODAL - BUSCAR */}
      <ModalBuscar
        open={openBuscar}
        onClose={() => setOpenBuscar(false)}
        onResult={(lista) => {
          setResultados(lista);
          setOpenResultados(true);
        }}
      />

      {/* MODAL - RESULTADOS */}
      <ModalResultados
        open={openResultados}
        onClose={() => setOpenResultados(false)}
        resultados={resultados}
        onSelectPessoa={(pessoa) => {
          setPessoaSelecionada(pessoa);
          setOpenResultados(false);
          setOpenRelato(true);
        }}
        onCadastrarNova={() => {
          setOpenResultados(false);
          setOpenCadastroPessoa(true);
        }}
      />

      {/* MODAL - CADASTRO PESSOA */}
      <ModalCadastroPessoa
        open={openCadastroPessoa}
        onClose={() => setOpenCadastroPessoa(false)}
        onCreated={(novaPessoa) => {
          setPessoaSelecionada(novaPessoa);
          setOpenCadastroPessoa(false);
          setOpenRelato(true);
        }}
      />

      {/* MODAL - RELATO */}
      <ModalRelato
        open={openRelato}
        onClose={() => setOpenRelato(false)}
        pessoa={pessoaSelecionada}
        listaPessoas={resultados}       // <--- AQUI ENTRA A LISTA DE PESSOAS
        onSalvo={() => {
          setOpenRelato(false);
          alert("Relato salvo com sucesso!");
        }}
      />
    </div>
  );
}
