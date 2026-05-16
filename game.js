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
const startBtn = document.getElementById('start-btn');
const titleScreen = document.getElementById('title-screen');
const uiOverlay = document.getElementById('ui-overlay');
const totalPointsDisplay = document.getElementById('total-points-display');
const bgmVolumeSlider = document.getElementById('bgm-volume-slider');
const settingsOpenBtn = document.getElementById('settings-open-btn');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const settingsModal = document.getElementById('settings-modal');
const bgmSelect = document.getElementById('bgm-select');
const shopItemsContainer = document.getElementById('shop-items');
const langSelect = document.getElementById('lang-select');
const shopOpenBtn = document.getElementById('shop-open-btn');
const shopCloseBtn = document.getElementById('shop-close-btn');
const shopModal = document.getElementById('shop-modal');
const langOpenBtn = document.getElementById('lang-open-btn');
const langCloseBtn = document.getElementById('lang-close-btn');
const langModal = document.getElementById('lang-modal');

// Translations
const i18n = {
    ja: {
        UI_01: "出発",
        UI_02: "設定 & ショップ",
        UI_03: "睡眠記録",
        UI_04: "車種選択",
        UI_05: "走行中...",
        UI_06: "残り時間",
        UI_07: "+15秒",
        UI_08: "おやすみなさい",
        UI_09: "昨夜の記録",
        UI_10: "寝落ち時刻:",
        UI_11: "睡眠の質",
        UI_12: "言語選択",
        SHOP: "ショップ",
        TITLE_DESC: "深夜の静寂へようこそ",
        POINTS: "ポイント",
        ELAPSED: "経過時間",
        BGM_SELECT: "BGM選択",
        BGM_VOLUME: "音量",
        CLOSE: "閉じる",
        EQUIPPED: "装備中",
        SELECT: "選択",
        PTS: "pt",
        NOT_ENOUGH: "ポイントが足りません！",
        SLEEP_DUR: "睡眠時間:"
    },
    en: {
        UI_01: "Depart",
        UI_02: "Settings & Shop",
        UI_03: "Sleep Logs",
        UI_04: "Choose Vehicle",
        UI_05: "Cruising...",
        UI_06: "Time Left",
        UI_07: "+15s",
        UI_08: "Sleep Well",
        UI_09: "Last Night's Log",
        UI_10: "Fell Asleep At:",
        UI_11: "Sleep Quality",
        UI_12: "Language",
        SHOP: "Shop",
        TITLE_DESC: "Welcome to the midnight silence.",
        POINTS: "POINTS",
        ELAPSED: "ELAPSED",
        BGM_SELECT: "BGM SELECT",
        BGM_VOLUME: "VOLUME",
        CLOSE: "Close",
        EQUIPPED: "Equipped",
        SELECT: "Select",
        PTS: "pts",
        NOT_ENOUGH: "Not enough points!",
        SLEEP_DUR: "Sleep Time:"
    },
    zh: {
        UI_01: "启程",
        UI_02: "设置 & 商店",
        UI_03: "睡眠记录",
        UI_04: "车辆选择",
        UI_05: "巡航中...",
        UI_06: "剩余时间",
        UI_07: "+15秒",
        UI_08: "晚安，好梦",
        UI_09: "昨夜记录",
        UI_10: "入睡时间:",
        UI_11: "睡眠质量",
        UI_12: "语言选择",
        SHOP: "商店",
        TITLE_DESC: "欢迎来到午夜的寂静",
        POINTS: "点数",
        ELAPSED: "已用时间",
        BGM_SELECT: "背景音乐",
        BGM_VOLUME: "音量",
        CLOSE: "关闭",
        EQUIPPED: "已装备",
        SELECT: "选择",
        PTS: "点",
        NOT_ENOUGH: "点数不足！",
        SLEEP_DUR: "睡眠时间:"
    },
    ko: {
        UI_01: "출발",
        UI_02: "설정 & 상점",
        UI_03: "수면 기록",
        UI_04: "차량 선택",
        UI_05: "주행 중...",
        UI_06: "남은 시간",
        UI_07: "+15초",
        UI_08: "잘 자요",
        UI_09: "지난밤 기록",
        UI_10: "잠든 시간:",
        UI_11: "수면 품질",
        UI_12: "언어 선택",
        SHOP: "상점",
        TITLE_DESC: "자정의 고요함에 오신 것을 환영합니다",
        POINTS: "포인트",
        ELAPSED: "경과 시간",
        BGM_SELECT: "BGM 선택",
        BGM_VOLUME: "음량",
        CLOSE: "닫기",
        EQUIPPED: "장착됨",
        SELECT: "선택",
        PTS: "pt",
        NOT_ENOUGH: "포인트가 부족합니다!",
        SLEEP_DUR: "수면 시간:"
    },
    es: {
        UI_01: "Partir",
        UI_02: "Ajustes y Tienda",
        UI_03: "Registro de sueño",
        UI_04: "Elegir vehículo",
        UI_05: "En ruta...",
        UI_06: "Tiempo restante",
        UI_07: "+15 s",
        UI_08: "Dulces sueños",
        UI_09: "Registro de anoche",
        UI_10: "Te dormiste a las:",
        UI_11: "Calidad del sueño",
        UI_12: "Idioma",
        SHOP: "Tienda",
        TITLE_DESC: "Bienvenido al silencio de la medianoche",
        POINTS: "PUNTOS",
        ELAPSED: "TRANSCURRIDO",
        BGM_SELECT: "MÚSICA",
        BGM_VOLUME: "VOLUMEN",
        CLOSE: "Cerrar",
        EQUIPPED: "Equipado",
        SELECT: "Elegir",
        PTS: "pts",
        NOT_ENOUGH: "¡No hay suficientes puntos!",
        SLEEP_DUR: "Tiempo de sueño:"
    },
    fr: {
        UI_01: "Départ",
        UI_02: "Paramètres et boutique",
        UI_03: "Journal de sommeil",
        UI_04: "Choix du véhicule",
        UI_05: "En route...",
        UI_06: "Temps restant",
        UI_07: "+15 s",
        UI_08: "Fais de beaux rêves",
        UI_09: "Nuit dernière",
        UI_10: "Endormi(e) à :",
        UI_11: "Qualité du sommeil",
        UI_12: "Langue",
        SHOP: "Boutique",
        TITLE_DESC: "Bienvenue dans le silence de minuit",
        POINTS: "POINTS",
        ELAPSED: "ÉCOULÉ",
        BGM_SELECT: "MUSIQUE",
        BGM_VOLUME: "VOLUME",
        CLOSE: "Fermer",
        EQUIPPED: "Équipé",
        SELECT: "Choisir",
        PTS: "pts",
        NOT_ENOUGH: "Pas assez de points !",
        SLEEP_DUR: "Temps de sommeil :"
    }
};

