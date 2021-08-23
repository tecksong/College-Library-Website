const { loadBooks, addBooktoLocalStorage } = require("../../assets/js/script");

test("Load books from Local Storage", () => {
  expect(loadBooks()).toBe(1);
});

test("Add Books to Local Storage", () => {
  let book = { name: "test", author: "test", type: "N/A" };
  expect(addBooktoLocalStorage(book)).toBe("Test Fail");
});
