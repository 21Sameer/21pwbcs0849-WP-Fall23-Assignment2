// Fetch book data from books.json
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        // Display book categories in the dropdown
        displayCategories(data);

        // Display books on page load (all categories)
        displayBooks(data);
    })
    .catch(error => console.error('Error fetching book data:', error));

// Function to display book categories in the dropdown
function displayCategories(books) {
    const categoryFilter = document.getElementById('categoryFilter');

    // Extract unique categories from the book data
    const categories = [...new Set(books.map(book => book.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to display books based on the selected category
function displayBooks(books) {
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = ''; // Clear existing books

    books.forEach(book => {
        const bookCard = createBookCard(book);
        booksContainer.appendChild(bookCard);
    });
}

// Function to create a Bootstrap card for a book
function createBookCard(book) {
    const cardCol = document.createElement('div');
    cardCol.classList.add('col-md-4', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = `${book.cover_image}`;
    image.classList.add('card-img-top');
    card.appendChild(image);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = book.title;
    cardBody.appendChild(title);

    const author = document.createElement('p');
    author.classList.add('card-text');
    author.textContent = `Author: ${book.author}`;
    cardBody.appendChild(author);

    const price = document.createElement('p');
    price.classList.add('card-text');
    price.textContent = `Price: $${book.price}`;
    cardBody.appendChild(price);

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('btn', 'btn-primary', 'mr-2');
    addToCartButton.textContent = 'Add to Cart';
    // Add click event for adding to cart functionality
    addToCartButton.addEventListener('click', () => addToCart(book));

    const viewCartButton = document.createElement('button');
    viewCartButton.classList.add('btn', 'btn-success');
    viewCartButton.textContent = 'View Cart';
    // Add click event for viewing cart functionality
    viewCartButton.addEventListener('click', () => viewCart());

    cardBody.appendChild(addToCartButton);
    cardBody.appendChild(viewCartButton);

    card.appendChild(cardBody);
    cardCol.appendChild(card);

    return cardCol;
}

// Function to filter books based on the selected category
function filterByCategory() {
    const selectedCategory = document.getElementById('categoryFilter').value;

    // Fetch book data from books.json
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            // Filter books based on the selected category
            const filteredBooks = data.filter(book => book.category === selectedCategory);

            // Display the filtered books
            displayBooks(filteredBooks);
        })
        .catch(error => console.error('Error fetching book data:', error));
}

// Function to add a book to the cart (you can reuse the addToCart function from the previous examples)
function addToCart(book) {
    // Implement logic to add the selected book to the cart
    // ...
    alert(`"${book.title}" added to the cart.`);
}

// Function to view the cart (you can reuse the viewCart function from the previous examples)
function viewCart() {
    // Implement logic to navigate to the cart page or display the cart details
    // ...
    alert('Viewing Cart');
}
// Fetch books from JSON and populate the dropdown
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        const categories = data.reduce((acc, book) => {
            if (!acc.includes(book.category)) {
                acc.push(book.category);
            }
            return acc;
        }, []);

        const categoryFilter = document.getElementById('categoryFilter');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        displayBooks(data); // Display all books initially
    })
    .catch(error => console.error('Error fetching data:', error));

// Filter books by category
function filterByCategory() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;
    
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            const filteredBooks = data.filter(book => {
                return selectedCategory === 'all' || book.category === selectedCategory;
            });

            displayBooks(filteredBooks);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayBooks(books) {
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('col-md-4', 'mb-4');

        const card = `
            <div class="card">
                <img src="${book.image}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.author}</p>
                    <p class="card-text">$${book.price}</p>
                </div>
            </div>
        `;
        bookCard.innerHTML = card;

        booksContainer.appendChild(bookCard);
    });
}
