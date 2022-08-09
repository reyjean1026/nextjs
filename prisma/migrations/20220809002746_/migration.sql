/*
  Warnings:

  - You are about to drop the column `pipId` on the `inventory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_pipId_fkey`;

-- AlterTable
ALTER TABLE `inventory` DROP COLUMN `pipId`,
    ADD COLUMN `pipSid` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_pipSid_fkey` FOREIGN KEY (`pipSid`) REFERENCES `Pip`(`sid`) ON DELETE SET NULL ON UPDATE CASCADE;
