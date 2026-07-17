/*
  Warnings:

  - Added the required column `Ativo` to the `Turma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Ativo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `turma` ADD COLUMN `Ativo` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `Ativo` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `PerfilHistorico` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Profile` INTEGER NOT NULL,
    `dados` JSON NOT NULL,
    `EDVAlteradoPor` INTEGER NULL,
    `DataAlteracao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PerfilHistorico` ADD CONSTRAINT `PerfilHistorico_Id_Profile_fkey` FOREIGN KEY (`Id_Profile`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
