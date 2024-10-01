import { CriarTarefa } from "../dtos/CriarTarefa";
import { ITarefaRepositorio } from "../repositorios/ITarefaRepositorio";

export class TarefaServico {
    constructor(private tarefaRepositorio: ITarefaRepositorio) {
        this.tarefaRepositorio = tarefaRepositorio;
    }

    async criar(data: CriarTarefa) {
        const { titulo, descricao, caso_teste, prioridade, complexidade, status, usuario_autor_id, usuario_responsavel_id, projeto_id, dataInicio, dataFim } = data;
        return await this.tarefaRepositorio.criar({
            titulo,
            descricao,
            caso_teste,
            prioridade,
            complexidade,
            status,
            Autor: {
                connect: { id: usuario_autor_id }
            },
            Responsavel: {
                connect: { id: usuario_responsavel_id }
            },
            Projeto: {
                connect: { id: projeto_id }
            },
            dataInicio: dataInicio ? new Date(dataInicio) : null,
            dataFim: dataFim ? new Date(dataFim) : null
        })
    }

    async listar(proposta_id: string) {
        return await this.tarefaRepositorio.buscarTodos(proposta_id);
    }
}