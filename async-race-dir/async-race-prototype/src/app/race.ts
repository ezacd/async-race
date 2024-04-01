import { Engine, Car } from "./interfaces";
import { brand, model } from "./car-models";
import { addNewCar } from "./create-car";
import { winner } from "./winners";

export function startEngine(id: number) {
  const car = document.querySelector(`.car${id}`);
  const url = `http://127.0.0.1:3000/engine?id=${id}&status=started`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      return response.json();
    })
    .then((data: Engine) => {
      console.log("Успешный ответ:", data);
      car?.querySelector(".A")?.classList.add("not-active");
      car?.querySelector(".B")?.classList.remove("not-active");
      animation(data, id);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
}

function animation(data: Engine, id: number) {
  let stop = false;
  let start: number | null = null;
  const element = document
    .getElementById(`car${id}`)
    ?.querySelector(".svg-car") as HTMLElement;

  const road = document.querySelector(`.car${id}`) as HTMLElement;
  const roadWidth = road.offsetWidth - 160;

  const raceTime = data.distance / 1000 / data.velocity;

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    if (element) {
      element.style.transform = `translateX(${Math.min(progress / raceTime, roadWidth)}px)`;
    }
    if (progress / raceTime < roadWidth && !stop) {
      window.requestAnimationFrame(step);
    } else if (stop) {
      setTime(null, id);
    } else {
      setTime((timestamp - start) / 1000, id);
    }
  }
  window.requestAnimationFrame(step);

  function setTime(time: number | null, id: number) {
    winner(time, id);
  }

  function stopCar() {
    stop = true;
  }

  drive(id, stopCar);
}

function drive(id: number, stopCar?: () => void) {
  const url = `http://127.0.0.1:3000/engine?id=${id}&status=drive`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, options)
    .then((response) => {
      if (response.status === 500 && stopCar) {
        stopCar();
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
}

export function backCar(id: number) {
  const car = document.querySelector(`.car${id}`);

  const element = document
    .getElementById(`car${id}`)
    ?.querySelector(".svg-car") as HTMLElement;

  if (element && element.style) {
    element.style.transform = "translateX(0)";
  }

  car?.querySelector(".A")?.classList.remove("not-active");
  car?.querySelector(".B")?.classList.add("not-active");
}

export function raceAll() {
  const json = fetch("http://127.0.0.1:3000/garage");
  json
    .then((res) => {
      return res.json();
    })
    .then((data: Car[]) => {
      data.forEach((car) => {
        startEngine(car.id);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

export function resetAll() {
  const json = fetch("http://127.0.0.1:3000/garage");
  json
    .then((res) => {
      return res.json();
    })
    .then((data: Car[]) => {
      data.forEach((car) => {
        backCar(car.id);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

export function generateCars() {
  for (let i = 0; i < 100; i++) {
    const name =
      brand[Math.floor(Math.random() * brand.length)] +
      " " +
      model[Math.floor(Math.random() * model.length)];

    const color = getRandomHexColor();

    addNewCar(name, color);
  }
}

function getRandomHexColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const hexColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

  return hexColor;
}
