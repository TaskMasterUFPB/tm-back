import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CriarColuna } from "../../dtos/CriarColuna";
import { fabricaColuna } from "../../servicos/fabrica/fabrica-coluna";

export class ColunaControlador {
    async CriarColuna(request: FastifyRequest, reply: FastifyReply) {
        const ValidacaoValoresParaCriarColuna = z.object({
            titulo: z.string(),
            projeto_id: z.string() // Agora validamos o projeto_id
        });

        const { titulo, projeto_id } = ValidacaoValoresParaCriarColuna.parse(request.body);
        try {
            const coluna = fabricaColuna();
            await coluna.criar({ titulo }, projeto_id); // Passamos o projeto_id para o serviço
            return reply.status(201).send({ message: 'Coluna criada com sucesso' });
        } catch (err) {
            return reply.status(500).send({ message: 'Erro interno' });
        }
    }

    async ListarColunas(request: FastifyRequest<{ Params: { projeto_id: string } }>, reply: FastifyReply) {
        const { projeto_id } = request.params;
        try {
            const coluna = fabricaColuna();
            const colunas = await coluna.listar(projeto_id); // Listar colunas por projeto
            return reply.send(colunas);
        } catch (err) {
            return reply.status(500).send({ message: 'Erro interno' });
        }
    }

    async AtualizarColuna(request: FastifyRequest<{ Params: { id: string }, Body: CriarColuna }>, reply: FastifyReply) {
        const { id } = request.params;
        const dadosAtualizados = request.body;

        try {
            const coluna = fabricaColuna();
            await coluna.atualizar(id, dadosAtualizados);
            return reply.send({ message: 'Coluna atualizada com sucesso' });
        } catch (err) {
            return reply.status(500).send({ message: 'Erro interno' });
        }
    }

    async DeletarColuna(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const coluna = fabricaColuna();
            await coluna.deletar(id);
            return reply.send({ message: 'Coluna deletada com sucesso' });
        } catch (err) {
            return reply.status(500).send({ message: 'Erro interno' });
        }
    }
}
