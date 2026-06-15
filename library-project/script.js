function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error(
            "You must use the 'new' operator to call the constructor"
        );
    }
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () { return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read };
}

Book.prototype.toggleRead = function (value) {
    this.read = value;
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function removeBookFromLibrary(id) {
    const index = myLibrary.findIndex(book => book.id == id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

addBookToLibrary("Lord of The Flies", "William Golding", 224, "read");
addBookToLibrary("Animal Farm", "George Orwell", 140, "read");
addBookToLibrary("1984", "George Orwell", 328, "not read yet");

function displayBooks() {
    const container = document.getElementById("library-container");
    container.innerHTML = ""; // clear old table without losing position

    const newTable = document.createElement("table");
    const headerRow = newTable.insertRow();

    const header1 = document.createElement("th");
    header1.textContent = "Title";
    headerRow.appendChild(header1);

    const header2 = document.createElement("th");
    header2.textContent = "Author";
    headerRow.appendChild(header2);

    const header3 = document.createElement("th");
    header3.textContent = "Pages";
    headerRow.appendChild(header3);

    const header4 = document.createElement("th");
    header4.textContent = "Read";
    headerRow.appendChild(header4);

    for (const book of myLibrary) {
        const row = newTable.insertRow();
        row.dataset.id = book.id;

        const titleCell = row.insertCell();
        titleCell.textContent = book.title;

        const authorCell = row.insertCell();
        authorCell.textContent = book.author;

        const pageCell = row.insertCell();
        pageCell.textContent = book.pages;

        const readCell = row.insertCell();
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = book.read === "read" ? "Read ✓" : "Not Read";

        toggleBtn.addEventListener("click", () => {
            book.read = book.read === "read" ? "not read yet" : "read";
            displayBooks();
        });

        readCell.appendChild(toggleBtn);

        const removeCell = row.insertCell();
        const removeBook = document.createElement("button");
        removeBook.textContent = "Remove Book";
        removeCell.appendChild(removeBook);

        removeBook.addEventListener("click", () => {
            removeBookFromLibrary(book.id);
            displayBooks();
        });


    }

    container.appendChild(newTable);
}

function displayForm() {
    const container = document.getElementById("form-container");
    container.innerHTML = ""; // clear any existing form

    const newForm = document.createElement("form");
    newForm.id = "bookForm";

    const titleField = document.createElement("input");
    titleField.type = "text";
    titleField.placeholder = "Enter the book's title here...";
    titleField.name = "title";
    titleField.required = true;

    const authorField = document.createElement("input");
    authorField.type = "text";
    authorField.placeholder = "Enter the book's author here...";
    authorField.name = "author";
    authorField.required = true;

    const pageField = document.createElement("input");
    pageField.type = "number";
    pageField.placeholder = 55;
    pageField.name = "pages";
    pageField.required = true;

    const hasRead = document.createElement("select");
    hasRead.name = "read";
    hasRead.id = "readSelect";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select whether you have read it or not...";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    hasRead.appendChild(defaultOption);

    const option1 = document.createElement("option");
    option1.textContent = "You've read it";
    option1.value = "read";
    hasRead.appendChild(option1);

    const option2 = document.createElement("option");
    option2.textContent = "You've not read it yet";
    option2.value = "not read yet";
    hasRead.appendChild(option2);

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Form";
    submitBtn.type = "submit";

    newForm.appendChild(titleField);
    newForm.appendChild(authorField);
    newForm.appendChild(pageField);
    newForm.appendChild(hasRead);
    newForm.appendChild(submitBtn);

    container.appendChild(newForm);

    newForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formResults = Object.fromEntries(formData.entries());

        addBookToLibrary(formResults.title, formResults.author, formResults.pages, formResults.read);
        displayBooks();

        container.innerHTML = "";
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", displayBooks);
} else {
    displayBooks();
}

const button = document.getElementById("newBook");

button.addEventListener("click", () => {
    displayForm();
});