/*
  Warnings:

  - You are about to drop the column `id_lidar` on the `Projeto` table. All the data in the column will be lost.
  - Added the required column `id_lider` to the `Projeto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projeto" DROP COLUMN "id_lidar",
ADD COLUMN     "id_lider" TEXT NOT NULL;
