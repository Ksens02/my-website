// --- Classic Snake Game for Modal ---

const SNAKE_COLS = 17, SNAKE_ROWS = 15, SNAKE_SIZE = 50; // Larger size
let snakeCanvas, snakeCtx, snakeScoreElem, snakeAgainBtn, snakeCloseBtn;
let snake, snakeDir, snakeNextDir, snakeFood, snakeScore, snakeInterval, snakeGameOverFlag;

function snakeInitModal() {
  snakeCanvas = document.getElementById("snake-canvas");
  snakeCtx = snakeCanvas.getContext("2d");
  snakeScoreElem = document.getElementById("snake-score");
  snakeAgainBtn = document.getElementById("snake-again");
  snakeCloseBtn = document.getElementById("snake-close");

  document.querySelector('#snake-game .button').onclick = function(e) {
    e.preventDefault();
    document.getElementById("snake-modal").style.display = "flex";
    snakeStartGame();
  };
  snakeCloseBtn.onclick = function() {
    document.getElementById("snake-modal").style.display = "none";
    snakeStopGame();
  };
  snakeAgainBtn.onclick = function() {
    snakeStartGame();
  };
  window.addEventListener("keydown", snakeKeyHandler);
  const canvasWidth = SNAKE_COLS * SNAKE_SIZE;
  const canvasHeight = SNAKE_ROWS * SNAKE_SIZE;
  snakeCanvas.width = canvasWidth;
  snakeCanvas.height = canvasHeight;

  const bottomLayer = document.querySelector('.bottom-layer');
  bottomLayer.style.width = canvasWidth + 'px';
  // Let the content (canvas + controls bar) determine the height naturally.
  // bottomLayer.style.background = "#b3e0ff"; // light blue
}
if (document.readyState !== "loading") snakeInitModal();
else document.addEventListener("DOMContentLoaded", snakeInitModal);

function snakeStartGame() {
  snake = [{x: Math.floor(SNAKE_COLS/2), y: Math.floor(SNAKE_ROWS/2)}];
  snakeDir = {x: 1, y: 0};
  snakeNextDir = {x: 1, y: 0};
  snakeScore = 0;
  snakeGameOverFlag = false;
  snakePlaceFood();
  snakeScoreElem.textContent = `Score: 0`;
  snakeAgainBtn.style.display = "none";
  if (snakeInterval) clearInterval(snakeInterval);
  snakeInterval = setInterval(snakeGameLoop, 120);
  snakeDraw();
}

function snakeStopGame() {
  if (snakeInterval) clearInterval(snakeInterval);
}

function snakePlaceFood() {
  while (true) {
    let fx = Math.floor(Math.random() * SNAKE_COLS);
    let fy = Math.floor(Math.random() * SNAKE_ROWS);
    if (!snake.some(seg => seg.x === fx && seg.y === fy)) {
      snakeFood = {x: fx, y: fy};
      break;
    }
  }
}

function snakeDraw() {
  // Fill background black
  snakeCtx.fillStyle = "#000";
  snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  // Draw food
  snakeCtx.fillStyle = "#ffb86b";
  snakeCtx.fillRect(snakeFood.x*SNAKE_SIZE, snakeFood.y*SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
  // Draw snake
  for (let i=0; i<snake.length; i++) {
    snakeCtx.fillStyle = i === 0 ? "#00ffcc" : "#00d4ff";
    snakeCtx.fillRect(snake[i].x*SNAKE_SIZE, snake[i].y*SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
    snakeCtx.strokeStyle = "#232946";
    snakeCtx.strokeRect(snake[i].x*SNAKE_SIZE, snake[i].y*SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
  }
}

function snakeKeyHandler(e) {
  if (document.getElementById("snake-modal").style.display !== "flex" || snakeGameOverFlag) return;
  if (e.key === "ArrowLeft" && snakeDir.x !== 1)  snakeNextDir = {x: -1, y: 0};
  if (e.key === "ArrowRight" && snakeDir.x !== -1) snakeNextDir = {x: 1, y: 0};
  if (e.key === "ArrowUp" && snakeDir.y !== 1)    snakeNextDir = {x: 0, y: -1};
  if (e.key === "ArrowDown" && snakeDir.y !== -1) snakeNextDir = {x: 0, y: 1};
}

function snakeGameLoop() {
  if (snakeGameOverFlag) return;
  // Move snake
  snakeDir = snakeNextDir;
  const newHead = {x: snake[0].x + snakeDir.x, y: snake[0].y + snakeDir.y};
  // Check collision with wall
  if (newHead.x < 0 || newHead.x >= SNAKE_COLS || newHead.y < 0 || newHead.y >= SNAKE_ROWS) {
    snakeGameOver();
    return;
  }
  // Check collision with self
  if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
    snakeGameOver();
    return;
  }
  snake.unshift(newHead);
  // Check food
  if (newHead.x === snakeFood.x && newHead.y === snakeFood.y) {
    snakeScore += 1;
    snakeScoreElem.textContent = `Score: ${snakeScore}`;
    snakePlaceFood();
  } else {
    snake.pop();
  }
  snakeDraw();
}

function snakeGameOver() {
  snakeGameOverFlag = true;
  clearInterval(snakeInterval);
  snakeCtx.fillStyle = "rgba(0,0,0,0.7)";
  snakeCtx.fillRect(0,0, snakeCanvas.width, snakeCanvas.height);
  snakeCtx.fillStyle = "#ff6b6b";
  snakeCtx.font = "bold 32px Arial";
  snakeCtx.textAlign = "center";
  snakeCtx.fillText("GAME OVER", snakeCanvas.width/2, snakeCanvas.height/2);
  snakeAgainBtn.style.display = "block";
}