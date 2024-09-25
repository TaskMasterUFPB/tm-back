import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CriarTarefa } from "../../dtos/CriarTarefa";
import { fabricaTarefa } from "../../servicos/fabrica/fabrica-tarefa";

export class TarefaControlador {
    async CriarTarefa(request: FastifyRequest, reply: FastifyReply) {
        const ValidacaoValoresParaCriarTarefa = z.object({
            titulo: z.string(),
            descricao: z.string(),
            caso_teste: z.string(),
            prioridade: z.string(),
            complexidade: z.string(),
            status: z.string(),
            usuario_autor_id: z.string(),
            usuario_responsavel_id: z.string(),
            projeto_id: z.string(),
            dataInicio: z.date().optional(),
            dataFim: z.date().optional()
        })

        const dadosTarefa: CriarTarefa = ValidacaoValoresParaCriarTarefa.parse(request.body)
        try {
            const tarefa = fabricaTarefa()
            await tarefa.criar(dadosTarefa)
            return reply.status(201).send({ message: 'Tarefa criada com sucesso' })
        } catch (err) {
            return reply.status(500).send({ message: 'Erro interno' })
        }
    }

    async ListarTarefas(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params
        try {
            const tarefa = fabricaTarefa()
            const tarefas = await tarefa.listar(id)
            return reply.send(tarefas)
        } catch (err) {
            return reply.status(500).send({ message: 'Erro interno' })
        }
    }
}