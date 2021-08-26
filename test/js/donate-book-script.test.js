const {
  addDonatedBooksToLocalStorage,
} = require("../../assets/js/donate-book-script");

test("Function to add donated books into localStorage", () => {
  let donor = {
    firstName: "Lily",
    lastName: "Lim",
    email: "lilylim@gmail.com",
    contact: "60123456789",
    address: "10, Random Address Street",
    address2: "Random District, Random State",
    city: "Random City",
    state: "Random State",
    zip: "12345",
  };

  let book = {
    title: "Harry Potter",
    author: "J.K. Rowling",
    publisher: "Random Publisher",
    yearPublished: "2004",
    category: "Fiction",
    description: "This is the description for the book, Harry Potter",
    donationMethod: "Pick Up",
  };

  expect(addDonatedBooksToLocalStorage(donor, book)).toBe(1);
});
