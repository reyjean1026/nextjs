-- CreateTable
CREATE TABLE `Inventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `date_acquired` DATETIME(3) NOT NULL,
    `property_number` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unit_value` DOUBLE NOT NULL,
    `received_date` DATETIME(3) NOT NULL,
    `registered_status` VARCHAR(191) NOT NULL,
    `assigned_to` VARCHAR(191) NOT NULL,
    `temp_name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NULL,
    `attachment` VARCHAR(191) NULL,
    `remarks` VARCHAR(191) NULL,
    `in_status` INTEGER NOT NULL,
    `pipId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pip` (
    `sid` VARCHAR(191) NOT NULL,
    `name_f` VARCHAR(191) NOT NULL,
    `name_m` VARCHAR(191) NOT NULL,
    `name_l` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_pipId_fkey` FOREIGN KEY (`pipId`) REFERENCES `Pip`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;
