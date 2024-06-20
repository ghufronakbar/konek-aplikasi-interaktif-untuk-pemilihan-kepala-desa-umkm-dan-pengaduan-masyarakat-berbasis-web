-- DropForeignKey
ALTER TABLE `calon_ketua` DROP FOREIGN KEY `calon_ketua_pemilihan_ketua_id_fkey`;

-- DropForeignKey
ALTER TABLE `calon_ketua` DROP FOREIGN KEY `calon_ketua_warga_id_fkey`;

-- DropForeignKey
ALTER TABLE `komentar` DROP FOREIGN KEY `komentar_warga_id_fkey`;

-- DropForeignKey
ALTER TABLE `pengaduan_masyarakat` DROP FOREIGN KEY `pengaduan_masyarakat_warga_id_fkey`;

-- DropForeignKey
ALTER TABLE `pengurus_desa_anggota` DROP FOREIGN KEY `pengurus_desa_anggota_warga_id_fkey`;

-- DropForeignKey
ALTER TABLE `umkm` DROP FOREIGN KEY `umkm_jenis_umkm_id_fkey`;

-- DropForeignKey
ALTER TABLE `umkm` DROP FOREIGN KEY `umkm_warga_id_fkey`;

-- DropIndex
DROP INDEX `berita_id` ON `berita`;

-- AddForeignKey
ALTER TABLE `calon_ketua` ADD CONSTRAINT `calon_ketua_pemilihan_ketua_id_fkey` FOREIGN KEY (`pemilihan_ketua_id`) REFERENCES `pemilihan_ketua`(`pemilihan_ketua_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calon_ketua` ADD CONSTRAINT `calon_ketua_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar` ADD CONSTRAINT `komentar_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengaduan_masyarakat` ADD CONSTRAINT `pengaduan_masyarakat_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengurus_desa_anggota` ADD CONSTRAINT `pengurus_desa_anggota_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `umkm` ADD CONSTRAINT `umkm_jenis_umkm_id_fkey` FOREIGN KEY (`jenis_umkm_id`) REFERENCES `jenis_umkm`(`jenis_umkm_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `umkm` ADD CONSTRAINT `umkm_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;
