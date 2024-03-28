import { createField } from "./create-page";
import { addNewCar } from "./create-car";

export function start() {
  createField();

  const createCarButton = document.querySelector(".create-car-button");
  const removeCarButton = document.querySelector(".")

  createCarButton?.addEventListener("click", addNewCar);
}
