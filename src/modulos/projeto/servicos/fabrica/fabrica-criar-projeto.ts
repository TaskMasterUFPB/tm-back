import { ProjetoRepositorio } from "../../repositorios/ProjetoRepositorio"
import { CriaProjetoServico } from "../CriaProjetoServico"

export function fabricaCriarProjeto() {
    const projetoRepositorio = new ProjetoRepositorio()
    const criarProjetoRepositorio = new CriaProjetoServico(projetoRepositorio)

    return criarProjetoRepositorio
}