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

interface LoginBody {
  email: string;
  senha: string;
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
      console.log('Data recebida no método criar:', data);
      const novoUsuario = await this.usuarioService.criar(data);
      return res.status(201).send(novoUsuario);
    } catch (error: any) {
      console.log('Erro no método criar:', error.message);
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

  // Método de login
  async login(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const { email, senha } = req.body as LoginBody;

      // Verifica se o email e a senha estão corretos
      const usuario = await this.usuarioService.autenticar(email, senha);

      if (!usuario) {
        return res.status(401).send({ error: 'Credenciais inválidas' });
      }

      // Gerar token ou sessão (aqui poderia ser implementado um JWT, por exemplo)
      const token = await this.usuarioService.gerarToken(usuario);

      return res.status(200).send({ token });
    } catch (error: any) {
      return res.status(500).send({ error: error.message });
    }
  }
}
