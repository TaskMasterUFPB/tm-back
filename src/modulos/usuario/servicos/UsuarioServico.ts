import { UsuarioRepositorio } from '../repositorios/UsuarioRepositorio';
import { CriarUsuario, AtualizarUsuario } from '../dtos/IUsuario';
import { Usuario } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Biblioteca para gerar o JWT

export class UsuarioService {
  private usuarioRepo: UsuarioRepositorio;

  constructor() {
    this.usuarioRepo = new UsuarioRepositorio();
  }

  // Criar um novo usuário
  async criar(data: CriarUsuario) {
    const usuarioExistente = await this.usuarioRepo.buscarPorEmail(data.email);
  
    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }
  
    const saltRounds = 10; // Número de rodadas de salt (ajustável)
    const hashedPassword = await bcrypt.hash(data.senha, saltRounds);
 
    const novoUsuario = await this.usuarioRepo.criar({
      ...data,
      senha: hashedPassword,
      projetoId: data.projetoId || null,
    });
    return novoUsuario;
  }

  // Atualizar um usuário existente
  async atualizar(id: string, data: AtualizarUsuario): Promise<Usuario | null> {
    const usuarioExistente = await this.usuarioRepo.buscarPorId(id);
  
    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado');
    }
  
    if (data.senha) {
      const saltRounds = 10;
      data.senha = await bcrypt.hash(data.senha, saltRounds);
    }
  
    const usuarioAtualizado = await this.usuarioRepo.atualizar(id, data);
    return usuarioAtualizado;
  }

  // Buscar um usuário por ID
  async getId(id: string) {
    const usuario = await this.usuarioRepo.buscarPorId(id);

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    return usuario;
  }

  // Buscar um usuário por email
  async buscarPorEmail(email: string) {
    const usuario = await this.usuarioRepo.buscarPorEmail(email);

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    return usuario;
  }

  // Deletar (logicamente) um usuário
  async deletar(id: string) {
    const usuarioExistente = await this.usuarioRepo.buscarPorId(id);

    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado');
    }

    const usuarioDeletado = await this.usuarioRepo.deletar(id);
    return usuarioDeletado;
  }

  // Método para autenticar o usuário (login)
  async autenticar(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepo.buscarPorEmail(email);

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    console.log("senha: ",senha);

    // Verifica se a senha está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return null;
    }

    return usuario;
  }

  // Método para gerar o token (JWT)
  async gerarToken(usuario: Usuario): Promise<string> {
    const secretKey = process.env.JWT_SECRET || 'defaultsecret'; // Certifique-se de usar uma variável de ambiente para a chave secreta
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        cargo: usuario.cargo,
      },
      secretKey,
      {
        expiresIn: '10h',
      }
    );
    return token;
  }
}
