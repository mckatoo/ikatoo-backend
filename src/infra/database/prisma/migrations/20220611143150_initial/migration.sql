-- CreateTable
CREATE TABLE `skills` (
    `name` VARCHAR(191) NOT NULL,
    `rankPercent` DOUBLE NOT NULL DEFAULT 0,
    `aboutPageId` VARCHAR(191) NOT NULL,
    `skillsPageId` VARCHAR(191) NULL,

    UNIQUE INDEX `skills_name_key`(`name`),
    INDEX `skills_skillsPageId_idx`(`skillsPageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `about_page` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `id` VARCHAR(191) NOT NULL,
    `yearMonthStart` VARCHAR(191) NOT NULL,
    `yearMonthEnd` VARCHAR(191) NULL,
    `jobTitle` VARCHAR(191) NOT NULL,
    `jobDescription` VARCHAR(191) NOT NULL,
    `skillsPageId` VARCHAR(191) NULL,

    INDEX `jobs_skillsPageId_idx`(`skillsPageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills_page` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `localization` (
    `id` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `contactPageId` VARCHAR(191) NULL,

    INDEX `localization_contactPageId_idx`(`contactPageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_page` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `localizationId` VARCHAR(191) NOT NULL,

    INDEX `contact_page_localizationId_idx`(`localizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cards` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subTitle` VARCHAR(191) NULL,
    `content` VARCHAR(191) NOT NULL,
    `projectsPageId` VARCHAR(191) NULL,

    INDEX `cards_projectsPageId_idx`(`projectsPageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects_page` (
    `id` VARCHAR(191) NOT NULL,
    `snapshot` VARCHAR(191) NOT NULL,
    `githubLink` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
