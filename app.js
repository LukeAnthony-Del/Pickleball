const rentalForm = document.getElementById("rentalForm");
const rentalList = document.getElementById("rentalList");

let rentals = JSON.parse(
  localStorage.getItem("pickleballRentals") || "[]"
);

function saveRentals() {
  localStorage.setItem(
    "pickleballRentals",
    JSON.stringify(rentals)
  );
}

function displayRentals() {
  rentalList.innerHTML = "";

  if (rentals.length === 0) {
    rentalList.textContent = "No rentals added yet.";
    return;
  }

  rentals.forEach(function (rental) {
    const rentalBox = document.createElement("div");
    rentalBox.className = "rental";

    if (rental.returned) {
      rentalBox.classList.add("returned");
    }

    const details = document.createElement("p");

    details.textContent =
      rental.customer +
      " — " +
      rental.equipment +
      " — " +
      rental.date +
      " — $" +
      rental.amount +
      (rental.returned ? " — RETURNED" : " — OUT");

    rentalBox.appendChild(details);

    const returnButton = document.createElement("button");
    returnButton.className = "return-button";
    returnButton.textContent = rental.returned
      ? "Mark as Out"
      : "Mark as Returned";

    returnButton.addEventListener("click", function () {
      rental.returned = !rental.returned;
      saveRentals();
      displayRentals();
    });

    rentalBox.appendChild(returnButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      rentals = rentals.filter(function (item) {
        return item.id !== rental.id;
      });

      saveRentals();
      displayRentals();
    });

    rentalBox.appendChild(deleteButton);
    rentalList.appendChild(rentalBox);
  });
}

rentalForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newRental = {
    id: Date.now(),
    customer: document.getElementById("customer").value,
    equipment: document.getElementById("equipment").value,
    date: document.getElementById("date").value,
    amount: document.getElementById("amount").value,
    returned: false
  };

  rentals.push(newRental);
  saveRentals();
  displayRentals();

  rentalForm.reset();
});

displayRentals();
