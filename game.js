/**
 * Languid Drive - Game Logic
 */

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const mainTimerEl = document.getElementById('main-timer');
const totalTimeEl = document.getElementById('total-time');
const cpCounterEl = document.getElementById('cp-counter');
const gameOverScreen = document.getElementById('game-over-screen');
const fadeOverlay = document.getElementById('fade-overlay');
const restartBtn = document.getElementById('restart-btn');

// Constants & State
const BASE_SPEED = 2;
const DECELERATION_TIME = 5000; // 5 seconds
const CHECKPOINT_INTERVAL = 15000; // 15 seconds

let state = {
    timer: 35.0,
    startTime: Date.now(),
    elapsedTime: 0,
    scrollSpeed: BASE_SPEED,
    isGameOver: false,
    playerX: 0,
    playerTargetX: 0,
    checkpoints: [],
    lastCheckpointSpawn: 0,
    frame: 0,
    distanceTravelled: 0,
    checkpointsCollected: 0,
    sleepStartTime: null,
    lastFrameTime: Date.now()
};

// Assets
const carImg = new Image();
carImg.src = 'assets/car.png';

const checkpointImg = new Image();
checkpointImg.src = 'assets/checkpoint.png';

// Setup Canvas size
function resize() {
    const container = document.getElementById('game-container');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = container.clientWidth * dpr;
    canvas.height = container.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    state.playerX = container.clientWidth / 2;
    state.playerTargetX = container.clientWidth / 2;
}

window.addEventListener('resize', resize);
resize();

// Input Handling
window.addEventListener('mousemove', (e) => {
    if (state.isGameOver) return;
    const rect = canvas.getBoundingClientRect();
    state.playerTargetX = e.clientX - rect.left;
});

function handleTouch(e) {
    if (state.isGameOver) return;
    // Prevent default scrolling/swipe-back on mobile
    if (e.cancelable) e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    state.playerTargetX = e.touches[0].clientX - rect.left;
}

window.addEventListener('touchstart', handleTouch, { passive: false });
window.addEventListener('touchmove', handleTouch, { passive: false });

window.addEventListener('keydown', (e) => {
    if (state.isGameOver) return;
    const moveSpeed = 40;
    if (e.key === 'ArrowLeft' || e.key === 'a') state.playerTargetX -= moveSpeed;
    if (e.key === 'ArrowRight' || e.key === 'd') state.playerTargetX += moveSpeed;
});

// Restart functionality
restartBtn.addEventListener('click', () => {
    location.reload();
});

// Game Loop
function update() {
    if (!state.isGameOver) {
        const now = Date.now();
        
        // True realtime delta
        const dt = (now - state.lastFrameTime) / 1000;
        state.lastFrameTime = now;
        
        state.elapsedTime = now - state.startTime;

        // True realtime timer countdown
        state.timer -= dt;
        if (state.timer <= 0) {
            state.timer = 0;
            triggerGameOver();
        }

        // Spawn checkpoints every 15s
        if (state.elapsedTime - state.lastCheckpointSpawn >= CHECKPOINT_INTERVAL) {
            spawnCheckpoint();
            state.lastCheckpointSpawn = state.elapsedTime;
        }

        // Continuous, constant speed player movement
        const fixedMoveSpeed = 2.5; // 一定の移動速度
        const dist = state.playerTargetX - state.playerX;
        if (Math.abs(dist) <= fixedMoveSpeed) {
            state.playerX = state.playerTargetX;
        } else {
            state.playerX += Math.sign(dist) * fixedMoveSpeed;
        }

        // Keep in bounds (restrict to road)
        const canvasW = canvas.width / (window.devicePixelRatio || 1);
        const roadW = canvasW * 0.8;
        const roadStartX = (canvasW - roadW) / 2;
        const carWidth = 36;
        const leftBound = roadStartX + carWidth / 2;
        const rightBound = roadStartX + roadW - carWidth / 2;
        
        state.playerTargetX = Math.max(leftBound, Math.min(rightBound, state.playerTargetX));
        state.playerX = Math.max(leftBound, Math.min(rightBound, state.playerX));

        // Update checkpoints
        for (let i = state.checkpoints.length - 1; i >= 0; i--) {
            const cp = state.checkpoints[i];
            cp.y += state.scrollSpeed;

            // Collision detection (AABB)
            const carW = 36;
            const carH = 64;
            const h = canvas.height / (window.devicePixelRatio || 1);
            const playerY = h - 150; // 少し上に上げる
            const carLeft = state.playerX - carW / 2;
            const carRight = state.playerX + carW / 2;
            const carTop = playerY - carH / 2;
            const carBottom = playerY + carH / 2;
            
            const cpWidth = carW * 1.5; // 54
            const cpHeight = 10;
            const cpLeft = cp.x - cpWidth / 2;
            const cpRight = cp.x + cpWidth / 2;
            const cpTop = cp.y - cpHeight / 2;
            const cpBottom = cp.y + cpHeight / 2;

            if (carRight > cpLeft && carLeft < cpRight && carBottom > cpTop && carTop < cpBottom) {
                state.timer += 15;
                state.checkpointsCollected++;
                state.checkpoints.splice(i, 1);
            } else if (cp.y > canvas.height) {
                state.checkpoints.splice(i, 1);
            }
        }
    } else if (state.sleepStartTime) {
        // Calculate sleep time
        const sleepElapsed = Date.now() - state.sleepStartTime;
        const totalSec = Math.floor(sleepElapsed / 1000);
        
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSec % 60).toString().padStart(2, '0');
        
        const timeStr = h > 0 ? `${h}時間${m}分${s}秒` : `${m}分${s}秒`;
        document.getElementById('sleep-time-display').innerText = `寝落ち睡眠時間: ${timeStr}`;
    }

    state.distanceTravelled += state.scrollSpeed;
    state.frame++;
    render();
    requestAnimationFrame(update);
}

