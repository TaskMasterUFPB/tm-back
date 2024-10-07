import { AtualiarProjeto, CriarProjeto } from "../dtos/ICriaProjeto";
import { IProjetoRepositorio } from "../repositorios/IProjetoRepositorio";

export class ProjetoServico {
    constructor(private projetoRepositorio: IProjetoRepositorio) {
        this.projetoRepositorio = projetoRepositorio;
    }

    async criar(data: CriarProjeto) {
        const { nome, descricao, id_criador, id_lider, url, dataInicio, participantes_id } = data;
        return await this.projetoRepositorio.criar({
            nome,
            descricao,
            url,
            dataInicio: dataInicio ? new Date(dataInicio) : undefined, // optional start date
            deletado: false,
            Participantes: {
                connect: participantes_id.map(id => ({ id })),
            },
            Criado: {
                connect: { id: id_criador },
            },
            Lider: {
                connect: { id: id_lider },
            }
        });
    }

    async deletar(id: string) {
        return await this.projetoRepositorio.deletar(id);
    }

    async atualizar(id: string, data: AtualiarProjeto) {
        return await this.projetoRepositorio.atualizar(id, data);
    }

    async buscarPorId(id: string) {
        return await this.projetoRepositorio.buscarPorId(id);
    }

    async buscarTodos(id_criador: string) {
        return await this.projetoRepositorio.buscarTodos(id_criador);
    }

    async buscarTodosDeParticipante(id_participante: string) {
        return await this.projetoRepositorio.buscarTodosProjetosDeParticipante(id_participante);
    }
} 