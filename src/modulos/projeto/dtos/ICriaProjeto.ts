export interface CriarProjeto {
    nome: string
    descricao: string
    id_criador: string
    id_lider: string
    url: string
    dataInicio?: Date
    participantes_id: string[]
}

export interface AtualiarProjeto {
    nome: string
    descricao: string
    id_lider: string
    url: string
    dataInicio?: Date
}