function spawnCheckpoint() {
    // 描画座標・判定座標に合わせて、確実に道の範囲内にスポーンさせる
    const canvasW = canvas.width / (window.devicePixelRatio || 1);
    const roadW = canvasW * 0.8;
    const roadStartX = (canvasW - roadW) / 2;
    const cpWidth = 54; // 車(36)の1.5倍
    
    // スポーン可能なX領域 (道の中かつ壁から少し離す)
    const minX = roadStartX + cpWidth / 2;
    const maxX = roadStartX + roadW - cpWidth / 2;

    state.checkpoints.push({
        x: Math.random() * (maxX - minX) + minX,
        y: -50
    });
}

function triggerGameOver() {
    state.isGameOver = true;
    const startSpeed = state.scrollSpeed;
    const startTime = Date.now();

    const decelerate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / DECELERATION_TIME, 1);
        state.scrollSpeed = startSpeed * (1 - progress);

        if (progress < 1) {
            requestAnimationFrame(decelerate);
        } else {
            // Completely stopped
            fadeOverlay.style.opacity = 1;

            // Wait until screen becomes fully dark (matches 5s CSS transition)
            setTimeout(() => {
                // Set play time
                const finalPlaySec = Math.floor(state.elapsedTime / 1000);
                const pm = Math.floor(finalPlaySec / 60).toString().padStart(2, '0');
                const ps = (finalPlaySec % 60).toString().padStart(2, '0');
                document.getElementById('play-time-display').innerText = `寝落ちまでの時間: ${pm}分${ps}秒`;

                // Start sleep timer
                state.sleepStartTime = Date.now();
                gameOverScreen.classList.remove('hidden');
            }, 5000);
        }
    };
    decelerate();
}

const stars = [];
for (let i = 0; i < 50; i++) {
    stars.push({
        x: Math.random() * 500,
        y: Math.random() * 1000,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2
    });
}

