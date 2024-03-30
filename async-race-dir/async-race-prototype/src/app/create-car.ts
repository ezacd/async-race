import { createFlag, createNewCar } from "./svg-loaders/create-svg";
import { Car } from "./interfaces";

function createCar(name: string, color: string, id: number) {
  const car = document.createElement("div");
  car.classList.add("car", `car${id}`);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");
  car.appendChild(buttonsDiv);

  const selectButton = document.createElement("button");
  selectButton.classList.add("update-button", "select");
  selectButton.textContent = "SELECT";

  const removeButton = document.createElement("button");
  removeButton.classList.add("update-button", "remove");
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

  selectButton.addEventListener("click", function () {
    selectCar(id).catch((error) => console.error(error));
  });

  removeButton.addEventListener("click", function () {
    removeCar(id);
  });
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
    })
    .catch((error) => {
      console.error(error);
    });
}

export function addNewCar() {
  const nameInput = document.querySelector(".car-name") as HTMLInputElement;
  const name = nameInput ? nameInput.value : null;

  const colorInput = document.querySelector(
    ".create-car-color"
  ) as HTMLInputElement;
  const color = colorInput ? colorInput.value : null;

  const url = "http://127.0.0.1:3000/garage";
  const data = {
    name,
    color,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data: Car) => {
      createCar(data.name, data.color, data.id);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}

async function selectCar(id: number) {
  const nameInput = document.getElementById(
    "update-car-name"
  ) as HTMLInputElement;
  const colorInput = document.querySelector(
    ".update-car-color"
  ) as HTMLInputElement;
  const updateButton = document.querySelector(".update-car-button");

  try {
    const carData = await getCar(id);
    if (carData) {
      nameInput.value = carData.name;
      colorInput.value = carData.color;
      updateButton?.addEventListener("click", function () {
        updateCar(id);
      });
    } else {
      console.error("Данные об автомобиле не найдены");
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

function updateCar(id: number) {
  const updateButton = document.querySelector(".update-car-button");

  if (updateButton) {
    removeAllEventListeners(updateButton);
  }

  const nameInput = document.getElementById(
    "update-car-name"
  ) as HTMLInputElement;
  const name = nameInput ? nameInput.value : null;

  const colorInput = document.querySelector(
    ".update-car-color"
  ) as HTMLInputElement;
  const color = colorInput ? colorInput.value : null;

  const url = `http://127.0.0.1:3000/garage/${id}`;
  const data = { name, color };

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        const carName = document
          .querySelector(`.car${id}`)
          ?.querySelector(".race-car-name");

        const carColor = document
          .querySelector(`.car${id}`)
          ?.querySelector(".svg-car-color") as HTMLElement;

        if (carName && carColor) {
          carName.textContent = name;
          carColor.style.fill = color!;
        }
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
}

function removeCar(id: number) {
  const url = `http://127.0.0.1:3000/garage/${id}`;

  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        document.querySelector(`.car${id}`)?.remove();
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
}

function removeAllEventListeners(element: Element) {
  const clone = element.cloneNode(true);
  element.parentNode?.replaceChild(clone, element);
}

async function getCar(id: number): Promise<Car> {
  const url = `http://127.0.0.1:3000/garage/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Ошибка получения данных об автомобиле");
    }
    return (await response.json()) as Car;
  } catch (error) {
    console.error("Произошла ошибка:", error);
    return {} as Car;
  }
}
