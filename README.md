# Jaringwan

Download/Pull File, kemudian jalankan composer

```
composer install
```

Kemudian kita copy file .env dengan perintah berikut

```
cp .env.example .env
```

Kemudian generate key

```
php artisan key:generate
```

Update file .env yang terdiri dari timezone, database, user dan password.
Kemudian migrate database

```
php artisan migrate
```

Jalankan Seeder untuk membuat user dan master

```
php artisan db:seed
```

## Fitur Login Admin

### Deskripsi
Halaman login memungkinkan pengguna masuk ke aplikasi dengan email dan password. Terdapat validasi input dan penanganan error yang aman.

---

### Cara Penggunaan

1. **Masukkan email dan password** pada form login.
2. **Klik tombol Log in** untuk mengirim data.
3. Jika data valid, pengguna akan masuk ke dashboard.
4. Jika terjadi kesalahan, pesan error akan ditampilkan di bawah input yang bermasalah.

---

### Validasi & Penanganan Error

- **Email dan password wajib diisi.**
- **Error dari server** akan difokuskan ke input yang bermasalah.
- **Pesan error** ditampilkan secara jelas di bawah masing-masing input.

---

### Contoh Tampilan Form

```tsx
<Form ...>
  <Input id="email" type="email" name="email" required />
  <InputError message={errors.email} />

  <Input id="password" type="password" name="password" required />
  <InputError message={errors.password} />

  <Button type="submit">Log in</Button>
</Form>
```

---

### Catatan

- Pastikan backend sudah mengimplementasikan endpoint autentikasi yang sesuai.
- Untuk pengembangan, cek juga file konfigurasi dan dokumentasi API jika ada perubahan pada proses login.