function drawBackground(w, h) {
    // Dark gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#05070a');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = '#fff';
    stars.forEach(star => {
        star.y += star.speed * (state.scrollSpeed / BASE_SPEED);
        if (star.y > h) star.y = -10;
        ctx.globalAlpha = star.size * 0.5;
        ctx.beginPath();
        ctx.arc(star.x * (w / 500), star.y * (h / 1000), star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1.0;
}

function render() {
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, w, h);

    drawBackground(w, h);
    drawRoad(w, h);

    // Draw Checkpoints
    state.checkpoints.forEach(cp => {
        const carW = 36;
        const cpWidth = carW * 1.5; // 54
        const cpHeight = 10;
        
        const glowSize = 20 + Math.sin(state.frame * 0.1) * 5;
        
        ctx.shadowBlur = glowSize;
        ctx.shadowColor = 'rgba(255, 180, 0, 0.8)';
        ctx.fillStyle = '#fbbf24';

        ctx.beginPath();
        ctx.roundRect(cp.x - cpWidth / 2, cp.y - cpHeight / 2, cpWidth, cpHeight, 4);
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    // Draw Player
    const playerY = h - 150; // 少し上に移動
    ctx.save();

    // Procedural Sleek Car Block
    const carW = 36;
    const carH = 64;

    // Outer Glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(0, 255, 234, 0.8)';

    // Body
    const bodyGrad = ctx.createLinearGradient(state.playerX - carW / 2, playerY, state.playerX + carW / 2, playerY);
    bodyGrad.addColorStop(0, '#0ea5e9');
    bodyGrad.addColorStop(0.5, '#00ffea');
    bodyGrad.addColorStop(1, '#0ea5e9');
    ctx.fillStyle = bodyGrad;

    ctx.beginPath();
    ctx.roundRect(state.playerX - carW / 2, playerY - carH / 2, carW, carH, 8);
    ctx.fill();

    // Windows (Dark glass layer)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    // Front Windshield (前窓)
    ctx.beginPath();
    ctx.roundRect(state.playerX - carW / 2 + 4, playerY - carH / 2 + 12, carW - 8, 14, 3);
    ctx.fill();

    // Rear Windshield (後窓)
    ctx.beginPath();
    ctx.roundRect(state.playerX - carW / 2 + 6, playerY + carH / 2 - 20, carW - 12, 10, 2);
    ctx.fill();

    // Roof (天井 - 少しハイライト)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(state.playerX - carW / 2 + 6, playerY - carH / 2 + 28, carW - 12, 14, 3);
    ctx.fill();

    // Headlights
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#fff';
    ctx.fillRect(state.playerX - carW / 2 + 4, playerY - carH / 2 + 2, 8, 4);
    ctx.fillRect(state.playerX + carW / 2 - 12, playerY - carH / 2 + 2, 8, 4);

    ctx.restore();

    // Update UI
    mainTimerEl.innerText = state.timer.toFixed(1);
    cpCounterEl.innerText = state.checkpointsCollected;
    const totalSec = Math.floor(state.elapsedTime / 1000);
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    totalTimeEl.innerText = `${m}:${s}`;
}

function drawRoad(w, h) {
    const roadWidth = w * 0.8;
    const roadX = (w - roadWidth) / 2;

    // Road surface
    ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
    ctx.fillRect(roadX, 0, roadWidth, h);

    // Side lines (glow)
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(0, 255, 234, 0.5)';
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.8)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(roadX, 0); ctx.lineTo(roadX, h);
    ctx.moveTo(roadX + roadWidth, 0); ctx.lineTo(roadX + roadWidth, h);
    ctx.stroke();
    
    // Bright core for the line
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Side markers (moving)
    ctx.strokeStyle = 'rgba(0, 255, 234, 0.1)';
    ctx.setLineDash([20, 100]);
    ctx.lineDashOffset = - (state.distanceTravelled) % 120;
    ctx.stroke();

    // Center dashed lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.setLineDash([40, 60]);
    ctx.lineDashOffset = - (state.distanceTravelled * 1.5) % 100;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();

    ctx.setLineDash([]);

    // Draw Streetlights
    const spacing = 350; // Distance between lights
    const yOffset = state.distanceTravelled % spacing;
    
    ctx.save();
    ctx.shadowBlur = 25;
    ctx.shadowColor = 'rgba(0, 255, 234, 1)'; // Neon cyan glow
    ctx.fillStyle = '#fff';

    for (let y = yOffset - spacing; y < h + spacing; y += spacing) {
        // Left light
        ctx.beginPath();
        ctx.roundRect(roadX - 6, y, 6, 30, 3);
        ctx.fill();

        // Right light
        ctx.beginPath();
        ctx.roundRect(roadX + roadWidth, y, 6, 30, 3);
        ctx.fill();
    }
    
    ctx.restore();
}

// Start the game immediately
window.addEventListener('DOMContentLoaded', () => {
    resize();
    state.startTime = Date.now();
    update();
});
