import { Winner } from "./interfaces";

export function getWinners() {
  const url = "http://127.0.0.1:3000/winners";

  const options = {
    method: "GET",
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
    .then((data) => {
      console.log("Данные получены:", data);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
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
      console.log(time);
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
