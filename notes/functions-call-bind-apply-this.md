# `.call()`, `.apply()`, `.bind()` & the `this` Keyword

---

## 1. `.call()`

> `.call()` is a method used to **invoke a function immediately** while *explicitly* setting the value of `this`.

```js
function updatePrice(price) {
  this.price = price;
}

const product1 = {
  name: "Phone"
};

const product2 = {
  name: "Laptop"
};

updatePrice.call(product1, 1000);
updatePrice.call(product2, 2000);

console.log(product1); // { name: "Phone", price: 1000 }
console.log(product2); // { name: "Laptop", price: 2000 }
```

### Borrowing Methods Using `.call()`

```js
const person1 = {
  name: "Amit",
  greet() {
    console.log(`Hello ${this.name}`);
  }
};

const person2 = {
  name: "Kiran"
};

person1.greet.call(person2); // Hello Kiran
```

---

## 2. `.apply()`

> `.apply()` is **very similar** to `.call()` in JavaScript.

**The main difference:**

- `.call()` passes arguments **one by one**
- `.apply()` passes arguments **as an array**

*It becomes useful when arguments already exist in an array.*

```js
function greet(city, country) {
  console.log(
    `Hello ${this.name} from ${city}, ${country}`
  );
}

const user = {
  name: "Shiva"
};

greet.apply(user, ["Bangalore", "India"]);
```

```js
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [10, 20, 30];

console.log(sum.apply(null, numbers)); // 60
```

---

## 3. `.bind()`

> `.bind()` is another JavaScript method used to control `this`.
> But **unlike** `.call()` and `.apply()`:
> `.bind()` does **NOT** execute the function immediately.
> Instead, it returns a **new function** with `this` *permanently* attached.

```js
function greet() {
  console.log(this.name);
}

const person = {
  name: "John"
};

const boundFn = greet.bind(person);

boundFn(); // John
```

### `.bind()` in Event Listeners

*Sometimes useful when class methods lose context.*

```js
class App {
  constructor() {
    this.count = 0;

    document
      .querySelector("button")
      .addEventListener("click", this.increment.bind(this));
  }

  increment() {
    this.count++;
    console.log(this.count);
  }
}
```

---

## Quick Summary

| Method | Behavior |
|---|---|
| `call()` | **Call now** — pass args individually |
| `apply()` | **Call now** — pass args as array |
| `bind()` | **Create callable copy** for later |

---

# The `this` Keyword

## `this` with Objects

```js
const user = {
  name: "John",

  greet() {
    console.log(this.name);
  }
};

user.greet();
// output: John
```

```js
function sayHi() {
  console.log(this.name);
}

const a = { name: "A", sayHi };
const b = { name: "B", sayHi };

a.sayHi(); // A
b.sayHi(); // B
```

### ~~Lost context~~ — when `this` breaks

```js
const user = {
  name: "Alex",

  greet() {
    console.log(this.name);
  }
};

const fn = user.greet;

fn();
// output: undefined (because now fn() is independent — no object calling it)
```

**Fix it with `.bind()`:**

```js
const fn = user.greet.bind(user);
fn(); // Alex
```

---

## `this` with Functions — *Arrow vs Normal*

> Arrow functions do **NOT** create their own `this`.
> They *inherit* `this` from the **surrounding (lexical) scope**.

| Behavior | Normal Function | Arrow Function |
|---|---|---|
| Own `this` | **Yes** — determined by *how* it's called | **No** — inherits from enclosing lexical scope |
| `this` in method call (`obj.fn()`) | `this` = the object (`obj`) | `this` = whatever `this` was *where the arrow was defined* |
| `this` in standalone call (`fn()`) | `this` = `undefined` (strict) / `window` (sloppy) | `this` = enclosing scope's `this` |
| `.call()` / `.apply()` / `.bind()` | **Can** override `this` | **Ignored** — `this` *cannot* be overridden |
| `new` keyword | Can be used as constructor | ~~Cannot~~ be used as constructor (`TypeError`) |
| `arguments` object | Has its **own** `arguments` | **No** `arguments` — inherits from enclosing scope |
| Use as event handler | `this` = the element that fired the event | `this` = enclosing scope (*not* the element) |
| Use in `setTimeout` / `setInterval` | `this` = `window` (or `undefined` in strict) | `this` = enclosing scope's `this` *(useful for preserving context)* |
| Inside a class method | `this` = instance (when called as `obj.method()`) | `this` = instance *(inherits from class body — good for callbacks)* |
