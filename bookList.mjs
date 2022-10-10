import fs from 'fs/promises';

const fileName = 'myBooks.json';

class BookList {
  myBooks = { books: [] };

  isBookInList(book) {
    let bookFound = this.myBooks.books.find(
      (item) =>
        item.author === book.author &&
        item.title === book.title &&
        item.publisher === book.publisher &&
        item.year === book.year
    );
    if (bookFound) return true;
    else return false;
  }

  async addBookToFile(newBook) {
    await this.loadBooksFromFile();
    let bookFound = this.isBookInList(newBook);
    if (!bookFound) {
      this.myBooks.books.push(newBook);
      try {
        let fd = await fs.open(fileName, 'w+');
        let writeOpResult = await fs.writeFile(
          fd,
          JSON.stringify(this.myBooks, null, 2)
        );
        await fd.close();
      } catch (error) {
        throw error;
      }
    }
  }

  async loadBooksFromFile() {
    try {
      let data = await fs.readFile(fileName, 'utf-8');
      if (data) this.myBooks = JSON.parse(await fs.readFile(fileName, 'utf-8'));
    } catch (error) {
      //αν απλά το αρχείο δεν υπάρχει είναι σαν να είναι άδεια η λίστα με τα βιβλία
      if (error.code == 'ENOENT') return;
      //αφήνουμε αυτόν που μας κάλεσε να γράψει τον κώδικα χειρισμού του σφάλματος
      throw error;
    }
  }
}

const bookList = new BookList();

await bookList.loadBooksFromFile();

export { BookList };