let currentLang = localStorage.getItem('languid_lang') || 'ja';

function t(key, defaultVal = '') {
    return i18n[currentLang][key] || defaultVal;
}

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(i18n[currentLang][key]) {
            el.innerText = i18n[currentLang][key];
        }
    });
    // Setting Modal title
    if (!shopModal.classList.contains('hidden')) {
        renderShop();
    }
}

langSelect.value = currentLang;
langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('languid_lang', currentLang);
    updateTexts();
});

// Update title screen total points initially
updateTexts();

// Shop config
const shopConfig = [
    { id: 'default', name: 'Cyan (Default)', cost: 0, colors: ['#0ea5e9', '#00ffea', '#0ea5e9'] },
    { id: 'purple', name: 'Neon Purple', cost: 10, colors: ['#9333ea', '#d946ef', '#9333ea'] },
    { id: 'green', name: 'Toxic Green', cost: 20, colors: ['#16a34a', '#4ade80', '#16a34a'] },
    { id: 'red', name: 'Crimson Red', cost: 50, colors: ['#dc2626', '#f87171', '#dc2626'] },
    { id: 'gold', name: 'Luxury Gold', cost: 100, colors: ['#ca8a04', '#fde047', '#ca8a04'] }
];

// Constants & State
const BASE_SPEED = 2;
const DECELERATION_TIME = 5000; // 5 seconds
const CHECKPOINT_INTERVAL = 15000; // 15 seconds

let state = {
    timer: 60.0,
    startTime: Date.now(),
    elapsedTime: 0,
    scrollSpeed: BASE_SPEED,
    isGameOver: false,
    isTitleScreen: true,
    playerX: 0,
    playerTargetX: 0,
    checkpoints: [],
    lastCheckpointSpawn: 0,
    frame: 0,
    distanceTravelled: 0,
    checkpointsCollected: 0,
    sleepStartTime: null,
    lastFrameTime: Date.now(),
    totalPoints: parseInt(localStorage.getItem('languid_total_points') || '0', 10),
    unlockedColors: JSON.parse(localStorage.getItem('languid_unlocked_colors') || '["default"]'),
    currentColor: localStorage.getItem('languid_current_color') || 'default',
    currentBgm: localStorage.getItem('languid_current_bgm') || 'Midnight piano.mp3'
};

bgmSelect.value = state.currentBgm;

// Update title screen total points initially
totalPointsDisplay.innerText = state.totalPoints;

// Assets
const carImg = new Image();
carImg.src = 'assets/car.png';

const checkpointImg = new Image();
checkpointImg.src = 'assets/checkpoint.png';

const cpSound = new Audio('assets/BGM/Bell(High).mp3');
cpSound.volume = 0.6;

const mainBgm = new Audio('assets/BGM/' + state.currentBgm);
mainBgm.loop = true;
mainBgm.volume = 0.6;

let bgmStarted = false;
function startMainBgm() {
    if (!bgmStarted) {
        mainBgm.play().then(() => {
            bgmStarted = true;
        }).catch(e => console.log("BGM autoplay blocked:", e));
    }
}

window.addEventListener('click', startMainBgm, { once: true });
window.addEventListener('touchstart', startMainBgm, { once: true, passive: true });

