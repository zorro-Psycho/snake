let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    scoreBlock = document.getElementById('score'),
    scoreCount = 0,
    bestScoreBlock = document.getElementById('best-score'),
    dir = '', // snake direction
    diff = 'Easy', // difficulty
    diffBlock = document.getElementById('difficulty'),
    btnChange = document.getElementById('changeDif');

const config = { // General setting
  sizeCell: 24,
  sizeFood: 24,
  step: 0,
  stepMax: 7,
}

const snake = { // Snake settings
  x: config.sizeCell,
  y: config.sizeCell,
  dirX: 0, // direction X
  dirY: 0, // direction Y
  body: [],
  maxBodySize: 1,
}
const snakeSkins = [ // array snake skins
  './img/snake/head.svg',
];
const snakeImages = [
  imgHead = new Image(),
];
for (let i = 0; i < snakeImages.length; i++) {
  snakeImages[i].src = snakeSkins[i];
}

const food = { // food settings
  x: randomInt(0, canvas.width / config.sizeCell) * config.sizeCell,
  y: randomInt(0, canvas.height / config.sizeCell) * config.sizeCell,
}
const images = [ // array with images path
  './img/food/apple.svg',
  './img/food/carrot.svg',
  './img/food/eggplant.svg',
  './img/food/banana.svg',
];
let img = new Image();
img.src = images[0]; // the default will be the first image

const bomb = { // bomb settings
  x: -config.sizeCell, // the default bomb will be hidden
  y: -config.sizeCell,
};
const bombImg = new Image();
bombImg.src = './img/food/bomb.svg';

const audio = [ // array with audio
  './audio/eat.mp3',
  './audio/turn.mp3',
  './audio/dead.mp3',
  './audio/hit.mp3',
];
const audioNames = [
  audioEat = new Audio(),
  audioTurn = new Audio(),
  audioDead = new Audio(),
  audioHit = new Audio(),
];
for (let i = 0; i < audio.length; i++) {
  audioNames[i].src = audio[i];
}

window.addEventListener('load', (e) => {
  if (window.innerWidth <= 650) {
    canvas.width = 300;
    canvas.height = 300;
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    config.sizeCell = 15;
    config.sizeFood = 15;
    canvas.style = 'background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSJibGFjayIvPgo8Y2lyY2xlIGN4PSI3LjUiIGN5PSI3LjUiIHI9IjIuNSIgZmlsbD0iIzUxNDk0OSIvPgo8L3N2Zz4K");';
    restart();
  } else if (window.innerWidth > 650) {
    canvas.width = 600;
    canvas.height = 480;
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    config.sizeCell = 24;
    config.sizeFood = 24;
    canvas.style = 'background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJibGFjayIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSIjNTE0OTQ5Ii8+Cjwvc3ZnPgo=");';
    restart();
  }
});
// 2048 game code (insert this part in your game initialization code)

// 2048 game code (insert this part in your game initialization code)





window.addEventListener('resize', (e) => {
  if (window.innerWidth <= 650) {
    canvas.width = 300;
    canvas.height = 300;
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    config.sizeCell = 15;
    config.sizeFood = 15;
    canvas.style = 'background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSJibGFjayIvPgo8Y2lyY2xlIGN4PSI3LjUiIGN5PSI3LjUiIHI9IjIuNSIgZmlsbD0iIzUxNDk0OSIvPgo8L3N2Zz4K");';
  } else if (window.innerWidth > 650) {
    canvas.width = 600;
    canvas.height = 480;
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    config.sizeCell = 24;
    config.sizeFood = 24;
    canvas.style = 'background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJibGFjayIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSIjNTE0OTQ5Ii8+Cjwvc3ZnPgo=");';
  }
});

function score() {
  scoreCount++;
  bestScore();
  if (scoreCount > 15) config.stepMax = 5;
  else if (scoreCount < 15) config.stepMax = 7;
  drawScore();
}

