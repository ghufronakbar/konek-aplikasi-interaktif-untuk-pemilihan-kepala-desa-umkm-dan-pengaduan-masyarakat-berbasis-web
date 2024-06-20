-- DropForeignKey
ALTER TABLE `akses_token` DROP FOREIGN KEY `akses_token_pengurus_desa_anggota_id_fkey`;

-- DropForeignKey
ALTER TABLE `akses_token` DROP FOREIGN KEY `akses_token_warga_id_fkey`;

-- AlterTable
ALTER TABLE `akses_token` ADD COLUMN `pengurus_desa_anggotaPengurus_desa_anggota_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `akses_token` ADD CONSTRAINT `akses_token_pengurus_desa_anggotaPengurus_desa_anggota_id_fkey` FOREIGN KEY (`pengurus_desa_anggotaPengurus_desa_anggota_id`) REFERENCES `pengurus_desa_anggota`(`pengurus_desa_anggota_id`) ON DELETE SET NULL ON UPDATE CASCADE;
