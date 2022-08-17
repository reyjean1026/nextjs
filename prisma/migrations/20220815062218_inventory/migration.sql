-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `article` VARCHAR(255) NOT NULL,
    `categoryId` INTEGER NULL,
    `status` VARCHAR(255) NOT NULL,

    INDEX `article_categoryId_fkey`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `category_name` VARCHAR(255) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `articleId` INTEGER NULL,
    `description` TEXT NOT NULL,
    `date_acquired` DATE NOT NULL,
    `property_number` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit_value` FLOAT NOT NULL,
    `received_date` DATE NOT NULL,
    `registered_status` VARCHAR(255) NOT NULL,
    `temp_name` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `attachment` VARCHAR(255) NOT NULL,
    `remarks` TEXT NOT NULL,
    `in_status` INTEGER NOT NULL,
    `pipSid` VARCHAR(191) NULL,

    INDEX `inventory_articleId_fkey`(`articleId`),
    INDEX `inventory_pipSid_fkey`(`pipSid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pip` (
    `sid` VARCHAR(191) NOT NULL,
    `name_f` VARCHAR(191) NOT NULL,
    `name_m` VARCHAR(191) NOT NULL,
    `name_l` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `propertylogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inventoryId` INTEGER NULL,
    `received_date` DATE NOT NULL,
    `registered_status` VARCHAR(255) NOT NULL,
    `pipSid` VARCHAR(191) NULL,
    `temp_name` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `attachment` VARCHAR(255) NOT NULL,
    `remarks` TEXT NOT NULL,

    INDEX `propertylogs_inventoryId_fkey`(`inventoryId`),
    INDEX `propertylogs_pipSid_fkey`(`pipSid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_pipSid_fkey` FOREIGN KEY (`pipSid`) REFERENCES `pip`(`sid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propertylogs` ADD CONSTRAINT `propertylogs_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `inventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propertylogs` ADD CONSTRAINT `propertylogs_pipSid_fkey` FOREIGN KEY (`pipSid`) REFERENCES `pip`(`sid`) ON DELETE SET NULL ON UPDATE CASCADE;
