import { Winner } from "./interfaces";
import { createWinnersTable } from "./create-page";
import { getCar } from "./create-car";
import { createNewCar } from "./svg-loaders/create-svg";

function getWinners(sort: "wins" | "time"): Promise<Winner[]> {
  const url = `http://127.0.0.1:3000/winners?_sort=${sort}&_order=ASC`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      return response.json() as Promise<Winner[]>;
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
      return [];
    });
}

function addWinner(time: number | null, id: number) {
  let wins;

  if (time) {
    wins = 1;
  } else {
    wins = 0;
  }

  const url = "http://127.0.0.1:3000/winners";
  const data = {
    wins,
    time,
    id,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}

async function updateWinner(time: number | null, id: number) {
  let winner;
  let wins;
  let lastTime;

  try {
    winner = await getWinner(id);
    wins = winner.wins;
    lastTime = winner.time;

    if (lastTime === null) {
      lastTime = time;
    }

    if (time && lastTime && lastTime > time) {
      lastTime = time;
    }

    if (time !== null) {
      wins += 1;
    }
  } catch (error) {
    console.error("Произошла ошибка при обновлении победителя:", error);
  }
  const url = `http://127.0.0.1:3000/winners/${id}`;
  const data = { wins, time: lastTime };

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
}

export function winner(time: number | null, id: number) {
  let stop = false;
  const url = `http://127.0.0.1:3000/winners/${id}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, options)
    .then((response) => {
      if (response.status === 404) {
        stop = true;
        return addWinner(time, id);
      }
      return response.json();
    })
    .then((data: Winner) => {
      if (!stop) {
        return updateWinner(time, data.id);
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
}

function getWinner(id: number): Promise<Winner> {
  const url = `http://127.0.0.1:3000/winners/${id}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((data: Winner) => {
      return data;
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
      return {} as Winner;
    });
}

export function winners() {
  const game = document.querySelector(".game");
  if (game) {
    game.innerHTML = "";
  }

  createWinnersTable();

  getWinners("time")
    .then((data) => {
      return addWinnerAtTable(data);
    })
    .catch((error) => {
      console.error("Произошла ошибка при получении данных:", error);
    });
}

function addWinnerAtTable(data: Winner[]) {
  let i = 0;
  for (const winner of data) {
    getCar(winner.id)
      .then((data) => {
        i++;
        const winnersTable = document.querySelector(".winners__table");
        const rowData = [
          ["" + i, "car_img", data.name, "" + winner.wins, "" + winner.time],
        ];

        const rows = rowData.map((row) => {
          const tr = document.createElement("tr");
          row.forEach((cellText) => {
            const td = document.createElement("td");
            if (cellText === "car_img") {
              td.innerHTML = createNewCar();
              const color = td.querySelector(".svg-car-color") as HTMLElement;
              color.style.fill = data.color;
            } else {
              td.textContent = cellText;
            }
            tr.appendChild(td);
          });
          return tr;
        });

        rows.forEach((row) => winnersTable?.appendChild(row));
      })
      .catch((error) => {
        console.error("Произошла ошибка при получении данных о машине:", error);
      });
  }
}
