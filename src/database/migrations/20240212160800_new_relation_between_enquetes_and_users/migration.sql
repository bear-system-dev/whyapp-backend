/*
  Warnings:

  - You are about to drop the column `opcaoEnqueteId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_opcaoEnqueteId_fkey";

-- AlterTable
ALTER TABLE "OpcaoEnquete" ADD COLUMN     "usuarios" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "opcaoEnqueteId";

-- AddForeignKey
ALTER TABLE "Enquete" ADD CONSTRAINT "Enquete_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
