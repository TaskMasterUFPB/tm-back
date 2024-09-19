import { AtualiarProjeto, CriarProjeto } from "../dtos/ICriaProjeto";
import { IProjetoRepositorio } from "../repositorios/IProjetoRepositorio";

export class ProjetoServico {
    constructor(private projetoRepositorio: IProjetoRepositorio) {
        this.projetoRepositorio = projetoRepositorio;
    }

    async criar(data: CriarProjeto) {
        return await this.projetoRepositorio.criar(data);
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
} 