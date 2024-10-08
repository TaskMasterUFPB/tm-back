import { Prisma, Projeto } from "@prisma/client";

export interface IProjetoRepositorio {
    criar(data: Prisma.ProjetoCreateInput): Promise<Projeto>
    buscarPorId(id: string): Promise<Projeto | null>
    buscarTodos(id_criador: string): Promise<Projeto[]>
    atualizar(id: string, data: Prisma.ProjetoUpdateInput): Promise<Projeto | null>
    deletar(id: string): Promise<Projeto | null>
    buscarTodosProjetosDeParticipante(participante_id: string): Promise<Projeto[]>
    buscarOndeLidero(lider_id: string): Promise<Projeto[]>
    buscarOndeCriei(criador_id: string): Promise<Projeto[]>
}