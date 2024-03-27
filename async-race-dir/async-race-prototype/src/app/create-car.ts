import { createFlag } from "./svg-loaders/create-svg";
import { createNewCar } from "./svg-loaders/create-svg";
import { Car } from "./interfaces";

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

export function addCars() {
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

function addNewCar() {}
