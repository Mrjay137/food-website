# 🌿 Verdura — Organic Farm-to-Table Restaurant Website

A beautiful, fully responsive food website with animated leaves & flowers, built with HTML/CSS/JS (frontend) and Node.js + Express (backend).

---

## 🚀 Quick Start in VS Code

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- VS Code with any browser

---

### Step 1 — Open the Project
```bash
# Unzip the folder, then open it in VS Code:
code food-website
```

### Step 2 — Install Dependencies
Open the VS Code Terminal (`Ctrl + `` ` ``) and run:
```bash
npm install
```

### Step 3 — Start the Server
```bash
npm start
```

### Step 4 — Open in Browser
Visit: **http://localhost:3000**

---

## 📁 Project Structure

```
food-website/
├── public/
│   ├── index.html       ← Main HTML (all sections)
│   ├── css/
│   │   └── style.css    ← All styles + animations
│   └── js/
│       └── main.js      ← Frontend JavaScript
├── data/                ← Auto-created JSON "database"
│   ├── reservations.json
│   ├── newsletter.json
│   ├── messages.json
│   └── orders.json
├── server.js            ← Express backend
├── package.json
└── README.md
```

---

## 🌐 API Endpoints

| Method | URL                  | Description          |
|--------|----------------------|----------------------|
| GET    | `/api/menu`          | Get all menu items   |
| GET    | `/api/menu?cat=mains`| Filter by category   |
| POST   | `/api/reservations`  | Book a table         |
| POST   | `/api/newsletter`    | Subscribe to emails  |
| POST   | `/api/contact`       | Send a message       |
| POST   | `/api/orders`        | Place an order       |
| GET    | `/api/stats`         | Get site statistics  |
| GET    | `/api/health`        | Health check         |

---

## ✨ Features

- 🌸 **Animated floating leaves & flower petals** (pure CSS/JS)
- 📱 **Fully responsive** — mobile, tablet, desktop
- 🍽️ **Interactive menu** with category filtering
- 🛒 **Add to cart** with toast notifications
- 📅 **Reservation modal** with form submission
- 📧 **Newsletter** signup
- 💬 **Contact form** with animations
- 🖼️ **Masonry gallery** with hover effects
- 🔢 **Animated statistics** counter
- 🌿 **Scroll reveal** animations throughout
- ⌨️ **Keyboard shortcut**: Press `R` to open reservation modal

---

## 🎨 Tech Stack

**Frontend:** HTML5, CSS3 (custom properties, grid, flexbox, keyframe animations), Vanilla JavaScript  
**Backend:** Node.js, Express.js  
**Data:** JSON file storage (no database needed)  
**Fonts:** Google Fonts (Playfair Display + DM Sans)  
**Images:** Unsplash (free, high-quality food photography)

---

## 💡 Tips

- For **live reload** during development, install nodemon and use `npm run dev`
- All form submissions save data to the `/data/` folder as JSON files
- Press `R` anywhere on the page to open the reservation modal
- Press `Escape` to close any open modal

---

Made with 💚 and organic ingredients.
