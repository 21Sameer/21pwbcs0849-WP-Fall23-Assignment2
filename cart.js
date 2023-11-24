// cart.js

// Function to fetch books data from books.json
async function fetchBooks() {
    try {
        const response = await fetch('books.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books data:', error);
    }
}

// Function to display items in the cart
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let totalPrice = 0;

    cartItems.forEach((item) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('card', 'mb-3', 'p-2');

        bookItem.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">Author: ${item.author}</p>
                        <p class="card-text">Price: $${item.price}</p>
                        <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>
        `;

        totalPrice += parseFloat(item.price);
        cartContainer.appendChild(bookItem);
    });

    document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
}

// Remove item from the cart
function removeCartItem(id) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

// Event listener for removing items from the cart
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const itemId = event.target.dataset.id;
        removeCartItem(itemId);
    }
});

// Fetch books and display cart items when the page loads
window.addEventListener('load', async () => {
    const booksData = await fetchBooks();
    localStorage.setItem('booksData', JSON.stringify(booksData));
    displayCartItems();
});
