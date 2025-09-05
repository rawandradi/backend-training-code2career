const book1 = {
  title: "Harry Potter and the Sorcerer's Stone",
  author: "J.K. Rowling",
  isRead: false,
  
  toggleReadStatus() {
    this.isRead = !this.isRead;
  },

  describe() {
    return `"${this.title}" by ${this.author} [${this.isRead ? 'Read' : 'Unread'}]`;
  }
};

console.log(book1.describe());
book1.toggleReadStatus();
console.log(book1.describe());


//================== Style2 ====================

function createBook(title, author, isRead) {
  return {
    title,
    author,
    isRead,

    toggleReadStatus() {
      this.isRead = !this.isRead;
    },

    describe() {
      return `"${this.title}" by ${this.author} [${this.isRead ? 'Read' : 'Unread'}]`;
    }
  };
}

const book2 = createBook("رجال في الشمس", "غسان كنفاني", false);

console.log(book2.describe());
book2.toggleReadStatus();
console.log(book2.describe());


//================== Style3 ====================

function BookConstructor(title, author, isRead) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;
}

BookConstructor.prototype.toggleReadStatus = function() {
  this.isRead = !this.isRead;
};

BookConstructor.prototype.describe = function() {
  return `"${this.title}" by ${this.author} [${this.isRead ? 'Read' : 'Unread'}]`;
};

const book3 = new BookConstructor("The Da Vinci Code", "Dan Brown", true);

console.log(book3.describe());
book3.toggleReadStatus();
console.log(book3.describe());



//================== Style4 ====================

class Book {
  constructor(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }

  describe() {
    return `"${this.title}" by ${this.author} [${this.isRead ? 'Read' : 'Unread'}]`;
  }
}

const book4 = new Book("يوتوبيا", "أحمد خالد توفيق", true);

console.log(book4.describe());
book4.toggleReadStatus();
console.log(book4.describe());
