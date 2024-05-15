-- DropForeignKey
ALTER TABLE "UsersOnGroups" DROP CONSTRAINT "UsersOnGroups_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "UsersOnGroups" ADD CONSTRAINT "UsersOnGroups_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
