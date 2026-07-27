-- AlterTable
ALTER TABLE `cursos` ADD COLUMN `certificado` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `formacao_academica` ADD COLUMN `certificado` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `idiomas` ADD COLUMN `certificado` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `fotoPerfil` VARCHAR(191) NULL;
