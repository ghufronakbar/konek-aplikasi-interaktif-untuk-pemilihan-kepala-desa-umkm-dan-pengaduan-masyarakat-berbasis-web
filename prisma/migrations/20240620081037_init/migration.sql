/*
  Warnings:

  - Made the column `isi` on table `berita` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `berita` MODIFY `isi` VARCHAR(191) NOT NULL;
