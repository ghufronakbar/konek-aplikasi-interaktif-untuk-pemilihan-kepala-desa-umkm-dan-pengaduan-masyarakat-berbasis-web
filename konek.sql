-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2024 at 02:23 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `konek`
--

-- --------------------------------------------------------

--
-- Table structure for table `akses_token`
--

CREATE TABLE `akses_token` (
  `id` int(11) NOT NULL,
  `warga_id` int(11) DEFAULT NULL,
  `pengurus_desa_anggota_id` int(11) DEFAULT NULL,
  `token` text NOT NULL,
  `ip_address` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `akses_token`
--

INSERT INTO `akses_token` (`id`, `warga_id`, `pengurus_desa_anggota_id`, `token`, `ip_address`) VALUES
(1, NULL, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZW5ndXJ1c19kZXNhX2FuZ2dvdGFfaWQiOjEsImlhdCI6MTcxNzYwODIxNiwiZXhwIjoxNzE3NjEzOTc2fQ.GMr6AkxqS_ZF2JqMOx6VmVduBoly2OiflP1HPuNfZ-Q', '192.168.56.1'),
(2, 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MSwiaWF0IjoxNzE3NjA5MTIwLCJleHAiOjE3MTc2MTQ4ODB9.QwOAs_9jW9jgCKlg4F9idSRUXzHBKqH6k3qTT25e3mc', '192.168.56.1'),
(3, 2, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MiwiaWF0IjoxNzE3NjA5NDA3LCJleHAiOjE3MTc2MTUxNjd9.novJ5p-Upw3L3M5nhT3ENLECBXGixe4b3dZyEVLymoQ', '192.168.56.1'),
(4, 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MSwiaWF0IjoxNzE3NjA5ODc0LCJleHAiOjE3MTc2MTU2MzR9.cCn5adjdMA3P5jpYAHoe-40gNzy02TOANWnSeRg_V4g', '192.168.56.1'),
(5, NULL, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZW5ndXJ1c19kZXNhX2FuZ2dvdGFfaWQiOjEsImlhdCI6MTcxNzYxMzE2MSwiZXhwIjoxNzE3NjE4OTIxfQ.1vKmRy-V9rkcPxm_Yo7X2a80Q4wf-KLiUuF3S5vHkdg', '192.168.56.1'),
(6, 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MSwiaWF0IjoxNzE3NjE2MDQ1LCJleHAiOjE3MTc2MjE4MDV9.lFQ0ZGzD3Amp9Rir89-jFFkZau95bFLpgoDF_fygc-Q', '192.168.56.1'),
(7, 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MSwiaWF0IjoxNzE3NjE2NjQ1LCJleHAiOjE3MTc2MjI0MDV9.-R9vjqEK0Opn9V9eDUVLxCwqohqsjmKJwxttntnPwMw', '192.168.56.1'),
(8, 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MSwiaWF0IjoxNzE3NjE2NzYwLCJleHAiOjE3MTc2MjI1MjB9.ytTmvjlVvsVwWXGVi7bq1HDzJrTOCKf1WE1W4Kphpas', '192.168.56.1'),
(9, NULL, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZW5ndXJ1c19kZXNhX2FuZ2dvdGFfaWQiOjEsImlhdCI6MTcxNzYyMTQ4NSwiZXhwIjoxNzE3NjI3MjQ1fQ.ifsTJghcBQ0PkXhLvz-7f4PK-tYIbekpmivrQTLlYFM', '192.168.56.1'),
(10, NULL, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZW5ndXJ1c19kZXNhX2FuZ2dvdGFfaWQiOjEsImlhdCI6MTcxNzYyMjg2NywiZXhwIjoxNzE3NjI4NjI3fQ.CtHCVfvj_CgqjyHPcPhV4cn824JWwxRs11jgQX2N2PA', '192.168.56.1'),
(11, NULL, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZW5ndXJ1c19kZXNhX2FuZ2dvdGFfaWQiOjEsImlhdCI6MTcxNzYzMTk2NiwiZXhwIjoxNzE3NjM3NzI2fQ.ekhTn9bx4kXavZq9KPOTrRaJqy4XfWt73dZdu8Ec_MY', '192.168.56.1');

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `berita_id` int(11) NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `subjudul` varchar(255) DEFAULT NULL,
  `tanggal` date DEFAULT current_timestamp(),
  `isi` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `publikasi` tinyint(1) DEFAULT 0,
  `prioritas` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `berita`
--

INSERT INTO `berita` (`berita_id`, `judul`, `subjudul`, `tanggal`, `isi`, `gambar`, `publikasi`, `prioritas`) VALUES
(1, 'Orchestra Berduet dengan British Army ', 'Alunan nada yang unik dan indah berkumandang di Bangsal Kepatihan', '2024-06-06', 'Kota Yogyakarta pada Selasa (4/6/2024) sore. Alunan musik itu tercipta kala gamelan milik Yogyakarta Royal Orchestra (YRO) berpadu dengan simfoni orkestra milik British Army Band Cholcaster.  Kedua kelompok itu sempat membawakan lagu Suwe Ora Jamu dan Gati Taruna. Irama orkestra yang dipadukan dengan gamelan terasa begitu \"sopan\" masuk ke telinga. British Army Band Colchester juga berkesempatan membawakan lagu-lagu lain seperti Captain America, Coldplay Classic, A Bridge to Far, Lord Of The Dance, dan Living on a Prayer lagu yang dipopulerkan oleh Bon Jovi.', '665f14e2d7795_d79f1b.jpg', 1, 1),
(2, '71 Kloter Jateng dan DIY Berangkat ke Tanah Suci, 8 Jemaah Haji Meninggal ', 'Sebanyak 71 kloter jamaah haji dari Jawa Tengah (Jateng) dan Daerah Istimewa Yogyakarta (DIY) telah berangkat ke Tanah Suci Makkah dari Embarkasi Asrama Haji Donohudan Boyolali, Jumat (31/5/2024)', '2024-06-06', 'Sebanyak delapan di antaranya meninggal selama proses ibadah haji berlangsung. Kebanyakan mereka ialah lansia. \"Sudah diberangkatkan 71 kloter, dengan total 25.553 jemaah haji. Sebanyak 8 jemaah wafat,\" kata Kasubbag Humas PPIH Embarkasi Solo, Gentur Rachma Indriadi melalui sambungan telepon, Sabtu (1/6/2024).', '66574e177c964_efa997.jpg', 1, 0),
(3, 'MA Ubah Aturan Batas Usia Calon Gubernur, Kaesang Bisa Maju Pilkada Jakarta', 'Putra bungsu Presiden Joko Widodo, Kaesang Pangarep, bisa maju sebagai calon gubernur Jakarta ', '2024-06-06', 'Putra bungsu Presiden Joko Widodo, Kaesang Pangarep, bisa maju sebagai calon gubernur Jakarta pada Pilkada Serentak 2024 imbas putusan Mahkamah Agung yang mengubah aturan terkait batas usia calon kepala daerah. Kaesang, 29 tahun, sebelumnya tak bisa mendapatkan tiket untuk memperebutkan kursi gubernur dan wakil gubernur Jakarta karena aturan batas minimum usia calon gubernur yang diatur KPU. Dalam Peraturan KPU (PKPU) Nomor 9 Tahun 2020, calon gubernur harus berusia 30 tahun ketika ditetapkan KPU sebagai kandidat yang akan berlaga di pilkada. KPU akan menetapkan calon kepala daerah di Pilkada Serentak 2024 pada 22 September 2024, sedangkan ketua umum Partai Solidaritas Indonesia (PSI) itu baru akan berusia 30 tahun pada 25 Desember 2024 kelak.', '65e2074dd1f0f_e89b00.jpg', 1, 0),
(4, 'Terungkap Pengakuan Para Napi Kasus Vina ke Teman Satu Selnya', 'Budi Permadi mengaku dekat dengan para narapidana kasus Vina saat masih di lapas.', '2024-06-06', 'Para terpidana kasus pembunuhan Vina dan Muhammad Rizky atau Eky di Cirebon pada 2016 silam, hingga kini masih mendekam di penjara. Mereka dijatuhi vonis seumur hidup oleh hakim Pengadilan Negeri Cirebon sejak 2017 silam.\r\n\r\nAda delapan orang yang dijadikan sebagai terpidana kasus Vina. Mereka adalah Supriyanto, Sudirman, Jaya, Hadi Saputra, Eka Sandi, Eko Ramadhani, Rivaldi dan Saka Tatal. Dari delapan orang itu, tujuh di antaranya masih mendekam di penjara karena dijatuhi hukuman seumur hidup.', '024582200-1717483588-830-556_71bdeb.jpg', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `calon_ketua`
--

CREATE TABLE `calon_ketua` (
  `calon_ketua_id` int(11) NOT NULL,
  `pemilihan_ketua_id` int(11) DEFAULT NULL,
  `warga_id` int(11) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `total_pemilih` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `calon_ketua`
--

INSERT INTO `calon_ketua` (`calon_ketua_id`, `pemilihan_ketua_id`, `warga_id`, `deskripsi`, `total_pemilih`) VALUES
(1, 1, 1, 'Saya ingin menjabat lagi agar lebih maju', 0),
(2, 1, 2, 'Saya ingin menggantikan sistem demokrasi yang sudah tidak bisa dikatakan demokrasi lagi.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `informasi_desa`
--

CREATE TABLE `informasi_desa` (
  `informasi_desa_id` int(11) NOT NULL,
  `nama_desa` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `luas_lahan_pertanian` decimal(10,2) DEFAULT NULL,
  `lahan_peternakan` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `informasi_desa`
--

INSERT INTO `informasi_desa` (`informasi_desa_id`, `nama_desa`, `deskripsi`, `luas_lahan_pertanian`, `lahan_peternakan`) VALUES
(1, 'Donorojo', 'Desa Donorojo merupakan salah satu dari 13 Desa yang ada di Kecamatan Mertoyudan, Kabupaten Magelang, Jawa Tengah. Secara administrasi Desa Donorojo terletak pada koordinat antara 110°21’57,5” Bujur Timur dan 07°55’43”6 Lintang selatan, dengan ketinggian 306 DPL. Wilayah Desa Donorojo terletak di tengah – tengah Kabupaten Magelang,', '100.00', '21.00');

-- --------------------------------------------------------

--
-- Table structure for table `jenis_umkm`
--

CREATE TABLE `jenis_umkm` (
  `jenis_umkm_id` int(11) NOT NULL,
  `nama_jenis_umkm` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jenis_umkm`
--

INSERT INTO `jenis_umkm` (`jenis_umkm_id`, `nama_jenis_umkm`) VALUES
(1, 'Makanan'),
(2, 'Minuman'),
(3, 'Pakaian'),
(4, 'Kerajinan'),
(5, 'Perhiasan'),
(6, 'Elektronik'),
(7, 'Pertanian'),
(8, 'Perikanan'),
(9, 'Kosmetik');

-- --------------------------------------------------------

--
-- Table structure for table `komentar`
--

CREATE TABLE `komentar` (
  `komentar_id` int(11) NOT NULL,
  `warga_id` int(11) DEFAULT NULL,
  `isi` text DEFAULT NULL,
  `tanggal` date DEFAULT current_timestamp(),
  `berita_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `komentar`
--

INSERT INTO `komentar` (`komentar_id`, `warga_id`, `isi`, `tanggal`, `berita_id`) VALUES
(1, 1, 'Sangat menarik untuk dilihat', '2024-06-06', 3),
(2, 2, 'Btul btul btul', '2024-06-06', 3);

-- --------------------------------------------------------

--
-- Table structure for table `pemilihan_ketua`
--

CREATE TABLE `pemilihan_ketua` (
  `pemilihan_ketua_id` int(11) NOT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pemilihan_ketua`
--

INSERT INTO `pemilihan_ketua` (`pemilihan_ketua_id`, `tanggal_mulai`, `tanggal_selesai`, `judul`, `deskripsi`) VALUES
(1, '2024-06-01', '2024-06-29', 'Pemilihan Kepala Desa 2024', 'Menuju Digitalisasi Desa');

-- --------------------------------------------------------

--
-- Table structure for table `pengaduan_masyarakat`
--

CREATE TABLE `pengaduan_masyarakat` (
  `pengaduan_masyarakat_id` int(11) NOT NULL,
  `warga_id` int(11) DEFAULT NULL,
  `subjek` varchar(255) DEFAULT NULL,
  `isi` text DEFAULT NULL,
  `tanggal` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pengaduan_masyarakat`
--

INSERT INTO `pengaduan_masyarakat` (`pengaduan_masyarakat_id`, `warga_id`, `subjek`, `isi`, `tanggal`) VALUES
(1, 1, 'Jalanan Rusak', 'Jembatan di dekat SMA xxx rusak parah', '2024-06-06'),
(2, 2, 'Demokrasi hancur', 'Demokrasi perlu ditegakkan lagi', '2024-06-06');

-- --------------------------------------------------------

--
-- Table structure for table `pengurus_desa_anggota`
--

CREATE TABLE `pengurus_desa_anggota` (
  `pengurus_desa_anggota_id` int(11) NOT NULL,
  `warga_id` int(11) DEFAULT NULL,
  `jabatan` varchar(255) DEFAULT NULL,
  `akses_admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pengurus_desa_anggota`
--

INSERT INTO `pengurus_desa_anggota` (`pengurus_desa_anggota_id`, `warga_id`, `jabatan`, `akses_admin`) VALUES
(1, 1, 'Kepala Desa', 1),
(2, 2, 'Sekretaris', 0);

-- --------------------------------------------------------

--
-- Table structure for table `umkm`
--

CREATE TABLE `umkm` (
  `umkm_id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `jenis_umkm_id` int(11) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `approve` tinyint(1) DEFAULT 0,
  `status` tinyint(1) DEFAULT 0,
  `warga_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `umkm`
--

INSERT INTO `umkm` (`umkm_id`, `nama`, `jenis_umkm_id`, `deskripsi`, `gambar`, `lokasi`, `approve`, `status`, `warga_id`) VALUES
(1, 'McD', 1, 'Fastfood yang sangat enak sekali, Ayo beli!', 'image_1717609298924.jpg', 'Mertoyudan, Magelang.', 2, 0, 1),
(2, 'Uniqlo', 3, 'Pakaian stylish masa kini', 'image_1717609640013.jpg', 'Muntilan, Magelang', 2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `warga`
--

CREATE TABLE `warga` (
  `warga_id` int(11) NOT NULL,
  `nik` varchar(20) NOT NULL,
  `kk` varchar(255) DEFAULT NULL,
  `nama_lengkap` varchar(255) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `hak_pilih` tinyint(1) NOT NULL DEFAULT 0,
  `password` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `warga`
--

INSERT INTO `warga` (`warga_id`, `nik`, `kk`, `nama_lengkap`, `tanggal_lahir`, `foto`, `hak_pilih`, `password`) VALUES
(1, '5210411243', '5212345678', 'Ghufron Akbar Maulana', '2004-02-18', 'image_59de11.jpg', 1, '25d55ad283aa400af464c76d713c07ad'),
(2, '5220411038', '512345678', 'Hasan Rama Sagita', '2002-12-22', 'image_a8d92f.jpg', 0, '25d55ad283aa400af464c76d713c07ad'),
(3, '5210411101', '5124817221', 'Eren Yeager', '2014-06-12', NULL, 0, '25d55ad283aa400af464c76d713c07ad');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akses_token`
--
ALTER TABLE `akses_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`berita_id`);

--
-- Indexes for table `calon_ketua`
--
ALTER TABLE `calon_ketua`
  ADD PRIMARY KEY (`calon_ketua_id`),
  ADD KEY `pemilihan_ketua_id` (`pemilihan_ketua_id`),
  ADD KEY `warga_id` (`warga_id`);

--
-- Indexes for table `informasi_desa`
--
ALTER TABLE `informasi_desa`
  ADD PRIMARY KEY (`informasi_desa_id`);

--
-- Indexes for table `jenis_umkm`
--
ALTER TABLE `jenis_umkm`
  ADD PRIMARY KEY (`jenis_umkm_id`);

--
-- Indexes for table `komentar`
--
ALTER TABLE `komentar`
  ADD PRIMARY KEY (`komentar_id`),
  ADD KEY `fk_berita_id` (`berita_id`),
  ADD KEY `fk_warga` (`warga_id`);

--
-- Indexes for table `pemilihan_ketua`
--
ALTER TABLE `pemilihan_ketua`
  ADD PRIMARY KEY (`pemilihan_ketua_id`);

--
-- Indexes for table `pengaduan_masyarakat`
--
ALTER TABLE `pengaduan_masyarakat`
  ADD PRIMARY KEY (`pengaduan_masyarakat_id`),
  ADD KEY `fk_warga_pengaduan` (`warga_id`);

--
-- Indexes for table `pengurus_desa_anggota`
--
ALTER TABLE `pengurus_desa_anggota`
  ADD PRIMARY KEY (`pengurus_desa_anggota_id`),
  ADD KEY `warga_id` (`warga_id`);

--
-- Indexes for table `umkm`
--
ALTER TABLE `umkm`
  ADD PRIMARY KEY (`umkm_id`),
  ADD KEY `fk_jenis_umkm` (`jenis_umkm_id`),
  ADD KEY `fk_warga_umkm` (`warga_id`);

--
-- Indexes for table `warga`
--
ALTER TABLE `warga`
  ADD PRIMARY KEY (`warga_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akses_token`
--
ALTER TABLE `akses_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `berita`
--
ALTER TABLE `berita`
  MODIFY `berita_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `calon_ketua`
--
ALTER TABLE `calon_ketua`
  MODIFY `calon_ketua_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `informasi_desa`
--
ALTER TABLE `informasi_desa`
  MODIFY `informasi_desa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jenis_umkm`
--
ALTER TABLE `jenis_umkm`
  MODIFY `jenis_umkm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `komentar`
--
ALTER TABLE `komentar`
  MODIFY `komentar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pemilihan_ketua`
--
ALTER TABLE `pemilihan_ketua`
  MODIFY `pemilihan_ketua_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pengaduan_masyarakat`
--
ALTER TABLE `pengaduan_masyarakat`
  MODIFY `pengaduan_masyarakat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pengurus_desa_anggota`
--
ALTER TABLE `pengurus_desa_anggota`
  MODIFY `pengurus_desa_anggota_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `umkm`
--
ALTER TABLE `umkm`
  MODIFY `umkm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `warga`
--
ALTER TABLE `warga`
  MODIFY `warga_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `calon_ketua`
--
ALTER TABLE `calon_ketua`
  ADD CONSTRAINT `calon_ketua_ibfk_1` FOREIGN KEY (`pemilihan_ketua_id`) REFERENCES `pemilihan_ketua` (`pemilihan_ketua_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `calon_ketua_ibfk_2` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `fk_berita_id` FOREIGN KEY (`berita_id`) REFERENCES `berita` (`berita_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_warga` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `komentar_ibfk_1` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pengaduan_masyarakat`
--
ALTER TABLE `pengaduan_masyarakat`
  ADD CONSTRAINT `fk_warga_pengaduan` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengaduan_masyarakat_ibfk_1` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pengurus_desa_anggota`
--
ALTER TABLE `pengurus_desa_anggota`
  ADD CONSTRAINT `pengurus_desa_anggota_ibfk_1` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `umkm`
--
ALTER TABLE `umkm`
  ADD CONSTRAINT `fk_jenis_umkm` FOREIGN KEY (`jenis_umkm_id`) REFERENCES `jenis_umkm` (`jenis_umkm_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_warga_umkm` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `umkm_ibfk_1` FOREIGN KEY (`jenis_umkm_id`) REFERENCES `jenis_umkm` (`jenis_umkm_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `umkm_ibfk_2` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
