import { FastifyInstance } from 'fastify';
import { TarefaControlador } from './controller/TarefaControlador';

export async function RotasTarefa(app: FastifyInstance) {
    const tarefaControlador = new TarefaControlador();

    app.post('/criar', tarefaControlador.CriarTarefa.bind(tarefaControlador));
    app.get('/:id', tarefaControlador.ListarTarefas.bind(tarefaControlador));
}
