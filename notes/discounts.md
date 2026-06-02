# Types of Discounts in Shopify

## 1. Amount Off Discounts

- Can be applied to specific collections/products or all products. If your amount off discount applies to all products, then the discount is applied proportionally across all items in the cart.
- If you have a $50 USD discount applied to a cart with a $50 USD item and a $100 USD item, then the first item is discounted by $16.50 USD and the second one by $33.50 USD. If the total price of the order is less than $50 USD, then the value of each item is discounted to $0 USD. The order value can't go below $0 USD.
- If you create 2 or more discounts in the same category — 1 with a discount code and another as an automatic discount — then both cannot be applied at checkout even after `combinesWithProductDiscounts` is enabled. Shopify's combination logic works across discount categories, not within the same category.
- Even with `combinesWithProductDiscounts` enabled on both, two product discounts cannot stack with each other. The `combinesWithProductDiscounts` toggle is meant to allow a product discount to combine with another type that is also a product discount from a different category context (like a Buy X Get Y stacking with an Amount Off Product in some cases).
- Upgrade to **Shopify Plus** — Plus merchants get access to Shopify Functions, which allows fully custom discount stacking logic, including multiple product discounts simultaneously.

---

## Summary of What Can Combine

| Discount A         | Discount B         | Can Stack? |
| ------------------ | ------------------ | ---------- |
| Product discount   | Order discount     | ✅ Yes      |
| Product discount   | Shipping discount  | ✅ Yes      |
| Product discount   | Product discount   | ❌ No       |
| Order discount     | Shipping discount  | ✅ Yes      |
