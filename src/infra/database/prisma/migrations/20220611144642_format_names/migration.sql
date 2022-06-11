/*
  Warnings:

  - The primary key for the `jobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `jobDescription` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `skillsPageId` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `yearMonthEnd` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `yearMonthStart` on the `jobs` table. All the data in the column will be lost.
  - The primary key for the `skills_page` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `skills_page` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `skills_page` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `skills_page` table. All the data in the column will be lost.
  - You are about to drop the `about_page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contact_page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `localization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects_page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - The required column `Id` was added to the `jobs` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `JobDescription` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `JobTitle` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `YearMonthStart` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `skills_page` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `skills_page` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Title` to the `skills_page` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `jobs_skillsPageId_idx` ON `jobs`;

-- AlterTable
ALTER TABLE `jobs` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `jobDescription`,
    DROP COLUMN `jobTitle`,
    DROP COLUMN `skillsPageId`,
    DROP COLUMN `yearMonthEnd`,
    DROP COLUMN `yearMonthStart`,
    ADD COLUMN `Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `JobDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `JobTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `SkillsPageId` VARCHAR(191) NULL,
    ADD COLUMN `YearMonthEnd` VARCHAR(191) NULL,
    ADD COLUMN `YearMonthStart` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `skills_page` DROP PRIMARY KEY,
    DROP COLUMN `description`,
    DROP COLUMN `id`,
    DROP COLUMN `title`,
    ADD COLUMN `Description` VARCHAR(191) NOT NULL,
    ADD COLUMN `Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `Title` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Id`);

-- DropTable
DROP TABLE `about_page`;

-- DropTable
DROP TABLE `cards`;

-- DropTable
DROP TABLE `contact_page`;

-- DropTable
DROP TABLE `localization`;

-- DropTable
DROP TABLE `projects_page`;

-- DropTable
DROP TABLE `skills`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `Skills` (
    `Id` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `RankPercent` DOUBLE NOT NULL DEFAULT 0,
    `AboutPageId` VARCHAR(191) NOT NULL,
    `SkillsPageId` VARCHAR(191) NULL,

    UNIQUE INDEX `Skills_Title_key`(`Title`),
    INDEX `Skills_SkillsPageId_idx`(`SkillsPageId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AboutPage` (
    `Id` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NULL,
    `Description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Localization` (
    `Id` VARCHAR(191) NOT NULL,
    `Latitude` DOUBLE NOT NULL,
    `Longitude` DOUBLE NOT NULL,
    `ContactPageId` VARCHAR(191) NULL,

    INDEX `Localization_ContactPageId_idx`(`ContactPageId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactPage` (
    `Id` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `LocalizationId` VARCHAR(191) NOT NULL,

    INDEX `ContactPage_LocalizationId_idx`(`LocalizationId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cards` (
    `Id` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `SubTitle` VARCHAR(191) NULL,
    `Content` VARCHAR(191) NOT NULL,
    `ProjectsPageId` VARCHAR(191) NULL,

    INDEX `Cards_ProjectsPageId_idx`(`ProjectsPageId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectsPage` (
    `Id` VARCHAR(191) NOT NULL,
    `Snapshot` VARCHAR(191) NOT NULL,
    `GithubLink` VARCHAR(191) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `Id` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Username` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_Username_key`(`Username`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `jobs_SkillsPageId_idx` ON `jobs`(`SkillsPageId`);
