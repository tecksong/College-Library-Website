// Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// typrwiter text
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);

  document.getElementById("loading").style.display = "none";
  document.getElementById("body").style.display = "block";

  // Add submit event listener to libraryForm
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.addEventListener("submit", libraryFormSubmit);
};
//Load all books from LocalStorage, put outside because the window.onload function is broken
loadBooks();

// Display Constructor
function Display() {}

// Add methods to display prototype
let countBooks = 0;
Display.prototype.add = function (book) {
  console.log("Adding to UI");
  tableBody = document.getElementById("tableBody");
  countBooks = countBooks + 1;
  let uiString = `<tr id="${countBooks}">
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                        <td><button class="btn btn-success" id="edit" onclick="editfunction('${book.name}','${book.author}','${book.type}','${countBooks}')">Edit</button>
                        </td?
                        <td><button class="btn btn-danger" id="edit" onclick="deletefunction('${countBooks}')">Delete</button>
                        </td>
                    </tr>`;
  tableBody.innerHTML += uiString;
};

// Implement the clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

// Implement the validate function
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};
Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
  setTimeout(function () {
    message.innerHTML = "";
  }, 2000);
};

/**
 * submit library form into localStorage, and also perform validation.
 * @param {object} e
 */
function libraryFormSubmit(e) {
  console.log("YOu have submitted library form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type = document.getElementById("type").value;

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your book has been successfully added");
    addBooktoLocalStorage(book);
  } else {
    // Show error to the user
    display.show("danger", "Sorry you cannot add this book");
  }

  e.preventDefault();
}

/**
 * Adds books to the local storage.
 * @param {object} book
 * @returns {1} confirms the process is completed.
 */
function addBooktoLocalStorage(book) {
  let addedBook = book;
  let allbooks;

  let booksAddition = new Promise((resolve, reject) => {
    allbooks = JSON.parse(window.localStorage.getItem("books"));
    console.log("allbooks right now:" + JSON.stringify(allbooks));
    allbooks = allbooks ? [...allbooks, addedBook] : [addedBook];
    window.localStorage.setItem("books", JSON.stringify(allbooks));
    resolve(allbooks);
  });

  booksAddition.then((allbooks) => {
    console.log(JSON.stringify(window.localStorage.getItem("books")));
  });

  return 1;
}

/**
 * Loads all the books from local storage into the page.
 * Returns 1 as confirmation of completed process
 * @returns {1}
 */
function loadBooks() {
  let allbooks = JSON.parse(window.localStorage.getItem("books"));
  tableBody = document.getElementById("tableBody");
  let countBooks = 0;
  let uiString;

  if (allbooks) {
    allbooks.map((book) => {
      countBooks++;
      uiString += `<tr id="${countBooks}">
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
    <td><button class="btn btn-success" id="edit" onclick="editfunction('${book.name}','${book.author}','${book.type}','${countBooks}')">Edit</button>
    </td?
    <td><button class="btn btn-danger" id="edit" onclick="deletefunction('${countBooks}')">Delete</button>
    </td>
</tr>`;
    });
    tableBody.innerHTML += uiString;
  } else {
  }
  return 1;
}
module.exports = { addBooktoLocalStorage, loadBooks };

//edit function
function editfunction(pbookname, pauthorname, ptype, pbookid) {
  document.getElementById("bookName").value = pbookname;
  document.getElementById("author").value = pauthorname;
  document.getElementById(ptype).checked = true;
  document.getElementById(pbookid).style.display = "none";
}

/**
 * Deletes the book based on its book id.
 * @param {object} pbookid
 */
function deletefunction(pbookid) {
  document.getElementById(pbookid).style.display = "none";
}

// window.onload = function () {
//   document.getElementById("loading").style.display = "none";
//   document.getElementById("body").style.display = "block";

// };
// Todos"
// 1. Give another column as an option to delete the book
// 2. Add a scroll bar to the view.
