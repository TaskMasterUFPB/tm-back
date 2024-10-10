import { Prisma } from "@prisma/client";
import { IColunaRepositorio } from "./IColunaRepositorio";
import { prisma } from "../../../lib/prisma";

export class ColunaRepositorio implements IColunaRepositorio {
    async criar(data: Prisma.ColunaCreateInput) {
        return await prisma.coluna.create({ data });
    }

    async buscarPorId(id: string) {
        return await prisma.coluna.findUnique({ where: { id } });
    }

    async buscarTodos(projeto_id: string) {
        return await prisma.coluna.findMany({ where: { projeto_id } });
    }

    async atualizar(id: string, data: Prisma.ColunaUpdateInput) {
        return await prisma.coluna.update({ where: { id }, data });
    }

    async deletar(id: string) {
        return await prisma.coluna.delete({ where: { id } });
    }
}
