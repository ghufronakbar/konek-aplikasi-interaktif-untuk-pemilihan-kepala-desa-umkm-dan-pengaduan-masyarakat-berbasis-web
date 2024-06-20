/*
  Warnings:

  - You are about to drop the column `pengurus_desa_anggotaPengurus_desa_anggota_id` on the `akses_token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `akses_token` DROP FOREIGN KEY `akses_token_pengurus_desa_anggotaPengurus_desa_anggota_id_fkey`;

-- DropIndex
DROP INDEX `akses_token_pengurus_desa_anggota_id_fkey` ON `akses_token`;

-- DropIndex
DROP INDEX `akses_token_warga_id_fkey` ON `akses_token`;

-- AlterTable
ALTER TABLE `akses_token` DROP COLUMN `pengurus_desa_anggotaPengurus_desa_anggota_id`;
