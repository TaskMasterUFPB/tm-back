import { FastifyInstance } from 'fastify';
import { UsuarioController } from './controlador/UsuarioControlador';

export async function RotasUsuario(app: FastifyInstance) {
  const usuarioController = new UsuarioController();

  app.post('/registrar', usuarioController.criar.bind(usuarioController));
  app.put('/:id', usuarioController.atualizar.bind(usuarioController));
  app.get('/:id', usuarioController.buscarPorId.bind(usuarioController));
  app.delete('/:id', usuarioController.deletar.bind(usuarioController));

  app.get('/nome/:id', usuarioController.getNome.bind(usuarioController));
  app.patch('/nome/:id', usuarioController.setNome.bind(usuarioController));
  
  app.get('/email/:id', usuarioController.getEmail.bind(usuarioController));
  app.patch('/email/:id', usuarioController.setEmail.bind(usuarioController));
  
  app.patch('/senha/:id', usuarioController.setSenha.bind(usuarioController));
  
  app.get('/cargo/:id', usuarioController.getCargo.bind(usuarioController));
  app.patch('/cargo/:id', usuarioController.setCargo.bind(usuarioController));
}
