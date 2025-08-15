document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', e => {
            const card = btn.closest('.product-card');
            if (!card) return;
            const name = card.querySelector('h3').innerText;
            const price = card.querySelector('p').innerText;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${name} added to cart!`);
        });
    });
});
