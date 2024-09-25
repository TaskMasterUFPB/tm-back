import { Prisma } from "@prisma/client";
import { ITarefaRepositorio } from "./ITarefaRepositorio";
import { prisma } from "../../../lib/prisma";

export class TarefaRepositorio implements ITarefaRepositorio {
    async criar(data: Prisma.TarefaCreateInput) {
        return await prisma.tarefa.create({ data });
    }

    async buscarPorId(id: string) {
        return await prisma.tarefa.findUnique({ where: { id } });
    }

    async buscarTodos(projeto_id: string) {
        return await prisma.tarefa.findMany({ where: { projeto_id } });
    }

    async atualizar(id: string, data: Prisma.TarefaUpdateInput) {
        return await prisma.tarefa.update({ where: { id }, data });
    }

    async deletar(id: string) {
        return await prisma.tarefa.delete({ where: { id } });
    }
}