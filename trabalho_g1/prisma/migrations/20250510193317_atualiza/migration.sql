/*
  Warnings:

  - You are about to drop the column `bairro` on the `Obra` table. All the data in the column will be lost.
  - You are about to drop the column `dataFim` on the `Obra` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `Obra` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Obra` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Obra` table. All the data in the column will be lost.
  - Added the required column `cronogramaFim` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cronogramaInicio` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresa` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localizacao` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orcamento` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servidorId` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Obra` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('cidadao', 'servidor');

-- CreateEnum
CREATE TYPE "StatusObra" AS ENUM ('planejamento', 'execucao', 'finalizada');

-- CreateEnum
CREATE TYPE "StatusEtapa" AS ENUM ('pendente', 'em_andamento', 'concluida');

-- CreateEnum
CREATE TYPE "TipoInteracao" AS ENUM ('sugestao', 'denuncia', 'elogio');

-- AlterTable
ALTER TABLE "Obra" DROP COLUMN "bairro",
DROP COLUMN "dataFim",
DROP COLUMN "dataInicio",
DROP COLUMN "descricao",
DROP COLUMN "titulo",
ADD COLUMN     "cronogramaFim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cronogramaInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "empresa" TEXT NOT NULL,
ADD COLUMN     "localizacao" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "orcamento" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "servidorId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusObra" NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etapa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "status" "StatusEtapa" NOT NULL,
    "obraId" INTEGER NOT NULL,

    CONSTRAINT "Etapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "obraId" INTEGER NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interacao" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoInteracao" NOT NULL,
    "mensagem" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "obraId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Obra" ADD CONSTRAINT "Obra_servidorId_fkey" FOREIGN KEY ("servidorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etapa" ADD CONSTRAINT "Etapa_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interacao" ADD CONSTRAINT "Interacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interacao" ADD CONSTRAINT "Interacao_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
