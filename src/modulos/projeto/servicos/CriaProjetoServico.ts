import { CriarProjeto } from "../dtos/ICriaProjeto";
import { IProjetoRepositorio } from "../repositorios/IProjetoRepositorio";

export class CriaProjetoServico {
    constructor(private projetoRepositorio: IProjetoRepositorio) {
        this.projetoRepositorio = projetoRepositorio;
    }

    async criar(data: CriarProjeto) {
        return await this.projetoRepositorio.criar(data);
    }
} 