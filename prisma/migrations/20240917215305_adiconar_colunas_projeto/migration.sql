/*
  Warnings:

  - Added the required column `id_criador` to the `Projeto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projeto" ADD COLUMN     "id_criador" TEXT NOT NULL;
