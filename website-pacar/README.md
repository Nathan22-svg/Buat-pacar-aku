# 💖 Website Romantis untuk Pacar

Website interaktif, manis, dan estetik dengan nuansa *Romantic Soft Pink / Pastel* yang siap kamu berikan untuk orang tersayang!

---

## ✨ Fitur-Fitur Utama:
1. **Live Counter Hari Jadian**: Menghitung otomatis hari, jam, menit, dan detik sejak tanggal pertama kalian jadian hingga saat ini.
2. **Timeline Perjalanan Cinta**: Format polaroid foto kenangan dari pertama kenal, first date, hingga saat ini.
3. **Kartu "Alasan Aku Sayang Kamu"**: Daftar kartu manis alasan kenapa dia begitu istimewa.
4. **Surat Cinta Interaktif (Amplop 3D)**: Amplop yang bisa diklik untuk membuka surat rahasia disertai ledakan efek confetti hati.
5. **Pemutar Lagu Latar**: Pemutar musik romantis otomatis dengan piringan vinyl berputar.
6. **Tombol Interaktif "Mau Terus Sama Aku?"**: Tombol "Nggak" yang akan kabur jika didekati kursor, dan tombol "Iya" yang memicu pesta perayaan!
7. **Animasi Partikel Hati Melayang**: Background canvas dinamis dengan hati-hati pastel yang bergerak lembut.

---

## 🚀 Cara Menjalankan & Melihat Website:
1. Masuk ke folder:
   `C:\Users\User\.gemini\antigravity\scratch\website-pacar`
2. Klik dua kali (**double-click**) file `index.html`.
3. Website akan langsung terbuka di browser favoritmu (Chrome, Edge, Firefox, Safari)!

---

## 🎨 Cara Kustomisasi / Mengubah Isi (Sangat Mudah!):
Cukup buka file `config.js` dengan text editor (Notepad, VS Code, dll):

- **Nama Pacar & Kamu**:
  ```javascript
  partnerName: "Nama Pacar Kamu",
  yourName: "Nama Kamu",
  ```
- **Tanggal Jadian**:
  ```javascript
  anniversaryDate: "2024-02-14", // Format: TAHUN-BULAN-HARI
  ```
- **Menambahkan Foto Sendiri**:
  - Buat folder bernama `images` di dalam folder ini.
  - Masukkan foto-foto kalian ke folder `images` (misal: `foto1.jpg`, `foto2.jpg`).
  - Ganti nilai `image: "images/foto1.jpg"` di bagian `timeline` pada `config.js`.
- **Ganti Lagu**:
  - Ganti `musicUrl` dengan link file mp3 online atau file lagu lokal (misal: `lagu-kita.mp3`).

---

## 🌐 Cara Mengirimkan Link ke Pacar (Online Gratis):
Agar pacar kamu bisa buka dari HP kapan pun:
1. **GitHub Pages (Paling Populer & Gratis)**: Upload folder ini ke repository GitHub, lalu aktifkan *GitHub Pages* di menu *Settings > Pages*.
2. **Vercel / Netlify**: Tinggal *drag-and-drop* folder ini ke dashboard Netlify Drop (app.netlify.com/drop) untuk langsung dapat link website online gratis!
