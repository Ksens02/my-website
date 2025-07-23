// --- Classic Tetris Game for Modal ---

const COLS = 10, ROWS = 20, BLOCK = 36; // Slightly larger blocks
const SHAPES = [
  // I
  [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  // J
  [
    [1,0,0],
    [1,1,1],
    [0,0,0]
  ],
  // L
  [
    [0,0,1],
    [1,1,1],
    [0,0,0]
  ],
  // O
  [
    [1,1],
    [1,1]
  ],
  // S
  [
    [0,1,1],
    [1,1,0],
    [0,0,0]
  ],
  // T
  [
    [0,1,0],
    [1,1,1],
    [0,0,0]
  ],
  // Z
  [
    [1,1,0],
    [0,1,1],
    [0,0,0]
  ]
];
const COLORS = [
  '#00ffff', // I
  '#0000ff', // J
  '#ffa500', // L
  '#ffff00', // O
  '#00ff00', // S
  '#a020f0', // T
  '#ff0000'  // Z
];

let tetrisCanvas, tetrisCtx, tetrisScoreElem, tetrisAgainBtn, tetrisCloseBtn;
let tetrisBoard, tetrisPiece, tetrisScore, tetrisGameOverFlag, tetrisInterval, tetrisDropSpeed, tetrisRound;

function tetrisInitModal() {
  tetrisCanvas = document.getElementById("tetris-canvas");
  tetrisCtx = tetrisCanvas.getContext("2d");
  tetrisScoreElem = document.getElementById("tetris-score");
  tetrisAgainBtn = document.getElementById("tetris-again");
  tetrisCloseBtn = document.getElementById("tetris-close");

  document.querySelector('#tetris-game').onclick = function(e) {
    e.preventDefault();
    document.getElementById("tetris-modal").style.display = "flex";
    tetrisStartGame();
  };
  tetrisCloseBtn.onclick = function() {
    document.getElementById("tetris-modal").style.display = "none";
    tetrisStopGame();
  };
  tetrisAgainBtn.onclick = function() {
    tetrisStartGame();
  };
  window.addEventListener("keydown", tetrisKeyHandler);
}
if (document.readyState !== "loading") tetrisInitModal();
else document.addEventListener("DOMContentLoaded", tetrisInitModal);

function tetrisStartGame() {
  tetrisBoard = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  tetrisScore = 0;
  tetrisRound = 1;
  tetrisGameOverFlag = false;
  tetrisDropSpeed = 500;
  tetrisScoreElem.textContent = `Score: 0  Round: 1`;
  tetrisAgainBtn.style.display = "none";
  tetrisNewPiece();
  if (tetrisInterval) clearInterval(tetrisInterval);
  tetrisInterval = setInterval(tetrisGameLoop, tetrisDropSpeed);
  tetrisDraw();
}

function tetrisStopGame() {
  if (tetrisInterval) clearInterval(tetrisInterval);
}

function tetrisNewPiece() {
  const id = Math.floor(Math.random()*SHAPES.length);
  const shape = SHAPES[id];
  tetrisPiece = {
    shape: shape,
    color: COLORS[id],
    x: Math.floor(COLS/2) - Math.ceil(shape[0].length/2),
    y: 0
  };
  if (!tetrisValidMove(tetrisPiece.shape, tetrisPiece.x, tetrisPiece.y)) {
    tetrisGameOver();
  }
}

function tetrisDraw() {
  tetrisCtx.clearRect(0,0, tetrisCanvas.width, tetrisCanvas.height);
  // Draw board
  for (let r=0; r<ROWS; r++) for (let c=0; c<COLS; c++) {
    if (tetrisBoard[r][c]) tetrisDrawBlock(c, r, tetrisBoard[r][c]);
  }
  // Draw current piece
  if (tetrisPiece) {
    for (let r=0; r<tetrisPiece.shape.length; r++)
      for (let c=0; c<tetrisPiece.shape[r].length; c++)
        if (tetrisPiece.shape[r][c])
          tetrisDrawBlock(tetrisPiece.x + c, tetrisPiece.y + r, tetrisPiece.color);
  }
}

function tetrisDrawBlock(x, y, color) {
  tetrisCtx.fillStyle = color;
  tetrisCtx.fillRect(x*BLOCK, y*BLOCK, BLOCK, BLOCK);
  tetrisCtx.strokeStyle = "#232946";
  tetrisCtx.strokeRect(x*BLOCK, y*BLOCK, BLOCK, BLOCK);
}

function tetrisKeyHandler(e) {
  if (!tetrisPiece || tetrisGameOverFlag || document.getElementById("tetris-modal").style.display !== "flex") return;
  if (["ArrowLeft","ArrowRight","ArrowDown","ArrowUp"," "].includes(e.key)) e.preventDefault();
  if (e.key === "ArrowLeft") tetrisMove(-1,0);
  if (e.key === "ArrowRight") tetrisMove(1,0);
  if (e.key === "ArrowDown") tetrisMove(0,1);
  if (e.key === "ArrowUp") tetrisRotate();
  if (e.key === " ") { while(tetrisMove(0,1)); tetrisLock(); }
}

function tetrisMove(dx, dy) {
  if (tetrisValidMove(tetrisPiece.shape, tetrisPiece.x + dx, tetrisPiece.y + dy)) {
    tetrisPiece.x += dx;
    tetrisPiece.y += dy;
    tetrisDraw();
    return true;
  } else if (dy === 1) {
    tetrisLock();
    return false;
  }
  return false;
}

function tetrisValidMove(shape, x, y) {
  for (let r=0; r<shape.length; r++) for (let c=0; c<shape[r].length; c++) {
    if (shape[r][c]) {
      let newX = x + c, newY = y + r;
      if (newX < 0 || newX >= COLS || newY < 0 || newY >= ROWS) return false;
      if (tetrisBoard[newY][newX]) return false;
    }
  }
  return true;
}

function tetrisRotate() {
  const N = tetrisPiece.shape.length;
  let newShape = Array.from({length: N}, () => Array(N).fill(0));
  for (let r=0; r<N; r++) for (let c=0; c<N; c++) {
    newShape[c][N-1-r] = tetrisPiece.shape[r][c];
  }
  if (tetrisValidMove(newShape, tetrisPiece.x, tetrisPiece.y)) {
    tetrisPiece.shape = newShape;
    tetrisDraw();
  }
}

function tetrisLock() {
  for (let r=0; r<tetrisPiece.shape.length; r++)
    for (let c=0; c<tetrisPiece.shape[r].length; c++)
      if (tetrisPiece.shape[r][c])
        tetrisBoard[tetrisPiece.y + r][tetrisPiece.x + c] = tetrisPiece.color;
  tetrisClearLines();
  tetrisNewPiece();
}

function tetrisClearLines() {
  let lines = 0;
  for (let r=ROWS-1; r>=0; r--) {
    if (tetrisBoard[r].every(cell => cell)) {
      tetrisBoard.splice(r,1);
      tetrisBoard.unshift(Array(COLS).fill(0));
      lines++;
      r++;
    }
  }
  if (lines) {
    tetrisScore += lines * 100;
    // Update round based on score
    let newRound = Math.floor(tetrisScore / 500) + 1;
    if (newRound !== tetrisRound) {
      tetrisRound = newRound;
      tetrisDropSpeed = Math.max(100, 500 - (tetrisRound-1)*50);
      clearInterval(tetrisInterval);
      tetrisInterval = setInterval(tetrisGameLoop, tetrisDropSpeed);
    }
    tetrisScoreElem.textContent = `Score: ${tetrisScore}  Round: ${tetrisRound}`;
  }
}

function tetrisGameLoop() {
  if (!tetrisPiece || tetrisGameOverFlag) return;
  tetrisMove(0,1);
}

function tetrisGameOver() {
  tetrisGameOverFlag = true;
  clearInterval(tetrisInterval);
  tetrisCtx.fillStyle = "rgba(0,0,0,0.7)";
  tetrisCtx.fillRect(0,0, tetrisCanvas.width, tetrisCanvas.height);
  tetrisCtx.fillStyle = "#ff6b6b";
  tetrisCtx.font = "bold 32px Arial";
  tetrisCtx.textAlign = "center";
  tetrisCtx.fillText("GAME OVER", tetrisCanvas.width/2, tetrisCanvas.height/2);
  tetrisAgainBtn.style.display = "block";
}