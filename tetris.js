// Constants
const GRID_WIDTH = 12;
const GRID_HEIGHT = 24;
const BLOCK_SIZE = 35;
const WINDOW_WIDTH = GRID_WIDTH * BLOCK_SIZE;
const WINDOW_HEIGHT = GRID_HEIGHT * BLOCK_SIZE;

const SHAPES = {
    'I': [[0, 1], [1, 1], [2, 1], [3, 1]],
    'O': [[0, 0], [0, 1], [1, 0], [1, 1]],
    'T': [[0, 1], [1, 0], [1, 1], [2, 1]],
    'L': [[0, 0], [1, 0], [2, 0], [2, 1]],
    'J': [[0, 1], [1, 1], [2, 1], [2, 0]],
    'S': [[1, 0], [2, 0], [0, 1], [1, 1]],
    'Z': [[0, 0], [1, 0], [1, 1], [2, 1]]
};

const COLORS = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'L': 'orange',
    'J': 'blue',
    'S': 'green',
    'Z': 'red'
};

class Tetris {
    constructor(containerId) {
        this.containerId = containerId;
        this.score = 0;
        this.round = 1;
        this.speed = 500;
        this.lastScore = 0;
        this.grid = Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(null));
        this.running = true;
        this.paused = false;
        this.currentPiece = null;
        this.gameState = 'welcome';
        
