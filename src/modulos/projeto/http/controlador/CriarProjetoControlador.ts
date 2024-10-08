import { FastifyReply, FastifyRequest } from "fastify";
import { fabricaProjeto } from "../../servicos/fabrica/fabrica-projeto";
import { z } from "zod";
import { CriarProjeto } from "../../dtos/ICriaProjeto";

export async function CriarProjetoControlador(request: FastifyRequest, reply: FastifyReply) {
    const ValidacaoValoresParaCriarProjeto = z.object({
        nome: z.string(),
        descricao: z.string(),
        id_criador: z.string(),
        url: z.string(),
        dataInicio: z.date().optional(),
        emailParticipantes: z.array(z.string()),
        email_lider: z.string()
    })

    let dadosProjeto: CriarProjeto;

    try {
        dadosProjeto = ValidacaoValoresParaCriarProjeto.parse(request.body);
    } catch (err) {
        const validationError = err as z.ZodError;
        return reply.status(400).send({ message: 'Erro de validação dos dados', detalhes: validationError.errors });
    }

    try {
        const projeto = fabricaProjeto();
        await projeto.criar(dadosProjeto);
        return reply.status(201).send({ message: 'Projeto criado com sucesso' });
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(400).send({ message: 'Erro específico do negócio', detalhes: err.message });
        }

        console.error('Erro inesperado ao criar o projeto:', err);
        return reply.status(500).send({ message: 'Erro interno ao criar o projeto' });
    }
}