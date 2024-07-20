class Book {
  constructor(title, image, price, quantity) {
    this.Title = title;
    this.Image = image;
    this.Price = price;
    this.Quantity = quantity;
  }
  getImageBook() {
    return this.Image;
  }
  getPrice() {
    return this.Price;
  }
  getTitle() {
    return this.Title;
  }
  getQuantity() {
    return this.Quantity;
  }
}

var Books = [
  new Book("Clean Architecture", "img/book-1.jpg", 29.99, 10),
  new Book("The Clean Code", "img/book-2.png", 39.99, 5),
];
let currentIndex = 0;
let countBooks = Books.length;
const bookImageElement = document.getElementById("book-images");
// event next click
next.onclick = function () {
  currentIndex = currentIndex + 1;
  if (currentIndex > countBooks - 1) {
    currentIndex = 0;
  }
  showNextBook();
};
//event prev click
prev.onclick = function () {
  currentIndex = currentIndex - 1;
  if (currentIndex < 0) {
    currentIndex = countBooks - 1;
  }
  showNextBook();
};

let refreshInterval = setInterval(() => {
  next.click();
}, 2000);

function showNextBook() {
  const currentBook = Books[currentIndex];

  bookImageElement.src = currentBook.getImageBook();

  // currentIndex = (currentIndex + 1) % Books.length;

  // clear auto time run slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 2000);
}
showNextBook();
