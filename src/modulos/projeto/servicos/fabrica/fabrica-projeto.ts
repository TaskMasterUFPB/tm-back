import { ProjetoRepositorio } from "../../repositorios/ProjetoRepositorio"
import { ProjetoServico } from "../CriaProjetoServico"

export function fabricaProjeto() {
    const projetoRepositorio = new ProjetoRepositorio()
    const fabricaProjetoServico = new ProjetoServico(projetoRepositorio)

    return fabricaProjetoServico
}