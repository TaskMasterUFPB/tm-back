-- AlterTable
ALTER TABLE "Tarefa" ADD COLUMN     "coluna_id" TEXT;

-- CreateTable
CREATE TABLE "Coluna" (
    "id" TEXT NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "projeto_id" TEXT NOT NULL,

    CONSTRAINT "Coluna_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_coluna_id_fkey" FOREIGN KEY ("coluna_id") REFERENCES "Coluna"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coluna" ADD CONSTRAINT "Coluna_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
