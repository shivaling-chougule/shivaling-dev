# Session Storage

> Data only lasts for **one browsing session**. Once you close the tab or browser, the data is *automatically deleted*.

---

## Syntax

```js
window.sessionStorage
// or just:
sessionStorage
```

---

## Methods

### Save Data

```js
sessionStorage.setItem("key", "value");
```

### Read Data

```js
let lastname = sessionStorage.getItem("key");
```

### Remove a Single Item

```js
sessionStorage.removeItem("key");
```

### Clear All Data

```js
sessionStorage.clear();
```

---

## Parameters

| Parameter | Required | Description |
|---|---|---|
| `key` | Yes | The name of the key |
| `value` | Yes | The value to store |

**Return type:** `Storage` object

---

## Session Storage vs Local Storage

| Feature | Session Storage | Local Storage |
|---|---|---|
| Lifetime | Cleared when **tab closes** | Persists **even after browser closes** |
| Scope | Per tab / per origin | Per origin (shared across tabs) |
| Size limit | ~5 MB | ~5–10 MB |
