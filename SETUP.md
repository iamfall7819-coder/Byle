# Menyiapkan profil online

Situs GitHub Pages bersifat statis. Supabase dipakai untuk login dan menyimpan cerita profil agar dapat dibaca oleh semua pengunjung.

## 1. Siapkan Supabase

1. Buat proyek Supabase.
2. Buka **SQL Editor**, lalu jalankan isi `schema.sql`.
3. Dari **Project Settings → API**, salin Project URL dan `anon`/publishable key.
4. Isi URL proyek dan publishable/anon key di `code/supabase-config.js`. Key tersebut memang digunakan di browser; jangan pernah menaruh `service_role` key di situs. URL dan key proyek saat ini sudah diisi di file konfigurasi.
5. Di pengaturan Authentication, atur Site URL ke URL GitHub Pages situs Anda.

## 2. Buat akun dan hubungkan profil

1. Buat akun untuk setiap siswa, kepala sekolah, dan wali kelas melalui **Authentication → Users → Add user**. Aktifkan **Auto Confirm User**. Untuk login dengan username, gunakan email akun dengan format `<username>@login.byle.invalid` (contoh `siswa1@login.byle.invalid`) dan tetapkan kata sandi. Username hanya boleh berisi 3–32 huruf, angka, titik, garis bawah, atau tanda hubung. Pemilik akun memasukkan username dan kata sandi di halaman profil; email akun lengkap juga dapat digunakan.
2. Untuk setiap akun, salin UUID pengguna.
3. Jalankan perintah berikut di SQL Editor dengan UUID dan ID profil yang sesuai:

```sql
update public.profiles
set owner_id = 'UUID_PENGGUNA'
where id = 'siswa-1';
```

ID profil siswa adalah `siswa-1` sampai `siswa-13`; pimpinan menggunakan `kepala-sekolah` dan `wali-kelas`. Pastikan setiap UUID hanya ditugaskan ke profil orang yang bersangkutan.

Setelah deploy, klik ikon/avatar seseorang untuk membuka profilnya. Pengunjung dapat membaca isi profil; pemilik akun dapat masuk untuk memperbarui nama dan bagian **Tentang Saya**. Peran hanya dapat diubah admin melalui database. Kebijakan database membatasi perubahan ke profil yang UUID pemiliknya sudah ditugaskan, jadi pastikan UUID akun dan ID profil dipasangkan dengan benar. Jangan membagikan kata sandi atau menggunakan service-role key di situs.

## Deploy

- **GitHub Pages:** unggah seluruh isi repositori ke branch `main`; workflow `.github/workflows/pages.yml` membangun situs dan menerbitkan folder `docs`. Aktifkan GitHub Pages dengan sumber **GitHub Actions** di pengaturan repositori.
- **Vercel:** impor repositori ini. `vercel.json` menjalankan pembangun situs statis dan menggunakan folder `docs`, sehingga Vercel tidak mencoba mencari Python entrypoint `main.py`.
