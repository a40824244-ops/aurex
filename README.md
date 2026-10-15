# ⚙️ BACKEND — AUREX

Yahan sab data, business logic aur configuration hai.

## Folder Structure

```
backend/
├── data/
│   └── content.ts       ← Pura site ka data/text (products, prices, sections)
│
├── config/
│   └── site.config.ts   ← Site settings (name, title, theme colors, fonts)
│
└── lib/
    ├── cart.ts          ← Cart logic (add/remove/update items, localStorage)
    ├── site.types.ts    ← TypeScript types (SiteMeta, Theme)
    ├── atTime.ts        ← Time utility
    ├── frames.ts        ← Frame animation utility
    ├── gsap.ts          ← GSAP animation setup
    └── loading.ts       ← Loading state management
```

## Files ki Details

### 📦 `data/content.ts`
Pura website ka text aur data yahan hai:
- **Products**: Janan Sports, 9pm Night Light, Legend (naam, price, image, description)
- **Discovery Set**: 3 perfume deal — Rs. 4,999
- **Contact**: WhatsApp number (0310-8116918), Email
- **Reviews**, **Footer links**, **FAQ** wagera

### ⚙️ `config/site.config.ts`
Site ki settings:
- Site name, title, description (SEO)
- Theme: background color, text color, accent color
- Font families

### 🛒 `lib/cart.ts`
Cart ka poora logic:
- `addToCart()` — item add karo
- `removeFromCart()` — item hatao
- `updateQuantity()` — quantity change karo
- `getCartTotal()` — total calculate karo
- `clearCart()` — cart khali karo
- WhatsApp order message format

## Note
> Ye files **reference/documentation** ke liye hain.
> Actual running code `site/lib/` aur `site/content.ts` mein hai.
