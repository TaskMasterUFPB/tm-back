import { FastifyReply, FastifyRequest } from "fastify";
import { fabricaCriarProjeto } from "../../servicos/fabrica/fabrica-criar-projeto";
import { z } from "zod";
import { CriarProjeto } from "../../dtos/ICriaProjeto";

export async function CirarProjetoControlador(request: FastifyRequest, reply: FastifyReply) {
    const ValidacaoValoresParaCriarProjeto = z.object({
        nome: z.string(),
        descricao: z.string(),
        id_lider: z.string(),
        url: z.string(),
        dataInicio: z.date().optional(),
    })

    const dadosProjeto: CriarProjeto = ValidacaoValoresParaCriarProjeto.parse(request.body)

    try {
        const criar = fabricaCriarProjeto()
        await criar.criar(dadosProjeto)

    } catch (err) {
        return reply.status(500).send({ message: 'Erro interno' })
    }
}