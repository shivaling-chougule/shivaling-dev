# Data Attributes (`data-*`) — Use Cases & Why

---

## 1. DOM Element Selection

```html
<button data-action="add-to-cart">Add to Cart</button>
```

```js
document.querySelector('[data-action="add-to-cart"]');
```

> **Why:** Decouples JS from CSS classes. Renaming a class for styling won't break your JS. Classes are for *appearance*, data attributes are for *behavior*.

---

## 2. Passing Configuration from HTML to JS

```html
<div data-slider="true" data-autoplay="true" data-speed="500" data-slides-per-view="3">
```

```js
const el = document.querySelector('[data-slider]');
const speed = Number(el.dataset.speed);       // 500
const autoplay = el.dataset.autoplay === 'true'; // true
```

> **Why:** Keeps config **in the markup** where content editors (or Liquid) can change it — no need to touch JS files. *Single source of truth* for component settings.

---

## 3. Storing Dynamic Server Data (Liquid → JS)

```html
<div data-product-id="{{ product.id }}" data-variant-id="{{ product.selected_or_first_available_variant.id }}">
```

```js
const productId = el.dataset.productId;
```

> **Why:** **Bridge between server and client.** Liquid renders on the server — data attributes are the cleanest way to pass IDs, URLs, and flags to client-side JS without inline `<script>` blocks or global variables.

---

## 4. Event Delegation

```html
<ul data-list="cart-items">
  <li><button data-action="remove" data-line-item="1">Remove</button></li>
  <li><button data-action="remove" data-line-item="2">Remove</button></li>
</ul>
```

```js
document.querySelector('[data-list="cart-items"]').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="remove"]');
  if (!btn) return;
  const lineItem = btn.dataset.lineItem;
  // remove item...
});
```

> **Why:** **One listener on the parent** instead of one per button. Works even when items are added/removed dynamically. `data-action` makes intent explicit — you scan the HTML and *immediately* know what each element does.

---

## 5. State Management (Toggle / Active / Loading)

```html
<div data-modal="newsletter" data-state="closed">
```

```js
el.dataset.state = 'open';
```

```css
[data-modal][data-state="open"] { display: block; }
[data-modal][data-state="closed"] { display: none; }
```

> **Why:** State lives **on the element**, visible in DevTools, targetable by CSS *and* JS. ~~No juggling `.is-active` class add/remove~~ — a single attribute swap handles both styling and logic.

---

## 6. Section / Component Identification (Shopify Sections)

```html
<section data-section-type="hero-banner" data-section-id="{{ section.id }}">
```

```js
document.querySelectorAll('[data-section-type="hero-banner"]').forEach(initHeroBanner);
```

> **Why:** Shopify can render **multiple instances** of the same section. `data-section-id` scopes all queries inside that instance — prevents one section's JS from leaking into another.

---

## 7. Lazy Loading & Deferred Initialization

```html
<img data-src="/images/hero.jpg" data-srcset="/images/hero-400.jpg 400w, /images/hero-800.jpg 800w" src="placeholder.jpg">
```

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (!isIntersecting) return;
    target.src = target.dataset.src;
    target.srcset = target.dataset.srcset;
    observer.unobserve(target);
  });
});

document.querySelectorAll('[data-src]').forEach((img) => observer.observe(img));
```

> **Why:** Real `src` loads immediately. `data-src` **defers the network request** until the element is visible. *Faster initial page load*, less wasted bandwidth on off-screen images.

---

## 8. Animation / Scroll Triggers

```html
<div data-animate="fade-up" data-delay="200" data-duration="600">
```

```js
const el = document.querySelector('[data-animate]');
el.style.animationDelay = `${el.dataset.delay}ms`;
el.style.animationDuration = `${el.dataset.duration}ms`;
```

> **Why:** Designers tweak timing **per element** in Liquid/HTML without opening JS files. Animation logic stays generic — config stays in markup. *Separation of concerns.*

---

## 9. Form Validation Rules

```html
<input type="text" data-validate="required|min:3|max:50" data-error-message="Name must be 3–50 characters">
```

```js
const rules = input.dataset.validate.split('|');
const errorMsg = input.dataset.errorMessage;
```

> **Why:** Validation rules are **visible in the HTML** — easier to audit than buried JS logic. Backend devs or Liquid templates can adjust rules without touching the validation engine.

---

## 10. Analytics & Tracking

```html
<button data-track="click" data-track-category="CTA" data-track-label="hero-buy-now">
  Buy Now
</button>
```

```js
document.querySelectorAll('[data-track]').forEach((el) => {
  el.addEventListener(el.dataset.track, () => {
    gtag('event', el.dataset.track, {
      event_category: el.dataset.trackCategory,
      event_label: el.dataset.trackLabel,
    });
  });
});
```

> **Why:** **One generic tracker** handles every element. Adding tracking to a new button = *add 3 HTML attributes*. ~~No new JS code needed.~~ Marketing team can add tracking via Liquid or GTM.

---

## 11. Feature Flags / A-B Testing

```html
<div data-feature="new-checkout" data-variant="B">
```

```js
if (el.dataset.variant === 'B') {
  // render variant B experience
}
```

> **Why:** Server decides the variant, stamps it in HTML. JS reads it — **no extra API call** needed on the client. Clean separation: server picks the variant, client renders it.

---

## 12. Inter-Component Communication

```html
<button data-trigger="quick-view" data-target="product-modal" data-product-handle="classic-tee">
```

```js
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-trigger]');
  if (!trigger) return;

  const targetEl = document.querySelector(`[data-component="${trigger.dataset.target}"]`);
  targetEl.dispatchEvent(new CustomEvent('open', {
    detail: { handle: trigger.dataset.productHandle }
  }));
});
```

> **Why:** Components stay **loosely coupled**. The button doesn't import or know about the modal — it just declares *"I trigger this target with this data."* Easy to rewire without refactoring.

---

## Quick Reference

| Use Case | Key Attribute(s) | Main Benefit |
|---|---|---|
| DOM selection | `data-action`, `data-component` | Decouples JS from CSS |
| Configuration | `data-speed`, `data-autoplay` | Config in markup, not JS |
| Server → Client | `data-product-id` | Bridge Liquid to JS |
| Event delegation | `data-action` on children | One listener, dynamic-safe |
| State management | `data-state` | CSS + JS from one attribute |
| Section scoping | `data-section-type`, `data-section-id` | Multi-instance safe |
| Lazy loading | `data-src`, `data-srcset` | Faster page load |
| Animation | `data-animate`, `data-delay` | Per-element config |
| Validation | `data-validate` | Rules visible in HTML |
| Analytics | `data-track`, `data-track-label` | Zero-JS tracking setup |
| Feature flags | `data-feature`, `data-variant` | Server-driven A/B |
| Component communication | `data-trigger`, `data-target` | Loose coupling |
