# 🤖 AI Prompt Marketplace

A full-stack AI prompt marketplace built with **Next.js 16**, where users can browse, purchase, and manage expert-crafted prompts for ChatGPT, Midjourney, Claude, and more.



## ✨ Key Features

- **🔐 Authentication** — Email/password & Google OAuth via Better Auth
- **🛒 Prompt Marketplace** — Browse, filter, and purchase AI prompts
- **💳 Stripe Payments** — Secure checkout for prompt purchases & premium subscriptions
- **👤 Role-Based Dashboards** — Separate views for Attendee, Organizer, Creator, and Admin
- **⭐ Premium System** — Auto-upgrade to Premium after first purchase
- **📊 Analytics** — Stats, revenue tracking, and enrollment management
- **📝 Reviews & Reports** — Users can review prompts and report issues
- **🔖 Bookmarks** — Save prompts for later
- **📱 Responsive** — Fully mobile-friendly design

## 🛠️ Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Framework    | Next.js 16 (App Router)                 |
| UI Library   | HeroUI + Tailwind CSS 4                 |
| Auth         | Better Auth (Google + Credentials)      |
| Database     | MongoDB (via native driver)             |
| Payments     | Stripe Checkout                         |
| Animations   | Motion (Framer Motion)                  |
| Forms        | React Hook Form                         |
| Notifications| React Hot Toast                         |
| Icons        | React Icons                             |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Stripe account (test keys)

### Installation

```bash
# Clone the repository
git clone https://github.com/Shohan11369/AI-prompt-client.git
cd AI-prompt-client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your actual values (see below)

# Run development server
npm run dev
```

The app will be running at `http://localhost:3000`.

### Environment Variables



## 📁 Project Structure

```
src/
├── app/
│   ├── (mainLayout)/        # Public pages (home, events, payment-success)
│   ├── (dashboardLayout)/   # Protected dashboard pages
│   │   └── dashboard/
│   │       ├── admin/       # Admin panel
│   │       ├── attendee/    # Attendee dashboard
│   │       ├── organizer/   # Organizer dashboard
│   │       └── profile/     # User profile
│   ├── api/                 # API routes (auth, checkout, prompts)
│   ├── login/               # Login page
│   └── register/            # Register page
├── components/              # Reusable UI components
├── lib/                     # Auth config, DB connection, API helpers
└── utils/                   # Utility functions
```

## 👥 User Roles

| Role       | Capabilities                                           |
| ---------- | ------------------------------------------------------ |
| Attendee   | Browse prompts, purchase, review, bookmark, view stats  |
| Organizer  | Create/manage prompts, view enrollments & revenue       |
| Creator    | Add prompts, manage own content                         |
| Admin      | Manage all users, prompts, payments, and reports        |

## 📦 NPM Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

> **Note:** This is the client-side repository. The backend API server is a separate project.