function bestScore() {
  let bestScore = +localStorage.getItem('best-score');
  bestScoreBlock.innerHTML = bestScore;
  if (scoreCount > bestScore) {
    bestScore = scoreCount;
    bestScoreBlock.innerHTML = bestScore;
    localStorage.setItem('best-score', bestScore);
  }
}

function drawScore() {
  scoreBlock.innerHTML = scoreCount;
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (++config.step < config.stepMax) return;
  config.step = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, food.x, food.y, config.sizeFood, config.sizeFood);
  ctx.drawImage(bombImg, bomb.x, bomb.y, config.sizeFood, config.sizeFood);
  drawSnake();
}
requestAnimationFrame(gameLoop);

function drawSnake() {
  snake.x += snake.dirX;
  snake.y += snake.dirY;
  eatTail();
  snake.body.unshift({ x: snake.x, y: snake.y });
  if (snake.body.length > snake.maxBodySize) {
    snake.body.pop();
  }
  snake.body.forEach((el, i) => {
    if (i == 0) ctx.drawImage(imgHead, el.x, el.y, config.sizeCell, config.sizeCell);
    else {
      ctx.fillStyle = '#A9A9A9';
      ctx.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);
    }
  });
  if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
    gameOver();
  }
  if (snake.x == food.x && snake.y == food.y) {
    snake.maxBodySize++;
    score();
    audioEat.play();
    randomPosition();
  }
  if (snake.x == bomb.x && snake.y == bomb.y) {
    gameOver();
  }
}

function eatTail() {
  for (let i = 1; i < snake.body.length; i++) {
    if (snake.body[i].x == snake.x && snake.body[i].y == snake.y) {
      gameOver();
    }
  }
}

function randomPosition() {
  food.x = randomInt(0, canvas.width / config.sizeFood) * config.sizeFood;
  food.y = randomInt(0, canvas.height / config.sizeFood) * config.sizeFood;
  if (scoreCount > 10 && scoreCount < 20) {
    bomb.x = randomInt(0, canvas.width / config.sizeFood) * config.sizeFood;
    bomb.y = randomInt(0, canvas.height / config.sizeFood) * config.sizeFood;
  } else if (scoreCount < 10 || scoreCount > 20) {
    bomb.x = -config.sizeFood;
    bomb.y = -config.sizeFood;
  }
  img.src = images[randomInt(0, images.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

btnChange.addEventListener('click', (e) => {
  if (diff == 'Easy') {
    diff = 'Hard';
    config.stepMax = 3;
  } else if (diff == 'Hard') {
    diff = 'Easy';
    config.stepMax = 7;
  }
  diffBlock.innerHTML = diff;
});

window.addEventListener('keydown', (e) => {
  if (e.code == 'ArrowLeft' && dir != 'right') {
    snake.dirX = -config.sizeCell;
    snake.dirY = 0;
    dir = 'left';
    audioTurn.play();
  }
  if (e.code == 'ArrowUp' && dir != 'down') {
    snake.dirX = 0;
    snake.dirY = -config.sizeCell;
    dir = 'up';
    audioTurn.play();
  }
  if (e.code == 'ArrowRight' && dir != 'left') {
    snake.dirX = config.sizeCell;
    snake.dirY = 0;
    dir = 'right';
    audioTurn.play();
  }
  if (e.code == 'ArrowDown' && dir != 'up') {
    snake.dirX = 0;
    snake.dirY = config.sizeCell;
    dir = 'down';
    audioTurn.play();
  }
  if (e.code == 'Space') restart();
});

function gameOver() {
  snake.dirX = 0;
  snake.dirY = 0;
  audioDead.play();
  postScore(scoreCount);
  restart();
}

function restart() {
  scoreCount = 0;
  drawScore();
  snake.x = config.sizeCell;
  snake.y = config.sizeCell;
  snake.body = [];
  snake.maxBodySize = 1;
  dir = '';
  randomPosition();
}

function postScore(score) {
  parent.postMessage({ type: 'submit-score', score: score }, '*');
}
