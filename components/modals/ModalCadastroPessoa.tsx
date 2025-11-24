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

interface ModalCadastroPessoaProps {
  open: boolean;
  onClose: () => void;
  onCreated: (pessoa: any) => void;
}

export default function ModalCadastroPessoa({
  open,
  onClose,
  onCreated,
}: ModalCadastroPessoaProps) {
  const [form, setForm] = useState({
    nome: "",
    cidade: "",
    rede_social: "",
    link: "",
    telefone: "",
  });

  const [loading, setLoading] = useState(false);

  const atualizar = (campo: string, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const salvar = async () => {
    if (!form.nome || !form.cidade || !form.rede_social || !form.link) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    setLoading(true);

    const req = await fetch("/api/relatados/create", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const res = await req.json();
    setLoading(false);

    if (res.error) {
      console.error(res.error);
      alert("Erro ao salvar.");
      return;
    }

    onCreated(res.data[0]);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Cadastrar nova pessoa</DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar uma pessoa relatada.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-sm">Nome completo *</label>
            <Input
              value={form.nome}
              onChange={(e) => atualizar("nome", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Cidade *</label>
            <Input
              value={form.cidade}
              onChange={(e) => atualizar("cidade", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Rede Social *</label>
            <Select
              onValueChange={(v) => atualizar("rede_social", v)}
              value={form.rede_social}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm">Link do perfil *</label>
            <Input
              value={form.link}
              onChange={(e) => atualizar("link", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Telefone (opcional)</label>
            <Input
              value={form.telefone}
              onChange={(e) => atualizar("telefone", e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={salvar} disabled={loading}>
            {loading ? "Salvando..." : "Salvar pessoa"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
