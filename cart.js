function toCurrency(n) {
  return '$' + n.toFixed(2);
}

function updateCartTotals() {
  const items = document.querySelectorAll('.cart-item');
  let total = 0;
  items.forEach(item => {
    const price = parseFloat(item.dataset.price || 0);
    const qty = parseInt(item.querySelector('.qty-input').value) || 0;
    const lineTotal = price * qty;
    item.querySelector('.item-line-total').textContent = toCurrency(lineTotal);
    total += lineTotal;
  });
  document.getElementById('cart-total').textContent = toCurrency(total);
}

document.addEventListener('DOMContentLoaded', () => {
  const cartBox = document.getElementById('cart-box');

  cartBox.addEventListener('input', e => {
    if (e.target.classList.contains('qty-input')) {
      const val = parseInt(e.target.value);
      if (isNaN(val) || val < 1) e.target.value = 1;
      updateCartTotals();
    }
  });

  cartBox.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
      const item = e.target.closest('.cart-item');
      if (item) item.remove();
      updateCartTotals();
    }
  });

  document.getElementById('checkout').addEventListener('click', e => {
    e.preventDefault();
    const totalText = document.getElementById('cart-total').textContent;
    alert('Checkout — Total to pay: ' + totalText + '\n\n(This is where payment will happen.)');
  });

  updateCartTotals();
});