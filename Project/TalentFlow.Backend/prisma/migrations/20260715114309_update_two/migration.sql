/*
  Warnings:

  - You are about to alter the column `status_Cursos` on the `cursos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(5))`.
  - You are about to alter the column `status_Academico` on the `formacao_academica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(5))`.
  - You are about to alter the column `nome_Idioma` on the `idiomas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `cursos` MODIFY `status_Cursos` ENUM('CONCLUIDO', 'CURSANDO') NOT NULL;

-- AlterTable
ALTER TABLE `formacao_academica` MODIFY `status_Academico` ENUM('CONCLUIDO', 'CURSANDO') NOT NULL;

-- AlterTable
ALTER TABLE `idiomas` MODIFY `nome_Idioma` ENUM('ALEMAO', 'ARABE', 'COREANO', 'ESPANHOL', 'FRANCES', 'INGLES', 'ITALIANO', 'JAPONES', 'MANDARIM', 'RUSSO', 'TAILANDES') NOT NULL;
