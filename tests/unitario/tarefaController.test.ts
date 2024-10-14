import { TarefaControlador } from "../../src/modulos/tarefa/http/controller/TarefaControlador";
import { FastifyRequest, FastifyReply } from 'fastify';
import { TarefaServico } from "../../src/modulos/tarefa/servicos/TarefaServico";
import { UsuarioService } from "../../src/modulos/usuario/servicos/UsuarioServico";
import { ProjetoServico } from "../../src/modulos/projeto/servicos/CriaProjetoServico";
import { Projeto, Usuario } from "@prisma/client";

jest.mock("../../src/modulos/tarefa/servicos/TarefaServico");
jest.mock("../../src/modulos/usuario/servicos/UsuarioServico");
jest.mock("../../src/modulos/projeto/servicos/CriaProjetoServico");

describe('TarefaController', () => {
    let tarefaController: TarefaControlador;
    let tarefaServiceMock: jest.Mocked<TarefaServico>;
    let usuarioServiceMock: jest.Mocked<UsuarioService>;
    let projetoServicoMock: jest.Mocked<ProjetoServico>;
    let usuarioAutor: Usuario; 
    let usuarioResponsavel: Usuario;
    let usuarioOutroProjeto: Usuario;
    let projeto1: Projeto;
    let projeto2: Projeto;

    const mockReply = () => {
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
        return res as unknown as FastifyReply;
    };

    const mockRequest = (body: any = {}, params: any = {}) => {
        return {
            body,
            params
        } as FastifyRequest;
    };

    beforeEach(async () => {
        tarefaServiceMock = new TarefaServico({} as any) as jest.Mocked<TarefaServico>;
        usuarioServiceMock = new UsuarioService() as jest.Mocked<UsuarioService>;
        projetoServicoMock = new ProjetoServico({} as any, {} as any) as jest.Mocked<ProjetoServico>;
        
        tarefaController = new TarefaControlador();
        // Atribuir a instância mockada ao controlador
        (tarefaController as any).tarefaService = tarefaServiceMock;

        usuarioAutor = {
            id: '1',
            nome: 'Autor',
            email: 'autor@example.com',
            senha: 'senhaSegura',
            cargo: 'FUNCIONARIO',
            deletado: false,
            projetoId: null
        } as Usuario;

        usuarioResponsavel = {
            id: '2',
            nome: 'Responsável',
            email: 'responsavel@example.com',
            senha: 'senhaSegura1',
            cargo: 'FUNCIONARIO',
            deletado: false,
            projetoId: null
        } as Usuario;

        usuarioOutroProjeto = {
            id: '3',
            nome: 'Outro Projeto',
            email: 'outroprojeto@example.com',
            senha: 'senhaSegura3',
            cargo: 'FUNCIONARIO',
            deletado: false,
            projetoId: null
        } as Usuario;

        projeto1 = {
            id: '1',
            nome: 'Projeto 1',
            descricao: 'Descrição do Projeto 1',
            id_criador: '1',
            id_lider: '2',
            url: 'www.google.com.br',
            dataInicio: new Date(),
            deletado: false,
            email_lider: 'responsavel@example.com',
            emailParticipantes: ['autor@example.com', 'responsavel@example.com']
        } as Projeto;

        projeto2 = {
            id: '2',
            nome: 'Projeto 2',
            descricao: 'Descrição do Projeto 2',
            id_criador: '3',
            id_lider: '2',
            url: 'friv.com',
            dataInicio: new Date(),
            deletado: false,
            email_lider: 'responsavel@example.com',
            emailParticipantes: ['outroprojeto@example.com', 'responsavel@example.com']
        } as Projeto;
    });

    it('deve criar uma tarefa associada ao autor e ao responsável', async () => {
        const req = mockRequest({
            titulo: 'Tarefa de Teste',
            descricao: 'Descrição da tarefa',
            caso_teste: 'Caso de teste',
            prioridade: 'Alta',
            complexidade: 'Média',
            status: 'Aberto',
            usuario_autor_id: usuarioAutor.id,
            usuario_responsavel_id: usuarioResponsavel.id,
            projeto_id: projeto1.id
        });
        const res = mockReply();

        tarefaServiceMock.criar.mockResolvedValueOnce({
            id: '1',
            titulo: 'Tarefa de Teste',
            descricao: 'Descrição da tarefa',
            caso_teste: 'Caso de teste',
            prioridade: 'Alta',
            complexidade: 'Média',
            status: 'Aberto',
            usuario_autor_id: usuarioAutor.id,
            usuario_responsavel_id: usuarioResponsavel.id,
            projeto_id: projeto1.id,
            dataCriacao: new Date(),
            dataInicio: new Date(),
            dataFim: null,
            deletado: false
        });

        await tarefaController.CriarTarefa(req, res);
        console.log('Chamadas para tarefaServiceMock.criar:', tarefaServiceMock.criar.mock.calls);

        expect(tarefaServiceMock.criar).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ message: 'Tarefa criada com sucesso' });
    });

    it('deve criar uma tarefa associada a outro projeto', async () => {
        const req = mockRequest({
            titulo: 'Tarefa de Outro Projeto',
            descricao: 'Descrição de outra tarefa',
            caso_teste: 'Caso de teste',
            prioridade: 'Baixa',
            complexidade: 'Alta',
            status: 'Concluído',
            usuario_autor_id: usuarioOutroProjeto.id,
            usuario_responsavel_id: usuarioResponsavel.id,
            projeto_id: projeto2.id
        });
        const res = mockReply();

        tarefaServiceMock.criar.mockResolvedValueOnce({
            id: '2',
            titulo: 'Tarefa de Outro Projeto',
            descricao: 'Descrição de outra tarefa',
            caso_teste: 'Caso de teste',
            prioridade: 'Baixa',
            complexidade: 'Alta',
            status: 'Concluído',
            usuario_autor_id: usuarioOutroProjeto.id,
            usuario_responsavel_id: usuarioResponsavel.id,
            projeto_id: projeto2.id,
            dataCriacao: new Date(),
            dataInicio: new Date(),
            dataFim: null,
            deletado: false
        });

        await tarefaController.CriarTarefa(req, res);
        console.log('Chamadas para tarefaServiceMock.criar:', tarefaServiceMock.criar.mock.calls);

        expect(tarefaServiceMock.criar).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ message: 'Tarefa criada com sucesso' });
    });
});
