// DOM Elements
const gameContainer = document.getElementById('game-container');
const duckling = document.getElementById('duckling');
const scoreBoard = document.getElementById('score-board');
const powerBoard = document.getElementById('power-board');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const gameInstructions = document.getElementById('game-instructions');

// Game State
let score = 0;
let power = 0;
let isJumping = false;
let isGameRunning = false; // Tracks if the game is active or paused/not started
let gameSpeed = 3;
let speedIncreaseInterval = 15000; // Increase speed every 15 seconds
let lastSpeedIncreaseTime = 0;

// Game Loop Variables
let gameLoopInterval;
let wormSpawnInterval;

const DUCKLING_HEIGHT = 60; // px
const GAME_HEIGHT = 500; // Fixed game height from CSS
const GROUND_LEVEL = 0;
const JUMP_HEIGHT = 180;
const JUMP_DURATION = 600;

// Worm Types Definition
const WORM_TYPES = [
    { type: 'regular', color: '#FF69B4', powerValue: 1, scoreValue: 10, spawnChance: 0.6 }, // Hot Pink
    { type: 'bonus', color: '#ADD8E6', powerValue: 2, scoreValue: 25, spawnChance: 0.3 },   // Light Blue
    { type: 'super', color: '#FFD700', powerValue: 5, scoreValue: 50, spawnChance: 0.1 }    // Gold
];

// --- Game Initialization & Control ---
function startGame() {
    score = 0;
    power = 0;
    isJumping = false;
    isGameRunning = true;
    gameSpeed = 3; // Reset speed
    lastSpeedIncreaseTime = Date.now();
    duckling.style.bottom = GROUND_LEVEL + 'px';
    updateScoreDisplay();
    updatePowerDisplay();
    
    messageBox.classList.add('hidden');
    gameInstructions.classList.add('hidden');

    document.querySelectorAll('.worm').forEach(el => el.remove());

    clearInterval(gameLoopInterval);
    clearInterval(wormSpawnInterval);

    gameLoopInterval = setInterval(gameLoop, 20);
    wormSpawnInterval = setInterval(spawnWorm, 2000 / (gameSpeed / 2));
    console.log("Game Started. Initial Speed:", gameSpeed);
}

function pauseGame(message = "Game Paused", showScore = true) {
    if (!isGameRunning) return;
    isGameRunning = false;
    clearInterval(gameLoopInterval);
    clearInterval(wormSpawnInterval);

    messageText.textContent = message;
    if (showScore) {
        finalScoreDisplay.textContent = `Current Score: ${score} | Power: ${power}`;
    } else {
        finalScoreDisplay.textContent = "";
    }
    restartButton.textContent = "Resume Game";
    messageBox.classList.remove('hidden');
    gameInstructions.classList.remove('hidden');
    console.log("Game Paused");
}

function resumeGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    messageBox.classList.add('hidden');
    gameInstructions.classList.add('hidden');
    
    lastSpeedIncreaseTime = Date.now();

    clearInterval(gameLoopInterval);
    clearInterval(wormSpawnInterval);
    gameLoopInterval = setInterval(gameLoop, 20);
    wormSpawnInterval = setInterval(spawnWorm, Math.max(500, 2000 / (gameSpeed / 2)));
    console.log("Game Resumed. Current Speed:", gameSpeed);
}


// --- Duckling Controls ---
function jump() {
    if (!isJumping && isGameRunning) {
        isJumping = true;
        let jumpStartTime = Date.now();

        function animateJump() {
            if (!isGameRunning && !isJumping) {
                duckling.style.bottom = GROUND_LEVEL + 'px';
                isJumping = false;
                return;
            }
            let elapsedTime = Date.now() - jumpStartTime;
            let progress = elapsedTime / JUMP_DURATION;

            if (progress < 1) {
                let currentHeight = GROUND_LEVEL + (-4 * JUMP_HEIGHT * progress * (progress - 1));
                duckling.style.bottom = Math.min(currentHeight, GAME_HEIGHT - DUCKLING_HEIGHT) + 'px';
                requestAnimationFrame(animateJump);
            } else {
                duckling.style.bottom = GROUND_LEVEL + 'px';
                isJumping = false;
            }
        }
        animateJump();
    }
}

// --- Spawning Elements ---
function spawnWorm() {
    if (!isGameRunning) return;

    const rand = Math.random();
    let cumulativeChance = 0;
    let selectedWormType = WORM_TYPES[0];

    for (const type of WORM_TYPES) {
        cumulativeChance += type.spawnChance;
        if (rand <= cumulativeChance) {
            selectedWormType = type;
            break;
        }
    }

    const worm = document.createElement('div');
    worm.classList.add('worm');
    worm.dataset.type = selectedWormType.type;
    worm.dataset.power = selectedWormType.powerValue;
    worm.dataset.score = selectedWormType.scoreValue;
    worm.style.backgroundColor = selectedWormType.color;
    
    const segment = worm.appendChild(document.createElement('div'));
    segment.style.width = '8px';
    segment.style.height = '8px';
    segment.style.backgroundColor = darkenColor(selectedWormType.color, 0.3);
    segment.style.borderRadius = '50%';
    segment.style.position = 'absolute';
    segment.style.left = '5px';

    worm.style.right = '-30px';
    const randomBottom = 10 + Math.random() * (JUMP_HEIGHT + 20);
    worm.style.bottom = randomBottom + 'px';
    gameContainer.appendChild(worm);
}

