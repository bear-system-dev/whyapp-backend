/*
  Warnings:

  - You are about to drop the column `usuarioDono` on the `Grupo` table. All the data in the column will be lost.
  - Added the required column `proprietarioId` to the `Grupo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grupo" DROP COLUMN "usuarioDono",
ADD COLUMN     "proprietarioId" TEXT NOT NULL;
