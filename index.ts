import express from "express";
import cors from "cors";

// ── Import all data & logic ─────────────────────────────
import {
  collection,
  gifting,
  sizes,
  ticker,
  reviews,
  contact,
  footer,
  closing,
  finder,
} from "./data/content";

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ──────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health Check ────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "AUREX Backend API is running 🌙" });
});

// ── Products (3 perfumes) ───────────────────────────────
app.get("/api/products", (_req, res) => {
  res.json(collection.glasses);
});

app.get("/api/products/:id", (req, res) => {
  const product = collection.glasses.find((g) => g.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// ── Discovery Set ───────────────────────────────────────
app.get("/api/discovery-set", (_req, res) => {
  const disc = gifting.tiles.find((t) => t.id === "discovery");
  res.json(disc);
});

// ── Sizes ────────────────────────────────────────────────
app.get("/api/sizes", (_req, res) => {
  res.json(sizes.items);
});

// ── Reviews ──────────────────────────────────────────────
app.get("/api/reviews", (_req, res) => {
  res.json(reviews.items);
});

// ── Ticker messages ──────────────────────────────────────
app.get("/api/ticker", (_req, res) => {
  res.json(ticker);
});

// ── Contact info ─────────────────────────────────────────
app.get("/api/contact", (_req, res) => {
  res.json({
    email: contact.email,
    whatsapp: contact.whatsapp,
  });
});

// ── Footer data ──────────────────────────────────────────
app.get("/api/footer", (_req, res) => {
  res.json(footer);
});

// ── Order via WhatsApp (generate message) ───────────────
app.post("/api/order/whatsapp", (req, res) => {
  const { name, phone, address, city, items, total } = req.body;

  if (!name || !phone || !address || !items?.length) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const orderId = `AUREX-${Math.floor(1000 + Math.random() * 9000)}`;

  const itemsText = items
    .map(
      (it: { name: string; size: string; quantity: number; price: number }) =>
        `• ${it.name} (${it.size}) × ${it.quantity} — Rs. ${(it.price * it.quantity).toLocaleString()}`
    )
    .join("\n");

  const message =
    `Salam AUREX! I placed an order on your website:\n\n` +
    `*Order ID:* ${orderId}\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Address:* ${address}${city ? ", " + city : ""}\n\n` +
    `*Items:*\n${itemsText}\n\n` +
    `*Total:* Rs. ${total?.toLocaleString() ?? "—"} (Cash on Delivery)`;

  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

  res.json({ orderId, message, whatsappUrl });
});

// ── Night Finder quiz result ──────────────────────────────
app.get("/api/finder", (_req, res) => {
  res.json(finder);
});

// ── Closing section ───────────────────────────────────────
app.get("/api/closing", (_req, res) => {
  res.json(closing);
});

// ── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ AUREX Backend running on port ${PORT}`);
});
