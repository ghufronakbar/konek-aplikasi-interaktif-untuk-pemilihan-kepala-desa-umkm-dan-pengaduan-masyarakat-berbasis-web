-- DropForeignKey
ALTER TABLE `komentar` DROP FOREIGN KEY `komentar_berita_id_fkey`;

-- CreateIndex
CREATE INDEX `berita_id` ON `berita`(`berita_id`);

-- AddForeignKey
ALTER TABLE `komentar` ADD CONSTRAINT `komentar_berita_id_fkey` FOREIGN KEY (`berita_id`) REFERENCES `berita`(`berita_id`) ON DELETE CASCADE ON UPDATE CASCADE;
