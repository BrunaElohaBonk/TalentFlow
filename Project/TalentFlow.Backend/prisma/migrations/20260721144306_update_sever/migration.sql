/*
  Warnings:

  - You are about to alter the column `nome_Setor` on the `situacao_profissional` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(6))`.
  - You are about to alter the column `nome_SoftSkills` on the `soft_skills` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(7))`.

*/
-- AlterTable
ALTER TABLE `situacao_profissional` MODIFY `nome_Setor` ENUM('ENGENHARIA', 'BDO', 'TEF', 'BD', 'RH', 'COMPRAS', 'BICO', 'CRIN', 'LOGISTICA', 'QMM', 'TOTO', 'IMPACT', 'FERRAMENTARIA', 'PRODUCAO', 'BPS', 'ETS', 'HSE', 'ESPAÇO_SAUDE') NULL;

-- AlterTable
ALTER TABLE `soft_skills` MODIFY `nome_SoftSkills` ENUM('COMUNICACAO', 'TRABALHO_EM_EQUIPE', 'LIDERANCA', 'EMPATIA', 'PROATIVIDADE', 'RESOLUCAO_DE_PROBLEMAS', 'PENSAMENTO_CRITICO', 'GESTAO_DO_TEMPO', 'ORGANIZACAO', 'CRIATIVIDADE', 'NEGOCIACAO', 'RESILIENCIA', 'ESCUTA_ATIVA', 'RESPONSABILIDADE', 'AUTONOMIA', 'APRENDIZADO_CONTINUO', 'INOVACAO', 'ORATORIA', 'COMPROMETIMENTO') NOT NULL;

-- CreateTable
CREATE TABLE `turmahistorico` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Turma` INTEGER NULL,
    `acao` VARCHAR(191) NOT NULL,
    `EDVAlteradoPor` INTEGER NULL,
    `dados` JSON NOT NULL,
    `dataAlteracao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `turmahistorico_Id_Turma_idx`(`Id_Turma`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `turmahistorico` ADD CONSTRAINT `turmahistorico_Id_Turma_fkey` FOREIGN KEY (`Id_Turma`) REFERENCES `turma`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
