/*
  Warnings:

  - You are about to drop the column `Contato` on the `aprendiz` table. All the data in the column will be lost.
  - You are about to drop the column `Data_nascimento` on the `aprendiz` table. All the data in the column will be lost.
  - You are about to drop the column `Email_bosch` on the `aprendiz` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `aprendiz` table. All the data in the column will be lost.
  - You are about to drop the column `Password_login` on the `aprendiz` table. All the data in the column will be lost.
  - You are about to drop the column `User_bosch` on the `aprendiz` table. All the data in the column will be lost.
  - You are about to drop the column `Nivel_Competencia` on the `competencia` table. All the data in the column will be lost.
  - You are about to drop the column `Nome_Competencia` on the `competencia` table. All the data in the column will be lost.
  - You are about to drop the column `Carga_horaria` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `Data_Conclusao` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `Name_Curso` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `Status_Cursos` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `Name_Curso` on the `formacao_academica` table. All the data in the column will be lost.
  - You are about to drop the column `Nivel_formacao` on the `formacao_academica` table. All the data in the column will be lost.
  - You are about to drop the column `Nome_Institucao` on the `formacao_academica` table. All the data in the column will be lost.
  - You are about to drop the column `Periodo_Atual` on the `formacao_academica` table. All the data in the column will be lost.
  - You are about to drop the column `Status_Academico` on the `formacao_academica` table. All the data in the column will be lost.
  - You are about to drop the column `Total_Periodo` on the `formacao_academica` table. All the data in the column will be lost.
  - You are about to drop the column `Nivel_Idioma` on the `idiomas` table. All the data in the column will be lost.
  - You are about to drop the column `Nome_Idioma` on the `idiomas` table. All the data in the column will be lost.
  - You are about to drop the column `Bio_profissional` on the `situacao_profissional` table. All the data in the column will be lost.
  - You are about to drop the column `Cumprido_Estagio` on the `situacao_profissional` table. All the data in the column will be lost.
  - You are about to drop the column `Nome_Lider` on the `situacao_profissional` table. All the data in the column will be lost.
  - You are about to drop the column `Nome_Setor` on the `situacao_profissional` table. All the data in the column will be lost.
  - You are about to drop the column `Nome_SoftSkills` on the `soft_skills` table. All the data in the column will be lost.
  - You are about to drop the column `EDV_Aprendiz` on the `tokenrecuperacaosenha` table. All the data in the column will be lost.
  - You are about to drop the column `EDV_Instrutor` on the `tokenrecuperacaosenha` table. All the data in the column will be lost.
  - You are about to drop the column `Name_Curso` on the `turma` table. All the data in the column will be lost.
  - You are about to drop the `instrutor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nivel_Competencia` to the `Competencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_Competencia` to the `Competencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carga_horaria` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_Conclusao` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_Curso` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_Cursos` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_Curso` to the `Formacao_Academica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivel_formacao` to the `Formacao_Academica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_Institucao` to the `Formacao_Academica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo_Atual` to the `Formacao_Academica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_Academico` to the `Formacao_Academica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_Periodo` to the `Formacao_Academica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivel_Idioma` to the `Idiomas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_Idioma` to the `Idiomas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cumprido_Estagio` to the `Situacao_profissional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_Lider` to the `Situacao_profissional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_Setor` to the `Situacao_profissional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_SoftSkills` to the `Soft_Skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_Curso` to the `Turma` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tokenrecuperacaosenha` DROP FOREIGN KEY `TokenRecuperacaoSenha_EDV_Aprendiz_fkey`;

-- DropForeignKey
ALTER TABLE `tokenrecuperacaosenha` DROP FOREIGN KEY `TokenRecuperacaoSenha_EDV_Instrutor_fkey`;

-- DropForeignKey
ALTER TABLE `turma` DROP FOREIGN KEY `Turma_EDV_Instrutor_fkey`;

-- DropIndex
DROP INDEX `Aprendiz_Email_bosch_key` ON `aprendiz`;

-- DropIndex
DROP INDEX `Aprendiz_User_bosch_key` ON `aprendiz`;

-- DropIndex
DROP INDEX `TokenRecuperacaoSenha_EDV_Aprendiz_fkey` ON `tokenrecuperacaosenha`;

-- DropIndex
DROP INDEX `TokenRecuperacaoSenha_EDV_Instrutor_fkey` ON `tokenrecuperacaosenha`;

-- DropIndex
DROP INDEX `Turma_EDV_Instrutor_fkey` ON `turma`;

-- AlterTable
ALTER TABLE `aprendiz` DROP COLUMN `Contato`,
    DROP COLUMN `Data_nascimento`,
    DROP COLUMN `Email_bosch`,
    DROP COLUMN `Name`,
    DROP COLUMN `Password_login`,
    DROP COLUMN `User_bosch`;

-- AlterTable
ALTER TABLE `competencia` DROP COLUMN `Nivel_Competencia`,
    DROP COLUMN `Nome_Competencia`,
    ADD COLUMN `nivel_Competencia` VARCHAR(191) NOT NULL,
    ADD COLUMN `nome_Competencia` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cursos` DROP COLUMN `Carga_horaria`,
    DROP COLUMN `Data_Conclusao`,
    DROP COLUMN `Name_Curso`,
    DROP COLUMN `Status_Cursos`,
    ADD COLUMN `carga_horaria` INTEGER NOT NULL,
    ADD COLUMN `data_Conclusao` DATETIME(3) NOT NULL,
    ADD COLUMN `name_Curso` VARCHAR(191) NOT NULL,
    ADD COLUMN `status_Cursos` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `formacao_academica` DROP COLUMN `Name_Curso`,
    DROP COLUMN `Nivel_formacao`,
    DROP COLUMN `Nome_Institucao`,
    DROP COLUMN `Periodo_Atual`,
    DROP COLUMN `Status_Academico`,
    DROP COLUMN `Total_Periodo`,
    ADD COLUMN `name_Curso` VARCHAR(191) NOT NULL,
    ADD COLUMN `nivel_formacao` ENUM('ENSINO_MEDIO', 'TECNICO', 'GRADUACAO', 'POS_GRADUACAO') NOT NULL,
    ADD COLUMN `nome_Institucao` VARCHAR(191) NOT NULL,
    ADD COLUMN `periodo_Atual` INTEGER NOT NULL,
    ADD COLUMN `status_Academico` VARCHAR(191) NOT NULL,
    ADD COLUMN `total_Periodo` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `idiomas` DROP COLUMN `Nivel_Idioma`,
    DROP COLUMN `Nome_Idioma`,
    ADD COLUMN `nivel_Idioma` ENUM('BASICO', 'INTERMEDIARIO', 'AVANCADO', 'FLUENTE') NOT NULL,
    ADD COLUMN `nome_Idioma` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `situacao_profissional` DROP COLUMN `Bio_profissional`,
    DROP COLUMN `Cumprido_Estagio`,
    DROP COLUMN `Nome_Lider`,
    DROP COLUMN `Nome_Setor`,
    ADD COLUMN `bio_profissional` VARCHAR(191) NULL,
    ADD COLUMN `cumprido_Estagio` BOOLEAN NOT NULL,
    ADD COLUMN `nome_Lider` VARCHAR(191) NOT NULL,
    ADD COLUMN `nome_Setor` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `soft_skills` DROP COLUMN `Nome_SoftSkills`,
    ADD COLUMN `nome_SoftSkills` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tokenrecuperacaosenha` DROP COLUMN `EDV_Aprendiz`,
    DROP COLUMN `EDV_Instrutor`,
    ADD COLUMN `EDV` INTEGER NULL;

-- AlterTable
ALTER TABLE `turma` DROP COLUMN `Name_Curso`,
    ADD COLUMN `name_Curso` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `instrutor`;

-- CreateTable
CREATE TABLE `User` (
    `EDV` INTEGER NOT NULL,
    `tipoUser` ENUM('APRENDIZ', 'INSTRUTOR') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `user_bosch` VARCHAR(191) NOT NULL,
    `email_bosch` VARCHAR(191) NOT NULL,
    `contato` VARCHAR(191) NOT NULL,
    `password_login` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_user_bosch_key`(`user_bosch`),
    UNIQUE INDEX `User_email_bosch_key`(`email_bosch`),
    PRIMARY KEY (`EDV`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_EDV_Instrutor_fkey` FOREIGN KEY (`EDV_Instrutor`) REFERENCES `User`(`EDV`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TokenRecuperacaoSenha` ADD CONSTRAINT `TokenRecuperacaoSenha_EDV_fkey` FOREIGN KEY (`EDV`) REFERENCES `User`(`EDV`) ON DELETE SET NULL ON UPDATE CASCADE;
