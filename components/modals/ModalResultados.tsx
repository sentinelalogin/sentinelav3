"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface ModalResultadosProps {
  open: boolean;
  onClose: () => void;
  resultados: any[];
  onSelectPessoa: (pessoa: any) => void;
  onCadastrarNova: () => void;
}

export default function ModalResultados({
  open,
  onClose,
  resultados,
  onSelectPessoa,
  onCadastrarNova,
}: ModalResultadosProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Resultados encontrados</DialogTitle>
          <DialogDescription>
            Selecione a pessoa correta ou cadastre uma nova.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {resultados.length > 0 ? (
            resultados.map((pessoa) => (
              <div
                key={pessoa.id}
                className="border p-3 rounded-md cursor-pointer hover:bg-gray-100 transition"
                onClick={() => onSelectPessoa(pessoa)}
              >
                <p className="font-semibold">{pessoa.nome}</p>
                <p className="text-sm text-gray-600">{pessoa.cidade}</p>
                <a
                  href={pessoa.rede_social}
                  target="_blank"
                  className="text-blue-600 text-sm underline"
                >
                  Abrir perfil
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              Nenhuma pessoa encontrada.
            </p>
          )}
        </div>

        <Button className="w-full mt-4" onClick={onCadastrarNova}>
          Cadastrar nova pessoa
        </Button>
      </DialogContent>
    </Dialog>
  );
}
