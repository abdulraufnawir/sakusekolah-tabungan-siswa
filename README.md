# SakuSekolah — MVP Tabungan Siswa

Prototipe web tanpa dependensi eksternal. Data demo tersimpan di `localStorage` browser.

## Menjalankan

```powershell
npm start
```

Buka `http://127.0.0.1:4173` lalu pilih salah satu akun demo:

- Wali Kelas: `bu.rina@sekolah.id`
- Admin TU: `admin.tu@sekolah.id`
- Wali Murid: `orangtua@sekolah.id`

Kata sandi demo bebas (minimal 4 karakter). Gunakan tombol **Reset data demo** di menu profil untuk kembali ke kondisi awal.

## Ruang lingkup MVP

- Login dan tiga peran
- Setoran tunai dan batch wali kelas
- Verifikasi batch oleh Admin TU
- Pencatatan/matching transfer manual
- Pengajuan dan proses penarikan
- Ledger sebagai sumber saldo
- Portal wali murid
- Sinkronisasi buku tabungan
- Laporan dasar dan audit trail
