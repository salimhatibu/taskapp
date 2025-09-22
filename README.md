# README - Task App

Task App is a web platform for our book club. Members can:
- Register and log in securely
- Verify their identity with 2-Factor Authentication (2FA)
- Download and purchase books (M-Pesa integration)
- Fill in forms and surveys
- Join chat groups
- Review books, ask questions, and share notes

## 🚀 Tech Stack
- PHP 8.2+ (Laravel 10 Framework)
- MariaDB
- Apache (local dev server)
- Tailwind CSS / Bootstrap (frontend styling)
- Laravel Echo + Pusher (for chat)
- Safaricom Daraja API (M-Pesa payments)
- Mailtrap / Gmail SMTP (email testing & 2FA)

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-org>/taskapp.git
cd taskapp/backend
```

### 2. Install Dependencies
```bash
composer install
npm install && npm run dev
```

### 3. Configure Environment
Copy `.env.example` to `.env`
```bash
cp .env.example .env
```

Update values in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=taskapp
DB_USERNAME=taskapp_user
DB_PASSWORD=yourpassword

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io   # or smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-smtp-username
MAIL_PASSWORD=your-smtp-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=taskapp@example.com
MAIL_FROM_NAME="Task App"
```

### 4. Run Database Migrations
```bash
php artisan migrate
```

### 5. Start Local Server
```bash
php artisan serve
```
Visit: http://localhost:8000

## 🧪 Running Tests
Run Laravel tests:
```bash
php artisan test
```

## 🌱 Sprint Deliverables
- **Sprint 1:** Repo setup, server setup manual, ≥7 commits
- **Sprint 2:** Authentication + 2FA
- **Sprint 3:** Books CRUD + M-Pesa payments
- **Sprint 4:** Chat group, reviews, notes
- **Sprint 5:** Analytics & insights
- **Sprint 6:** Exportable reports (PDF/Excel), final polish

## 👥 Contributors
- Salim Hatibu & Team
- ICS Group Project (Strathmore University)

## 📄 License
Educational use only. Not for commercial deployment.