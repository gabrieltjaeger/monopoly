const websocket = new WebSocket('ws://34.176.41.79:8081/game');

websocket.onmessage = (event) => {
  // Parse the JSON message received from the server
  const data = JSON.parse(event.data);
  
  if (data.type === 'admin') {
    console.log('You are now an admin');
  }

}

websocket.onopen = () => {
  // Send a message to the server to join the game
  websocket.send(JSON.stringify({
    type: 'join-game',
    name: prompt('What is your name?'),
  }));
}

function handleClick(event) {
  // Send a message to the server to make a move
  console.log(event.target.dataset.x, event.target.dataset.y);
  
}

// Function to detect what cell was clicked
function getCell(event) {
  // Get the cell that was clicked
  const cell = event.target;
  if (cell.classList.contains('cell')) {
    // Get the cell's id
    const cellId = cell.id;
    // cellId is in the format 'cell-x-y', so we need to split it to get the x and y coordinates
    const cellCoordinates = cellId.split('-');

    websocket.send(JSON.stringify({
      type: 'make-move',
      x: cellCoordinates[1],
      y: cellCoordinates[2],
    }));
  }
}

// make the getCell function run when a cell is clicked. A Cell is an HTML element with the class 'cell'
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', getCell);
});

