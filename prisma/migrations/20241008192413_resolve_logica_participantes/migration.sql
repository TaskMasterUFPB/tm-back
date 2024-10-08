/*
  Warnings:

  - You are about to drop the `_Participante` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "_Participante" DROP CONSTRAINT "_Participante_A_fkey";

-- DropForeignKey
ALTER TABLE "_Participante" DROP CONSTRAINT "_Participante_B_fkey";

-- AlterTable
ALTER TABLE "Projeto" ADD COLUMN     "id_participante" TEXT;

-- DropTable
DROP TABLE "_Participante";

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_id_participante_fkey" FOREIGN KEY ("id_participante") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
