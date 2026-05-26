const ON_CHANGE_DEBOUNCE_TIMER = 300;

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

const PUB_SUB_EVENTS = {
  cartUpdate: 'cart-update',
  quantityUpdate: 'quantity-update',
  variantChange: 'variant-change',
  cartError: 'cart-error'
};

function fetchConfig(type = 'json', method = 'POST') {
  return {
    method,
    headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
  };
}
