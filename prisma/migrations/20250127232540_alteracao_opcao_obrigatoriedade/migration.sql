/*
  Warnings:

  - Made the column `Cidade` on table `Alunos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Numero` on table `Alunos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Bairro` on table `Alunos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Estado` on table `Alunos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Endereco` on table `Alunos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Alunos" ALTER COLUMN "Cidade" SET NOT NULL,
ALTER COLUMN "Numero" SET NOT NULL,
ALTER COLUMN "Bairro" SET NOT NULL,
ALTER COLUMN "Estado" SET NOT NULL,
ALTER COLUMN "Endereco" SET NOT NULL;
