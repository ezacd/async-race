import { createFlag } from "./svg-loaders/create-svg";
import { createNewCar } from "./svg-loaders/create-svg";
import { Car } from "./interfaces";

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
  createCarButton.classList.add("update-button", "create-car");
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
  updateCarButton.classList.add("update-button", "update-car");
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

function createCar(name: string, color: string, id: number) {
  const car = document.createElement("div");
  car.classList.add("car");

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");
  car.appendChild(buttonsDiv);

  const selectButton = document.createElement("button");
  selectButton.classList.add("update-button", "race");
  selectButton.textContent = "SELECT";

  const removeButton = document.createElement("button");
  removeButton.classList.add("update-button", "reset");
  removeButton.textContent = "REMOVE";

  const raceCarNameDiv = document.createElement("div");
  raceCarNameDiv.classList.add("race-car-name");
  raceCarNameDiv.textContent = name;

  buttonsDiv.appendChild(selectButton);
  buttonsDiv.appendChild(removeButton);
  buttonsDiv.appendChild(raceCarNameDiv);

  const engineButtonsDiv = document.createElement("div");
  engineButtonsDiv.classList.add("engine-buttons");
  car.appendChild(engineButtonsDiv);

  const aButton = document.createElement("button");
  aButton.classList.add("A");
  aButton.textContent = "A";

  const bButton = document.createElement("button");
  bButton.classList.add("B");
  bButton.textContent = "B";

  engineButtonsDiv.appendChild(aButton);
  engineButtonsDiv.appendChild(bButton);

  const roadDiv = document.createElement("div");
  roadDiv.classList.add("road");
  car.appendChild(roadDiv);

  const svg = document.createElement("div");
  svg.classList.add("svg-box");
  svg.innerHTML = createFlag();

  car.appendChild(svg);

  const svgCar = document.createElement("div");
  svgCar.classList.add("car-box");
  svgCar.id = "car" + id;
  svgCar.innerHTML = createNewCar();

  car.appendChild(svgCar);

  document.querySelector(".race__cars")?.appendChild(car);

  const carColor = svgCar.querySelector(".svg-car-color");
  if (carColor) {
    carColor.setAttribute("fill", color);
  }
}

function addCars() {
  const json = fetch("http://127.0.0.1:3000/garage");
  json
    .then((res) => {
      return res.json();
    })
    .then((data: Car[]) => {
      data.forEach((car) => {
        createCar(car.name, car.color, car.id);
      });
    });
}

export function createField() {
  createTopButtons();
  createGarage();
}
