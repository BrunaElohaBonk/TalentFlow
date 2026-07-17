-- AlterTable
ALTER TABLE `situacao_profissional` MODIFY `cumprido_Estagio` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `nome_Lider` VARCHAR(191) NULL,
    MODIFY `nome_Setor` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `turma` MODIFY `Ativo` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `user` MODIFY `user_bosch` VARCHAR(191) NULL,
    MODIFY `email_bosch` VARCHAR(191) NULL,
    MODIFY `Ativo` BOOLEAN NOT NULL DEFAULT true;
