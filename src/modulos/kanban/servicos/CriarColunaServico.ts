import { CriarColuna } from "../dtos/CriarColuna";
import { IColunaRepositorio } from "../repositorios/IColunaRepositorio";

export class ColunaServico {
    constructor(private colunaRepositorio: IColunaRepositorio) {
        this.colunaRepositorio = colunaRepositorio;
    }

    async criar(data: CriarColuna, projetoId: string) {
        const { titulo } = data;
        return await this.colunaRepositorio.criar({
            titulo,
            projeto_id: projetoId // Associar a coluna ao projeto
        });
    }

    async listar(projeto_id: string) {
        return await this.colunaRepositorio.buscarTodos(projeto_id);
    }

    async atualizar(id: string, data: CriarColuna) {
        return await this.colunaRepositorio.atualizar(id, { titulo: data.titulo });
    }

    async deletar(id: string) {
        return await this.colunaRepositorio.deletar(id);
    }
}
