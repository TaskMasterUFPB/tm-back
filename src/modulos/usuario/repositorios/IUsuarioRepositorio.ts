import { Usuario } from "@prisma/client";

export interface IUsuarioRepositorio {
  criar(data: Omit<Usuario, 'id' | 'deletado'>): Promise<Usuario>;
  atualizar(id: string, data: Partial<Usuario>): Promise<Usuario | null>;
  buscarPorId(id: string): Promise<Usuario | null>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  buscarPorEmails(emails: string[]): Promise<Usuario[] | []>;
  deletar(id: string): Promise<Usuario | null>;
}