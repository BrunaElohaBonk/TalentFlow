/*
  Warnings:

  - A unique constraint covering the columns `[EDV_Aprendiz]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Profile_EDV_Aprendiz_key` ON `Profile`(`EDV_Aprendiz`);
