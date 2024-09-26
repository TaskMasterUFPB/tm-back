/*
  Warnings:

  - You are about to drop the column `participantes_id` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `projetoId` on the `Tarefa` table. All the data in the column will be lost.
  - Added the required column `usuario_autor_id` to the `Tarefa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_responsavel_id` to the `Tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_projetoId_fkey";

-- AlterTable
ALTER TABLE "Projeto" DROP COLUMN "participantes_id";

-- AlterTable
ALTER TABLE "Tarefa" DROP COLUMN "projetoId",
ADD COLUMN     "projeto_id" TEXT,
ADD COLUMN     "usuario_autor_id" TEXT NOT NULL,
ADD COLUMN     "usuario_responsavel_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "projetoId" TEXT;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_usuario_autor_id_fkey" FOREIGN KEY ("usuario_autor_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_usuario_responsavel_id_fkey" FOREIGN KEY ("usuario_responsavel_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
