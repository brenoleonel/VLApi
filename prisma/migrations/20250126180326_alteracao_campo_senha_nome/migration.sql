/*
  Warnings:

  - You are about to drop the column `Name` on the `UserAdmin` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `UserAdmin` table. All the data in the column will be lost.
  - Added the required column `Nome` to the `UserAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Senha` to the `UserAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAdmin" DROP COLUMN "Name",
DROP COLUMN "Password",
ADD COLUMN     "Nome" TEXT NOT NULL,
ADD COLUMN     "Senha" VARCHAR(255) NOT NULL;