        this.setupCanvas();
        this.setupControls();
        this.bindKeys();
        this.showWelcomeScreen();
    }

    setupCanvas() {
        const container = document.getElementById(this.containerId);
        
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.width = WINDOW_WIDTH;
        this.canvas.height = WINDOW_HEIGHT;
        this.canvas.style.border = '2px solid #333';
        this.canvas.style.backgroundColor = 'black';
        this.canvas.style.display = 'block';
        this.canvas.style.margin = '0 auto';
        container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
    }

    setupControls() {
        const container = document.getElementById(this.containerId);
        
        // Create control panel
        this.controlPanel = document.createElement('div');
        this.controlPanel.style.marginTop = '10px';
        this.controlPanel.style.textAlign = 'center';
        container.appendChild(this.controlPanel);

        // Pause and Play buttons
        this.pauseButton = document.createElement('button');
        this.pauseButton.textContent = 'Pause';
        this.pauseButton.onclick = () => this.togglePause();
        this.controlPanel.appendChild(this.pauseButton);

        this.playButton = document.createElement('button');
        this.playButton.textContent = 'Play';
        this.playButton.onclick = () => this.togglePause();
        this.controlPanel.appendChild(this.playButton);

        // Score and round label
        this.scoreLabel = document.createElement('span');
        this.scoreLabel.style.marginLeft = '20px';
        this.scoreLabel.style.fontSize = '14px';
        this.scoreLabel.style.fontFamily = 'Arial';
        this.scoreLabel.textContent = `Score: ${this.score}  Round: ${this.round}`;
        this.controlPanel.appendChild(this.scoreLabel);
    }

    showWelcomeScreen() {
        this.gameState = 'welcome';
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Welcome to Tetris!', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 - 50);
        
        // Create play button
        this.playGameButton = document.createElement('button');
        this.playGameButton.textContent = 'Play Game';
        this.playGameButton.style.fontSize = '16px';
        this.playGameButton.style.padding = '10px 20px';
        this.playGameButton.style.marginTop = '20px';
        this.playGameButton.onclick = () => this.startGame();
        this.controlPanel.appendChild(this.playGameButton);
    }

    startGame() {
        this.gameState = 'playing';
        this.controlPanel.removeChild(this.playGameButton);
        
        // Reset game state
        this.score = 0;
        this.round = 1;
        this.speed = 500;
        this.lastScore = 0;
        this.grid = Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(null));
        this.running = true;
        this.paused = false;
        
        this.spawnPiece();
        this.updateGame();
    }

    togglePause() {
        this.paused = !this.paused;
        if (!this.paused) {
            this.updateGame();
        }
    }

    spawnPiece() {
        const shapes = Object.keys(SHAPES);
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const newCoords = SHAPES[shape].map(([x, y]) => [x + Math.floor(GRID_WIDTH / 2), y]);

        // Check if the new piece collides with existing blocks
        if (newCoords.some(([x, y]) => this.grid[y] && this.grid[y][x] !== null)) {
            this.gameOver();
            return;
        }

        this.currentPiece = {
            shape: shape,
            color: COLORS[shape],
            coords: newCoords
        };
        this.drawPiece();
    }

    drawPiece() {
        // Clear canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

        // Draw current piece
        if (this.currentPiece) {
            this.ctx.fillStyle = this.currentPiece.color;
            for (const [x, y] of this.currentPiece.coords) {
                this.ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                this.ctx.strokeStyle = '#333';
                this.ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }

        // Draw locked pieces
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                if (this.grid[y][x]) {
                    this.ctx.fillStyle = this.grid[y][x];
                    this.ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    this.ctx.strokeStyle = '#333';
                    this.ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }

    moveLeft() {
        if (this.paused || this.gameState !== 'playing') return;
        
        if (this.currentPiece.coords.every(([x, y]) => x > 0)) {
            this.currentPiece.coords = this.currentPiece.coords.map(([x, y]) => [x - 1, y]);
            this.drawPiece();
        }
    }

    moveRight() {
        if (this.paused || this.gameState !== 'playing') return;
        
        if (this.currentPiece.coords.every(([x, y]) => x < GRID_WIDTH - 1)) {
            this.currentPiece.coords = this.currentPiece.coords.map(([x, y]) => [x + 1, y]);
            this.drawPiece();
        }
    }

    moveDown(event) {
        if (this.paused || this.gameState !== 'playing') return;
        
        if (this.currentPiece.coords.every(([x, y]) => 
            y < GRID_HEIGHT - 1 && (!this.grid[y + 1] || this.grid[y + 1][x] === null))) {
            this.currentPiece.coords = this.currentPiece.coords.map(([x, y]) => [x, y + 1]);
            this.drawPiece();
        } else {
            this.lockPiece();
            this.clearRows();
            this.spawnPiece();
        }
    }

    rotatePiece() {
        if (this.paused || this.gameState !== 'playing') return;
        
        const [cx, cy] = this.currentPiece.coords[0];
        const newCoords = this.currentPiece.coords.map(([x, y]) => [
            cx - (y - cy),
            cy + (x - cx)
        ]);
        
        if (newCoords.every(([x, y]) => 
            x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT && 
            (y < 0 || !this.grid[y] || this.grid[y][x] === null))) {
            this.currentPiece.coords = newCoords;
            this.drawPiece();
        }
    }

    lockPiece() {
        for (const [x, y] of this.currentPiece.coords) {
            this.grid[y][x] = this.currentPiece.color;
        }
        this.clearRows();
    }

    clearRows() {
        const fullRows = [];
        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i].every(cell => cell !== null)) {
                fullRows.push(i);
            }
        }

        // Add 100 points for each full row
        for (const rowIndex of fullRows) {
            this.score += 100;
        }

        // Shift the grid down for each full row
        for (const rowIndex of fullRows) {
            this.grid.splice(rowIndex, 1);
            this.grid.unshift(Array(GRID_WIDTH).fill(null));
        }

        this.drawPiece();
    }

    updateGame() {
        if (this.running && !this.paused && this.gameState === 'playing') {
            this.moveDown();

            // Increase round only when score crosses multiples of 500
            if (Math.floor(this.score / 500) > Math.floor(this.lastScore / 500)) {
                this.round += 1;
                this.lastScore = this.score;
                this.speed = Math.max(100, this.speed - 50);
            }

            // Update score and round display
            this.scoreLabel.textContent = `Score: ${this.score}  Round: ${this.round}`;

            // Continue the game loop
            setTimeout(() => this.updateGame(), this.speed);
        }
    }

    gameOver() {
        this.gameState = 'gameOver';
        this.running = false;
        
        this.ctx.fillStyle = 'red';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        
        this.scoreLabel.textContent = `Score: ${this.score}  Round: ${this.round}  Game Over!`;
        
        this.showGameOverPopup();
    }

    showGameOverPopup() {
        // Create popup container
        this.popup = document.createElement('div');
        this.popup.style.position = 'fixed';
        this.popup.style.top = '50%';
        this.popup.style.left = '50%';
        this.popup.style.transform = 'translate(-50%, -50%)';
        this.popup.style.backgroundColor = 'white';
        this.popup.style.padding = '20px';
        this.popup.style.border = '2px solid #333';
        this.popup.style.borderRadius = '10px';
        this.popup.style.textAlign = 'center';
        this.popup.style.zIndex = '1000';
        document.body.appendChild(this.popup);

        // Game over message
        const message = document.createElement('div');
        message.textContent = `Game Over! Score: ${this.score}`;
        message.style.fontSize = '16px';
        message.style.fontFamily = 'Arial';
        message.style.marginBottom = '20px';
        this.popup.appendChild(message);

        // Play Again button
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';
        playAgainButton.style.marginRight = '10px';
        playAgainButton.onclick = () => this.restartGame();
        this.popup.appendChild(playAgainButton);

        // Exit button
        const exitButton = document.createElement('button');
        exitButton.textContent = 'Exit';
        exitButton.onclick = () => this.exitGame();
        this.popup.appendChild(exitButton);
    }

    restartGame() {
        // Remove popup
        if (this.popup) {
            document.body.removeChild(this.popup);
            this.popup = null;
        }

        // Reset game state
        this.score = 0;
        this.round = 1;
        this.speed = 500;
        this.lastScore = 0;
        this.grid = Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(null));
        this.running = true;
        this.paused = false;
        this.gameState = 'playing';
        
        this.spawnPiece();
        this.updateGame();
    }

    exitGame() {
        // Remove popup
        if (this.popup) {
            document.body.removeChild(this.popup);
            this.popup = null;
        }
        
        // Clear canvas and show welcome screen
        this.showWelcomeScreen();
    }

    bindKeys() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    this.moveLeft();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.moveRight();
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.moveDown();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.rotatePiece();
                    break;
            }
        });
    }
}