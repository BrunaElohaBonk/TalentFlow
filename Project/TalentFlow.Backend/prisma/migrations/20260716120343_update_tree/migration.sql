/*
  Warnings:

  - Added the required column `nomeInstrutor` to the `Turma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeTurma` to the `Turma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `turma` ADD COLUMN `nomeInstrutor` VARCHAR(191) NOT NULL,
    ADD COLUMN `nomeTurma` VARCHAR(191) NOT NULL;
