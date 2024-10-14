import { FastifyRequest, FastifyReply } from 'fastify';
import { ProjetoServico } from '../../src/modulos/projeto/servicos/CriaProjetoServico';
import { UsuarioService } from '../../src/modulos/usuario/servicos/UsuarioServico';
import { Cargo, Projeto } from '@prisma/client';
import { CriarProjeto } from '../../src/modulos/projeto/dtos/ICriaProjeto';

jest.mock('../../src/modulos/projeto/servicos/CriaProjetoServico');
jest.mock('../../src/modulos/usuario/servicos/UsuarioServico');

describe('Projeto e Usuario - Fluxo de Autenticação e Criação de Projetos', () => {
  let projetoServicoMock: jest.Mocked<ProjetoServico>;
  let usuarioServiceMock: jest.Mocked<UsuarioService>;

  const mockReply = () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    return res as unknown as FastifyReply;
  };

  // Função mockRequest ajustada para incluir tipos para `Body` e `Params`
  const mockRequest = (
    body: CriarProjeto = {} as CriarProjeto,
    params: { id_participante: string } = { id_participante: '' }
  ) => {
    return {
      body,
      params,
    } as FastifyRequest<{ Body: CriarProjeto; Params: { id_participante: string } }>;
  };

  beforeEach(() => {
    projetoServicoMock = new ProjetoServico({} as any, {} as any) as jest.Mocked<ProjetoServico>;
    usuarioServiceMock = new UsuarioService() as jest.Mocked<UsuarioService>;
  });

  // Função do controlador para criar um projeto
  async function criarProjetoHandler(
    req: FastifyRequest<{ Body: CriarProjeto }>,
    res: FastifyReply,
    servico: ProjetoServico
  ) {
    try {
      const projeto = await servico.criar(req.body);
      res.status(201).send({ message: 'Projeto criado com sucesso', projeto });
    } catch (error) {
      const err = error as Error;
      res.status(400).send({ message: 'Erro na criação do projeto', detalhes: err.message });
    }
  }

  it('deve autenticar o usuário e exibir a lista de projetos', async () => {
    const req = mockRequest({ nome: 'Projeto 1', descricao: 'Desc', id_criador: '123', id_lider: '123', url: 'url', dataInicio: new Date(Date.now()), email_lider: 'lider@example.com', emailParticipantes: ['user1@example.com', 'user2@example.com'] }, { id_participante: '123' });
    const res = mockReply();
    const projetosMock: Projeto[] = [{ id: '1', nome: 'Projeto 1', descricao: 'Desc', id_criador: '123', id_lider: '123', url: 'url', dataInicio: new Date(), deletado: false, email_lider: 'lider@example.com', emailParticipantes: ['user1@example.com', 'user2@example.com'] }];

    projetoServicoMock.buscarTodosDeParticipante.mockResolvedValue(projetosMock);
    const projetos = await projetoServicoMock.buscarTodosDeParticipante(req.params.id_participante);

    expect(projetoServicoMock.buscarTodosDeParticipante).toHaveBeenCalledWith('123');
    expect(projetos).toEqual(projetosMock);
  });

  it('deve criar um projeto com todos os dados necessários', async () => {
    const req = mockRequest({
      nome: 'Projeto Completo',
      descricao: 'Descrição completa',
      id_criador: '123',
      url: 'http://projeto.com',
      emailParticipantes: ['user1@example.com', 'user2@example.com'],
      email_lider: 'lider@example.com'
    });
    const res = mockReply();
    const novoProjeto: Projeto = { id: '1', nome: 'Projeto Completo', descricao: 'Descrição completa', id_criador: '123', id_lider: '123', emailParticipantes: ['user1@example.com', 'user2@example.com'], url: 'http://projeto.com', dataInicio: new Date(), deletado: false, email_lider: 'lider@example.com' };

    projetoServicoMock.criar.mockResolvedValue(novoProjeto);

    await criarProjetoHandler(req, res, projetoServicoMock);

    expect(projetoServicoMock.criar).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ message: 'Projeto criado com sucesso', projeto: novoProjeto });
  });

  it('deve retornar erro ao tentar criar projeto sem dados obrigatórios', async () => {
    const req = mockRequest({ nome: '', descricao: '', email_lider: '', id_criador: '', url: '' });
    const res = mockReply();
    projetoServicoMock.criar.mockRejectedValue(new Error('Dados obrigatórios ausentes'));

    await criarProjetoHandler(req, res, projetoServicoMock);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'Erro na criação do projeto', detalhes: 'Dados obrigatórios ausentes' });
  });
});
