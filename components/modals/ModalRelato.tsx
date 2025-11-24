"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ModalRelato({ open, onClose, pessoa, usuario, onSalvo }: any) {
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  if (!pessoa) return null;

  const handleSave = async () => {
    if (!tipo || !descricao) {
      alert("Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        pessoa_id: pessoa.id,
        tipo,
        descricao,
        usuario_id: usuario?.id ?? null, // ← ESSENCIAL
      };

      const res = await fetch("/api/relatos/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        alert("Erro ao salvar relato.");
      } else {
        onSalvo();
        setTipo("");
        setDescricao("");
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
          <DialogTitle>
            Novo Relato
            <br />
            <span className="text-sm font-normal text-gray-500">
              Adicione um relato sobre: <strong>{pessoa.nome}</strong>
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* CAMPO TIPO */}
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

        {/* CAMPO DESCRIÇÃO */}
        <div className="space-y-1 mt-4">
          <label className="text-sm font-medium">Descrição *</label>
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva o ocorrido..."
            className="w-full h-28"
          />
        </div>

        {/* BOTÃO */}
        <Button className="w-full mt-6" onClick={handleSave} disabled={loading}>
          {loading ? "Salvando..." : "Salvar relato"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
