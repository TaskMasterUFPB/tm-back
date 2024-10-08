-- CreateTable
CREATE TABLE "_Participante" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Participante_AB_unique" ON "_Participante"("A", "B");

-- CreateIndex
CREATE INDEX "_Participante_B_index" ON "_Participante"("B");

-- AddForeignKey
ALTER TABLE "_Participante" ADD CONSTRAINT "_Participante_A_fkey" FOREIGN KEY ("A") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Participante" ADD CONSTRAINT "_Participante_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
