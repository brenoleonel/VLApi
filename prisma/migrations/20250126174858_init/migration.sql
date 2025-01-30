-- CreateTable
CREATE TABLE "UserAdmin" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alunos" (
    "id" TEXT NOT NULL,
    "PublicId" SERIAL NOT NULL,
    "Escola" TEXT NOT NULL,
    "Curso" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Cpf" TEXT,
    "Email" TEXT,
    "Cidade" TEXT,
    "Numero" TEXT,
    "Bairro" TEXT,
    "Estado" TEXT,
    "Endereco" TEXT,
    "Celular1" TEXT NOT NULL,
    "Celular2" TEXT,
    "Celular3" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAdmId" TEXT NOT NULL,

    CONSTRAINT "Alunos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdmin_Email_key" ON "UserAdmin"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Alunos_PublicId_key" ON "Alunos"("PublicId");

-- CreateIndex
CREATE UNIQUE INDEX "Alunos_Email_key" ON "Alunos"("Email");

-- AddForeignKey
ALTER TABLE "Alunos" ADD CONSTRAINT "Alunos_userAdmId_fkey" FOREIGN KEY ("userAdmId") REFERENCES "UserAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
