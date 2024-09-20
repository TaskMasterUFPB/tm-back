import { Usuario } from "@prisma/client";

export interface IUsuarioRepositorio {
  criar(data: Omit<Usuario, 'id' | 'deletado'>): Promise<Usuario>;
  atualizar(id: number, data: Partial<Usuario>): Promise<Usuario | null>;
  buscarPorId(id: number): Promise<Usuario | null>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  deletar(id: number): Promise<Usuario | null>;
}