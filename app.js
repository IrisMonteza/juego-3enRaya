let turn = 1;
let piece = ['./assets/images/Imagen1.png', './assets/images/Imagen2.png'];
// Fichas puestas
let add = 0;
let finishedGame = false;
let winnerText = document.getElementById('winnerText');
let buttons = Array.from(document.getElementsByTagName('button'));

// Función para guardar el nombre en el Local Storage
function SaveNameLS() {
  let id = document.getElementById('gamer').value;
  // console.log(id);
  localStorage.setItem('Jugador', id);
}

console.log(SaveNameLS);
// Función para Agregar una ficha, click sobre el botón
buttons.forEach((x) => x.addEventListener('click', addPiece));
function addPiece(event) {
  let buttonPressed = event.target;
  if (!finishedGame && buttonPressed.innerHTML == '') {
    buttonPressed.innerHTML = `<img src=${piece[turn]}>`;
    add += 1;

    let stateGame = state();
    if (stateGame == 0) {
      cambiarTurno();
      if (add < 9) {
        ia();
        stateGame = state();
        add += 1;
        cambiarTurno();
      }
    }

    if (stateGame == 1) {
      winnerText.style.visibility = 'visible';
      winnerText.innerHTML = `Felicidades ${localStorage.getItem(
        'Jugador'
      )} ¡Ganaste el Juego!`;
      finishedGame = true;
    } else if (stateGame == -1) {
      winnerText.innerHTML = `¡Oh no ${localStorage.getItem(
        'Jugador'
      )}! ¡Perdiste el juego!`;
      finishedGame = true;
      winnerText.style.visibility = 'visible';
    }
  }
}

function cambiarTurno() {
  if (turn == 1) {
    turn = 0;
  } else {
    turn = 1;
  }
}

function state() {
  // Que fila está esa victoria
  victoryPosition = 0;

  // 0-> La partida continúa, -1 -> Si ganó el bot , 1 -> Si ganó el jugador
  sState = 0;

  function areEqual(...args) {
    values = args.map((x) => x.innerHTML);
    if (values[0] != '' && values.every((x, i, arr) => x === arr[0])) {
      args.forEach((x) => (x.style.backgroundColor = 'Fuchsia'));
      return true;
    } else {
      return false;
    }
  }

  //Comprobamos si hay alguna linea
  if (areEqual(buttons[0], buttons[1], buttons[2])) {
    victoryPosition = 1;
  } else if (areEqual(buttons[3], buttons[4], buttons[5])) {
    victoryPosition = 2;
  } else if (areEqual(buttons[6], buttons[7], buttons[8])) {
    victoryPosition = 3;
  } else if (areEqual(buttons[0], buttons[3], buttons[6])) {
    victoryPosition = 4;
  } else if (areEqual(buttons[1], buttons[4], buttons[7])) {
    victoryPosition = 5;
  } else if (areEqual(buttons[2], buttons[5], buttons[8])) {
    victoryPosition = 6;
  } else if (areEqual(buttons[0], buttons[4], buttons[8])) {
    victoryPosition = 7;
  } else if (areEqual(buttons[2], buttons[4], buttons[6])) {
    victoryPosition = 8;
  }

  //Comprobamos quien ha ganado
  if (victoryPosition > 0) {
    if (turn == 1) {
      sState = 1;
    } else {
      sState = -1;
    }
  }

  return sState;
}

function ia() {
  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let values = buttons.map((x) => x.innerHTML);
  let pos = -1;

  if (values[4] == '') {
    pos = 4;
  } else {
    let n = aleatorio(0, buttons.length - 1);
    while (values[n] != '') {
      n = aleatorio(0, buttons.length - 1);
    }
    pos = n;
  }

  buttons[pos].innerHTML = `<img src="./assets/images/Imagen1.png">`;
  return pos;
}
