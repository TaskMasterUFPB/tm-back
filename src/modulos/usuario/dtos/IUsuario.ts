export interface CriarUsuario {
    nome: string
    email: string
    senha: string
    cargo: 'ADM' | 'FUNCIONARIO'
    projetoId?: string | null;
}

export interface AtualizarUsuario {
    nome?: string
    email?: string
    senha?: string
    cargo?: 'ADM' | 'FUNCIONARIO'
}
