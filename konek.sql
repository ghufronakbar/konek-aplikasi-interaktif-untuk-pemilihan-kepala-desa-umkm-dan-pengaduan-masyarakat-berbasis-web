-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Bulan Mei 2024 pada 03.32
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

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
-- Struktur dari tabel `akses_token`
--

CREATE TABLE `akses_token` (
  `id` int(11) NOT NULL,
  `warga_id` int(11) NOT NULL,
  `pengurus_desa_anggota_id` int(11) NOT NULL,
  `token` text NOT NULL,
  `ip_address` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `akses_token`
--

INSERT INTO `akses_token` (`id`, `warga_id`, `pengurus_desa_anggota_id`, `token`, `ip_address`) VALUES
(1, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJwZW5ndXJ1c19kZXNhX2FuZ2dvdGFfaWQiOjMsIndhcmdhX2lkIjoxMiwibmlrIjoiOTk5IiwiYWtzZXNfYWRtaW4iOjEsInBhc3N3b3JkIjoiYjcwNjgzNWRlNzlhMmI0ZTgwNTA2ZjU4MmFmMzY3NmEifV0sImlhdCI6MTcxNDAyNjg4NSwiZXhwIjoxNzE0MDI4MzI1fQ.oJeFAyDXGtGHGK26Gu6mv1OSXxcTx_B4hHsACFNH_u8', '192.168.56.1'),
(2, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJwZW5ndXJ1c19kZXNhX2FuZ2dvdGFfaWQiOjMsIndhcmdhX2lkIjoxMiwibmlrIjoiOTk5IiwiYWtzZXNfYWRtaW4iOjEsInBhc3N3b3JkIjoiYjcwNjgzNWRlNzlhMmI0ZTgwNTA2ZjU4MmFmMzY3NmEifV0sImlhdCI6MTcxNDA0MDY5MCwiZXhwIjoxNzE0MDQyMTMwfQ.5CUye_0yZRi41AY6ytaRDJXE1DM1l9mNp0LvLrNtbLM', '192.168.56.1'),
(3, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJwZW5ndXJ1c19kZXNhX2FuZ2dvdGFfaWQiOjMsIndhcmdhX2lkIjoxMiwibmlrIjoiOTk5IiwiYWtzZXNfYWRtaW4iOjEsInBhc3N3b3JkIjoiYjcwNjgzNWRlNzlhMmI0ZTgwNTA2ZjU4MmFmMzY3NmEifV0sImlhdCI6MTcxNDIzNTA2MCwiZXhwIjoxNzE0MjM2NTAwfQ.wWU2pMYdI_v0inzhR3ap2xyO38K3TXadoYc1WV185Os', '192.168.56.1'),
(4, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJkZWZhdWx0LmpwZyIsImhha19waWxpaCI6MCwicGFzc3dvcmQiOiJiNzA2ODM1ZGU3OWEyYjRlODA1MDZmNTgyYWYzNjc2YSJ9XSwiaWF0IjoxNzE0MjM1MzQ1LCJleHAiOjE3MTQyMzY3ODV9.kdtqHTOYnXGKkbIjgDJ2vByKPrVZU8iydP8UV4M7Cl0', '192.168.56.1'),
(5, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTQ3NDA1MDQsImV4cCI6MTcxNDc0MTk0NH0.Lr6QLkT4mOE5xLD96YhD0sDtXjuZhB9wrNy4r1idD1s', '192.168.56.1'),
(6, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTQ3NDA1MjgsImV4cCI6MTcxNDc0MTk2OH0.TRHImkrqqKYPGy8414Puj0hSyH2S6djIw9wWD40Hk7g', '192.168.56.1'),
(7, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTQ3NDA1MjksImV4cCI6MTcxNDc0MTk2OX0.4zd3CYKbnWVrodciRVPZ-20APBHe8hWfxXAyjSo6hZ0', '192.168.56.1'),
(8, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTQ3NDEwNjgsImV4cCI6MTcxNDc0MjUwOH0.htekUhthFnK31k0uoucFR3pMU-Hc3Bf-1uyHc8X_K9I', '192.168.56.1'),
(9, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTU2MzY5MjMsImV4cCI6MTcxNTYzODM2M30.uUTUjdK8sC7v9pA1E7MeSMhMlIOJJPbIUaIKs6PGdu4', '169.254.230.46'),
(10, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTU2MzcwMjEsImV4cCI6MTcxNTYzODQ2MX0.3cDjg_AgMTXFKm2XnXdupCBKLdESNXXOeFzH2vnGUn4', '169.254.230.46'),
(11, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTU2Mzg1MDIsImV4cCI6MTcxNTYzOTk0Mn0.8kNanFxzaAM3ytwi4UeaQushMHMHJgtHMsR39hp7Rtw', '169.254.230.46'),
(12, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTU2Mzg1MTAsImV4cCI6MTcxNTYzOTk1MH0.TWNAGTUSfsSNKTWLlJKzpGzdMtL4-NCpzGjIN97jfQc', '169.254.230.46'),
(13, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTU2Mzg1NTgsImV4cCI6MTcxNTYzOTk5OH0.uRF2iNV9DVNeQmsL8S_9BQ6FDmGsiuS2UWtuYsLMuQs', '169.254.230.46'),
(14, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTU2Mzg3NDEsImV4cCI6MTcxNTY0MDE4MX0.2MOv-ltdmTy6G3tjm1iSXJ69Zwzj-PHlWcRs53TBOQU', '169.254.230.46'),
(15, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTU2MzkwMDksImV4cCI6MTcxNTY0MDQ0OX0.MytZ7Wd6u_1IuJHV3V6qguSOH043VOhpGNEE5cnQ_Ao', '169.254.230.46'),
(16, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ3YXJnYV9pZCI6MTIsIm5payI6Ijk5OSIsImtrIjoiOTk5IiwibmFtYV9sZW5na2FwIjoiR2h1ZnJvbiBBa2JhciBNYXVsYW5hIiwidGFuZ2dhbF9sYWhpciI6IjIwMDQtMDItMThUMTc6MDA6MDAuMDAwWiIsImZvdG8iOiJodHRwczovL2NkbjEtcHJvZHVjdGlvbi1pbWFnZXMta2x5LmFrYW1haXplZC5uZXQvVFVJMzBhVWhKVF8wSVhzeVF5cHQ4Q05IZ0tNPS84MDB4MTA2Ni9zbWFydC9maWx0ZXJzOnF1YWxpdHkoNzUpOnN0cmlwX2ljYygpOmZvcm1hdCh3ZWJwKS9rbHktbWVkaWEtcHJvZHVjdGlvbi9tZWRpYXMvNDY0MDE4NS9vcmlnaW5hbC8wMzUzNzQ3MDBfMTY5OTQxOTY1Ni1FcmVuXzIuanBnIiwiaGFrX3BpbGloIjowLCJwYXNzd29yZCI6ImI3MDY4MzVkZTc5YTJiNGU4MDUwNmY1ODJhZjM2NzZhIn1dLCJpYXQiOjE3MTU2MzkxNTAsImV4cCI6MTcxNTY0MDU5MH0.fkT5R2JJEPZf4TqJ5jnNr012-zHazI8d4gT4WjqTumU', '169.254.230.46'),
(17, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJuaWsiOiI5OTkiLCJ3YXJnYV9pZCI6MTJ9XSwiaWF0IjoxNzE1NjM5MjA4LCJleHAiOjE3MTU2NDA2NDh9.wazWfJFSYIglaZhuzqa2MiSwaG7kCXg1a2JHmH7tV0A', '169.254.230.46'),
(18, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJuaWsiOiI5OTkiLCJ3YXJnYV9pZCI6MTJ9XSwiaWF0IjoxNzE1NjM5MjgxLCJleHAiOjE3MTU2NDA3MjF9.jpby4L9UB4teZOsBwtZ1EnBKAsw2NbC4bpLoVGBD0-8', '169.254.230.46'),
(19, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY0MDM5NSwiZXhwIjoxNzE1NjQxODM1fQ.jbpSBCGjyMMcPLVroTISlldAmaHAhnjy7DN19sxCOVE', '169.254.230.46'),
(20, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY0MDQxMywiZXhwIjoxNzE1NjQxODUzfQ.VyUZb8dOEJlKLx63jUQDA7nyAjQmH59EWbzyug8pu88', '169.254.230.46'),
(21, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY0MjMxNCwiZXhwIjoxNzE1NjQzNzU0fQ.apE71YN-peeokDAvjVFBl_TOpOSo_TlxBReeisXhyU8', '169.254.230.46'),
(22, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY0NzQ4NCwiZXhwIjoxNzE1NjQ4OTI0fQ.LS8xI6puNsX0qRyY-aVOXYNvwirlyneT6NsMtxu-8Cs', '169.254.230.46'),
(23, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY0OTY4NywiZXhwIjoxNzE1NjUxMTI3fQ.ChDsgS6Ra3tqFMwF3333kBYW4qlWYlVIt5yvYScENHE', '169.254.230.46'),
(24, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY2MjAxNSwiZXhwIjoxNzE1NjYzNDU1fQ.jJfeuPnexTq9nqa4U7Kl_Dp1iXzMK8876DmQEpwRTMQ', '169.254.230.46'),
(25, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY2MjAxNywiZXhwIjoxNzE1NjYzNDU3fQ.7hswHEj4kD4yg_IucnEe7XdVgWYXcdM3EZvgjvBr7Ec', '169.254.230.46'),
(26, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY2MjQwMywiZXhwIjoxNzE1NjYzODQzfQ.5hiRNXjVRblx631iWhIHz5-gTK3lgXxoB6-W1D6HBFE', '169.254.230.46'),
(27, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY3MjU2NiwiZXhwIjoxNzE1Njc0MDA2fQ.QMj-uFQdCJbTZTCy6rIqsp31hHd8_t2f_kSG3SlSZ8w', '169.254.230.46'),
(28, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY3NDM4OSwiZXhwIjoxNzE1Njc1ODI5fQ.vokIk2iDHt75tmmM6AODLYuD02l95Zzdj1lqiicbVUg', '169.254.230.46'),
(29, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY3NTA4MCwiZXhwIjoxNzE1Njc2NTIwfQ.rEz95-hlAhgi0CSvQRbzu1ye46P83mLg9xKE2ySr3Lc', '169.254.230.46'),
(30, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4NzMxMCwiZXhwIjoxNzE1Njg4NzUwfQ.Ohh_RpkN5c_OjxjITa6npnbEcfFLRct9Kt4N_uE1UIM', '169.254.230.46'),
(31, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODE1MywiZXhwIjoxNzE1Njg5NTkzfQ.r8rTmrDy7eJDNmh2psFZFpRIWR-jy6twOMzscVkgtK0', '169.254.230.46'),
(32, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODIzMCwiZXhwIjoxNzE1Njg5NjcwfQ.MRFC1PQqYIq33GGXlr_0E5qbEO3b8Z6kPQ1L8lkuvcE', '169.254.230.46'),
(33, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODM5NiwiZXhwIjoxNzE1Njg5ODM2fQ.qb2yYHYIDdtflN4pxJLdfGaCbSunpQACPjxX6XBJM4Q', '169.254.230.46'),
(34, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODQ2OSwiZXhwIjoxNzE1Njg5OTA5fQ.QysjvRWBmdO8HpfEY55TV56kiBWrp24CTwfjKG88JyA', '169.254.230.46'),
(35, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODQ4NiwiZXhwIjoxNzE1Njg5OTI2fQ._RiK9oseSLh1C7ct2DpUWGE7nyKo5Zo5EggW1pxqAfE', '169.254.230.46'),
(36, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODU1OCwiZXhwIjoxNzE1Njg5OTk4fQ.pJSoc3T3b05mlOHtsYCvWXwofaRhpJmMnknoJMN7QE8', '169.254.230.46'),
(37, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODU4MywiZXhwIjoxNzE1NjkwMDIzfQ.PitmV6sh-v7F_wcljBNa4vtMQ5bVoBdAKjzZg0sYDdY', '169.254.230.46'),
(38, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODYxOSwiZXhwIjoxNzE1NjkwMDU5fQ.xMMioewgB5fQmo_1Qw3L9pF-2plDTxYzwVK7rgyY4-M', '169.254.230.46'),
(39, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODcxNCwiZXhwIjoxNzE1NjkwMTU0fQ.q2U50jPY4dmndF9elDkI-n9rO0QApo4BpjvFP8AsPvQ', '169.254.230.46'),
(40, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODc0NywiZXhwIjoxNzE1NjkwMTg3fQ.qWjbUCcBUvg722QAiFGKJXshjaQpZZ6wxJgEw_KeFKw', '169.254.230.46'),
(41, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODc3MiwiZXhwIjoxNzE1NjkwMjEyfQ.a6Jo0gzQ1xHvNq1FKgjLVlD_U7XRkUN6RJxrxNzAXrc', '169.254.230.46'),
(42, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODc5OSwiZXhwIjoxNzE1NjkwMjM5fQ.8ccUXD8uca7Snz6o_RPrRuO-2AWLjlZ4jK_xYvqEI7Q', '169.254.230.46'),
(43, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4ODkwMSwiZXhwIjoxNzE1NjkwMzQxfQ.WJ9BoPcJRUGhYvNWhTKlnc2k01nLXdlYLUNnlC7F3s0', '169.254.230.46'),
(44, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4OTA1NSwiZXhwIjoxNzE1NjkwNDk1fQ.tGi9DnFuju4Ga2jAMWlU-VRmwDL17WOEk0x_n_7dyFw', '169.254.230.46'),
(45, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4OTA5NCwiZXhwIjoxNzE1NjkwNTM0fQ.tXcsl_emKziZzEb2kt6knTQQo0sGHqBz62Nebadr-SY', '169.254.230.46'),
(46, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4OTExNywiZXhwIjoxNzE1NjkwNTU3fQ.CrkhRAFpG68B8WXr5xjmeYg_rqNcWQbR0fjPvIEnYzI', '169.254.230.46'),
(47, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4OTE2NywiZXhwIjoxNzE1NjkwNjA3fQ.DknbEGWJWbv4CmhOv4lHPA2qgQQIM2UbuP5SwkmqLzM', '169.254.230.46'),
(48, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4OTM5OSwiZXhwIjoxNzE1NjkwODM5fQ.E4VBdsWjMNet4O5ufj0LSKbN9D0xJ8W7AJNrbJfcjUg', '169.254.230.46'),
(49, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4OTUxMSwiZXhwIjoxNzE1NjkwOTUxfQ.J0rq930ealVy0GgrBRrsWnMai0yLbKptmKnhy9rAEc0', '169.254.230.46'),
(50, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4OTYxMiwiZXhwIjoxNzE1NjkxMDUyfQ.Zx05eR8pbm9kTdz052tki6EhhMGrL3FvPo-JVy2PQtg', '169.254.230.46'),
(51, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY4OTY2NywiZXhwIjoxNzE1NjkxMTA3fQ.uEdr5887RaaBqjnxMzBs9VwdwbTlhN3xU0UyduT5hPo', '169.254.230.46'),
(52, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MDU5OSwiZXhwIjoxNzE1NjkyMDM5fQ.Oy0HZ7Kyt1s9mWMiQQqF9MDjBSSXLLabkKwOXAle720', '169.254.230.46'),
(53, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MDYyMSwiZXhwIjoxNzE1NjkyMDYxfQ.DMgrVq2o9fzaqk0PoVcRBsZWrUrB8pyn52mN50q0hXk', '169.254.230.46'),
(54, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MDcwNCwiZXhwIjoxNzE1NjkyMTQ0fQ.w8Fc96zxEX1mWmbKrqAhgbgBzNhJNp6wF76o2c-pyw0', '169.254.230.46'),
(55, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MDc3OCwiZXhwIjoxNzE1NjkyMjE4fQ.x3KgA7V4Ex_w1G7LN5rAiGAzv3-cpiyWmWID2O5lqng', '169.254.230.46'),
(56, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MDkxOSwiZXhwIjoxNzE1NjkyMzU5fQ.5_P8KKGm5eYuXl6C1qFsJAUrqgblDRio_Ett3iYc7aU', '169.254.230.46'),
(57, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MDk2OCwiZXhwIjoxNzE1NjkyNDA4fQ.C6GBDDfCXzP-sBkPd6y9MD5VJc2FQye64BihWTyX0Oo', '169.254.230.46'),
(58, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MTgwMSwiZXhwIjoxNzE1NjkzMjQxfQ.N3IN0wKdYt3YDYrYoDjQulRFRBgefpiFu5TWoWB-6vE', '169.254.230.46'),
(59, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MjUwMSwiZXhwIjoxNzE1NjkzOTQxfQ.LO4dpKlcwF4NzFdYBluBonlF6HfCfFA7qSNxi82dnuc', '169.254.230.46'),
(60, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MjU0MywiZXhwIjoxNzE1NjkzOTgzfQ.QVkFLP9ekWzuL9XCnw2LlzC8z-20SdmkGyFYxs1Z6lY', '169.254.230.46'),
(61, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5Mjg0NCwiZXhwIjoxNzE1Njk0Mjg0fQ.dlvyGbkdOfW2xLxtXq_mMZ4PULT6PwPhlBnqaMbpojY', '169.254.230.46'),
(62, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MjkzNCwiZXhwIjoxNzE1Njk0Mzc0fQ.5UgvqcIbhyFVQ14qFBfTT9mrkGcBFAnKRMo6tDnVXzU', '169.254.230.46'),
(63, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MzIyNCwiZXhwIjoxNzE1Njk0NjY0fQ.42A1lvAzGY9NDLSIgu2CTQETJzPtGCmJfIe5sOsP9uo', '169.254.230.46'),
(64, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5MzUzMywiZXhwIjoxNzE1Njk0OTczfQ.SDZ71-stwn4oqfW42mz2oEX9p0aM-Fc8jPR8xZuTcAo', '169.254.230.46'),
(65, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NDA1NiwiZXhwIjoxNzE1Njk1NDk2fQ.C35ejCR5gVQMF6aGOBLrXa1w7RmAeD_JloVoJR4C9j4', '169.254.230.46'),
(66, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NDA4OSwiZXhwIjoxNzE1Njk1NTI5fQ.O5J2RZNT4m_WfHdJvCzbZcPmphxspdZEgWV_jN2UZTg', '169.254.230.46'),
(67, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NDE4MSwiZXhwIjoxNzE1Njk1NjIxfQ.EaoWRFjkYv94mIs54pkSRk0-l5QzceCdqDnq-OsTA-U', '169.254.230.46'),
(68, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NDMyMCwiZXhwIjoxNzE1Njk1NzYwfQ.CeH_Oa0cvx9JiFRRuXjgl5CNTDuSWWhbXamb2bCgpzM', '169.254.230.46'),
(69, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NDQ2MywiZXhwIjoxNzE1Njk1OTAzfQ.uD8yquwDWX96U3idLVX3O91zCdNKnktn4C4t9xyadNo', '169.254.230.46'),
(70, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NDU3MiwiZXhwIjoxNzE1Njk2MDEyfQ.qYXFEVWGnKbUksXpIA48xO_8pisTZBMtuKEX3Z256zM', '169.254.230.46'),
(71, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NTI0OSwiZXhwIjoxNzE1Njk2Njg5fQ.eGrWjHlyw9B7tsDaTsY8ieAWreHWJ0xRIbJyNwXN4rM', '169.254.230.46'),
(72, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NzE1NywiZXhwIjoxNzE1Njk4NTk3fQ.qYAACXuWV4MwKfv9mlhXKCdxX3LOteYfp46ceMgDt8c', '169.254.230.46'),
(73, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NzQwMCwiZXhwIjoxNzE1Njk4ODQwfQ.1dIkOnU3WpP97oePhe7PiZo0zyjU98dEuOHHAnm40hg', '169.254.230.46'),
(74, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NzU5NiwiZXhwIjoxNzE1Njk5MDM2fQ.fJ8ZmVbai3_EpPL8T0o1JVlEE1Kx_pExEQAwtEA7nOY', '169.254.230.46'),
(75, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5Nzg2OCwiZXhwIjoxNzE1Njk5MzA4fQ.wbpf-4kDkdrVzIx7b7X87wJorzDjTXDnfGBqfKIhG6w', '169.254.230.46'),
(76, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5NzkyOSwiZXhwIjoxNzE1Njk5MzY5fQ._g26si5l_BsffuNyHjjl5o8CT7Zm3c8u2XfOEppuUa8', '169.254.230.46'),
(77, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5Nzk4NiwiZXhwIjoxNzE1Njk5NDI2fQ.pNX75g48BzNEjEG2FKyz5Z5PkBqyrqtHvDpP6TNBJHI', '169.254.230.46'),
(78, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5ODA4MCwiZXhwIjoxNzE1Njk5NTIwfQ.6BSBhVGxw-VEXYH4fJ2zIkpkuOnoq2glLzCv5Q28-nE', '169.254.230.46'),
(79, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5ODE0NSwiZXhwIjoxNzE1Njk5NTg1fQ.iv2WuTaKyZ2PbNkxLnLysLz93A1QKH0kP49EqzegGqQ', '169.254.230.46'),
(80, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5ODE5NCwiZXhwIjoxNzE1Njk5NjM0fQ.GWpXZAiwug6arAJmcW0MdBaUq2SwGHVmxSm2V3eDXOg', '169.254.230.46'),
(81, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5ODIzOCwiZXhwIjoxNzE1Njk5Njc4fQ.l6adoLgCL7QCK9ou09bb_OLAanYUx3_uHUnMlLZwrcQ', '169.254.230.46'),
(82, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5ODM1MywiZXhwIjoxNzE1Njk5NzkzfQ.PMxVefBm1DIJvCprofX-EcFtdB4dD_GySLS2-inKt7Q', '169.254.230.46'),
(83, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5ODUwNSwiZXhwIjoxNzE1Njk5OTQ1fQ.OEMfR5NH8MRThupuEW5SO2aJ8JxDfatH3UsNe7xgkxU', '169.254.230.46'),
(84, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5ODY2OCwiZXhwIjoxNzE1NzAwMTA4fQ.6hXW2a6yDWYgTOKnmntw76Ro-P_jQHt6ZxnlMigjnn0', '169.254.230.46'),
(85, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5ODkwNCwiZXhwIjoxNzE1NzAwMzQ0fQ.B-j0in16dxo_dhzQDD2hG33dzfDqZn7F2wSLmWTUPNA', '169.254.230.46'),
(86, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5OTAwMywiZXhwIjoxNzE1NzAwNDQzfQ.7sqEHpRiVDJIbrr_TNcyrP0RFurkIdiPSn3NyoynyxM', '169.254.230.46'),
(87, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5OTIxMiwiZXhwIjoxNzE1NzAwNjUyfQ.ne64umSqnCMCqjRZy4SFnSTDERRtIZLAyMuxZrZ2S5Q', '169.254.230.46'),
(88, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTY5OTM3NiwiZXhwIjoxNzE1NzAwODE2fQ.QN2KUFYs_cnYxxUWwWxCV9WLijIAVou4hOMS9c0G7P0', '169.254.230.46'),
(89, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcwMDA3MiwiZXhwIjoxNzE1NzAxNTEyfQ.FXywcURC95sru6U2ZJzjSbVDzMxZHHI-G2ENMQ4s3ws', '169.254.230.46'),
(90, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcwMDE0MCwiZXhwIjoxNzE1NzAxNTgwfQ.UFJcDWWH8BPbtOz-wfuyikINkpn3hEOWoYhDfGqUBco', '169.254.230.46'),
(91, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcwMzM3OCwiZXhwIjoxNzE1NzA0ODE4fQ.8NwDuss_SoEeEEI4lUh86N6pu_Fq4ItdU0vKvYcAU2c', '169.254.230.46'),
(92, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcwNTcwNSwiZXhwIjoxNzE1NzA3MTQ1fQ.JghnGwAH0SKsErf_TF7YJRLNi3ptHgoWXg2mpXx6B0o', '169.254.230.46'),
(93, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcwNjY3OSwiZXhwIjoxNzE1NzA4MTE5fQ.gLf5fcyVRe-Ufr2H97FNNiYd2Iknw1BhhYIbF4ol8Co', '169.254.230.46'),
(94, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcwNzc4MiwiZXhwIjoxNzE1NzA5MjIyfQ.rxay8fG3VCxgmXlGrl_b_LTdJRMClNRiwQXCODkOmxQ', '169.254.230.46'),
(95, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcwODEyNiwiZXhwIjoxNzE1NzA5NTY2fQ._zyAMf41Am63yMGLjhG2YIfcU5CxZl3DrUNNMzKFYEY', '169.254.230.46'),
(96, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcxMDQ1OSwiZXhwIjoxNzE1NzExODk5fQ.k1QeP8CC11UAAkkHael65G1SnNX_5pOZJarqO9GT9nE', '169.254.230.46'),
(97, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcxMDY5NiwiZXhwIjoxNzE1NzEyMTM2fQ.LvbJNtdY3gupi0WWBfepssnHWr4MROH0pjnBqIvM-2M', '169.254.230.46'),
(98, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcxMjExNywiZXhwIjoxNzE1NzE3ODc3fQ.c53rxsr0tNvtrblK971UF6Ha3eSnCJ2XkYUcDlzup40', '169.254.230.46'),
(99, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcxMzc2NCwiZXhwIjoxNzE1NzE5NTI0fQ.TWEH5QRaopj1yUJ9KBXB2KSix3Hodeek1bdZXWBgvnQ', '169.254.230.46'),
(100, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcxOTQwMiwiZXhwIjoxNzE1NzI1MTYyfQ.4Su9k3lo9klgiI77EzRg5uBM-akIltsPc0MFF9DEKMQ', '169.254.230.46'),
(101, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcyMDQyMiwiZXhwIjoxNzE1NzI2MTgyfQ.b5l7gG2dw_varL00w70ERpxxgusq23nx0H-Pe1XMvF4', '169.254.230.46'),
(102, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTcyMTU1NiwiZXhwIjoxNzE1NzI3MzE2fQ.3HXYBMSOHpQD5F6Kddx-ti9BShmUi6WInNpQ-uVNKus', '169.254.230.46'),
(103, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTczODE3MiwiZXhwIjoxNzE1NzQzOTMyfQ.LuYGlJCMWFJDK4BgWRf212dmqwjk58z2z14a7M0qZac', '169.254.230.46'),
(104, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTc0NTUyNywiZXhwIjoxNzE1NzUxMjg3fQ.--0czbnOHxIYRIICCB-P9ICRVOZGMyzL4HhIW0dg1lM', '169.254.230.46'),
(105, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTc0ODExOCwiZXhwIjoxNzE1NzUzODc4fQ.YJYIMP7jLdKVSatg3ur8judXdGmhRX-MuZCr5-JcyRc', '169.254.230.46'),
(106, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTc4MDc0NywiZXhwIjoxNzE1Nzg2NTA3fQ.EMhXSrF4CPhd6xeN1nP_6jdklikSHLAzhuG1Afsq4Es', '169.254.230.46'),
(107, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTc4MTg0MywiZXhwIjoxNzE1Nzg3NjAzfQ.W-GVfieuCokqEa-dvE1T-rg5NixOrmRl9Kq5AMAGXP0', '169.254.230.46'),
(108, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTc5NTM4MywiZXhwIjoxNzE1ODAxMTQzfQ.WIBwpy5QqZqXcQuN3XY1s3X4p-1oUNSfcs97AF6s58s', '169.254.230.46'),
(109, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTc5NTYxNSwiZXhwIjoxNzE1ODAxMzc1fQ.JO-qsNqjAMzSrMjGsc3-_j43Vts5vC_iSFWrkg62lxY', '169.254.230.46'),
(110, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgwMTQyMywiZXhwIjoxNzE1ODA3MTgzfQ.F5RHBJQpbY-O181vP2RkbF9R7qgsNklffo682EAuAdA', '169.254.230.46'),
(111, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgwNzU0MywiZXhwIjoxNzE1ODEzMzAzfQ.sA9qPzcKnoZCr3duxGOPBnmWOE_KkiQifYtKEJxVuQk', '169.254.230.46'),
(112, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgwODA0NSwiZXhwIjoxNzE1ODEzODA1fQ.br79bQBaJ_GLBtYKhfrU-w8a0rDBbktWyUF0WaCPyjM', '169.254.230.46'),
(113, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgxMTMwNywiZXhwIjoxNzE1ODE3MDY3fQ.Pwn5d_HEagCw2mrdVowaLLghUVHuotiymOoKeNrWVxM', '169.254.230.46'),
(114, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgxMTMxNSwiZXhwIjoxNzE1ODE3MDc1fQ.7xJr0CtGKTPE3M7ziY9m6waEKMDqQric5mPS1wT2qKo', '169.254.230.46'),
(115, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgxNTA0MiwiZXhwIjoxNzE1ODIwODAyfQ.qnx3tW6tDgP_qamO6HNJCvMS1BpjplMTBuH7XYWcaAg', '169.254.230.46'),
(116, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgxODgyOCwiZXhwIjoxNzE1ODI0NTg4fQ.SQbryBCgsFJaBAjwWTBF-E99MHdtkjOg3NAXCWlmveA', '169.254.230.46'),
(117, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgyMDg3MCwiZXhwIjoxNzE1ODI2NjMwfQ.H7_Gz_PiKYzQJDQAHLZgRRBmgvM2_5ALhUyOPg9ze40', '169.254.230.46'),
(118, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgyMTI1NiwiZXhwIjoxNzE1ODI3MDE2fQ.2VajEGvGiJrX_Tqa8UrcnaNjravnTp-G6o7XJVHEWe8', '169.254.230.46'),
(119, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgyMTI2MywiZXhwIjoxNzE1ODI3MDIzfQ.gZPFZlW-gfd2nkh5KSpkU1haEc0QhwC-dNJ1PBM7D9M', '169.254.230.46'),
(120, 12, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YXJnYV9pZCI6MTIsImlhdCI6MTcxNTgyMzA0OCwiZXhwIjoxNzE1ODI4ODA4fQ.nr1Kg7uz2XPvvZFxJsme7Yd0UUOsEHToVL24o5GN0bI', '169.254.230.46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `berita`
--

CREATE TABLE `berita` (
  `berita_id` int(11) NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `subjudul` varchar(255) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `isi` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `publikasi` tinyint(1) DEFAULT NULL,
  `prioritas` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `berita`
--

INSERT INTO `berita` (`berita_id`, `judul`, `subjudul`, `tanggal`, `isi`, `gambar`, `publikasi`, `prioritas`) VALUES
(1, 'Peluncuran Aplikasi Mobile Pemilihan Kepala Desa', 'Masyarakat Desa Kini Bisa Memilih Kepala Desa Secara Online', '1970-01-01', 'Dalam upaya meningkatkan partisipasi masyarakat dalam proses demokrasi, Desa Bahagia meluncurkan aplikasi mobile yang memungkinkan warga untuk melakukan pemilihan kepala desa secara online. Diharapkan aplikasi ini dapat memberikan kemudahan dan transparansi dalam proses pemilihan.', 'https://cdn.idntimes.com/content-images/post/20190313/hokben-id-1745c3c1ddde6e83c8ddc21ab54b68d3_600x400.jpg', 1, 0),
(2, 'Peluncuran Aplikasi Mobile Pemilihan Kepala Desa', 'Masyarakat Desa Kini Bisa Memilih Kepala Desa Secara Online Masyarakat Desa Kini Bisa Memilih Kepala Desa Secara Online Masyarakat Desa Kini Bisa Memilih Kepala Desa Secara Online', '2024-05-07', 'Dalam upaya meningkatkan partisipasi masyarakat dalam proses demokrasi, Desa Bahagia meluncurkan aplikasi mobile yang memungkinkan warga untuk melakukan pemilihan kepala desa secara online. Diharapkan aplikasi ini dapat memberikan kemudahan dan transparansi dalam proses pemilihan.', 'https://cdn.idntimes.com/content-images/post/20190313/hokben-id-1745c3c1ddde6e83c8ddc21ab54b68d3_600x400.jpg', 1, 1),
(3, 'Promosi UMKM Lokal Melalui Aplikasi Desa Bahagia', 'Platform Digital Dukung Pengembangan Usaha Mikro, Kecil, dan Menengah', '2024-02-20', 'Desa Bahagia memperkenalkan fitur baru dalam aplikasi desa yang memungkinkan pelaku UMKM lokal untuk mempromosikan produk dan layanan mereka secara online. Dengan adanya platform digital ini, diharapkan UMKM dapat berkembang lebih pesat dan menjangkau pasar yang lebih luas.', 'https://cdn.antaranews.com/cache/1200x800/2023/08/03/zyro-image.png-3.jpg.webp', 1, 0),
(22, 'Discount 50%', 'Black Friday', '2024-05-10', 'https://asset.kompas.com/crops/gFcL1JkQAzJaO_pxIROREDK_Ick=/0x35:800x568/750x500/data/photo/2019/01/28/2833616640.jpg', 'https://asset.kompas.com/crops/gFcL1JkQAzJaO_pxIROREDK_Ick=/0x35:800x568/750x500/data/photo/2019/01/28/2833616640.jpg', 1, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `calon_ketua`
--

CREATE TABLE `calon_ketua` (
  `calon_ketua_id` int(11) NOT NULL,
  `pemilihan_ketua_id` int(11) DEFAULT NULL,
  `warga_id` int(11) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `total_pemilih` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `calon_ketua`
--

INSERT INTO `calon_ketua` (`calon_ketua_id`, `pemilihan_ketua_id`, `warga_id`, `deskripsi`, `total_pemilih`) VALUES
(7, 2, 12, 'Saya Berjanji Akan Ngapain AJa Yaaa?', 4),
(8, 2, 13, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1),
(12, 2, 7, '22', 10);

-- --------------------------------------------------------

--
-- Struktur dari tabel `informasi_desa`
--

CREATE TABLE `informasi_desa` (
  `informasi_desa_id` int(11) NOT NULL,
  `nama_desa` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `luas_lahan_pertanian` decimal(10,2) DEFAULT NULL,
  `lahan_peternakan` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `informasi_desa`
--

INSERT INTO `informasi_desa` (`informasi_desa_id`, `nama_desa`, `deskripsi`, `luas_lahan_pertanian`, `lahan_peternakan`) VALUES
(1, 'Donorojo', 'Desa Donorojo merupakan salah satu dari 13 Desa yang ada di Kecamatan Mertoyudan, Kabupaten Magelang, Jawa Tengah. Secara administrasi Desa Donorojo terletak pada koordinat antara 110°21’57,5” Bujur Timur dan 07°55’43”6 Lintang selatan, dengan ketinggian 306 DPL. Wilayah Desa Donorojo terletak di tengah – tengah Kabupaten Magelang, Batas wilayah administrasi Desa Donorojo adalah sebagai berikut :\na.  Sebelah Utara berbatasan dengan Desa Bondowoso;\nb. Sebelah Timur berbatasan dengan Desa Danurejo;\nc. Sebelah Selatan berbatasan dengan Desa Pasuruan dan Desa Kalinegoro;\nd. Sebelah Barat berbatasan dengan Kecamatan Mungkid.\nWilayah Desa Donorojo adalah 3.41 km/ 341,230 Ha, terbagi atas 15 dusun, yaitu Dukunan 1, Dukunan 2, Brengosan, Klarisan, Plaosan, Kembaran, Gentan, Krombangan, Klegen, Kragilan, Mlaten, Bendo, Sraten, Citran dan Perum Pesona Kota Mungkid. 14 RW, 37 RT. Lokasi Desa Donorojo berada di Jl. Japunan - Sraten Km 4, Dukunan, Donorojo, Kec. Mertoyudan, Magelang, Jawa Tengah 56172. Lahan di digunakan sebagai : a)Tanah kering,  b)Tanah perkebunan, c)Tanah fasilitas umum, d)Tanah hutan, e) Tanah sawah, f) Kolam Ikan.\nMenurut pemetaan di Desa Donorojo, Kecamatan Mertoyudan, Kabupaten Magelang, Jawa Tengah. Jumlah keseluruhan penduduk adalah 5.147 jiwa terdiri dari 2011 laki – laki dewasa, 1991 perempuan, 607 anak laki – laki dan 538 anak perempuan.', 1212.00, 5.00);

-- --------------------------------------------------------

--
-- Struktur dari tabel `jenis_umkm`
--

CREATE TABLE `jenis_umkm` (
  `jenis_umkm_id` int(11) NOT NULL,
  `nama_jenis_umkm` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `jenis_umkm`
--

INSERT INTO `jenis_umkm` (`jenis_umkm_id`, `nama_jenis_umkm`) VALUES
(3, 'Pakaian'),
(4, 'Kerajinan'),
(5, 'Perhiasan'),
(18, 'Kecantikan'),
(34, 'Kecantikan'),
(35, 'a'),
(36, 'a'),
(37, 'a');

-- --------------------------------------------------------

--
-- Struktur dari tabel `komentar`
--

CREATE TABLE `komentar` (
  `komentar_id` int(11) NOT NULL,
  `warga_id` int(11) DEFAULT NULL,
  `isi` text DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `berita_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `komentar`
--

INSERT INTO `komentar` (`komentar_id`, `warga_id`, `isi`, `tanggal`, `berita_id`) VALUES
(25, 5, 'Komentar kelima pada berita 1', '2024-02-22', 1),
(36, 6, 'Komentar pertama pada berita 4', '2024-02-27', 1),
(41, 12, 'Keren', '2024-05-15', 22),
(42, 12, 'setang', '2024-05-15', 22),
(43, 12, 'ngga enak', '2024-05-15', 3),
(45, 12, 'keren', '2024-05-15', 22);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pemilihan_ketua`
--

CREATE TABLE `pemilihan_ketua` (
  `pemilihan_ketua_id` int(11) NOT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pemilihan_ketua`
--

INSERT INTO `pemilihan_ketua` (`pemilihan_ketua_id`, `tanggal_mulai`, `tanggal_selesai`, `judul`, `deskripsi`) VALUES
(2, '2024-05-04', '2024-05-30', 'zzz', 'zzz'),
(3, '2024-05-01', '2024-05-03', 'Test', 'est\r\n'),
(5, '2023-01-23', '2023-01-28', 'Sebelum', 'Sebelum'),
(6, '2024-05-02', '2024-05-08', 'Saat', 'Saat'),
(8, '2024-05-12', '2024-05-03', 'Harry Potter', '111');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengaduan_masyarakat`
--

CREATE TABLE `pengaduan_masyarakat` (
  `pengaduan_masyarakat_id` int(11) NOT NULL,
  `warga_id` int(11) DEFAULT NULL,
  `subjek` varchar(255) DEFAULT NULL,
  `isi` text DEFAULT NULL,
  `tanggal` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengaduan_masyarakat`
--

INSERT INTO `pengaduan_masyarakat` (`pengaduan_masyarakat_id`, `warga_id`, `subjek`, `isi`, `tanggal`) VALUES
(5, 5, 'Kerusakan Jembatan', 'Jembatan penghubung antar desa rusak, perlu perbaikan segera', '2024-02-22'),
(7, 8, 'Sakit', 'Sakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybodySakit sekali everybody', '2024-05-15'),
(8, 8, 'Sakit', 'Sakit sekali everybody', '2024-05-15'),
(22, 12, 'ada prnjahat', 'tolong', '2024-05-16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengurus_desa_anggota`
--

CREATE TABLE `pengurus_desa_anggota` (
  `pengurus_desa_anggota_id` int(11) NOT NULL,
  `warga_id` int(11) DEFAULT NULL,
  `jabatan` varchar(255) DEFAULT NULL,
  `akses_admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengurus_desa_anggota`
--

INSERT INTO `pengurus_desa_anggota` (`pengurus_desa_anggota_id`, `warga_id`, `jabatan`, `akses_admin`) VALUES
(1, 8, 'Kades', 1),
(9, 5, 'AA Warmindo', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `umkm`
--

CREATE TABLE `umkm` (
  `umkm_id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `jenis_umkm_id` int(11) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `approve` tinyint(1) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `warga_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `umkm`
--

INSERT INTO `umkm` (`umkm_id`, `nama`, `jenis_umkm_id`, `deskripsi`, `gambar`, `lokasi`, `approve`, `status`, `warga_id`) VALUES
(31, 'Lestari', 5, 'Sata Liat', 'https://www.blibli.com/friends-backend/wp-content/uploads/2023/07/B700004-1.jpg', 'Magelang', 2, 0, 5),
(32, 'KFC', 5, 'Makanan Enak', 'https://files.kfcku.com/uploads/media/dummy/news/kfc--092.jpg', 'Magelang', 2, 1, 12),
(34, 'Hokben', 5, 'Makanan Enak', 'https://cdn.idntimes.com/content-images/post/20190313/hokben-id-1745c3c1ddde6e83c8ddc21ab54b68d3_600x400.jpg', 'Magelang', 2, 1, 5),
(35, 'Ayam Geprek Pak Sumanto', 4, 'Ayam Enak Lorem Ipsum', 'https://asset.kompas.com/crops/VBs6hy5_8TPQwbLfAZRqZ3MwVN4=/556x0:5524x3312/750x500/data/photo/2022/07/18/62d4e8c69cef4.jpg', 'Yogyakarta', 2, 1, 15),
(37, 'kfc', 5, 'ga enak', '', 'tenan', 0, 1, 12),
(38, 'ayam', 18, 'gaenak', 'http://192.168.0.104:5000/umkm/image_1715783529871.jpg', 'disini', 0, 1, 12);

-- --------------------------------------------------------

--
-- Struktur dari tabel `warga`
--

CREATE TABLE `warga` (
  `warga_id` int(11) NOT NULL,
  `nik` varchar(20) NOT NULL,
  `kk` varchar(255) DEFAULT NULL,
  `nama_lengkap` varchar(255) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `hak_pilih` tinyint(1) DEFAULT NULL,
  `password` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `warga`
--

INSERT INTO `warga` (`warga_id`, `nik`, `kk`, `nama_lengkap`, `tanggal_lahir`, `foto`, `hak_pilih`, `password`) VALUES
(5, '5210411212', '789123456', 'Ahmad Abdullahh', '1111-11-11', 'http://192.168.0.104:5000/profile/5210411212.png', 0, '11a22927c85333ce98510b0fa1a1c27d'),
(6, '5220411038', '456789123', 'Alvina Putri', '0000-00-00', 'http://192.168.0.104:5000/profile/5220411038.png', 0, ''),
(7, '9221048210', '321654987', 'Armin Arlett', '0000-00-00', 'http://192.168.0.104:5000/profile/9221048210.png', 0, ''),
(8, '4628102929', '654321789', 'Eko Prabowo', '0000-00-00', 'http://192.168.0.104:5000/profile/4628102929.png', 1, ''),
(12, '999', '999', 'Ghufron Akbar', '2004-02-19', 'http://192.168.0.104:5000/profile/999.png', 0, 'b706835de79a2b4e80506f582af3676a'),
(13, '13451', '3153151', 'Mikasa Ackerman', '2024-05-03', 'http://192.168.0.104:5000/profile/13451.png', 0, 'b706835de79a2b4e80506f582af3676a'),
(14, '5530210', '15315', '13515', '3124-02-11', 'http://192.168.0.104:5000/profile/5530210.png', 0, '83ab0b13719ba7c929a84678b92ed5c0'),
(15, '999999', '99999', '9999', '9999-09-09', 'http://192.168.0.104:5000/profile/999999.png', 0, 'd3eb9a9233e52948740d7eb8c3062d14');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `akses_token`
--
ALTER TABLE `akses_token`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`berita_id`);

--
-- Indeks untuk tabel `calon_ketua`
--
ALTER TABLE `calon_ketua`
  ADD PRIMARY KEY (`calon_ketua_id`),
  ADD KEY `pemilihan_ketua_id` (`pemilihan_ketua_id`),
  ADD KEY `warga_id` (`warga_id`);

--
-- Indeks untuk tabel `informasi_desa`
--
ALTER TABLE `informasi_desa`
  ADD PRIMARY KEY (`informasi_desa_id`);

--
-- Indeks untuk tabel `jenis_umkm`
--
ALTER TABLE `jenis_umkm`
  ADD PRIMARY KEY (`jenis_umkm_id`);

--
-- Indeks untuk tabel `komentar`
--
ALTER TABLE `komentar`
  ADD PRIMARY KEY (`komentar_id`),
  ADD KEY `fk_berita_id` (`berita_id`),
  ADD KEY `fk_warga` (`warga_id`);

--
-- Indeks untuk tabel `pemilihan_ketua`
--
ALTER TABLE `pemilihan_ketua`
  ADD PRIMARY KEY (`pemilihan_ketua_id`);

--
-- Indeks untuk tabel `pengaduan_masyarakat`
--
ALTER TABLE `pengaduan_masyarakat`
  ADD PRIMARY KEY (`pengaduan_masyarakat_id`),
  ADD KEY `fk_warga_pengaduan` (`warga_id`);

--
-- Indeks untuk tabel `pengurus_desa_anggota`
--
ALTER TABLE `pengurus_desa_anggota`
  ADD PRIMARY KEY (`pengurus_desa_anggota_id`),
  ADD KEY `warga_id` (`warga_id`);

--
-- Indeks untuk tabel `umkm`
--
ALTER TABLE `umkm`
  ADD PRIMARY KEY (`umkm_id`),
  ADD KEY `fk_jenis_umkm` (`jenis_umkm_id`),
  ADD KEY `fk_warga_umkm` (`warga_id`);

--
-- Indeks untuk tabel `warga`
--
ALTER TABLE `warga`
  ADD PRIMARY KEY (`warga_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `akses_token`
--
ALTER TABLE `akses_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT untuk tabel `berita`
--
ALTER TABLE `berita`
  MODIFY `berita_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `calon_ketua`
--
ALTER TABLE `calon_ketua`
  MODIFY `calon_ketua_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `informasi_desa`
--
ALTER TABLE `informasi_desa`
  MODIFY `informasi_desa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `jenis_umkm`
--
ALTER TABLE `jenis_umkm`
  MODIFY `jenis_umkm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT untuk tabel `komentar`
--
ALTER TABLE `komentar`
  MODIFY `komentar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `pemilihan_ketua`
--
ALTER TABLE `pemilihan_ketua`
  MODIFY `pemilihan_ketua_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `pengaduan_masyarakat`
--
ALTER TABLE `pengaduan_masyarakat`
  MODIFY `pengaduan_masyarakat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `pengurus_desa_anggota`
--
ALTER TABLE `pengurus_desa_anggota`
  MODIFY `pengurus_desa_anggota_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `umkm`
--
ALTER TABLE `umkm`
  MODIFY `umkm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT untuk tabel `warga`
--
ALTER TABLE `warga`
  MODIFY `warga_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `calon_ketua`
--
ALTER TABLE `calon_ketua`
  ADD CONSTRAINT `calon_ketua_ibfk_1` FOREIGN KEY (`pemilihan_ketua_id`) REFERENCES `pemilihan_ketua` (`pemilihan_ketua_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `calon_ketua_ibfk_2` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `fk_berita_id` FOREIGN KEY (`berita_id`) REFERENCES `berita` (`berita_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_warga` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `komentar_ibfk_1` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pengaduan_masyarakat`
--
ALTER TABLE `pengaduan_masyarakat`
  ADD CONSTRAINT `fk_warga_pengaduan` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengaduan_masyarakat_ibfk_1` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pengurus_desa_anggota`
--
ALTER TABLE `pengurus_desa_anggota`
  ADD CONSTRAINT `pengurus_desa_anggota_ibfk_1` FOREIGN KEY (`warga_id`) REFERENCES `warga` (`warga_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `umkm`
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
