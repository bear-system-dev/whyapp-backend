/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "identificador" TEXT NOT NULL,
    "avatar" TEXT,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "opcaoEnqueteId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "destinatarioId" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL,
    "canceledAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Humor" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Humor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAudio" (
    "id" TEXT NOT NULL,
    "dados" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatAudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatImage" (
    "id" TEXT NOT NULL,
    "dados" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatVideo" (
    "id" TEXT NOT NULL,
    "dados" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatDocument" (
    "id" TEXT NOT NULL,
    "dados" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transmissao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "usuarios" TEXT[],
    "administradorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transmissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "usuarios" TEXT[],
    "descricao" TEXT NOT NULL,
    "proprietarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transmissaoId" TEXT,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enquete" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "opcaoEnqueteId" TEXT NOT NULL,

    CONSTRAINT "Enquete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpcaoEnquete" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "correta" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OpcaoEnquete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoMessage" (
    "id" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "transmissaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrupoMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoAudio" (
    "id" TEXT NOT NULL,
    "dados" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transmissaoId" TEXT,

    CONSTRAINT "GrupoAudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoImage" (
    "id" TEXT NOT NULL,
    "dados" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transmissaoId" TEXT,

    CONSTRAINT "GrupoImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoVideo" (
    "id" TEXT NOT NULL,
    "dados" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transmissaoId" TEXT,

    CONSTRAINT "GrupoVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoDocument" (
    "id" TEXT NOT NULL,
    "dados" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transmissaoId" TEXT,

    CONSTRAINT "GrupoDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_opcaoEnqueteId_fkey" FOREIGN KEY ("opcaoEnqueteId") REFERENCES "OpcaoEnquete"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Humor" ADD CONSTRAINT "Humor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatAudio" ADD CONSTRAINT "ChatAudio_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatImage" ADD CONSTRAINT "ChatImage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatVideo" ADD CONSTRAINT "ChatVideo_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatDocument" ADD CONSTRAINT "ChatDocument_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transmissao" ADD CONSTRAINT "Transmissao_administradorId_fkey" FOREIGN KEY ("administradorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_transmissaoId_fkey" FOREIGN KEY ("transmissaoId") REFERENCES "Transmissao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enquete" ADD CONSTRAINT "Enquete_opcaoEnqueteId_fkey" FOREIGN KEY ("opcaoEnqueteId") REFERENCES "OpcaoEnquete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enquete" ADD CONSTRAINT "Enquete_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoMessage" ADD CONSTRAINT "GrupoMessage_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoMessage" ADD CONSTRAINT "GrupoMessage_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoMessage" ADD CONSTRAINT "GrupoMessage_transmissaoId_fkey" FOREIGN KEY ("transmissaoId") REFERENCES "Transmissao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoAudio" ADD CONSTRAINT "GrupoAudio_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoAudio" ADD CONSTRAINT "GrupoAudio_transmissaoId_fkey" FOREIGN KEY ("transmissaoId") REFERENCES "Transmissao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoImage" ADD CONSTRAINT "GrupoImage_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoImage" ADD CONSTRAINT "GrupoImage_transmissaoId_fkey" FOREIGN KEY ("transmissaoId") REFERENCES "Transmissao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoVideo" ADD CONSTRAINT "GrupoVideo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoVideo" ADD CONSTRAINT "GrupoVideo_transmissaoId_fkey" FOREIGN KEY ("transmissaoId") REFERENCES "Transmissao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoDocument" ADD CONSTRAINT "GrupoDocument_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoDocument" ADD CONSTRAINT "GrupoDocument_transmissaoId_fkey" FOREIGN KEY ("transmissaoId") REFERENCES "Transmissao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
