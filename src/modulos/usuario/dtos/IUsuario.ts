import { Cargo } from "@prisma/client";

export interface CriarUsuario {
    nome: string
    email: string
    senha: string
    cargo: Cargo
    projetoId?: string | null;
}

export interface AtualizarUsuario {
    nome?: string
    email?: string
    senha?: string
    cargo?: 'ADM' | 'FUNCIONARIO'
}
