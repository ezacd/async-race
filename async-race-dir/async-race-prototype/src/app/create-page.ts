import { addCars } from "./create-car";
import { generateCars, raceAll, resetAll } from "./race";
import { winners } from "./winners";

function createTopButtons() {
  const gameSection = document.createElement("section");
  gameSection.classList.add("game");

  const topNavigationDiv = document.createElement("div");
  topNavigationDiv.classList.add("top-navigation");

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  const toGarageButton = document.createElement("button");
  toGarageButton.classList.add("manage-button", "to-garage");
  toGarageButton.textContent = "TO GARAGE";

  const toWinnersButton = document.createElement("button");
  toWinnersButton.classList.add("manage-button", "to-winners");
  toWinnersButton.textContent = "TO WINNERS";

  buttonsDiv.appendChild(toGarageButton);
  buttonsDiv.appendChild(toWinnersButton);

  topNavigationDiv.appendChild(buttonsDiv);

  const createCarDiv = document.createElement("div");
  createCarDiv.classList.add("create-car");

  const createCarNameInput = document.createElement("input");
  createCarNameInput.classList.add("car-name");
  createCarNameInput.id = "create-car-name";
  createCarNameInput.type = "text";

  const createCarColorInput = document.createElement("input");
  createCarColorInput.classList.add("create-car-color");
  createCarColorInput.type = "color";
  createCarColorInput.value = "#ff0000";

  const createCarButton = document.createElement("button");
  createCarButton.classList.add("update-button", "create-car-button");
  createCarButton.textContent = "CREATE";

  createCarDiv.appendChild(createCarNameInput);
  createCarDiv.appendChild(createCarColorInput);
  createCarDiv.appendChild(createCarButton);

  const updateCarDiv = document.createElement("div");
  updateCarDiv.classList.add("update-car");

  const updateCarNameInput = document.createElement("input");
  updateCarNameInput.classList.add("car-name");
  updateCarNameInput.id = "update-car-name";
  updateCarNameInput.type = "text";

  const updateCarColorInput = document.createElement("input");
  updateCarColorInput.classList.add("update-car-color");
  updateCarColorInput.type = "color";
  updateCarColorInput.value = "#ff0000";

  const updateCarButton = document.createElement("button");
  updateCarButton.classList.add("update-button", "update-car-button");
  updateCarButton.textContent = "UPDATE";

  updateCarDiv.appendChild(updateCarNameInput);
  updateCarDiv.appendChild(updateCarColorInput);
  updateCarDiv.appendChild(updateCarButton);

  const raceResetGenerateButtonsDiv = document.createElement("div");
  raceResetGenerateButtonsDiv.classList.add("buttons");

  const raceButton = document.createElement("button");
  raceButton.classList.add("manage-button", "race");
  raceButton.textContent = "RACE";

  const resetButton = document.createElement("button");
  resetButton.classList.add("manage-button", "reset");
  resetButton.textContent = "RESET";

  const generateButton = document.createElement("button");
  generateButton.classList.add("update-button", "generate");
  generateButton.textContent = "GENERATE CARS";

  raceResetGenerateButtonsDiv.appendChild(raceButton);
  raceResetGenerateButtonsDiv.appendChild(resetButton);
  raceResetGenerateButtonsDiv.appendChild(generateButton);

  topNavigationDiv.appendChild(createCarDiv);
  topNavigationDiv.appendChild(updateCarDiv);
  topNavigationDiv.appendChild(raceResetGenerateButtonsDiv);
  gameSection.appendChild(topNavigationDiv);

  document.body.appendChild(gameSection);

  raceButton.addEventListener("click", raceAll);
  resetButton.addEventListener("click", resetAll);
  generateButton.addEventListener("click", generateCars);
  toWinnersButton.addEventListener("click", function () {
    winners();
  });
}

function createGarage() {
  const raceDiv = document.createElement("div");
  raceDiv.classList.add("race");

  const garageH2 = document.createElement("h2");
  garageH2.classList.add("garage-h2");
  garageH2.textContent = "Garage (1)";
  raceDiv.appendChild(garageH2);

  const pageH3 = document.createElement("h3");
  pageH3.classList.add("page-h3");
  pageH3.textContent = "Page #1";
  raceDiv.appendChild(pageH3);

  const raceCarsDiv = document.createElement("div");
  raceCarsDiv.classList.add("race__cars");
  raceDiv.appendChild(raceCarsDiv);

  document.querySelector(".game")?.appendChild(raceDiv);

  addCars();
}

export function createWinnersTable(): void {
  const winnersDiv = document.createElement("div");
  winnersDiv.classList.add("winners");

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  const toGarageButton = document.createElement("button");
  toGarageButton.classList.add("manage-button", "to-garage");
  toGarageButton.textContent = "TO GARAGE";

  const toWinnersButton = document.createElement("button");
  toWinnersButton.classList.add("manage-button", "to-winners");
  toWinnersButton.textContent = "TO WINNERS";

  buttonsDiv.appendChild(toGarageButton);
  buttonsDiv.appendChild(toWinnersButton);

  const garageHeader = document.createElement("h2");
  garageHeader.classList.add("garage-h2");
  garageHeader.textContent = "Winners";

  const pageHeader = document.createElement("h3");
  pageHeader.classList.add("page-h3");
  pageHeader.textContent = "Page #1";

  const winnersTable = document.createElement("table");
  winnersTable.classList.add("winners__table");

  const tableHeader = document.createElement("tr");
  const headers = ["Number", "Car", "Name", "Wins", "Best time"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    tableHeader.appendChild(th);
  });

  winnersTable.appendChild(tableHeader);

  winnersDiv.appendChild(buttonsDiv);
  winnersDiv.appendChild(garageHeader);
  winnersDiv.appendChild(pageHeader);
  winnersDiv.appendChild(winnersTable);

  document.querySelector(".game")?.appendChild(winnersDiv);

  toGarageButton.addEventListener("click", createField);
}

export function createField() {
  document.body.innerHTML = "";
  createTopButtons();
  createGarage();
}
