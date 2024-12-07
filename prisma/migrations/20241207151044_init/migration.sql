-- CreateTable
CREATE TABLE "Empresa" (
    "uuid" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "dominio" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "uuid" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "slug" TEXT NOT NULL,
    "observacoes" TEXT,
    "empresaUuid" TEXT NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Imagem" (
    "uuid" TEXT NOT NULL,
    "veiculoUuid" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "thumbUrl" TEXT,
    "principal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Imagem_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_email_key" ON "Empresa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_dominio_key" ON "Empresa"("dominio");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_slug_key" ON "Veiculo"("slug");

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_empresaUuid_fkey" FOREIGN KEY ("empresaUuid") REFERENCES "Empresa"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_veiculoUuid_fkey" FOREIGN KEY ("veiculoUuid") REFERENCES "Veiculo"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
