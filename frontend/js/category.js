document.addEventListener('DOMContentLoaded', function() {
    // Get the category from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryBreadcrumb = document.getElementById('categoryBreadcrumb');
    const booksGrid = document.getElementById('booksGrid');
    const resultsCount = document.getElementById('resultsCount');

    if (category) {
        if (categoryTitle) categoryTitle.textContent = category;
        if (categoryBreadcrumb) categoryBreadcrumb.textContent = category;
    }

    // Get books from static data
    let booksFromData = window.booksData || [];
    // Get books from localStorage (added by admin)
    let booksFromLocal = [];
    try {
        booksFromLocal = JSON.parse(localStorage.getItem('shelfOfBooks')) || [];
    } catch (e) {
        booksFromLocal = [];
    }

    // Merge books, avoiding duplicates (by title, author, and category/type)
    let allBooks = [...booksFromData];
    booksFromLocal.forEach(localBook => {
        const exists = booksFromData.some(dataBook =>
            dataBook.book === localBook.book &&
            dataBook.bookauthor === localBook.bookauthor &&
            (
                (dataBook.category && dataBook.category === localBook.bookType) ||
                (dataBook.bookType && dataBook.bookType === localBook.bookType)
            )
        );
        if (!exists) {
            allBooks.push(localBook);
        }
    });

    // Filter books by category
    let filteredBooks = category
        ? allBooks.filter(book =>
            (book.category && book.category === category) ||
            (book.bookType && book.bookType === category)
        )
        : allBooks;

    // Helper to create book card HTML
    function createBookCard(book) {
        return `
        <div class="book-card">
            <div class="book-image">
                <img src="${book.coverImage || '../images/book-placeholder.jpg'}" alt="${book.book}">
            </div>
            <div class="book-content">
                <h3 class="book-title">${book.book}</h3>
                <p class="book-author">by ${book.bookauthor || ''}</p>
                <p class="book-category">${book.category || book.bookType || ''}</p>
            </div>
        </div>
        `;
    }

    // Display books
    if (booksGrid && resultsCount) {
        if (filteredBooks.length === 0) {
            booksGrid.innerHTML = '<p class="no-books">No books found in this category.</p>';
            resultsCount.textContent = 'Showing 0 results';
        } else {
            booksGrid.innerHTML = filteredBooks.map(book => createBookCard(book)).join('');
            resultsCount.textContent = `Showing ${filteredBooks.length} result${filteredBooks.length > 1 ? 's' : ''}`;
        }
    }
});