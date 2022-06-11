/*
  Warnings:

  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skills_page` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `jobs`;

-- DropTable
DROP TABLE `skills_page`;

-- CreateTable
CREATE TABLE `LastJobs` (
    `Id` VARCHAR(191) NOT NULL,
    `YearMonthStart` VARCHAR(191) NOT NULL,
    `YearMonthEnd` VARCHAR(191) NULL,
    `JobTitle` VARCHAR(191) NOT NULL,
    `JobDescription` VARCHAR(191) NOT NULL,
    `SkillsPageId` VARCHAR(191) NULL,

    INDEX `LastJobs_SkillsPageId_idx`(`SkillsPageId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkillsPage` (
    `Id` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
