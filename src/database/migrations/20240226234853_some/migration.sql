/*
  Warnings:

  - Added the required column `fromUserId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "token" DROP NOT NULL,
ALTER COLUMN "foto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "fromUserId" TEXT NOT NULL,
ADD COLUMN     "toUserId" TEXT NOT NULL;
