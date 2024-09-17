import { Prisma, Projeto } from "@prisma/client";

export interface IProjetoRepositorio {
    criar(data: Prisma.ProjetoCreateInput): Promise<Projeto>
    buscarPorId(id: string): Promise<Projeto | null>
    buscarTodos(): Promise<Projeto[]>
    atualizar(id: string, data: Prisma.ProjetoUpdateInput): Promise<Projeto | null>
    deletar(id: string): Promise<Projeto | null>
}