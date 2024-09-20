import { FastifyReply, FastifyRequest } from 'fastify';
import { UsuarioService } from '../../servicos/UsuarioServico';
import { CriarUsuario, AtualizarUsuario } from '../../dtos/IUsuario';

// Definir o tipo dos parâmetros da rota para evitar 'unknown'
interface IdParams {
  id: string;
}

interface EmailParams {
  email: string;
}

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  // Criar um novo usuário
  async criar(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const data: CriarUsuario = req.body as CriarUsuario;
      const novoUsuario = await this.usuarioService.criar(data);
      return res.status(201).send(novoUsuario);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  // Atualizar um usuário existente
  async atualizar(req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const id = String(req.params.id);
      const data: AtualizarUsuario = req.body as AtualizarUsuario;
      const usuarioAtualizado = await this.usuarioService.atualizar(id, data);
      return res.status(200).send(usuarioAtualizado);
    } catch (error: any) {
      return res.status(404).send({ error: error.message });
    }
  }

  // Buscar um usuário por ID
  async buscarPorId(req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const id = String(req.params.id);
      const usuario = await this.usuarioService.getId(id);
      return res.status(200).send(usuario);
    } catch (error: any) {
      return res.status(404).send({ error: error.message });
    }
  }

  // Buscar um usuário por email
  async buscarPorEmail(req: FastifyRequest<{ Params: EmailParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { email } = req.params;
      const usuario = await this.usuarioService.buscarPorEmail(email);
      return res.status(200).send(usuario);
    } catch (error: any) {
      return res.status(404).send({ error: error.message });
    }
  }

  // Deletar (logicamente) um usuário
  async deletar(req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const id = String(req.params.id);
      const usuarioDeletado = await this.usuarioService.deletar(id);
      return res.status(200).send(usuarioDeletado);
    } catch (error: any) {
      return res.status(404).send({ error: error.message });
    }
  }

  // Métodos de negócio para trabalhar com dados do usuário diretamente
  async getNome(req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const id = String(req.params.id);
      const nome = await this.usuarioService.getNome(id);
      return res.status(200).send({ nome });
    } catch (error: any) {
      return res.status(404).send({ error: error.message });
    }
  }

  async setNome(req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const id = String(req.params.id);
      const { nome } = req.body as { nome: string };
      const usuarioAtualizado = await this.usuarioService.setNome(id, nome);
      return res.status(200).send(usuarioAtualizado);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  async getEmail(req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const id = String(req.params.id);
      const email = await this.usuarioService.getEmail(id);
      return res.status(200).send({ email });
    } catch (error: any) {
      return res.status(404).send({ error: error.message });
    }
  }

  async setEmail(req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const id = String(req.params.id);
      const { email } = req.body as { email: string };
      const usuarioAtualizado = await this.usuarioService.setEmail(id, email);
      return res.status(200).send(usuarioAtualizado);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  async setSenha(req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const id = String(req.params.id);
      const { senha } = req.body as { senha: string };
      const usuarioAtualizado = await this.usuarioService.setSenha(id, senha);
      return res.status(200).send(usuarioAtualizado);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  async getCargo(req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const id = String(req.params.id);
      const cargo = await this.usuarioService.getCargo(id);
      return res.status(200).send({ cargo });
    } catch (error: any) {
      return res.status(404).send({ error: error.message });
    }
  }

  async setCargo(req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply): Promise<FastifyReply> {
    try {
      const id = String(req.params.id);
      const { cargo } = req.body as { cargo: string };
  
      // Verificar se o cargo é válido
      if (cargo !== 'ADM' && cargo !== 'FUNCIONARIO') {
        return res.status(400).send({ error: 'Cargo inválido. Use "ADM" ou "FUNCIONARIO".' });
      }
  
      const usuarioAtualizado = await this.usuarioService.setCargo(id, cargo as 'ADM' | 'FUNCIONARIO');
      return res.status(200).send(usuarioAtualizado);
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }  
}
