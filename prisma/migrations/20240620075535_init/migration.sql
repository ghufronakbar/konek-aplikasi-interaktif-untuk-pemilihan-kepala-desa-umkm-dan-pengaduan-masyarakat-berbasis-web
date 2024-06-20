-- CreateTable
CREATE TABLE `akses_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `warga_id` INTEGER NULL,
    `pengurus_desa_anggota_id` INTEGER NULL,
    `token` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berita` (
    `berita_id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(255) NULL,
    `subjudul` VARCHAR(255) NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isi` VARCHAR(191) NULL,
    `gambar` VARCHAR(255) NULL,
    `publikasi` BOOLEAN NOT NULL DEFAULT false,
    `prioritas` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`berita_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calon_ketua` (
    `calon_ketua_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pemilihan_ketua_id` INTEGER NULL,
    `warga_id` INTEGER NULL,
    `deskripsi` VARCHAR(191) NULL,
    `total_pemilih` INTEGER NULL,

    PRIMARY KEY (`calon_ketua_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `informasi_desa` (
    `informasi_desa_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_desa` VARCHAR(255) NULL,
    `deskripsi` VARCHAR(191) NULL,
    `luas_lahan_pertanian` DOUBLE NULL,
    `lahan_peternakan` DOUBLE NULL,

    PRIMARY KEY (`informasi_desa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenis_umkm` (
    `jenis_umkm_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jenis_umkm` VARCHAR(255) NULL,

    PRIMARY KEY (`jenis_umkm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `komentar` (
    `komentar_id` INTEGER NOT NULL AUTO_INCREMENT,
    `warga_id` INTEGER NULL,
    `isi` VARCHAR(191) NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `berita_id` INTEGER NULL,

    PRIMARY KEY (`komentar_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pemilihan_ketua` (
    `pemilihan_ketua_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_mulai` DATETIME(3) NULL,
    `tanggal_selesai` DATETIME(3) NULL,
    `judul` VARCHAR(255) NULL,
    `deskripsi` VARCHAR(191) NULL,

    PRIMARY KEY (`pemilihan_ketua_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengaduan_masyarakat` (
    `pengaduan_masyarakat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `warga_id` INTEGER NULL,
    `subjek` VARCHAR(255) NULL,
    `isi` VARCHAR(191) NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`pengaduan_masyarakat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengurus_desa_anggota` (
    `pengurus_desa_anggota_id` INTEGER NOT NULL AUTO_INCREMENT,
    `warga_id` INTEGER NULL,
    `jabatan` VARCHAR(255) NULL,
    `akses_admin` BOOLEAN NULL,

    PRIMARY KEY (`pengurus_desa_anggota_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `umkm` (
    `umkm_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NULL,
    `jenis_umkm_id` INTEGER NULL,
    `deskripsi` VARCHAR(191) NULL,
    `gambar` VARCHAR(255) NULL,
    `lokasi` VARCHAR(255) NULL,
    `approve` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `warga_id` INTEGER NULL,

    PRIMARY KEY (`umkm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warga` (
    `warga_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nik` VARCHAR(20) NOT NULL,
    `kk` VARCHAR(255) NULL,
    `nama_lengkap` VARCHAR(255) NULL,
    `tanggal_lahir` DATETIME(3) NULL,
    `foto` VARCHAR(255) NULL,
    `hak_pilih` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(80) NOT NULL,

    PRIMARY KEY (`warga_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `akses_token` ADD CONSTRAINT `akses_token_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `akses_token` ADD CONSTRAINT `akses_token_pengurus_desa_anggota_id_fkey` FOREIGN KEY (`pengurus_desa_anggota_id`) REFERENCES `pengurus_desa_anggota`(`pengurus_desa_anggota_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calon_ketua` ADD CONSTRAINT `calon_ketua_pemilihan_ketua_id_fkey` FOREIGN KEY (`pemilihan_ketua_id`) REFERENCES `pemilihan_ketua`(`pemilihan_ketua_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calon_ketua` ADD CONSTRAINT `calon_ketua_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar` ADD CONSTRAINT `komentar_berita_id_fkey` FOREIGN KEY (`berita_id`) REFERENCES `berita`(`berita_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar` ADD CONSTRAINT `komentar_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengaduan_masyarakat` ADD CONSTRAINT `pengaduan_masyarakat_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengurus_desa_anggota` ADD CONSTRAINT `pengurus_desa_anggota_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `umkm` ADD CONSTRAINT `umkm_jenis_umkm_id_fkey` FOREIGN KEY (`jenis_umkm_id`) REFERENCES `jenis_umkm`(`jenis_umkm_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `umkm` ADD CONSTRAINT `umkm_warga_id_fkey` FOREIGN KEY (`warga_id`) REFERENCES `warga`(`warga_id`) ON DELETE SET NULL ON UPDATE CASCADE;
