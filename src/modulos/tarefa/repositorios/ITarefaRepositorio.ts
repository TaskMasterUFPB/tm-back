import { Prisma, Tarefa } from "@prisma/client";

export interface ITarefaRepositorio {
    criar(data: Prisma.TarefaCreateInput): Promise<Tarefa>
    buscarPorId(id: string): Promise<Tarefa | null>
    buscarTodos(projeto_id: string): Promise<Tarefa[]>
    atualizar(id: string, data: Prisma.TarefaUpdateInput): Promise<Tarefa | null>
    deletar(id: string): Promise<Tarefa | null>
}