// Data dummy (pengganti database). Sesuaikan nama field jika memakai data.js dari dosen.
const dataPengguna=[
 {nama:"Alfy Ramadhan",email:"alfy@mail.com",password:"alfy123"},
 {nama:"Admin Toko",email:"admin@bukuku.id",password:"admin123"}];
const dataKatalogBuku=[
 {kode:"IF101",nama:"Algoritma dan Pemrograman",jenis:"Buku Wajib",edisi:3,stok:120,harga:95000,cover:"img/buku1.png"},
 {kode:"IF102",nama:"Basis Data dengan MySQL",jenis:"Buku Wajib",edisi:2,stok:80,harga:110000,cover:"img/buku2.png"},
 {kode:"IF103",nama:"Matematika Diskrit",jenis:"Buku Wajib",edisi:4,stok:15,harga:87000,cover:"img/buku3.png"},
 {kode:"IF104",nama:"Pemrograman Web Dasar",jenis:"Buku Praktikum",edisi:1,stok:200,harga:75000,cover:"img/buku4.png"},
 {kode:"IF105",nama:"Statistika dan Probabilitas",jenis:"Buku Pendamping",edisi:2,stok:9,harga:68000,cover:"img/buku5.png"},
 {kode:"IF106",nama:"Jaringan Komputer",jenis:"Buku Pendamping",edisi:5,stok:45,harga:102000,cover:"img/buku6.png"}];
const dataEkspedisi=[
 {kode:"REG",nama:"JNE Reguler (3-5 hari)",biaya:15000},
 {kode:"EXP",nama:"SiCepat Express (1-2 hari)",biaya:28000},
 {kode:"HEM",nama:"J&T Hemat (5-7 hari)",biaya:10000}];
const tahapPengiriman=["Dikemas","Diserahkan ke kurir","Transit","Diantar","Diterima"];
const dataTracking=[
 {noDO:"DO20260001",nama:"Alfy Ramadhan",status:3,ekspedisi:"JNE Reguler",tanggalKirim:"2026-10-28",paket:"Paket Semester 3",total:210000,
  riwayat:["28 Okt - Pesanan dikemas","28 Okt - Diserahkan ke kurir JNE","30 Okt - Tiba di hub Bekasi"]},
 {noDO:"DO20260002",nama:"Budi Santoso",status:5,ekspedisi:"SiCepat Express",tanggalKirim:"2026-10-20",paket:"Paket Praktikum",total:131000,
  riwayat:["20 Okt - Pesanan dikemas","20 Okt - Diserahkan ke kurir","21 Okt - Transit Jakarta","22 Okt - Diantar","22 Okt - Diterima pemesan"]}];
