import { UsuarioRepositorio } from "../../../usuario/repositorios/UsuarioRepositorio"
import { ProjetoRepositorio } from "../../repositorios/ProjetoRepositorio"
import { ProjetoServico } from "../CriaProjetoServico"

export function fabricaProjeto() {
    const projetoRepositorio = new ProjetoRepositorio()
    const usuarioRepositorio = new UsuarioRepositorio()
    const fabricaProjetoServico = new ProjetoServico(projetoRepositorio, usuarioRepositorio)

    return fabricaProjetoServico
}