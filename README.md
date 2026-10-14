# hack-attack-2026
Team repository for HACK ATTACK 2026

## SkillBridge
SkillBridge is a web platform connecting underserved students (learners) with volunteer mentors for free skills and guidance.

### Architecture Overview
- `client/`: Frontend React application (built with Vite + plain CSS)
- `server/`: Backend Node.js + Express REST API
- `docs/`: Project documentation and guides

### How to Run Locally

#### Prerequisites
- Node.js (v18+ recommended)
- npm

#### 1. Backend Server Setup
In a terminal, run:
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
The server will start at `http://localhost:4000`.

#### 2. Frontend Client Setup
In a separate terminal, run:
```bash
cd client
npm install
cp .env.example .env
npm run dev
```
The client will start at `http://localhost:5173`.
