# Accessibility & Semantic HTML

---

## What is Semantic HTML?

> Semantic HTML refers to using HTML elements that **carry meaning** about the *structure and content* of a webpage, rather than just focusing on how it looks. These elements clearly describe their **purpose** to both browsers and developers.

---

## Why Use Semantic HTML?

| Benefit | Description |
|---|---|
| **Accessibility** | Screen readers can *better navigate* content |
| **SEO** | Search engines understand your content structure better |
| **Maintainability** | Code is more *readable* and easier to maintain |
| **Future-proofing** | Works better with new technologies |

---

## 1. Structural / Semantic Layout Tags

*These help screen readers understand page structure.*

| Tag | Purpose |
|---|---|
| `<header>` | Intro/header area of page or section |
| `<nav>` | Navigation links |
| `<main>` | Main content of page |
| `<section>` | Thematic grouping of content |
| `<article>` | Independent / self-contained content |
| `<aside>` | Sidebar or related content |
| `<footer>` | Footer information |

---

## The Golden Rule

> The biggest accessibility improvement usually comes from one thing:
>
> If something is **visually obvious** but **missing from the accessibility tree**, then many disabled users *effectively cannot use it*.

That is why accessibility is fundamentally about **using the correct native HTML element** instead of a custom `<div>` implementation.

---

## Do's & ~~Don'ts~~

| ~~Don't~~ | **Do** |
|---|---|
| ~~Clickable `<div>`~~ | Use **`<button>`** |
| ~~Generic container for nav~~ | Use **`<nav>`** |
| ~~Placeholder-only forms~~ | Use **`<label>`** |
| ~~Custom accordion~~ | Use **`<details>`** when possible |
