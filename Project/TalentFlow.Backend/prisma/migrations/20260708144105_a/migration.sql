-- CreateTable
CREATE TABLE `Instrutor` (
    `EDV` INTEGER NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Data_nascimento` DATETIME(3) NOT NULL,
    `User_bosch` VARCHAR(191) NOT NULL,
    `Email_bosch` VARCHAR(191) NOT NULL,
    `Contato` VARCHAR(191) NOT NULL,
    `Password_login` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Instrutor_User_bosch_key`(`User_bosch`),
    UNIQUE INDEX `Instrutor_Email_bosch_key`(`Email_bosch`),
    PRIMARY KEY (`EDV`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `EDV_Instrutor` INTEGER NOT NULL,
    `Name_Curso` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aprendiz` (
    `EDV` INTEGER NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Data_nascimento` DATETIME(3) NOT NULL,
    `User_bosch` VARCHAR(191) NULL,
    `Email_bosch` VARCHAR(191) NULL,
    `Password_login` VARCHAR(191) NOT NULL,
    `Id_Turma` INTEGER NOT NULL,
    `Contato` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Aprendiz_User_bosch_key`(`User_bosch`),
    UNIQUE INDEX `Aprendiz_Email_bosch_key`(`Email_bosch`),
    PRIMARY KEY (`EDV`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `EDV_Aprendiz` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Situacao_profissional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Profile` INTEGER NOT NULL,
    `Nome_Setor` VARCHAR(191) NOT NULL,
    `Nome_Lider` VARCHAR(191) NOT NULL,
    `Cumprido_Estagio` BOOLEAN NOT NULL,
    `Bio_profissional` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Soft_Skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Profile` INTEGER NOT NULL,
    `Nome_SoftSkills` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Competencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Profile` INTEGER NOT NULL,
    `Nome_Competencia` VARCHAR(191) NOT NULL,
    `Nivel_Competencia` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Formacao_Academica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Profile` INTEGER NOT NULL,
    `Name_Curso` VARCHAR(191) NOT NULL,
    `Status_Academico` VARCHAR(191) NOT NULL,
    `Nivel_formacao` ENUM('ENSINO_MEDIO', 'TECNICO', 'GRADUACAO', 'POS_GRADUACAO') NOT NULL,
    `Periodo_Atual` INTEGER NOT NULL,
    `Total_Periodo` INTEGER NOT NULL,
    `Nome_Institucao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Idiomas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Profile` INTEGER NOT NULL,
    `Nome_Idioma` VARCHAR(191) NOT NULL,
    `Nivel_Idioma` ENUM('BASICO', 'INTERMEDIARIO', 'AVANCADO', 'FLUENTE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cursos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_Profile` INTEGER NOT NULL,
    `Name_Curso` VARCHAR(191) NOT NULL,
    `Status_Cursos` VARCHAR(191) NOT NULL,
    `Data_Conclusao` DATETIME(3) NOT NULL,
    `Carga_horaria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TokenRecuperacaoSenha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `EDV_Aprendiz` INTEGER NULL,
    `EDV_Instrutor` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usedAt` DATETIME(3) NULL,

    UNIQUE INDEX `TokenRecuperacaoSenha_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_EDV_Instrutor_fkey` FOREIGN KEY (`EDV_Instrutor`) REFERENCES `Instrutor`(`EDV`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aprendiz` ADD CONSTRAINT `Aprendiz_Id_Turma_fkey` FOREIGN KEY (`Id_Turma`) REFERENCES `Turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_EDV_Aprendiz_fkey` FOREIGN KEY (`EDV_Aprendiz`) REFERENCES `Aprendiz`(`EDV`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Situacao_profissional` ADD CONSTRAINT `Situacao_profissional_Id_Profile_fkey` FOREIGN KEY (`Id_Profile`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Soft_Skills` ADD CONSTRAINT `Soft_Skills_Id_Profile_fkey` FOREIGN KEY (`Id_Profile`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Competencia` ADD CONSTRAINT `Competencia_Id_Profile_fkey` FOREIGN KEY (`Id_Profile`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Formacao_Academica` ADD CONSTRAINT `Formacao_Academica_Id_Profile_fkey` FOREIGN KEY (`Id_Profile`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Idiomas` ADD CONSTRAINT `Idiomas_Id_Profile_fkey` FOREIGN KEY (`Id_Profile`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cursos` ADD CONSTRAINT `Cursos_Id_Profile_fkey` FOREIGN KEY (`Id_Profile`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TokenRecuperacaoSenha` ADD CONSTRAINT `TokenRecuperacaoSenha_EDV_Aprendiz_fkey` FOREIGN KEY (`EDV_Aprendiz`) REFERENCES `Aprendiz`(`EDV`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TokenRecuperacaoSenha` ADD CONSTRAINT `TokenRecuperacaoSenha_EDV_Instrutor_fkey` FOREIGN KEY (`EDV_Instrutor`) REFERENCES `Instrutor`(`EDV`) ON DELETE SET NULL ON UPDATE CASCADE;
