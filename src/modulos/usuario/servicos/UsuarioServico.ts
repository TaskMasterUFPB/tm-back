import { UsuarioRepositorio } from '../repositorios/UsuarioRepositorio';
import { CriarUsuario, AtualizarUsuario } from '../dtos/IUsuario';
import { Usuario } from '@prisma/client';
import bcrypt from 'bcrypt';

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
    });
    return novoUsuario;
  }

  // Atualizar um usuário existente
  async atualizar(id: number, data: AtualizarUsuario): Promise<Usuario | null> {
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
  async getId(id: number) {
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
  async deletar(id: number) {
    const usuarioExistente = await this.usuarioRepo.buscarPorId(id);

    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado');
    }

    const usuarioDeletado = await this.usuarioRepo.deletar(id);
    return usuarioDeletado;
  }



  async getNome(id: number): Promise<string | null> {
    const usuario = await this.usuarioRepo.buscarPorId(id);
    return usuario ? usuario.nome : null;
  }

  async setNome(id: number, nome: string): Promise<Usuario | null> {
    return await this.usuarioRepo.atualizar(id, { nome });
  }

  async getEmail(id: number): Promise<string | null> {
    const usuario = await this.usuarioRepo.buscarPorId(id);
    return usuario ? usuario.email : null;
  }

  async setEmail(id: number, email: string): Promise<Usuario | null> {
    const usuarioExistente = await this.usuarioRepo.buscarPorEmail(email);

    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    return await this.usuarioRepo.atualizar(id, { email });
  }

  async verificarSenha(id: number, senha: string): Promise<boolean> {
    const usuario = await this.usuarioRepo.buscarPorId(id);
  
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
  
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    return isMatch;
  }  

  async setSenha(id: number, senha: string): Promise<Usuario | null> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
  
    return await this.usuarioRepo.atualizar(id, { senha: hashedPassword });
  }

  async getCargo(id: number): Promise<'ADM' | 'FUNCIONARIO' | null> {
    const usuario = await this.usuarioRepo.buscarPorId(id);
    return usuario ? usuario.cargo : null;
  }

  async setCargo(id: number, cargo: 'ADM' | 'FUNCIONARIO'): Promise<Usuario | null> {
    return await this.usuarioRepo.atualizar(id, { cargo });
  }
}
