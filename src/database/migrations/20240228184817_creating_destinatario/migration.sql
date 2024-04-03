/*
  Warnings:

  - Made the column `mensagem` on table `ChatMessage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `ChatMessage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `ChatMessage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fromUserId` on table `ChatMessage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `toUserId` on table `ChatMessage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ChatMessage" ALTER COLUMN "mensagem" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "fromUserId" SET NOT NULL,
ALTER COLUMN "toUserId" SET NOT NULL;
