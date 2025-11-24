"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ModalRelato({
  open,
  onClose,
  pessoa,
  usuario,
  onSalvo,
}: any) {
  const [pessoaId, setPessoaId] = useState(pessoa?.id || "");
  const [busca, setBusca] = useState("");
  const [lista, setLista] = useState<any[]>([]);
  const [tipo, setTipo] = useState(""); // agora é seletor
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [buscando, setBuscando] = useState(false);

  // Buscar relatados digitando
  useEffect(() => {
    if (!busca.trim()) {
      setLista([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setBuscando(true);

      try {
        const res = await fetch("/api/relatados/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: busca,
            cidade: "",
            rede_social: "",
            link: "",
            telefone: "",
          }),
        });

        const json = await res.json();
        setLista(json.resultados || []);
      } catch (err) {
        console.error(err);
      }

      setBuscando(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [busca]);

  // se vier pessoa pré-selecionada
  useEffect(() => {
    if (pessoa) {
      setPessoaId(pessoa.id);
      setBusca(pessoa.nome);
    }
  }, [pessoa]);

  const handleSave = async () => {
    if (!pessoaId) {
      alert("Selecione uma pessoa para o relato.");
      return;
    }

    if (!tipo || !descricao) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        pessoa_id: pessoaId,
        tipo,
        descricao,
        usuario_id: usuario?.id ?? null,
      };

      const res = await fetch("/api/relatos/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) {
        alert("Erro ao salvar relato.");
      } else {
        onSalvo();
        setTipo("");
        setPessoaId("");
        setDescricao("");
        setBusca("");
      }
    } catch (err) {
      console.error(err);
      alert("Erro interno ao salvar.");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Relato</DialogTitle>
        </DialogHeader>

        {/* BUSCA DE RELATADO */}
        <div className="space-y-1 mt-4">
          <label className="text-sm font-medium">Relato para *</label>

          <Input
            placeholder="Digite o nome para buscar..."
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPessoaId("");
            }}
          />

          {/* LISTA DE RESULTADOS */}
          {buscando && <p className="text-sm text-gray-500">Buscando...</p>}

          {!buscando && lista.length > 0 && (
            <div className="border rounded-md max-h-40 overflow-y-auto mt-1">
              {lista.map((item) => (
                <div
                  key={item.id}
                  className="p-2 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setPessoaId(item.id);
                    setBusca(item.nome);
                    setLista([]);
                  }}
                >
                  <p className="font-medium">{item.nome}</p>
                  <p className="text-xs text-gray-600">{item.cidade}</p>
                </div>
              ))}
            </div>
          )}

          {/* Nenhum resultado */}
          {!buscando && busca.trim() !== "" && lista.length === 0 && (
            <p className="text-sm text-gray-500">Nenhum resultado encontrado.</p>
          )}
        </div>

        {/* SELETOR DE TIPO */}
        <div className="space-y-1 mt-4">
          <label className="text-sm font-medium">Tipo de comportamento *</label>
          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o tipo..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="controlador">Comportamento controlador</SelectItem>
              <SelectItem value="agressivo">Comportamento agressivo</SelectItem>
              <SelectItem value="ciumento">Comportamento ciumento</SelectItem>
              <SelectItem value="abuso_verbal">Abuso verbal</SelectItem>
              <SelectItem value="abuso_psicologico">Abuso psicológico</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* DESCRIÇÃO */}
        <div className="space-y-1 mt-4">
          <label className="text-sm font-medium">Descrição *</label>
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva o ocorrido..."
            className="w-full h-28"
          />
        </div>

        {/* SALVAR */}
        <Button className="w-full mt-6" onClick={handleSave} disabled={loading}>
          {loading ? "Salvando..." : "Salvar relato"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