function darkenColor(hex, percent) {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.max(0, Math.floor(r * (1 - percent)));
    g = Math.max(0, Math.floor(g * (1 - percent)));
    b = Math.max(0, Math.floor(b * (1 - percent)));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}


// --- Movement & Collision ---
function moveElements() {
    if (!isGameRunning) return;

    document.querySelectorAll('.worm').forEach(worm => {
        let wormRight = parseFloat(worm.style.right);
        wormRight += gameSpeed;
        worm.style.right = wormRight + 'px';

        if (checkCollision(duckling, worm)) {
            const scoreValue = parseInt(worm.dataset.score);
            const powerValue = parseInt(worm.dataset.power);
            score += scoreValue;
            power += powerValue;
            updateScoreDisplay();
            updatePowerDisplay();
            worm.remove();
            showFeedback(`+${scoreValue}`, duckling.getBoundingClientRect(), worm.style.backgroundColor);
        }

        if (wormRight > gameContainer.clientWidth + 40) {
            worm.remove();
        }
    });
}

function showFeedback(text, position, color = '#FFD700') {
    const feedbackEl = document.createElement('div');
    feedbackEl.textContent = text;
    feedbackEl.style.position = 'absolute';
    const gameRect = gameContainer.getBoundingClientRect();
    feedbackEl.style.left = (position.left - gameRect.left + position.width / 2 - 15) + 'px';
    feedbackEl.style.top = (position.top - gameRect.top - 30) + 'px';
    feedbackEl.style.color = color;
    feedbackEl.style.fontSize = '1.5rem';
    feedbackEl.style.fontWeight = 'bold';
    feedbackEl.style.textShadow = '1px 1px 2px black';
    feedbackEl.style.transition = 'opacity 0.5s, transform 0.5s';
    feedbackEl.style.opacity = '1';
    feedbackEl.style.transform = 'translateY(0)';
    feedbackEl.style.zIndex = '300';
    gameContainer.appendChild(feedbackEl);

    setTimeout(() => {
        feedbackEl.style.opacity = '0';
        feedbackEl.style.transform = 'translateY(-20px)';
        setTimeout(() => feedbackEl.remove(), 500);
    }, 500);
}

function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

// --- Game Loop & State Management ---
function gameLoop() {
    if (!isGameRunning) return;
    moveElements();
    increaseSpeedOverTime();
}

function increaseSpeedOverTime() {
    if (Date.now() - lastSpeedIncreaseTime > speedIncreaseInterval) {
        gameSpeed += 0.3;
        lastSpeedIncreaseTime = Date.now();
        console.log("Game speed increased to: ", gameSpeed);

        clearInterval(wormSpawnInterval);
        wormSpawnInterval = setInterval(spawnWorm, Math.max(400, 2000 / (gameSpeed / 2)));
    }
}

function updateScoreDisplay() {
    scoreBoard.textContent = `Score: ${score}`;
}

function updatePowerDisplay() {
    powerBoard.textContent = `Power: ${power}`;
}

// --- Event Listeners ---
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        if (isGameRunning) {
            jump();
        }
    }
});

// Added for mobile touch support
gameContainer.addEventListener('touchstart', (event) => {
    // Prevent the default touch action (like scrolling or zooming)
    event.preventDefault();
    if (isGameRunning) {
        jump();
    }
});

// Added for mouse click support on desktop
gameContainer.addEventListener('click', (event) => {
     if (isGameRunning) {
        jump();
    }
});

restartButton.addEventListener('click', (event) => {
    // Stop the click from triggering a jump on the game container
    event.stopPropagation(); 
    if (isGameRunning) {
        // This case should not be hit due to button text logic
    } else {
        const currentButtonText = restartButton.textContent;
        if (currentButtonText.includes("Start New Game") || finalScoreDisplay.textContent.includes("Help the Duckling")) {
            startGame();
        } else { // Implies "Resume Game"
            resumeGame();
        }
    }
});

// Initial setup message
function showInitialMessage() {
    isGameRunning = false;
    messageText.textContent = "Ready for a Worm Feast?";
    finalScoreDisplay.textContent = "Help the Duckling Collect Worms!";
    restartButton.textContent = "Start New Game";
    messageBox.classList.remove('hidden');
    gameInstructions.classList.remove('hidden');
}

window.onload = () => {
    showInitialMessage();
};
