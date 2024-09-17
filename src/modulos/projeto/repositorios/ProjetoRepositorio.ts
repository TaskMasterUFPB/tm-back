import { Prisma } from "@prisma/client";
import { IProjetoRepositorio } from "./IProjetoRepositorio";
import { prisma } from "../../../lib/prisma";

export class ProjetoRepositorio implements IProjetoRepositorio {

    async criar(data: Prisma.ProjetoCreateInput) {
        const projeto = await prisma.projeto.create({
            data
        })

        return projeto
    }

    async buscarPorId(id: string) {
        return await prisma.projeto.findUnique({
            where: {
                id
            }
        })
    }

    async buscarTodos() {
        return await prisma.projeto.findMany()
    }

    async atualizar(id: string, data: Prisma.ProjetoUpdateInput) {
        return await prisma.projeto.update({
            where: {
                id
            },
            data
        })
    }

    async deletar(id: string) {
        return await prisma.projeto.update({
            where: {
                id
            }, data: {
                deletado: true
            }
        })
    }
}