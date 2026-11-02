# BukuKu – Aplikasi Pemesanan Buku Online

Tugas UTS Pemrograman Web. Aplikasi web sederhana untuk pemesanan buku pada toko online. Fokus pada **front-end**: data tidak diambil dari server atau database, tetapi dari variabel JavaScript pada file `js/data.js`.

| | |
|---|---|
| **Nama** | Alfy Ramadhan |
| **Program Studi** | Teknik Informatika |
| **NIM** | 312510298 |
| **Mata Kuliah** | Pemrograman Web |

## Daftar Isi

1. [Tujuan](#tujuan)
2. [Fitur](#fitur)
3. [Struktur Folder](#struktur-folder)
4. [Cara Menjalankan](#cara-menjalankan)
5. [Akun dan Data Uji](#akun-dan-data-uji)
6. [Alur Penggunaan](#alur-penggunaan)
7. [Aturan Validasi](#aturan-validasi)
8. [Struktur Data](#struktur-data)
9. [Penyimpanan Data](#penyimpanan-data)
10. [Arsitektur Kode](#arsitektur-kode)
11. [Desain dan Animasi](#desain-dan-animasi)
12. [Pemetaan Kriteria Penilaian](#pemetaan-kriteria-penilaian)
13. [Skenario Pengujian](#skenario-pengujian)
14. [Pemecahan Masalah](#pemecahan-masalah)
15. [Keterbatasan dan Pengembangan](#keterbatasan-dan-pengembangan)

## Tujuan

Aplikasi ini dibuat untuk memenuhi tiga indikator hasil belajar pada soal UTS:

1. Merancang struktur HTML yang semantik dan valid.
2. Mengelola gaya antarmuka dengan CSS (inline, internal, dan external).
3. Memakai JavaScript untuk manipulasi DOM, validasi form, manipulasi data tabel, dan interaksi UI seperti pop-up, modal box, dan alert box.

## Fitur

### 1. Login (`index.html`)
- Input email dan password, tombol **Login**.
- Jika kosong, muncul modal peringatan.
- Jika email atau password salah, muncul alert: *"Email/password yang anda masukkan salah"*.
- Tombol **Lupa Password** dan **Daftar** membuka modal box.
- Akun hasil pendaftaran tersimpan dan bisa dipakai untuk login.

### 2. Dashboard (`dashboard.html`)
- Greeting sesuai waktu lokal: pagi, siang, sore, atau malam, beserta nama pengguna.
- Tombol navigasi ke Informasi Stok/Katalog dan Tracking Pengiriman.
- **Laporan Pemesanan**: modal berisi jumlah pesanan dan total nilai pesanan.
- **History Transaksi**: modal berisi tabel nomor DO, tanggal, dan total tiap pesanan.

### 3. Informasi Stok / Katalog (`stok.html`)
- Tabel dibuat dinamis dari array `dataKatalogBuku`.
- Menampilkan cover, kode, judul, jenis, edisi, stok, dan harga.
- Stok di bawah 20 ditandai merah.
- Form tambah buku baru: baris baru dibuat dengan DOM (`createElement`, `append`).
- Tombol **Hapus** pada tiap baris dengan konfirmasi.

### 4. Pemesanan (`checkout.html`)
- Keranjang: tambah buku, ubah jumlah, hapus item.
- Jumlah dibatasi sesuai stok.
- Form data pemesan (nama, email, nomor HP, alamat), pilihan ekspedisi, dan metode pembayaran.
- Subtotal, ongkos kirim, dan total dihitung otomatis setiap ada perubahan.
- Saat pesanan berhasil, nomor **Delivery Order** dibuat otomatis, stok berkurang, dan pesanan tersimpan.

### 5. Informasi Pengiriman (`tracking.html`)
- Input nomor Delivery Order dan tombol **Cari**.
- Menampilkan nama pemesan, status pengiriman (progress bar dan lima tahap), ekspedisi, tanggal kirim, jenis paket, total pembayaran, dan riwayat perjalanan.
- Bisa mencari nomor DO bawaan maupun nomor DO dari pesanan yang baru dibuat.
- Jika tidak ditemukan, muncul modal pemberitahuan.

### Fitur Umum
- Halaman selain login hanya bisa dibuka setelah login. Jika belum, otomatis diarahkan ke `index.html`.
- Tombol **Keluar** di header mengakhiri sesi.
- `login.html` hanya pengarah ke `index.html`, karena soal menyebut dua nama untuk halaman login.

## Struktur Folder

```
tugas-uts-web1/
|-- index.html        halaman login
|-- login.html        pengarah ke index.html
|-- dashboard.html
|-- stok.html
|-- checkout.html
|-- tracking.html
|-- README.md
|-- css/
|   |-- style.css     seluruh gaya tampilan
|-- js/
|   |-- script.js     logika semua halaman
|   |-- data.js       data dummy
|-- assets/
|   |-- logo.png
|-- img/
    |-- buku1.png ... buku6.png
```

## Cara Menjalankan

1. Ekstrak folder proyek.
2. Buka `index.html` di browser, atau di VS Code klik kanan `index.html` lalu pilih **Open with Live Server**.
3. Login memakai akun demo di bawah.

Tidak perlu instalasi, server, maupun koneksi internet. Semua file dimuat dari folder lokal.

## Akun dan Data Uji

| Email | Password |
|---|---|
| `alfy@mail.com` | `alfy123` |
| `admin@bukuku.id` | `admin123` |

| Nomor DO | Pemesan | Status |
|---|---|---|
| `DO20260001` | Alfy Ramadhan | Transit (3 dari 5 tahap) |
| `DO20260002` | Budi Santoso | Diterima (5 dari 5 tahap) |

Pesanan baru dari halaman Pemesanan menghasilkan nomor DO sendiri dengan status awal **Dikemas**.

## Alur Penggunaan

1. Login di `index.html`. Belum punya akun? Klik **Daftar**.
2. Di Dashboard, pilih menu yang dibutuhkan.
3. Di **Katalog**, lihat stok dan tambah buku baru lewat form.
4. Di **Pemesanan**, pilih buku dan jumlah, klik **Tambah ke keranjang**, isi data pemesan dan pembayaran, lalu klik **Pesan sekarang**. Catat nomor DO yang muncul.
5. Di **Tracking**, masukkan nomor DO lalu klik **Cari**.
6. Kembali ke Dashboard untuk melihat **Laporan Pemesanan** dan **History Transaksi**.

## Aturan Validasi

| Form | Aturan |
|---|---|
| Login | Email dan password wajib diisi. Kombinasi harus cocok dengan akun terdaftar. |
| Lupa Password | Format email valid. Email harus terdaftar. |
| Daftar | Nama minimal 3 karakter. Format email valid dan belum terdaftar. Password minimal 6 karakter. Ulangi password harus sama. |
| Tambah stok | Kode wajib dan unik. Judul minimal 3 karakter. Edisi minimal 1. Stok tidak kosong dan tidak negatif. Harga lebih dari 0. |
| Keranjang | Jumlah minimal 1 dan tidak melebihi stok (termasuk jumlah yang sudah ada di keranjang). |
| Pemesanan | Keranjang tidak kosong. Nama minimal 3 karakter. Format email valid. Nomor HP diawali `08`, total 10 sampai 13 digit. Alamat minimal 10 karakter. Metode pembayaran dipilih. |
| Tracking | Nomor DO wajib diisi dan harus ditemukan. |

Semua pesan error ditampilkan lewat modal box atau alert. Pada form dengan beberapa aturan, seluruh error ditampilkan sekaligus dalam satu daftar.

## Struktur Data

Semua data awal ada di `js/data.js`.

| Variabel | Isi |
|---|---|
| `dataPengguna` | `nama`, `email`, `password` |
| `dataKatalogBuku` | `kode`, `nama`, `jenis`, `edisi`, `stok`, `harga`, `cover` |
| `dataEkspedisi` | `kode`, `nama`, `biaya` |
| `tahapPengiriman` | Lima tahap: Dikemas, Diserahkan ke kurir, Transit, Diantar, Diterima |
| `dataTracking` | `noDO`, `nama`, `status` (1 sampai 5), `ekspedisi`, `tanggalKirim`, `paket`, `total`, `riwayat` |

Pesanan yang dibuat pengguna disimpan dengan bentuk: `noDO`, `tanggal`, `nama`, `items` (nama, qty, harga), `ekspedisi`, `bayar`, `total`.

## Penyimpanan Data

| Penyimpanan | Kunci | Isi |
|---|---|---|
| `sessionStorage` | `user` | Nama pengguna yang sedang login |
| `localStorage` | `users` | Akun hasil pendaftaran |
| `localStorage` | `stok` | Daftar stok setelah ditambah, dihapus, atau berkurang karena pesanan |
| `localStorage` | `cart` | Isi keranjang |
| `localStorage` | `orders` | Riwayat pesanan |

Untuk mengembalikan data ke kondisi awal: tekan **F12**, buka **Application > Local Storage**, klik kanan lalu **Clear**, kemudian muat ulang halaman.

## Arsitektur Kode

Seluruh logika ada di `js/script.js` dan dibagi menjadi bagian-bagian berikut.

| Bagian | Fungsi |
|---|---|
| Helper | `$` (pemilih elemen), `rp` (format rupiah), `esc` (mencegah HTML injection), `simpan` dan `ambil` (localStorage), `getUsers`, `getStok`, `getOrders` |
| Modal | `modal(judul, isi, aksi)` membuat pop-up lewat DOM, `info(pesan, judul)` untuk pesan singkat, `daftarError(array)` untuk daftar error |
| Login | `initLogin()` |
| Dashboard | `initDashboard()` |
| Stok | `initStok()` |
| Pemesanan | `initCheckout()` |
| Tracking | `initTracking()` |
| Router | Pada `DOMContentLoaded`, membaca atribut `data-page` di tag `<body>`, memeriksa sesi login, lalu menjalankan fungsi `init` yang sesuai |

Pemisahan file: `data.js` hanya berisi data, `script.js` hanya berisi logika, dan `style.css` hanya berisi tampilan. Data bisa diganti tanpa menyentuh logika.

## Desain dan Animasi

- **Tema**: navy (`#14213d`) dengan aksen amber (`#e0a100`), huruf serif untuk judul dan sans-serif sistem untuk isi.
- **CSS variable** di `:root` sehingga warna bisa diganti dari satu tempat.
- **Responsif**: grid `auto-fit`, tabel dibungkus `.scroll`, header membungkus di layar kecil.
- **Animasi** (CSS murni, tanpa library):
  - Halaman login dan tombol menu dashboard muncul bergantian.
  - Baris tabel katalog masuk bertahap.
  - Modal muncul dengan efek membal kecil dan latar blur.
  - Progress bar tracking terisi dari kiri.
  - Efek hover dan tekan pada tombol, menu, dan form.
- **Aksesibilitas**: label terhubung ke input, fokus keyboard terlihat, `aria-live` pada hasil tracking, dan animasi dimatikan otomatis bila pengguna mengaktifkan `prefers-reduced-motion`.
- **Tiga jenis CSS**: external di `css/style.css`, internal berupa tag `<style>` di `dashboard.html`, dan inline berupa atribut `style` di judul `dashboard.html`.

## Pemetaan Kriteria Penilaian

| Kriteria | Implementasi |
|---|---|
| Struktur HTML semantik, valid, lengkap | `header`, `nav`, `main`, `section`, `footer`, `label`, atribut `lang`, lima halaman lengkap |
| Desain CSS | Satu stylesheet eksternal, plus CSS internal dan inline, variabel, grid, flexbox, responsif |
| JavaScript DOM | Tabel dan keranjang dibuat dinamis, tambah dan hapus baris, hitung total otomatis, progress bar tracking |
| Validasi form dan alert | Semua form divalidasi, error ditampilkan lewat alert dan modal |
| Modularitas file | HTML, CSS, JS, dan data terpisah, satu skrip untuk semua halaman |
| Kreativitas tambahan | Tema dan logo, animasi, modal Laporan dan History, nomor DO otomatis yang terhubung ke Tracking, stok berkurang setelah pesanan |

## Skenario Pengujian

| No | Skenario | Hasil yang diharapkan |
|---|---|---|
| 1 | Login dengan kolom kosong | Modal peringatan |
| 2 | Login dengan password salah | Alert "Email/password yang anda masukkan salah" |
| 3 | Login dengan `alfy@mail.com` / `alfy123` | Masuk ke Dashboard dengan greeting |
| 4 | Daftar dengan password kurang dari 6 karakter | Alert berisi error |
| 5 | Daftar dengan data benar lalu login | Berhasil masuk |
| 6 | Lupa Password dengan email tidak terdaftar | Modal "Email belum terdaftar" |
| 7 | Tambah buku di Katalog dengan data benar | Baris baru muncul di tabel dan tetap ada setelah refresh |
| 8 | Tambah buku dengan kode yang sudah ada | Modal error "Kode sudah dipakai" |
| 9 | Tambah jumlah buku melebihi stok | Modal peringatan |
| 10 | Pesan dengan form kosong | Modal berisi daftar semua error |
| 11 | Pesan dengan data benar | Modal nomor DO, stok berkurang |
| 12 | Cari `DO20260001` | Progress bar 3 dari 5, status Transit |
| 13 | Cari nomor DO dari pesanan baru | Status Dikemas |
| 14 | Cari nomor DO asal-asalan | Modal "tidak ditemukan" |
| 15 | Buka `dashboard.html` tanpa login | Diarahkan ke halaman login |

## Pemecahan Masalah

| Masalah | Penyebab dan solusi |
|---|---|
| Gambar tidak muncul | Folder `img/` dan `assets/` harus sejajar dengan file HTML, dan nama file harus sama persis (huruf kecil). |
| Tampilan lama masih muncul | Tekan **Ctrl + F5** untuk mengosongkan cache. |
| Halaman kosong atau tombol tidak bekerja | Buka **F12 > Console** dan lihat pesan error berwarna merah. Pastikan `data.js` dimuat sebelum `script.js`. |
| Akun hasil Daftar hilang | Data localStorage terhapus. Gunakan akun demo. |
| Tiba-tiba kembali ke halaman login | Sesi berakhir karena tab ditutup atau tombol Keluar ditekan. Login ulang. |

## Keterbatasan dan Pengembangan

**Keterbatasan**
- Aplikasi hanya simulasi front-end. Data tersimpan di browser masing-masing, bukan di server.
- Password disimpan apa adanya tanpa enkripsi.
- Status pengiriman pesanan baru tidak berubah otomatis.
- Pembayaran hanya berupa pilihan metode, tidak ada transaksi nyata.

**Pengembangan selanjutnya**
- Backend dan database (misalnya PHP dengan MySQL) untuk data dan autentikasi sungguhan.
- Enkripsi password (hashing).
- Halaman terpisah untuk Laporan Pemesanan dan History Transaksi.
- Pencarian dan filter pada katalog.
- Status pengiriman yang diperbarui otomatis.
