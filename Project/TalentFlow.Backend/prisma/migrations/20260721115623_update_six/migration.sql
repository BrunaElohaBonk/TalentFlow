/*
  Warnings:

  - You are about to drop the column `dados` on the `perfilhistorico` table. All the data in the column will be lost.
  - Added the required column `Acao` to the `perfilhistorico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Dados` to the `perfilhistorico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Tipo` to the `perfilhistorico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `perfilhistorico` DROP FOREIGN KEY `PerfilHistorico_Id_Profile_fkey`;

-- AlterTable
ALTER TABLE `perfilhistorico` DROP COLUMN `dados`,
    ADD COLUMN `Acao` VARCHAR(191) NOT NULL,
    ADD COLUMN `Dados` JSON NOT NULL,
    ADD COLUMN `IdRegistro` INTEGER NULL,
    ADD COLUMN `Tipo` ENUM('DADOS_INSTRUTOR', 'PROFILE', 'FORMACAO_ACADEMICA', 'CURSO', 'COMPETENCIA', 'SOFTSKILL', 'SITUACAO_PROFISSIONAL', 'IDIOMA') NOT NULL,
    MODIFY `Id_Profile` INTEGER NULL;

-- CreateIndex
CREATE INDEX `perfilhistorico_Tipo_idx` ON `perfilhistorico`(`Tipo`);

-- AddForeignKey
ALTER TABLE `perfilhistorico` ADD CONSTRAINT `perfilhistorico_Id_Profile_fkey` FOREIGN KEY (`Id_Profile`) REFERENCES `profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `perfilhistorico` RENAME INDEX `PerfilHistorico_Id_Profile_fkey` TO `perfilhistorico_Id_Profile_idx`;
