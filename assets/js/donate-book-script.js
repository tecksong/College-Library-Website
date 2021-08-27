// Constructor for donated books
function Book(
  title,
  author,
  publisher,
  yearPublished,
  category,
  description,
  donationMethod
) {
  this.title = title;
  this.author = author;
  this.publisher = publisher;
  this.yearPublished = yearPublished;
  this.category = category;
  this.description = description;
  this.donationMethod = donationMethod;
}

// Constructor for donors
function Donor(
  firstName,
  lastName,
  email,
  contact,
  address,
  address2,
  city,
  state,
  zip
) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.contact = contact;
  this.address = address;
  this.address2 = address2;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

// We'll create a donatedBooks array to store all donated books entry into our localStorage, and retrieve them when necessary
var donatedBooks = [];

// Add a new book to the donatedBooks array in the localStorage
var numberOfDonatedBooks = 0;

/**
 * Add Donated Books to Local Storage
 * @param {object} donor
 * @param {object} book
 * @returns {1} value to show process completed
 */
function addDonatedBooksToLocalStorage(donor, book) {
  console.log("Adding book to donatedBooks array in localStorage");

  let donation = { ...donor, ...book };

  if (localStorage.getItem("donatedBooks") == null) {
    donatedBooks.push(donation);
    localStorage.setItem("donatedBooks", JSON.stringify(donatedBooks));
  } else {
    donatedBooks = JSON.parse(localStorage.getItem("donatedBooks"));
    donatedBooks.push(donation);
    localStorage.setItem("donatedBooks", JSON.stringify(donatedBooks));
    numberOfDonatedBooks = donatedBooks.length;
  }

  numberOfDonatedBooks = numberOfDonatedBooks + 1;

  return 1;
}

/**
 * Clears the donateForm inputs after successfully adding the data
 */
function clearDonateForm() {
  let donateForm = document.getElementById("donateForm");
  donateForm.reset();
}

// Add submit event listener to donateForm
let donateForm = document.getElementById("donateForm");

if (donateForm != null) {
  donateForm.addEventListener("submit", donateFormSubmit);
}

module.exports = { addDonatedBooksToLocalStorage };

/**
 * Handles the donate form submission process with proper form validation
 * @param {object} e
 */
function donateFormSubmit(e) {
  console.log("You have submitted donate form");

  // Retrieve information regarding the donors
  let firstName = document.getElementById("inputFirstName").value;
  let lastName = document.getElementById("inputLastName").value;
  let email = document.getElementById("inputEmail").value;
  let contact = document.getElementById("inputContact").value;
  let address = document.getElementById("inputAddress").value;
  let address2 = document.getElementById("inputAddress2").value;
  let city = document.getElementById("inputCity").value;
  let state = document.getElementById("inputState").value;
  let zip = document.getElementById("inputZip").value;

  let donor = new Donor(
    firstName,
    lastName,
    email,
    contact,
    address,
    address2,
    city,
    state,
    zip
  );

  console.log(donor);

  // Retrieve information regarding the donated books
  let title = document.getElementById("inputTitle").value;
  let author = document.getElementById("inputAuthor").value;
  let publisher = document.getElementById("inputPublisher").value;
  let yearPublished = document.getElementById("inputYearPublished").value;
  let category = document.getElementById("inputCategory").value;
  let description = document.getElementById("inputDescription").value;
  let donationMethod = "";

  if (document.getElementById("dropOff").checked) {
    donationMethod = document.getElementById("dropOff").value;
  }

  if (document.getElementById("pickUp").checked) {
    donationMethod = document.getElementById("pickUp").value;
  }

  let book = new Book(
    title,
    author,
    publisher,
    yearPublished,
    category,
    description,
    donationMethod
  );

  console.log(book);

  if (
    title &&
    author &&
    publisher &&
    yearPublished &&
    category &&
    description &&
    donationMethod
  ) {
    addDonatedBooksToLocalStorage(donor, book);
    clearDonateForm();
    console.log(localStorage.getItem("donatedBooks"));
  } else {
    console.log(localStorage.getItem("donatedBooks"));
  }

  e.preventDefault();
}
