import { UsuarioController } from '../src/modulos/usuario/http/controlador/UsuarioControlador';
import { UsuarioService } from '../src/modulos/usuario/servicos/UsuarioServico';
import { mock, instance, when, verify } from 'ts-mockito';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Cargo, Usuario } from '@prisma/client';
import { CriarUsuario } from '../src/modulos/usuario/dtos/IUsuario';

interface IdParams {
  id: string;
}

// Mocking de FastifyRequest e FastifyReply
let mockRequest: FastifyRequest<{ Params: IdParams }>;
let mockReply: FastifyReply;

// Mocking de UsuarioService
const usuarioServiceMock = mock(UsuarioService);

// Instância do Controller usando o service mockado
const usuarioController = new UsuarioController();
usuarioController['usuarioService'] = instance(usuarioServiceMock);

describe('UsuarioController', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Limpar mocks entre os testes

    // Redefine mockRequest e mockReply antes de cada teste
    mockRequest = {
      params: { id: '123' },
      body: {} // Inicializa o corpo vazio para ser definido em cada teste
    } as FastifyRequest<{ Params: IdParams }>;

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  // Está com problemas técnicos
  // it('deve criar um usuário e retornar status 201', async () => {
  //   // Dados completos
  //   const data: CriarUsuario = {
  //     nome: 'Teste',
  //     email: 'teste@teste.com',
  //     senha: 'senhaSegura',
  //     cargo: 'ADM',
  //     projetoId: 'projeto123',
  //   };

  //     // Define o corpo do mockRequest
  //   mockRequest.body = data;

  //   // Dados simulados de retorno da função criar do usuarioService
  //   const novoUsuario = { 
  //     id: '123', 
  //     nome: 'Teste',
  //     email: 'teste@teste.com',
  //     senha: 'senhaSegura', // Hash de senha ou senha fictícia
  //     cargo: 'ADM', 
  //     deletado: false, // Inclui o campo deletado
  //     projetoId: 'projeto123' 
  //   };

  //   when(usuarioServiceMock.criar(data)).thenResolve(novoUsuario as any)

  //   // Executa a função criar do controller
  //   await usuarioController.criar(mockRequest, mockReply);

  //   // Verifica se o usuarioService foi chamado corretamente com os dados
  //   expect(usuarioServiceMock.criar).toHaveBeenCalledWith(data);

  //   // Verifica se a resposta tem o status e o conteúdo corretos
  //   expect(mockReply.status).toHaveBeenCalledWith(201);
  //   expect(mockReply.send).toHaveBeenCalledWith(novoUsuario);


  // });

  it('deve retornar um erro 400 ao falhar na criação do usuário', async () => {
    // Definindo dados incompletos para simular erro
    mockRequest.body = {}; // Corpo vazio para simular dados incompletos

    when(usuarioServiceMock.criar).thenCall((data: CriarUsuario) => {
      // Lança um erro se os dados estiverem incompletos
      if (!data || !data.nome || !data.email || !data.senha || !data.cargo) {
        throw new Error('Dados incompletos');
      }
      return Promise.resolve({
        id: '123',
        nome: data.nome,
        email: data.email,
        senha: 'hashedpassword',
        cargo: data.cargo,
        deletado: false,
        projetoId: null
      });
    });

    await usuarioController.criar(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'Dados incompletos' });
  });

  it('deve buscar um usuário por ID e retornar status 200', async () => {
    const usuario: Usuario = {
      id: '123',
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: 'hashedpassword',
      cargo: 'FUNCIONARIO',
      deletado: false,
      projetoId: null
    };

    when(usuarioServiceMock.getId('123')).thenResolve(usuario);

    mockRequest.params = { id: '123' };

    await usuarioController.buscarPorId(mockRequest, mockReply);

    verify(usuarioServiceMock.getId('123')).called();
    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith(usuario);
  });

  it('deve retornar um erro 404 se o usuário não for encontrado', async () => {
    when(usuarioServiceMock.getId('123')).thenReject(new Error('Usuário não encontrado'));

    mockRequest.params = { id: '123' };

    await usuarioController.buscarPorId(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
  });

  // Continue criando testes para os outros métodos (atualizar, deletar, login) com lógica semelhante
});
