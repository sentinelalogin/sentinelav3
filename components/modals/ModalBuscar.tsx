"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ModalBuscarProps {
  open: boolean;
  onClose: () => void;
  onResult: (resultados: any[]) => void; // resultado vai abrir o ModalResultados
}

export default function ModalBuscar({ open, onClose, onResult }: ModalBuscarProps) {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [redeSocial, setRedeSocial] = useState("");
  const [link, setLink] = useState("");
  const [telefone, setTelefone] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleBuscar() {
    if (!nome.trim() || !cidade.trim() || !redeSocial.trim() || !link.trim()) {
      alert("Preencha os 4 campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/relatados/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          cidade,
          rede_social: redeSocial,
          link,
          telefone: telefone || null,
        }),
      });

      const json = await res.json();

      onClose(); // fecha o modal
      onResult(json.resultados || []); // abre modal de resultados

    } catch (err) {
      console.error(err);
      alert("Erro ao buscar.");
    }

    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Buscar pessoa relatada</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para encontrar a pessoa antes de relatar.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">

          {/* Nome */}
          <div>
            <label className="text-sm font-medium">Nome completo *</label>
            <Input
              placeholder="Ex: João da Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Cidade */}
          <div>
            <label className="text-sm font-medium">Cidade *</label>
            <Input
              placeholder="Ex: São Paulo"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>

          {/* Rede Social */}
          <div>
            <label className="text-sm font-medium">Rede Social *</label>
            <Select onValueChange={setRedeSocial}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Link perfil */}
          <div>
            <label className="text-sm font-medium">Link do perfil *</label>
            <Input
              placeholder="Ex: https://instagram.com/usuario"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Telefone (opcional) */}
          <div>
            <label className="text-sm font-medium">Telefone (opcional)</label>
            <Input
              placeholder="(opcional)"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          {/* Botão */}
          <Button onClick={handleBuscar} disabled={loading} className="w-full">
            {loading ? "Buscando..." : "Buscar"}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}
