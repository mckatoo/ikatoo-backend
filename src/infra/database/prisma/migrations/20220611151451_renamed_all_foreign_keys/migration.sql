/*
  Warnings:

  - You are about to drop the column `ProjectsPageId` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `LocalizationId` on the `ContactPage` table. All the data in the column will be lost.
  - You are about to drop the column `SkillsPageId` on the `LastJobs` table. All the data in the column will be lost.
  - You are about to drop the column `AboutPageId` on the `Skills` table. All the data in the column will be lost.
  - You are about to drop the column `SkillsPageId` on the `Skills` table. All the data in the column will be lost.
  - Added the required column `Localization_id` to the `ContactPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AboutPage_id` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Cards_ProjectsPageId_idx` ON `Cards`;

-- DropIndex
DROP INDEX `ContactPage_LocalizationId_idx` ON `ContactPage`;

-- DropIndex
DROP INDEX `LastJobs_SkillsPageId_idx` ON `LastJobs`;

-- DropIndex
DROP INDEX `Skills_SkillsPageId_idx` ON `Skills`;

-- AlterTable
ALTER TABLE `Cards` DROP COLUMN `ProjectsPageId`,
    ADD COLUMN `ProjectsPage_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ContactPage` DROP COLUMN `LocalizationId`,
    ADD COLUMN `Localization_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `LastJobs` DROP COLUMN `SkillsPageId`,
    ADD COLUMN `SkillsPage_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Skills` DROP COLUMN `AboutPageId`,
    DROP COLUMN `SkillsPageId`,
    ADD COLUMN `AboutPage_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `SkillsPage_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Cards_ProjectsPage_id_idx` ON `Cards`(`ProjectsPage_id`);

-- CreateIndex
CREATE INDEX `ContactPage_Localization_id_idx` ON `ContactPage`(`Localization_id`);

-- CreateIndex
CREATE INDEX `LastJobs_SkillsPage_id_idx` ON `LastJobs`(`SkillsPage_id`);

-- CreateIndex
CREATE INDEX `Skills_SkillsPage_id_idx` ON `Skills`(`SkillsPage_id`);
