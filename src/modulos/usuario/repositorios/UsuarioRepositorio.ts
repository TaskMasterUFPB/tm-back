import { Usuario } from '@prisma/client';
import { IUsuarioRepositorio } from './IUsuarioRepositorio';

import { prisma } from "../../../lib/prisma";

export class UsuarioRepositorio implements IUsuarioRepositorio {
  
  async criar(data: Omit<Usuario, 'id' | 'deletado'>): Promise<Usuario> {
    const novoUsuario = await prisma.usuario.create({
      data: {
        ...data,
        deletado: false,
      },
    });
    return novoUsuario;
  }

  async atualizar(id: number, data: Partial<Usuario>): Promise<Usuario | null> {
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data,
    }).catch(() => null);
    
    return usuarioAtualizado;
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findFirst({
      where: {
        id,
        deletado: false,
      },
    });
    return usuario;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findFirst({
      where: {
        email: email,
        deletado: false,
      },
    });
    return usuario;
  }

  async deletar(id: number): Promise<Usuario | null> {
    const usuarioDeletado = await prisma.usuario.update({
      where: { id },
      data: {
        deletado: true,
      },
    }).catch(() => null);

    return usuarioDeletado;
  }
}
