# 📚 Task App

Task App is a web platform for our book club. Members can:
- Register and log in securely
- Verify their identity with **2-Factor Authentication (2FA)**
- Download and purchase books (M-Pesa integration)
- Fill in forms and surveys
- Join chat groups
- Review books, ask questions, and share notes

---

## 🚀 Tech Stack
- PHP 8.2+ (Laravel 10 Framework)
- MariaDB
- Apache (local dev)
- Tailwind CSS / Bootstrap
- Laravel Echo + Pusher (for chat)
- Safaricom Daraja API (M-Pesa)
- Mailtrap/Gmail (SMTP testing)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/salimhatibu/taskapp.git
cd taskapp/backend

taskapp/                      # repo root
├─ backend/                   # Laravel app (or public_html if plain PHP)
│  ├─ app/
│  ├─ database/
│  ├─ resources/
│  ├─ routes/
│  ├─ public/                 # contains index.php, assets
│  └─ .env                    # DB + API secrets (NOT in git)
├─ docs/
│  ├─ server_setup_manual.docx
│  └─ user_manual.docx
├─ infra/
│  └─ apache/                 # optional vhost example
├─ .gitignore
├─ git_workflow.txt
└─ README.md
