import { FastifyInstance } from 'fastify';
import { UsuarioController } from './controlador/UsuarioControlador';

export async function RotasUsuario(app: FastifyInstance) {
  const usuarioController = new UsuarioController();

  app.post('/registrar', usuarioController.criar.bind(usuarioController));
  app.post('/login', usuarioController.login.bind(usuarioController));
  app.put('/:id', usuarioController.atualizar.bind(usuarioController));
  app.get('/:id', usuarioController.buscarPorId.bind(usuarioController));
  app.delete('/:id', usuarioController.deletar.bind(usuarioController));
}
