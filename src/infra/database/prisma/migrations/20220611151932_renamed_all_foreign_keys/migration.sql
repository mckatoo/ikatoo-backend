/*
  Warnings:

  - You are about to drop the column `ProjectsPage_id` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `Localization_id` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `SkillsPage_id` on the `LastJobs` table. All the data in the column will be lost.
  - You are about to drop the column `AboutPage_id` on the `Skills` table. All the data in the column will be lost.
  - You are about to drop the column `SkillsPage_id` on the `Skills` table. All the data in the column will be lost.
  - Added the required column `Localization_Id` to the `ContactPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AboutPage_Id` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Cards_ProjectsPage_id_idx` ON `Cards`;

-- DropIndex
DROP INDEX `ContactPage_Localization_id_idx` ON `ContactPage`;

-- DropIndex
DROP INDEX `LastJobs_SkillsPage_id_idx` ON `LastJobs`;

-- DropIndex
DROP INDEX `Skills_SkillsPage_id_idx` ON `Skills`;

-- AlterTable
ALTER TABLE `Cards` DROP COLUMN `ProjectsPage_id`,
    ADD COLUMN `ProjectsPage_Id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ContactPage` DROP COLUMN `Localization_id`,
    ADD COLUMN `Localization_Id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `LastJobs` DROP COLUMN `SkillsPage_id`,
    ADD COLUMN `SkillsPage_Id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Skills` DROP COLUMN `AboutPage_id`,
    DROP COLUMN `SkillsPage_id`,
    ADD COLUMN `AboutPage_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `SkillsPage_Id` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Cards_ProjectsPage_Id_idx` ON `Cards`(`ProjectsPage_Id`);

-- CreateIndex
CREATE INDEX `ContactPage_Localization_Id_idx` ON `ContactPage`(`Localization_Id`);

-- CreateIndex
CREATE INDEX `LastJobs_SkillsPage_Id_idx` ON `LastJobs`(`SkillsPage_Id`);

-- CreateIndex
CREATE INDEX `Skills_SkillsPage_Id_idx` ON `Skills`(`SkillsPage_Id`);
