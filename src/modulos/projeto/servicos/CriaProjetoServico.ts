import { IUsuarioRepositorio } from "../../usuario/repositorios/IUsuarioRepositorio";
import { AtualiarProjeto, CriarProjeto } from "../dtos/ICriaProjeto";
import { IProjetoRepositorio } from "../repositorios/IProjetoRepositorio";

export class ProjetoServico {
    constructor(private projetoRepositorio: IProjetoRepositorio, private usuarioRepositorio: IUsuarioRepositorio) {
        this.projetoRepositorio = projetoRepositorio;
        this.usuarioRepositorio = usuarioRepositorio;
    }

    async criar(data: CriarProjeto) {
        const { nome, descricao, id_criador, url, dataInicio, emailParticipantes, email_lider } = data;

        if (!email_lider) {
            throw new Error("Email do líder é obrigatório.");
        }
        const buscaUsuarioPorEmail = await this.usuarioRepositorio.buscarPorEmail(email_lider);

        return await this.projetoRepositorio.criar({
            nome,
            descricao,
            url,
            dataInicio: dataInicio ? new Date(dataInicio) : undefined, // optional start date
            deletado: false,
            email_lider,
            Participantes: {
                connect: { id: buscaUsuarioPorEmail?.id },
            },
            Criado: {
                connect: { id: id_criador },
            },
            Lider: {
                connect: { id: buscaUsuarioPorEmail?.id },
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

    async listarEnvolvidosNoProjeto(id_usuario: string) {
        const particpantes = await this.projetoRepositorio.buscarTodosProjetosDeParticipante(id_usuario);
        const lider = await this.projetoRepositorio.buscarOndeLidero(id_usuario)
        const criador = await this.projetoRepositorio.buscarOndeCriei(id_usuario)

        const projetos = [...particpantes, ...lider, ...criador]

        return {
            projetos
        }
    }
} 