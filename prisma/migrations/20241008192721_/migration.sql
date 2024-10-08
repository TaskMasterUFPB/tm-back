/*
  Warnings:

  - You are about to drop the column `id_participante` on the `Projeto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_id_participante_fkey";

-- AlterTable
ALTER TABLE "Projeto" DROP COLUMN "id_participante";

-- CreateTable
CREATE TABLE "_Participantes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Participantes_AB_unique" ON "_Participantes"("A", "B");

-- CreateIndex
CREATE INDEX "_Participantes_B_index" ON "_Participantes"("B");

-- AddForeignKey
ALTER TABLE "_Participantes" ADD CONSTRAINT "_Participantes_A_fkey" FOREIGN KEY ("A") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Participantes" ADD CONSTRAINT "_Participantes_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
