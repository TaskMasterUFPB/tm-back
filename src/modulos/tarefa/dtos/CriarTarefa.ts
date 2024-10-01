export interface CriarTarefa {
    titulo: string
    descricao: string
    caso_teste: string
    prioridade: string
    complexidade: string
    status: string
    usuario_autor_id: string
    usuario_responsavel_id: string
    projeto_id: string
    dataInicio?: Date | string
    dataFim?: Date | string | null
}