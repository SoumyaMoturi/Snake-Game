let dx = -20;
let dy = 0;
let food_x;
let score = 0;
let food_y;
let change_movement_direction = false;
let snake = [
  { x: 300, y: 300 },
  { x: 320, y: 300 },
  { x: 340, y: 300 },
  { x: 360, y: 300 },
  { x: 380, y: 300 },
];

const gameBoard = document.getElementById('gameBoard');
const ctx = gameBoard.getContext('2d');

document.getElementById('btn').addEventListener('click', () => {
  start();
  food_generation();
  document.getElementById('btn').disabled = true;
  document.addEventListener('keydown', change_snake_directions);
});

function start() {
  if (failing_conditions()) {
    //console.log("failed");
    document.getElementById('gameEnd').innerHTML = 'Game Over';
    return;
  }
  change_movement_direction = false;
  if (score <= 3) {
    setTimeout(function () {
      emptyBoard();
      make_food();
      snakeMovement();
      buildSnake();
      start();
    }, 800);
  } else if (score <= 8) {
    setTimeout(function () {
      emptyBoard();
      make_food();
      snakeMovement();
      buildSnake();
      start();
    }, 500);
  } else if (score <= 12) {
    setTimeout(function () {
      emptyBoard();
      make_food();
      snakeMovement();
      buildSnake();
      start();
    }, 250);
  } else {
    setTimeout(function () {
      emptyBoard();
      make_food();
      snakeMovement();
      buildSnake();
      start();
    }, 175);
  }
}
//function display(){
//console.log("event listener working");
//}

function emptyBoard() {
  ctx.fillStyle = '#8da6a0';
  ctx.strokestyle = 'white';
  ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
  ctx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

function buildSnakeParts(snakePart) {
  ctx.fillStyle = 'rgba(0,135,147)';
  ctx.strokestyle = 'white';
  ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
  ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}
function buildSnake() {
  snake.forEach(buildSnakeParts);
}

function snakeMovement() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (snake[0].x === food_x && snake[0].y === food_y) {
    score++;
    document.getElementById('score').innerHTML = 'Score : ' + score;
    food_generation();
  } else snake.pop();
}
function change_snake_directions(event) {
  if (change_movement_direction) return;

  change_movement_direction = true;
  //left arrow 37
  //up arrow 38
  //right arrow 39
  //down arrow 40
  const left = 37;
  const right = 39;
  const up = 38;
  const down = 40;

  const keyPressed = event.keyCode;
  const moveUp = dy === -20;
  const moveDown = dy === 20;
  const moveLeft = dx === -20;
  const moveRight = dx === 20;

  if (keyPressed === right && !moveLeft) {
    dy = 0;
    dx = 20;
    //console.log('Right Key');
  }
  if (keyPressed === left && !moveRight) {
    dy = 0;
    dx = -20;
    //console.log('Left Key');
  }
  if (keyPressed === up && !moveDown) {
    dx = 0;
    dy = -20;
    //console.log('Up Key');
  }
  if (keyPressed === down && !moveUp) {
    dx = 0;
    dy = 20;
    //console.log('Down Key');
  }
}
function failing_conditions() {
  for (let i = 3; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  return (
    snake[0].x <= 0 ||
    snake[0].x >= gameBoard.width ||
    snake[0].y <= 0 ||
    snake[0].y >= gameBoard.height
  );
}

function make_food() {
  ctx.fillStyle = '#b52d53';
  ctx.strokestyle = 'black';
  // ctx.fillRect(food_x, food_y, 20, 20);
  // ctx.strokeRect(food_x, food_y, 20, 20);
  ctx.beginPath();
  ctx.arc(food_x + 10, food_y + 10, 8, 0, 360);
  ctx.fill();
  ctx.stroke();
}

function food_generation() {
  let ate;
  food_x = Math.round((Math.random() * (gameBoard.width - 40)) / 20) * 20;
  food_y = Math.round((Math.random() * (gameBoard.height - 40)) / 20) * 20;
  //console.log(food_x,food_y);
  snake.forEach(function food_consumed(snakepart) {
    if (snakepart.x == food_x && snakepart.y == food_y) ate = true;
    if (ate) food_generation();
  });
}
