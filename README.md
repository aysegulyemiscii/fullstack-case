# 🧩 Fullstack Case – Nuxt 3 + Node.js

Bu proje, bir fullstack case çalışmasıdır. Backend tarafı Node.js (Express + Sequelize), frontend tarafı ise Nuxt 3 ve Tailwind CSS kullanılarak geliştirilmiştir.

---

## ✨ Özellikler

- Kullanıcı girişi (JWT token ile kimlik doğrulama)
- Giriş sonrası ürün listesi
- Ürün ekleme ve düzenleme (Modal içinde)
- Yetkilendirme kontrollü API istekleri
- Component bazlı, sade ve okunabilir frontend yapısı

---

## 📁 Proje Yapısı

fullstack-case/
├── backend/           # Node.js + Express + Sequelize + JWT
├── frontend/          # Nuxt 3 + Tailwind CSS
├── README.md          # Proje açıklamaları ve kullanım
├── .gitignore         # Gereksiz dosyaları hariç tutmak için

---

## Kurulum

1️⃣ Backend

    cd backend
    npm install
    node app.js

    http://localhost:3001 adresinde API yayında olur.

2️⃣ Frontend

    cd frontend
    npm install
    npm run dev

    http://localhost:3000 üzerinden çalışır.

👤 Demo Giriş Bilgisi

    Kullanıcı adı: root
    Şifre: rootpass

