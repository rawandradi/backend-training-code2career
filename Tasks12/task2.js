class LibraryItem {
  constructor(title, creator) {
    this.title = title;
    this.creator = creator;
    this.isCheckedOut = false;
  }

  toggleCheckOutStatus() {
    this.isCheckedOut = !this.isCheckedOut;
  }

  describe() {
    return `"${this.title}" by ${this.creator} [${this.isCheckedOut ? 'Checked out' : 'Available'}]`;
  }
}

class Book extends LibraryItem {
  static count = 0;

  #pages;  // Private field

  constructor(title, author, pages) {
    super(title, author);  // Call LibraryItem constructor
    this.#pages = pages;
    Book.count++;
  }

  getPages() {
    return this.#pages;
  }

  describe() {
    return `"${this.title}" by ${this.creator}, ${this.#pages} pages [${this.isCheckedOut ? 'Checked out' : 'Available'}]`;
  }

  static totalBooksCreated() {
    return Book.count;
  }
}

const bookA = new Book("The Lord of the Rings", "J.R.R. Tolkien", 464);
const bookB = new Book("The Alchemist", "Paulo Coelho", 352);

console.log(bookA.describe());
bookA.toggleCheckOutStatus();
console.log(bookA.describe());

console.log("Pages:", bookA.getPages());
console.log("Total books created:", Book.totalBooksCreated());
