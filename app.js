function SaveNameLS() {
  let id = document.getElementById('gamer').value;
  // console.log(id);
  localStorage.setItem('Jugador', id);
}
