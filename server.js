// ============================================================
// VERDURA — Express.js Backend Server
// ============================================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple JSON "database" files
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

function readJson(file, fallback = []) {
  const fp = path.join(DATA_DIR, file);
  if (!fs.existsSync(fp)) return fallback;
  return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function writeJson(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

// ── API Routes ────────────────────────────────────────────────

// Menu items
app.get('/api/menu', (req, res) => {
  const menuData = [
    { id: 1, name: 'Garden Bruschetta', cat: 'starters', desc: 'Heirloom tomatoes, basil oil, whipped ricotta on sourdough.', price: 280, badges: ['vegan'], rating: 4.8 },
    { id: 2, name: 'Harvest Soup', cat: 'starters', desc: 'Seasonal vegetable bisque with truffle oil and herb cream.', price: 320, badges: ['vegan','new'], rating: 4.9 },
    { id: 3, name: 'Wild Mushroom Risotto', cat: 'mains', desc: 'Arborio rice, foraged mushrooms, aged parmigiano, truffle.', price: 680, badges: ['chef'], rating: 4.9 },
    { id: 4, name: 'Roasted Rainbow Bowl', cat: 'mains', desc: 'Seasonal roasted vegetables, quinoa, tahini dressing, seeds.', price: 560, badges: ['vegan'], rating: 4.7 },
    { id: 5, name: 'Spiced Lentil Dhal', cat: 'mains', desc: 'Red lentils, coconut milk, fresh turmeric, curry leaves.', price: 480, badges: ['vegan','spicy'], rating: 4.6 },
    { id: 6, name: 'Verdura Signature Pasta', cat: 'mains', desc: 'House-made pappardelle, garden pesto, cherry tomatoes, pine nuts.', price: 620, badges: ['chef','new'], rating: 4.8 },
    { id: 7, name: 'Lavender Panna Cotta', cat: 'desserts', desc: 'Silky vanilla panna cotta, lavender honey, berry compote.', price: 340, badges: ['new'], rating: 4.9 },
    { id: 8, name: 'Chocolate Forest Cake', cat: 'desserts', desc: 'Dark chocolate, cherry, salted caramel, edible flowers.', price: 390, badges: ['chef'], rating: 4.8 },
    { id: 9, name: 'Garden Lemonade', cat: 'drinks', desc: 'Fresh lemon, basil, rose water, sparkling spring water.', price: 180, badges: ['vegan'], rating: 4.7 },
    { id: 10, name: 'Matcha Blossom Latte', cat: 'drinks', desc: 'Ceremonial matcha, oat milk, elderflower, rose petals.', price: 260, badges: ['vegan','new'], rating: 4.9 },
    { id: 11, name: 'Cauliflower Steak', cat: 'mains', desc: 'Whole roasted cauliflower, chermoula, crispy capers, pomegranate.', price: 540, badges: ['vegan','spicy'], rating: 4.7 },
    { id: 12, name: 'Fig & Goat Cheese Crostini', cat: 'starters', desc: 'Fresh figs, whipped goat cheese, walnut, thyme honey.', price: 300, badges: ['new'], rating: 4.8 }
  ];
  const { cat, search } = req.query;
  let items = menuData;
  if (cat && cat !== 'all') items = items.filter(i => i.cat === cat);
  if (search) items = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()));
  res.json({ success: true, count: items.length, data: items });
});

// Reservations
app.post('/api/reservations', (req, res) => {
  const { name, phone, date, time, guests, seating, notes } = req.body;
  if (!name || !phone || !date || !time) {
    return res.status(400).json({ success: false, message: 'Required fields missing.' });
  }
  const reservations = readJson('reservations.json');
  const reservation = {
    id: Date.now(),
    name, phone, date, time,
    guests: guests || '2',
    seating: seating || 'Indoor',
    notes: notes || '',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  reservations.push(reservation);
  writeJson('reservations.json', reservations);
  console.log(`✅ Reservation: ${name} on ${date} at ${time}`);
  res.json({ success: true, message: `Reservation confirmed for ${name}!`, id: reservation.id });
});

app.get('/api/reservations', (req, res) => {
  const reservations = readJson('reservations.json');
  res.json({ success: true, count: reservations.length, data: reservations });
});

// Newsletter
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email required.' });
  }
  const subscribers = readJson('newsletter.json');
  if (subscribers.find(s => s.email === email)) {
    return res.json({ success: true, message: 'Already subscribed! 🌿' });
  }
  subscribers.push({ email, subscribedAt: new Date().toISOString() });
  writeJson('newsletter.json', subscribers);
  console.log(`📧 New subscriber: ${email}`);
  res.json({ success: true, message: 'Welcome to the garden family! 🌸' });
});

// Contact
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }
  const messages = readJson('messages.json');
  messages.push({ id: Date.now(), name, email, subject: subject || 'General', message, receivedAt: new Date().toISOString() });
  writeJson('messages.json', messages);
  console.log(`💬 Message from ${name} <${email}>`);
  res.json({ success: true, message: "Message received! We'll bloom back to you soon. 🌱" });
});

// Orders (for cart)
app.post('/api/orders', (req, res) => {
  const { items, total, customerName, customerEmail } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No items in order.' });
  }
  const orders = readJson('orders.json');
  const order = {
    id: 'ORD-' + Date.now(),
    items, total,
    customerName: customerName || 'Guest',
    customerEmail: customerEmail || '',
    status: 'received',
    placedAt: new Date().toISOString()
  };
  orders.push(order);
  writeJson('orders.json', orders);
  console.log(`🛒 New order: ${order.id} — ₹${total}`);
  res.json({ success: true, message: 'Order placed! Your meal is being prepared. 🍃', orderId: order.id });
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  const reservations = readJson('reservations.json');
  const subscribers = readJson('newsletter.json');
  const orders = readJson('orders.json');
  res.json({
    success: true,
    data: {
      totalReservations: reservations.length,
      totalSubscribers: subscribers.length,
      totalOrders: orders.length,
      serverTime: new Date().toISOString()
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Verdura API', timestamp: new Date().toISOString() });
});

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🌿 Verdura server running at http://localhost:${PORT}`);
  console.log(`📋 API available at http://localhost:${PORT}/api`);
  console.log(`💚 Press Ctrl+C to stop\n`);
});

module.exports = app;
