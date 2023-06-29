var booksList = [];

window.onload = function () {
	var urlParams = new URLSearchParams(window.location.search);
	var itemId = urlParams.get('book-id');
	if (itemId) {
		loadBookData(itemId);
	} else {
		loadBooks();
		loadCategories();
	}
};

function loadBookData(bookId) {
	var bookContainer = document.getElementById('book');
	bookContainer.innerHTML = 'loading...';
	getAllBooks()
		.then((list) => {
			const book = list.find((book) => book.id == bookId);
			if (book) {
				showBook(book);
			} else {
				bookContainer.innerHTML = 'Could not find book id ' + bookId;
			}
		})
		.catch((error) => {
			bookContainer.innerHTML = error.message;
		});
}


function loadBooks() {
	var bookListContainer = getBooksListElement();
	bookListContainer.innerHTML = 'loading...';

	getAllBooks()
		.then((list) => {
			booksList = list;
			showBooks();
		})
		.catch((error) => {
			bookListContainer.innerHTML = error.message;
		});
}

async function loadCategories() {
	getAllCategories()
		.then((list) => {
			const select = document.getElementById('categories-select');
			select.onchange = function (e) {
				getBooksByCategory(e.target.value);
			};
			list.forEach(function (category) {
				var option = document.createElement('option');
				option.innerHTML = category;
				option.value = category;
				select.appendChild(option);
			});
		})
		.catch((error) => {});
}

function getBooksByCategory(category) {
	const books = booksList.filter((book) => {
		return book.category === category;
	});
	if (books.length === 0) {
		var bookListContainer = getBooksListElement();
		bookListContainer.innerHTML =
			'No books available for the selected category.';
	} else {
		showBooks(books);
	}
}

async function getAllCategories() {
	const response = await fetch('includes/categories.php');
	const list = await response.json();
	return list;
}

async function getAllBooks() {
	const response = await fetch('includes/data.php');
	const list = await response.json();		//return data books from php
	return list;
}

function getBooksListElement() {
	return document.getElementById('booksList');
}

function showBooks(list = booksList) {
	var bookListContainer = getBooksListElement();
	bookListContainer.innerHTML = '';
	list.forEach(function (book) {
		var bookItem = document.createElement('li');
		bookItem.classList.add('bookItem');

		var bookImage = document.createElement('img');
		bookImage.src = book.image1;

		var bookName = document.createElement('p');
		bookName.textContent = 'Name: ' + book.book_name;

		var bookAuthor = document.createElement('p');
		bookAuthor.textContent = 'Author: ' + book.author;

		var bookCategory = document.createElement('p');
		bookCategory.textContent = 'Category: ' + book.category;

		var bookPrice = document.createElement('p');
		bookPrice.textContent = 'Price: $' + book.price;

		bookItem.onclick = function () {
			var url = 'book.html?book-id=' + book.id;
			window.location.href = url;
		};

		bookItem.appendChild(bookImage);
		bookItem.appendChild(bookName);
		bookItem.appendChild(bookAuthor);
		bookItem.appendChild(bookCategory);
		bookItem.appendChild(bookPrice);

		bookListContainer.appendChild(bookItem);
	});
}

function showBook(book) {
	var bookContainer = document.getElementById('book');
	bookContainer.innerHTML = '';
	var singleBook = document.createElement('div');
	singleBook.id = 'singleBook';

	var bookName = document.createElement('h2');
	bookName.innerText = book.book_name;

	var bookAuthor = document.createElement('p');
	bookAuthor.textContent = book.author;

	var bookCategory = document.createElement('p');
	bookCategory.textContent = book.category;

	var bookPrice = document.createElement('p');
	bookPrice.textContent = book.price + '$';

	var images = document.createElement('div');
	images.className = 'images';

	var bookImage1 = document.createElement('img');
	bookImage1.src = book.image1;
	var bookImage2 = document.createElement('img');
	bookImage2.src = book.image2;

	images.appendChild(bookImage1);
	images.appendChild(bookImage2);

	singleBook.appendChild(bookName);
	singleBook.appendChild(bookAuthor);
	singleBook.appendChild(bookCategory);
	singleBook.appendChild(bookPrice);
	singleBook.appendChild(images);

	bookContainer.appendChild(singleBook);
}
