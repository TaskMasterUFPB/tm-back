import { TarefaRepositorio } from "../../repositorios/TarefaRepositorio"
import { TarefaServico } from "../TarefaServico"


export function fabricaTarefa() {
    const tarefaRepositorio = new TarefaRepositorio()
    const fabricaTarefaServico = new TarefaServico(tarefaRepositorio)

    return fabricaTarefaServico
}