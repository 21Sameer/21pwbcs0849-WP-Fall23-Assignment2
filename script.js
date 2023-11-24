// Fetch cart data from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  displayReceipt();
});

// Function to display payment receipt
function displayReceipt() {
  const receiptBody = document.getElementById('receiptBody');
  const totalAmountElement = document.getElementById('totalAmount');
  
  // Retrieve cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  receiptBody.innerHTML = ''; // Clear existing receipt items

  // Display each book's title and price in the table
  cartItems.forEach(cartItem => {
      const book = getBookDetails(cartItem.id);

      const row = document.createElement('tr');
      const titleCell = document.createElement('td');
      const priceCell = document.createElement('td');

      titleCell.textContent = book.title;
      priceCell.textContent = `$${book.price}`;

      row.appendChild(titleCell);
      row.appendChild(priceCell);

      receiptBody.appendChild(row);
  });

  // Calculate and display the total amount
  const totalAmount = cartItems.reduce((total, cartItem) => {
      const book = getBookDetails(cartItem.id);
      return total + (book.price * cartItem.quantity);
  }, 0);

  totalAmountElement.textContent = totalAmount.toFixed(2);
}

// Function to get book details based on bookId
function getBookDetails(bookId) {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  return books.find(book => book.id === bookId);
}