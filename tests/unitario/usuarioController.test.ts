import { UsuarioController } from '../../src/modulos/usuario/http/controlador/UsuarioControlador';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UsuarioService } from '../../src/modulos/usuario/servicos/UsuarioServico';
import { Cargo } from '@prisma/client';

jest.mock('../../src/modulos/usuario/servicos/UsuarioServico');

describe('UsuarioController', () => {
    let usuarioController: UsuarioController;
    let usuarioServiceMock: jest.Mocked<UsuarioService>;
  
    // Mock para FastifyReply
    const mockReply = () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      return res as unknown as FastifyReply;
    };

    // Mock para FastifyRequest
    const mockRequest = (body: any = {}, params: any = {}) => {
        return {
        body,
        params
        } as FastifyRequest;
    };

    beforeEach(() => {
        usuarioServiceMock = new UsuarioService() as jest.Mocked<UsuarioService>;
        usuarioController = new UsuarioController();
        // Injetando o mock no controller
        (usuarioController as any).usuarioService = usuarioServiceMock;
      });

    it('deve criar um novo usuário e retornar status 201', async () => {
        const req = mockRequest({nome: "Teste", email: "teste@gmail.com", senha: "teste123", cargo: 'FUNCIONARIO', projetoId: null});
        const res = mockReply();
        const novoUsuario = {id: '123',nome: "Teste", email: "teste@gmail.com", senha: "teste123", cargo: Cargo.FUNCIONARIO, deletado: false, projetoId: null}
        usuarioServiceMock.criar.mockResolvedValue(novoUsuario);

        await usuarioController.criar(req, res);

        expect(usuarioServiceMock.criar).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(novoUsuario);
    })

    it('deve retornar erro 400 ao falhar na criação de um usuário', async () => {
        const req = mockRequest({nome: "Teste", email: "teste@gmail.com", senha: "teste123", cargo: 'FUNCIONARIO', projetoId: null});
        const res = mockReply();
        const error = new Error('Erro no método criar');

        usuarioServiceMock.criar.mockRejectedValue(error);

        await usuarioController.criar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({error: error.message})
    })

    it('deve autenticar usuário e retornar um token', async () => {
        const req = mockRequest({nome: "Teste", email: "teste@gmail.com", senha: "teste123", cargo: 'FUNCIONARIO', projetoId: null});
        const res = mockReply();
        const token = 'token-jwt';
        usuarioServiceMock.autenticar.mockResolvedValue({id: '123',nome: "Teste", email: "teste@gmail.com", senha: "teste123", cargo: Cargo.FUNCIONARIO, deletado: false, projetoId: null});
        usuarioServiceMock.gerarToken.mockResolvedValue(token);

        await usuarioController.login(req, res);

        expect(usuarioServiceMock.autenticar).toHaveBeenCalledWith('teste@gmail.com', 'teste123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ token });
    })

});

