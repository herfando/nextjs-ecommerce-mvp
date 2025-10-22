<div align="center">

  <img src="https://media.tenor.com/3vXxg1O3Fz0AAAAC/shop-cart-shopping.gif" width="120" alt="E-commerce cart animation" />
  
  <h1>🛍️ Next.js E-Commerce MVP</h1>
  
  <p>
    <strong>A modern, high-performance e-commerce MVP built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and TanStack Query.</strong>
  </p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://tanstack.com/query/latest"><img src="https://img.shields.io/badge/TanStack_Query-5-orange?style=for-the-badge&logo=react-query" alt="TanStack Query" /></a>
    <a href="https://ui.shadcn.com"><img src="https://img.shields.io/badge/shadcn/ui-Modern_UI-8B5CF6?style=for-the-badge&logo=shadcnui" alt="shadcn/ui" /></a>
  </p>

  <img src="https://media.tenor.com/x3DTPv6YdOAAAAAi/web-developer-coding.gif" width="250" alt="Coding animation" />
  <br /><br />
</div>

---

## 🌍 Live Demo

🟢 **Experience the app live:**  
👉 [Next.js E-Commerce MVP](https://nextjs-ecommerce-mvp-tcl9-c2f2n15mm-herfandos-projects.vercel.app/buyer/before_login)

📸 **Preview:**
<img src="https://private-user-images.githubusercontent.com/182643423/499885256-975d527b-27f0-4fc0-818f-73479212dbe7.png" width="800" />

---

## ✨ Overview

**Next.js E-Commerce MVP** is a minimal yet powerful online store foundation — built for **speed, scalability, and clean architecture**.  
It provides a **typed TypeScript codebase**, **server-state caching** via TanStack Query, and **modern UI** built with shadcn/ui.

> 💡 Perfect for developers and startups seeking a production-grade e-commerce starter kit following best practices.

---

## 🚀 Tech Stack

| Category | Tools / Libraries |
|-----------|------------------|
| **Framework** | [Next.js 15](https://nextjs.org) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com), [Lucide Icons](https://lucide.dev) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query/latest) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com), [Zod](https://zod.dev) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski) |
| **State & Auth** | Custom `AuthContext` with Local Storage Persistence |
| **Deployment** | [Vercel](https://vercel.com) |

---

## 💻 Features

✅ Authentication (Login & Register)  
✅ Seller onboarding & store creation flow  
✅ Product listing and management  
✅ Optimistic UI updates  
✅ Global toast notifications  
✅ Client + Server state synchronization  
✅ Responsive design (mobile-first)  
✅ Fully typed with TypeScript  
✅ Easy to deploy on Vercel  

---

## 🧱 Project Structure

src/
├─ app/ # App Router Pages
│ ├─ auth/ # Login & Register
│ ├─ buyer/ # Buyer-side views
│ ├─ seller/ # Seller dashboard
│ └─ layout.tsx # Root layout
│
├─ components/ # Reusable UI components
├─ lib/
│ ├─ api/ # API clients (axios)
│ ├─ context/ # AuthContext
│ ├─ hooks/ # Custom React hooks
│ ├─ validations/ # Zod schemas
│ ├─ providers/ # React Query providers
│ └─ utils/ # Helper functions
└─ types/ # Global TypeScript types

yaml
Salin kode

---

## 🏗️ Architecture Diagram

[Next.js 15 App Router]
│
▼
[TanStack Query] ───► [Axios API Layer]
│
▼
[Auth Context + Local Storage]
│
▼
[shadcn/ui + Tailwind UI Components]

yaml
Salin kode

---

## ⚙️ Installation & Usage

### 1️⃣ Clone Repository
```bash
git clone https://github.com/herfando/nextjs-ecommerce-mvp.git
cd nextjs-ecommerce-mvp
2️⃣ Install Dependencies
bash
Salin kode
npm install
3️⃣ Start Development Server
bash
Salin kode
npm run dev
Then open 👉 http://localhost:3000

🚢 Deployment
Deploy instantly to Vercel (optimized for Next.js):

bash
Salin kode
vercel deploy
Your site will be live in seconds 🚀

🧪 Future Improvements
🧩 Integrate real payment gateway (e.g. Stripe)

🛒 Implement shopping cart persistence

📦 Add order management for sellers

🔍 Improve search with server-side filters

📈 Analytics dashboard

🤝 Contributing
Contributions, issues, and feature requests are welcome!
To contribute:

Fork the repo

Create a new branch (feature/awesome-feature)

Commit and push

Submit a PR 🎉

📄 License
Licensed under the MIT License — free to use and modify.

👨‍💻 Author
Herfando
Frontend Developer • UI/UX Enthusiast

🌐 Portfolio
💼 LinkedIn
💻 GitHub

<div align="center">
✨ “Minimal yet beautiful — designed for a seamless e-commerce experience.” ✨

</div> ```