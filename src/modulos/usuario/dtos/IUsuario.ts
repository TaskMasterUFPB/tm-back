export interface CriarUsuario {
    nome: string
    email: string
    senha: string
    cargo: 'ADM' | 'FUNCIONARIO'
}

export interface AtualizarUsuario {
    nome?: string
    email?: string
    senha?: string
    cargo?: 'ADM' | 'FUNCIONARIO'
}
