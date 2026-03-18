# Evara — AI Event Concierge Platform

<div align="center">

![Evara Banner](https://via.placeholder.com/900x200/0e0e0a/e2be42?text=Evara+%E2%80%94+AI+Event+Concierge)

**A production-grade MERN stack platform that uses OpenAI GPT to generate curated corporate event venue proposals from natural language descriptions.**

[![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=flat-square&logo=mongodb)](https://mongodb.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=flat-square&logo=openai)](https://openai.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## ✨ Features

- **AI-Powered Proposals** — GPT-Oss-20b generates 3 curated venue proposals with justifications, costs, amenities, and capacity details
- **Structured JSON Output** — Robust prompt engineering ensures consistent, parseable AI responses every time
- **MongoDB Persistence** — Every search and its proposals are stored; full history survives page refreshes
- **Animated UI** — Framer Motion animations, typewriter placeholder, shimmer skeletons, orbiting loader
- **Rate Limiting** — Global + per-route protection against API abuse
- **Responsive** — Mobile-first design that looks great on all screen sizes
- **Production-Ready** — Helmet, CORS, error handling, Docker, Vercel/Railway deployment configs

---

## 🏗️ Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, Vite, TailwindCSS 3, Framer Motion |
| Backend   | Node.js 20, Express 4, express-validator |
| Database  | MongoDB (Mongoose ODM)                  |
| AI        | OpenAI GPT-4o-mini (JSON mode)          |
| Fonts     | Cormorant Garamond, DM Sans, JetBrains Mono |
| Deploy    | Frontend → Vercel · Backend → Vercel   |

---

## 📁 Project Structure

```
ai-event-concierge/
├── backend/
│   ├── config/
│   │   ├── db.js            # MongoDB connection
│   │   └── openai.js        # OpenAI client + prompt engineering
│   ├── controllers/
│   │   └── proposalController.js
│   ├── middleware/
│   │   └── errorHandler.js  # Global error + 404 handlers
│   ├── models/
│   │   └── EventProposal.js # Mongoose schema + virtuals
│   ├── routes/
│   │   └── proposals.js     # Validated route definitions
│   ├── server.js            # Express app entry point
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── GeneratingLoader.jsx   # Animated AI loading state
│   │   │   ├── HeroBackground.jsx     # Decorative background
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProposalResult.jsx     # Collapsible proposal accordion
│   │   │   ├── SearchBar.jsx          # Typewriter animated textarea
│   │   │   ├── SkeletonLoader.jsx
│   │   │   ├── StatsBar.jsx
│   │   │   └── VenueCard.jsx          # Individual venue proposal card
│   │   ├── hooks/
│   │   │   └── useProposals.js        # All API state management
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── utils/
│   │   │   └── api.js                 # Axios instance + interceptors
│   │   ├── App.jsx
│   │   ├── index.css                  # Tailwind + custom animations
│   │   └── main.jsx                   
│   ├── vercel.json
│   ├── vite.config.js
│   └── .env.example
│
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas account (free tier works) **or** Docker for local MongoDB
- OpenAI API key

### 1. Clone & Install

```bash
git clone https://github.com/rohits2404/Evara
cd evara
npm run install:all
```

### 2. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ai-event-concierge
OPENAI_API_KEY=sk-your-openai-key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Configure Frontend

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run Both Servers

From the **root** directory:
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/api/health

---

## 🐳 Docker (Optional)

```bash
# Set your OpenAI key
export OPENAI_API_KEY=sk-your-key

# Build and start everything
docker-compose up --build

# Frontend: http://localhost:5173
# Backend:  http://localhost:5000
```

---

## 🌐 Deployment

### Frontend → Vercel

```bash
cd frontend
npx vercel --prod
```

Set environment variable in Vercel dashboard:
```
VITE_API_URL = https://your-backend.vercel.app/api
```

### Backend → Vercel

1. Push to GitHub
2. Create new Railway project → "Deploy from GitHub repo"
3. Select the `backend/` directory or root with start command `cd backend && npm start`
4. Add environment variables:
   ```
   MONGODB_URI = your MongoDB Atlas URI
   OPEN_API_KEY = sk-your-key
   CLIENT_URL = https://your-frontend.vercel.app
   NODE_ENV = production
   PORT = 5000
   ```

---

## 📡 API Reference

### `POST /api/proposals`
Generate a new AI venue proposal.

**Request body:**
```json
{ "userQuery": "A 10-person leadership retreat in the mountains for 3 days with a $4k budget" }
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "userQuery": "...",
    "parsedDetails": {
      "attendees": "10 people",
      "budget": "$4,000 total",
      "duration": "3 days",
      "location": "Mountain region",
      "eventType": "Leadership Retreat"
    },
    "proposals": [
      {
        "venueName": "The Ridge at Beaver Creek",
        "location": "Avon, Colorado",
        "estimatedCost": "$3,400 - $3,900 total",
        "whyItFits": "...",
        "amenities": ["Meeting room", "Mountain views", "Catering", ...],
        "capacity": "Up to 15 guests",
        "eventType": "Leadership Retreat",
        "duration": "3 days"
      },
      ...
    ],
    "aiModel": "openai/gpt-oss-20b",
    "processingTime": 8423,
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

### `GET /api/proposals?page=1&limit=8`
Retrieve paginated proposal history.

### `GET /api/proposals/:id`
Get a single proposal by MongoDB ID.

### `DELETE /api/proposals/:id`
Delete a proposal.

### `GET /api/proposals/stats`
Get total and today's proposal counts.

### `GET /api/health`
Health check endpoint.

---

## 🔒 Security Features

- **Helmet** — Secure HTTP headers
- **CORS** — Restricted to allowed origins only
- **Rate Limiting** — 100 req/15min globally; 5 req/min on AI generation
- **Input Validation** — `express-validator` on all routes
- **Non-root Docker user** — Principle of least privilege
- **JSON size limit** — 10kb max body
- **Error sanitization** — Stack traces hidden in production

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0e0e0a` |
| Surface | `#16160f` |
| Gold accent | `#e2be42` |
| Text primary | `#e8e8df` |
| Text muted | `#8a8a72` |
| Display font | Cormorant Garamond |
| Body font | DM Sans |
| Mono font | JetBrains Mono |

---
