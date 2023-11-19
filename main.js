//Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class: Handle UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '34343434'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '85858585'
            }
        ];
        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class='delete' style="background:red; color:white; padding:12px 1rem; text-decoration:none; font-size:1.5rem; border-radius:5px; border:4px solid black">X</a></td>
        `;

        list.appendChild(row);

    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showDanger(message, className){
        const danger=document.createElement('div');
        danger.setAttribute('id', 'danger');
        danger.style.backgroundColor='red';
        danger.style.padding='14px 7rem';
        danger.style.color='White';
        danger.style.fontSize='1.5rem'
        danger.className=`alert alert-${className}`;
        danger.appendChild(document.createTextNode(message));

        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(danger, form);
        
        //Vanish in 3 seconds
        setTimeout(()=> document.querySelector('#danger').remove(),
        1500);
    }

    static showSuccess(message, className){
        const success=document.createElement('div');
        success.setAttribute('id', 'success');
        success.style.backgroundColor='green';
        success.style.padding='14px 6rem';
        success.style.color='White';
        success.style.fontSize='1.5rem'
        success.className=`alert alert-${className}`;
        success.appendChild(document.createTextNode(message));

        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(success, form);
        
        //Vanish in 3 seconds
        setTimeout(()=> document.querySelector('#success').remove(),
        1500);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }

}


//Store Class: Handles Storage



//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();
    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate
    if (title === '' || author === '' || isbn === '') {
        UI.showDanger('!!!!! Please fill in all fields !!!!!', 'danger')
    } else {

        //Instantiaste book
        const book = new Book(title, author, isbn);

        //Add book to UI
        UI.addBookToList(book);

        //Show Successs message
        UI.showSuccess('!!!!! Book Added Successfully!!!!!','success')

        //Clear Fields
        UI.clearFields();
    }
});
//Event: Remove a Book

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
})