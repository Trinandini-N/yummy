# 🍽️ Yummy — MERN Food Delivery App

A full-stack food delivery web app with **3 user roles**: Customer, Restaurant Owner, and Delivery Person.

---

## 📁 Project Structure

```
yummy/
├── backend/          ← Node.js + Express + MongoDB API
│   ├── models/       ← Mongoose schemas
│   ├── routes/       ← API routes
│   ├── middleware/   ← JWT auth middleware
│   ├── server.js     ← Main server
│   ├── seed.js       ← Demo data creator
│   └── .env          ← Environment variables
│
└── frontend/         ← React app
    └── src/
        ├── pages/    ← All page components
        ├── components/ ← Navbar
        └── context/  ← Auth + Cart state
```

---

## ⚙️ PREREQUISITES

Install these before running:

1. **Node.js** (v16+) → https://nodejs.org
2. **MongoDB** (Community) → https://www.mongodb.com/try/download/community
   - After install, MongoDB runs automatically as a service
   - OR install **MongoDB Compass** for a GUI

---

## 🚀 STEP-BY-STEP SETUP (VS Code Terminal)

### Step 1 — Open project in VS Code
```bash
# Open VS Code, then open the yummy/ folder
# Use Terminal > New Terminal
```

### Step 2 — Setup & run the Backend
```bash
cd backend
npm install
node seed.js         ← Creates demo accounts
npm run dev          ← Starts backend on http://localhost:5000
```
You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

### Step 3 — Open a NEW terminal, setup & run the Frontend
```bash
cd frontend
npm install          ← (takes 2-3 mins first time)
npm start            ← Opens http://localhost:3000
```

---

## 🎭 DEMO ACCOUNTS (auto-created by seed.js)

| Role | Email | Password |
|------|-------|----------|
| 🛍️ Customer | customer@demo.com | demo123 |
| 🏪 Owner | owner@demo.com | demo123 |
| 🛵 Delivery | delivery@demo.com | demo123 |

> **TIP:** On the Login page, click the colored demo buttons to auto-fill credentials!

---

## 🔄 FULL ORDER FLOW (How to test all 3 roles)

### Phase 1 — Customer places an order
1. Login as **Customer** (`customer@demo.com`)
2. Browse restaurants on the home page
3. Click a restaurant → Add items to cart
4. Go to Cart → Enter address → Click **Place Order**
5. Go to **My Orders** → Status shows "⏳ Order Placed"

### Phase 2 — Owner accepts & assigns delivery
1. Open a **new browser tab** (or incognito window)
2. Login as **Owner** (`owner@demo.com`)
3. See the new order in **Owner Dashboard**
4. Select a delivery person from the dropdown
5. Click **✅ Accept & Assign Delivery**

### Phase 3 — Delivery person picks up
1. Open another tab
2. Login as **Delivery** (`delivery@demo.com`)
3. See the assigned order in **Delivery Dashboard**
4. Click **🛵 Start Delivery**

### Phase 4 — Auto delivery (1 minute)
- After 60 seconds → order auto-marks as **Delivered**
- The Customer's **My Orders** page updates automatically
- A green banner shows: *"Your order is on your doorstep! 🚪✅"*

> **Note:** Pages auto-refresh every 5-8 seconds, so keep them open!

---

## 🌐 URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Login | http://localhost:3000/login |
| Register | http://localhost:3000/register |
| Cart | http://localhost:3000/cart |
| My Orders | http://localhost:3000/my-orders |
| Owner Dashboard | http://localhost:3000/owner |
| Delivery Dashboard | http://localhost:3000/delivery |
| Backend API | http://localhost:5000/api |

---

## ❓ TROUBLESHOOTING

**MongoDB not connecting?**
```bash
# Windows: Check if MongoDB service is running
net start MongoDB

# Mac:
brew services start mongodb-community
```

**Port already in use?**
```bash
# Kill port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

**npm install fails?**
```bash
# Try clearing cache
npm cache clean --force
npm install
```

**No delivery persons in owner dropdown?**
- Make sure you ran `node seed.js` in the backend folder
- Or register a new account with role "Delivery Person"

---

## 🛠️ TECH STACK

- **Frontend:** React 18, React Router v6, Axios, React Toastify
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JWT (JSON Web Tokens) + bcryptjs
- **Styling:** Custom CSS with Google Fonts (Pacifico + Nunito)
