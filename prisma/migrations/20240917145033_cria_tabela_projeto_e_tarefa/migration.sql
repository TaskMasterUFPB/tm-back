-- CreateTable
CREATE TABLE "Projeto" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "descricao" TEXT NOT NULL,
    "id_lidar" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "deletado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" TEXT NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "descricao" TEXT NOT NULL,
    "caso_teste" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL,
    "complexidade" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "deletado" BOOLEAN NOT NULL DEFAULT false,
    "projetoId" TEXT,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
