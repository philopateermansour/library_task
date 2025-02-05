  import * as classes from "./classes.js";
  const numberOfBooks = document.querySelector("#number-of-books-input");
  let counter = 0;
  const nameRegex = /^[A-Za-z\s'-]{2,20}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let books = [];

  document.querySelector("button").addEventListener("click", () => {
    if ( document.querySelector("#number-of-books-input").value < 1) {
      document.getElementById("number-of-books-input-error").style.display =
        "block";
    } else {
      console.log("Number of books:", numberOfBooks.value);
      
      document.getElementById("number-of-books").style.display = "none";
      document.querySelector("#book-form form").style.display = "flex";
    }
  });
  document.querySelector("#book-form form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  document.getElementById("number-of-books-input").addEventListener("keydown", (event) => {
    if (event.key === "e" || event.key === "+" || event.key === "-" || event.key === "." ) {
      event.preventDefault();
    }
  });
  document.getElementById("price-input").addEventListener("keydown", (event) => {
    if (event.key === "e" || event.key === "+" || event.key === "-") {
      event.preventDefault();
    }
  });
  function clearInput() {
    document.querySelector("#book-name-input").value = "";
    document.querySelector("#price-input").value = "";
    document.querySelector("#author-name-input").value = "";
    document.querySelector("#author-email-input").value = "";
  }

  function validateForm() {
    let isValid = true;
    document.querySelectorAll(".errors").forEach((error) => (error.style.display = "none"));
    if (document.querySelector("#book-name-input").value.trim() === "") {
      document.getElementById("book-name-input-error").style.display = "block";
      isValid = false;
    }
    if (document.querySelector("#price-input").value.trim() === "") {
      document.getElementById("price-input-error").style.display = "block";
      isValid = false;
    }
    if (document.querySelector("#author-name-input").value.trim() === "") {
      document.getElementById("author-name-input-error").textContent =
        "author name is required";
      document.getElementById("author-name-input-error").style.display = "block";
      isValid = false;
    } else if (
      nameRegex.test(
        document.querySelector("#author-name-input").value.trim()
      ) === false
    ) {
      document.getElementById("author-name-input-error").textContent =
        "invalid name";
      document.getElementById("author-name-input-error").style.display = "block";
      isValid = false;
    }
    if (
      document.querySelector("#author-email-input").value.trim() === ""
    ) {
      document.getElementById("author-email-input-error").textContent =
        "author email is required";
      document.getElementById("author-email-input-error").style.display = "block";
      isValid = false;
    } else if (
      emailRegex.test(
        document.querySelector("#author-email-input").value.trim()
      ) === false
    ) {
      document.getElementById("author-email-input-error").textContent =
        "invalid email";
      document.getElementById("author-email-input-error").style.display = "block";
      isValid = false;
    } if (!isValid) {return false;}
      books.push(
        new classes.Book(
          document.querySelector("#book-name-input").value.trim(),
          document.querySelector("#price-input").value.trim(),
          new classes.Author(
            document.querySelector("#author-name-input").value.trim(),
            document.querySelector("#author-email-input").value.trim()
          )
        )
      );
      document.querySelectorAll(".errors").forEach((error) => (error.style.display = "none"));
      clearInput();
      counter++;
      console.log("Current books:", books);
      console.log("Counter:", counter);

      return true;
      
  }

  document.getElementById("add-button").addEventListener("click", () => {
    console.log("Number of books:", numberOfBooks.value);

    if (!validateForm()) return; 
  
    if (counter == numberOfBooks.value) {
      document.querySelector("#book-form").style.display = "none";
      updateTable(); 
    }
  });
  

  function updateTable() {
    const table = document.querySelector("#book-list");
    table.innerHTML = "";

    books.forEach((book, index) => {
      const row = document.createElement("tr");
      row.setAttribute("data-index", index);

      renderRow(row, book, index);

      table.appendChild(row);
    });

    document.querySelector("table").style.display = "table";
  }

  function renderRow(row, book, index) {
    row.innerHTML = `
      <td>${book.name}</td>
      <td>${book.price}</td>
      <td>${book.author.name}</td>
      <td>${book.author.email}</td>
      <td>
        <button class="buttons edit-button">Edit</button>
        <button class="buttons delete-button">Delete</button>
      </td>`;

    row.querySelector(".edit-button").addEventListener("click", () => {
      row.innerHTML = `
        <td>
          <input type="text" value="${book.name}" id="edit-book-name-${index}">
          <span class="errors" id="edit-book-name-error-${index}">Book name is required</span>
        </td>
        <td>
          <input type="number" value="${book.price}" id="edit-price-${index}">
          <span class="errors" id="edit-price-error-${index}">Price is required</span>
        </td>
        <td>
          <input type="text" value="${book.author.name}" id="edit-author-name-${index}">
          <span class="errors" id="edit-author-name-error-${index}"></span>
        </td>
        <td>
          <input type="email" value="${book.author.email}" id="edit-author-email-${index}">
          <span class="errors" id="edit-author-email-error-${index}"></span>
        </td>
        <td>
          <button class="buttons save-button">Save</button>
          <button class="buttons cancel-button">Cancel</button>
        </td>
      `;

      row.querySelectorAll(".errors").forEach((error) => (error.style.display = "none"));

      row.querySelector(`#edit-price-${index}`).addEventListener("keydown", (event) => {
        if (event.key === "e" || event.key === "+" || event.key === "-") {
          event.preventDefault();
        }
      });

      row.querySelector(".save-button").addEventListener("click", () => {
        const editedBookName = row.querySelector(`#edit-book-name-${index}`).value.trim();
        const editedPrice = row.querySelector(`#edit-price-${index}`).value.trim();
        const editedAuthorName = row.querySelector(`#edit-author-name-${index}`).value.trim();
        const editedAuthorEmail = row.querySelector(`#edit-author-email-${index}`).value.trim();

        row.querySelectorAll(".errors").forEach((error) => (error.style.display = "none"));

        let isValid = true;

        if (editedBookName === "") {
          row.querySelector(`#edit-book-name-error-${index}`).style.display = "block";
          isValid = false;
        }
        if (editedPrice === "") {
          row.querySelector(`#edit-price-error-${index}`).style.display = "block";
          isValid = false;
        }
        if (editedAuthorName === "") {
          row.querySelector(`#edit-author-name-error-${index}`).textContent = "author name is required";
          row.querySelector(`#edit-author-name-error-${index}`).style.display = "block";
          isValid = false;
        } else if (!nameRegex.test(editedAuthorName)) {
          row.querySelector(`#edit-author-name-error-${index}`).textContent = "invalid name";
          row.querySelector(`#edit-author-name-error-${index}`).style.display = "block";
          isValid = false;
        }
        if (editedAuthorEmail === "") {
          row.querySelector(`#edit-author-email-error-${index}`).textContent = "author email is required";
          row.querySelector(`#edit-author-email-error-${index}`).style.display = "block";
          isValid = false;
        } else if (!emailRegex.test(editedAuthorEmail)) {
          row.querySelector(`#edit-author-email-error-${index}`).textContent = "invalid email";
          row.querySelector(`#edit-author-email-error-${index}`).style.display = "block";
          isValid = false;
        }

        if (!isValid) return;

        books[index] = new classes.Book(
          editedBookName,
          editedPrice,
          new classes.Author(editedAuthorName, editedAuthorEmail)
        );

        renderRow(row, books[index], index);
      });

      row.querySelector(".cancel-button").addEventListener("click", () => {
        renderRow(row, books[index], index);
      });
    });

    row.querySelector(".delete-button").addEventListener("click", () => {
      books = books.filter((book, i) => i !== index);
      updateTable();
    });
  }