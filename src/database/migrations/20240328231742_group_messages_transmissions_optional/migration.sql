-- DropForeignKey
ALTER TABLE "GrupoMessage" DROP CONSTRAINT "GrupoMessage_transmissaoId_fkey";

-- AlterTable
ALTER TABLE "GrupoMessage" ALTER COLUMN "transmissaoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "GrupoMessage" ADD CONSTRAINT "GrupoMessage_transmissaoId_fkey" FOREIGN KEY ("transmissaoId") REFERENCES "Transmissao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