bgmVolumeSlider.addEventListener('input', (e) => {
    mainBgm.volume = e.target.value;
});

bgmSelect.addEventListener('change', (e) => {
    state.currentBgm = e.target.value;
    localStorage.setItem('languid_current_bgm', state.currentBgm);
    mainBgm.src = 'assets/BGM/' + state.currentBgm;
    if (bgmStarted) {
        mainBgm.play();
    }
});

settingsOpenBtn.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
});

settingsCloseBtn.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
});

shopOpenBtn.addEventListener('click', () => {
    renderShop();
    shopModal.classList.remove('hidden');
});

shopCloseBtn.addEventListener('click', () => {
    shopModal.classList.add('hidden');
});

langOpenBtn.addEventListener('click', () => {
    langModal.classList.remove('hidden');
});

langCloseBtn.addEventListener('click', () => {
    langModal.classList.add('hidden');
});

function renderShop() {
    shopItemsContainer.innerHTML = '';
    shopConfig.forEach(item => {
        const isUnlocked = state.unlockedColors.includes(item.id);
        const isSelected = state.currentColor === item.id;
        
        const div = document.createElement('div');
        div.className = `shop-item ${isUnlocked ? 'unlocked' : ''} ${isSelected ? 'selected' : ''}`;
        
        const infoDiv = document.createElement('div');
        infoDiv.style.display = 'flex';
        infoDiv.style.alignItems = 'center';
        
        const preview = document.createElement('div');
        preview.className = 'color-preview';
        preview.style.background = `linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]})`;
        
        const nameSpan = document.createElement('span');
        nameSpan.style.color = '#fff';
        nameSpan.style.fontSize = '14px';
        nameSpan.innerText = item.name;
        
        infoDiv.appendChild(preview);
        infoDiv.appendChild(nameSpan);
        div.appendChild(infoDiv);
        
        const btn = document.createElement('button');
        btn.className = 'shop-btn';
        
        if (isSelected) {
            btn.innerText = 'Equipped';
            btn.disabled = true;
            btn.style.opacity = '0.5';
        } else if (isUnlocked) {
            btn.classList.add('select');
            btn.innerText = 'Select';
            btn.onclick = () => {
                state.currentColor = item.id;
                localStorage.setItem('languid_current_color', item.id);
                renderShop();
                render(); 
            };
        } else {
            btn.classList.add('buy');
            btn.innerText = `${item.cost} pts`;
            btn.onclick = () => {
                if (state.totalPoints >= item.cost) {
                    state.totalPoints -= item.cost;
                    totalPointsDisplay.innerText = state.totalPoints;
                    localStorage.setItem('languid_total_points', state.totalPoints);
                    
                    state.unlockedColors.push(item.id);
                    localStorage.setItem('languid_unlocked_colors', JSON.stringify(state.unlockedColors));
                    
                    state.currentColor = item.id;
                    localStorage.setItem('languid_current_color', item.id);
                    renderShop();
                    render();
                } else {
                    alert('ポイントが足りません！');
                }
            };
        }
        
        div.appendChild(btn);
        shopItemsContainer.appendChild(div);
    });
}

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
    if (state.isGameOver || state.isTitleScreen) return;
    const rect = canvas.getBoundingClientRect();
    state.playerTargetX = e.clientX - rect.left;
});

function handleTouch(e) {
    if (state.isGameOver || state.isTitleScreen) return;
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

// Start / Restart functionality
startBtn.addEventListener('click', () => {
    startMainBgm(); // Ensure BGM starts if this is the first interaction
    state.isTitleScreen = false;
    state.startTime = Date.now();
    state.lastFrameTime = Date.now();
    titleScreen.classList.add('hidden');
    uiOverlay.classList.remove('hidden');
});

restartBtn.addEventListener('click', () => {
    location.reload();
});

// Game Loop
function update() {
    if (state.isTitleScreen) {
        // Only run background animation
        state.distanceTravelled += state.scrollSpeed;
        state.frame++;
        render();
        requestAnimationFrame(update);
        return;
    }

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
                // Play sound
                cpSound.currentTime = 0;
                cpSound.play().catch(e => console.log("Audio play failed:", e));
                
                state.timer += 15;
                state.checkpointsCollected++;
                state.totalPoints++;
                localStorage.setItem('languid_total_points', state.totalPoints);
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
        
        const timeStr = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
        document.getElementById('sleep-time-display').innerText = `${t('SLEEP_DUR')} ${timeStr}`;
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
                document.getElementById('play-time-display').innerText = `${t('UI_10')} ${pm}:${ps}`;

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

    const activeColorConf = shopConfig.find(c => c.id === state.currentColor) || shopConfig[0];

    // Outer Glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = activeColorConf.colors[1];

    // Body
    const bodyGrad = ctx.createLinearGradient(state.playerX - carW / 2, playerY, state.playerX + carW / 2, playerY);
    bodyGrad.addColorStop(0, activeColorConf.colors[0]);
    bodyGrad.addColorStop(0.5, activeColorConf.colors[1]);
    bodyGrad.addColorStop(1, activeColorConf.colors[2]);
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
