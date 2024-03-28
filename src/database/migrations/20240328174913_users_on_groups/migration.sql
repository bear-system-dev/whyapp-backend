/*
  Warnings:

  - You are about to drop the column `proprietarioId` on the `Grupo` table. All the data in the column will be lost.
  - You are about to drop the column `usuarios` on the `Grupo` table. All the data in the column will be lost.
  - Added the required column `usuarioDono` to the `Grupo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grupo" DROP CONSTRAINT "Grupo_proprietarioId_fkey";

-- AlterTable
ALTER TABLE "Grupo" DROP COLUMN "proprietarioId",
DROP COLUMN "usuarios",
ADD COLUMN     "usuarioDono" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UsersOnGroups" (
    "usuarioId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "entrouEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adicionadoPor" TEXT NOT NULL,

    CONSTRAINT "UsersOnGroups_pkey" PRIMARY KEY ("usuarioId","grupoId")
);

-- AddForeignKey
ALTER TABLE "UsersOnGroups" ADD CONSTRAINT "UsersOnGroups_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnGroups" ADD CONSTRAINT "UsersOnGroups_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
