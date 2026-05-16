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
const shopPreviewCanvas = document.getElementById('shop-preview-canvas');
const shopPreviewCtx = shopPreviewCanvas.getContext('2d');

// Sleep System DOM elements
const sleepLogOpenBtn = document.getElementById('sleep-log-open-btn');
const sleepEvalModal = document.getElementById('sleep-eval-modal');
const sleepEvalSubmitBtn = document.getElementById('sleep-eval-submit');
const sleepEvalSkipBtn = document.getElementById('sleep-eval-skip');
const sleepHistoryModal = document.getElementById('sleep-history-modal');
const sleepHistoryCloseBtn = document.getElementById('sleep-history-close-btn');
const sleepEvalOpenBtn = document.getElementById('sleep-eval-open-btn');
const sleepHistoryList = document.getElementById('sleep-history-list');

// Translations
const i18n = {
    ja: {
        UI_01: "タイトルへ戻る",
        UI_02: "設定",
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
        SLEEP_DUR: "睡眠時間:",
        SHOP_VEHICLE: "車両",
        SHOP_COLOR: "カラー",
        V_CAR: "🚗 セダン",
        V_BICYCLE: "🚲 自転車",
        V_BIKE: "🏍 バイク",
        V_TRUCK: "🚚 トラック",
        V_BOAT: "⛵ 船",
        V_PLANE: "✈️ 飛行機",
        V_UFO: "🛸 UFO",
        C_DEFAULT: "シアン",
        C_PURPLE: "ネオンパープル",
        C_GREEN: "トキシックグリーン",
        C_RED: "クリムゾンレッド",
        C_GOLD: "ラグジュアリーゴールド",
        C_ORANGE: "サンセットオレンジ",
        C_PINK: "ローズピンク",
        C_TEAL: "ディープティール",
        C_INDIGO: "ミッドナイトインディゴ",
        C_WHITE: "アークティックホワイト",
        C_LIME: "エレクトリックライム",
        C_ROSE: "ディープローズ",
        C_AMBER: "アンバー",
        C_SKY: "スカイブルー",
        C_VIOLET: "バイオレット"
    },
    en: {
        UI_01: "Return to Title",
        UI_02: "Settings",
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
        SLEEP_DUR: "Sleep Time:",
        SHOP_VEHICLE: "Vehicle",
        SHOP_COLOR: "Color",
        V_CAR: "🚗 Sedan",
        V_BICYCLE: "🚲 Bicycle",
        V_BIKE: "🏍 Motorcycle",
        V_TRUCK: "🚚 Truck",
        V_BOAT: "⛵ Boat",
        V_PLANE: "✈️ Airplane",
        V_UFO: "🛸 UFO",
        C_DEFAULT: "Cyan",
        C_PURPLE: "Neon Purple",
        C_GREEN: "Toxic Green",
        C_RED: "Crimson Red",
        C_GOLD: "Luxury Gold",
        C_ORANGE: "Sunset Orange",
        C_PINK: "Rose Pink",
        C_TEAL: "Deep Teal",
        C_INDIGO: "Midnight Indigo",
        C_WHITE: "Arctic White",
        C_LIME: "Electric Lime",
        C_ROSE: "Deep Rose",
        C_AMBER: "Amber",
        C_SKY: "Sky Blue",
        C_VIOLET: "Violet"
    },
    zh: {
        UI_01: "返回标题",
        UI_02: "设置",
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
        SLEEP_DUR: "睡眠时间:",
        SHOP_VEHICLE: "车辆",
        SHOP_COLOR: "颜色",
        V_CAR: "🚗 轿车",
        V_BICYCLE: "🚲 自行车",
        V_BIKE: "🏍 摩托车",
        V_TRUCK: "🚚 卡车",
        V_BOAT: "⛵ 船",
        V_PLANE: "✈️ 飞机",
        V_UFO: "🛸 UFO",
        C_DEFAULT: "青色",
        C_PURPLE: "霓虹紫",
        C_GREEN: "毒液绿",
        C_RED: "猩红",
        C_GOLD: "奢华金",
        C_ORANGE: "日落橙",
        C_PINK: "玫瑰粉",
        C_TEAL: "深青色",
        C_INDIGO: "午夜靛蓝",
        C_WHITE: "极地白",
        C_LIME: "电光石灰",
        C_ROSE: "深玫瑰色",
        C_AMBER: "琥珀色",
        C_SKY: "天蓝色",
        C_VIOLET: "紫罗兰色"
    },
    ko: {
        UI_01: "타이틀로 돌아가기",
        UI_02: "설정",
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
        SLEEP_DUR: "수면 시간:",
        SHOP_VEHICLE: "차량",
        SHOP_COLOR: "색상",
        V_CAR: "🚗 세단",
        V_BICYCLE: "🚲 자전거",
        V_BIKE: "🏍 오토바이",
        V_TRUCK: "🚚 트럭",
        V_BOAT: "⛵ 보트",
        V_PLANE: "✈️ 비행기",
        V_UFO: "🛸 UFO",
        C_DEFAULT: "시안",
        C_PURPLE: "네온 퍼플",
        C_GREEN: "톡식 그린",
        C_RED: "크림슨 레드",
        C_GOLD: "럭셔리 골드",
        C_ORANGE: "선셋 오렌지",
        C_PINK: "로즈 핑크",
        C_TEAL: "딥 틸",
        C_INDIGO: "미드나잇 인디고",
        C_WHITE: "아크틱 화이트",
        C_LIME: "일렉트릭 라임",
        C_ROSE: "딥 로즈",
        C_AMBER: "앰버",
        C_SKY: "스카이 블루",
        C_VIOLET: "바이올렛"
    },
    es: {
        UI_01: "Volver al Título",
        UI_02: "Ajustes",
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
        NOT_ENOUGH: "¡No tienes suficientes puntos!",
        SLEEP_DUR: "Tiempo de sueño:",
        SHOP_VEHICLE: "Vehículo",
        SHOP_COLOR: "Color",
        V_CAR: "🚗 Sedán",
        V_BICYCLE: "🚲 Bicicleta",
        V_BIKE: "🏍 Motocicleta",
        V_TRUCK: "🚚 Camión",
        V_BOAT: "⛵ Barco",
        V_PLANE: "✈️ Avión",
        V_UFO: "🛸 OVNI",
        C_DEFAULT: "Cian",
        C_PURPLE: "Morado Neón",
        C_GREEN: "Verde Tóxico",
        C_RED: "Rojo Carmesí",
        C_GOLD: "Oro Lujo",
        C_ORANGE: "Naranja Atardecer",
        C_PINK: "Rosa",
        C_TEAL: "Verde Azulado",
        C_INDIGO: "Índigo",
        C_WHITE: "Blanco",
        C_LIME: "Lima Eléctrico",
        C_ROSE: "Rosa Profundo",
        C_AMBER: "Ámbar",
        C_SKY: "Azul Cielo",
        C_VIOLET: "Violeta"
    },
    fr: {
        UI_01: "Retour au Titre",
        UI_02: "Paramètres",
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
        SLEEP_DUR: "Temps de sommeil :",
        SHOP_VEHICLE: "Véhicule",
        SHOP_COLOR: "Couleur",
        V_CAR: "🚗 Berline",
        V_BICYCLE: "🚲 Vélo",
        V_BIKE: "🏍 Moto",
        V_TRUCK: "🚚 Camion",
        V_BOAT: "⛵ Bateau",
        V_PLANE: "✈️ Avion",
        V_UFO: "🛸 OVNI",
        C_DEFAULT: "Cyan",
        C_PURPLE: "Violet Néon",
        C_GREEN: "Vert Toxique",
        C_RED: "Rouge Cramoisi",
        C_GOLD: "Or de Luxe",
        C_ORANGE: "Orange Coucher",
        C_PINK: "Rose",
        C_TEAL: "Bleu Canard",
        C_INDIGO: "Indigo",
        C_WHITE: "Blanc",
        C_LIME: "Citron Vert",
        C_ROSE: "Rose Profond",
        C_AMBER: "Ambre",
        C_SKY: "Bleu Ciel",
        C_VIOLET: "Violette"
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

// Color config
const colorConfig = [
    { id: 'default',  nameKey: 'C_DEFAULT', name: 'Cyan',          cost: 0,  colors: ['#0ea5e9', '#00ffea', '#0ea5e9'] },
    { id: 'purple',   nameKey: 'C_PURPLE',  name: 'Neon Purple',    cost: 0,  colors: ['#9333ea', '#d946ef', '#9333ea'] },
    { id: 'green',    nameKey: 'C_GREEN',   name: 'Toxic Green',    cost: 0,  colors: ['#16a34a', '#4ade80', '#16a34a'] },
    { id: 'red',      nameKey: 'C_RED',     name: 'Crimson Red',    cost: 0,  colors: ['#dc2626', '#f87171', '#dc2626'] },
    { id: 'gold',     nameKey: 'C_GOLD',    name: 'Luxury Gold',    cost: 0,  colors: ['#ca8a04', '#fde047', '#ca8a04'] },
    { id: 'orange',   nameKey: 'C_ORANGE',  name: 'Sunset Orange',  cost: 0,  colors: ['#ea580c', '#fb923c', '#ea580c'] },
    { id: 'pink',     nameKey: 'C_PINK',    name: 'Rose Pink',      cost: 0,  colors: ['#be185d', '#f472b6', '#be185d'] },
    { id: 'teal',     nameKey: 'C_TEAL',    name: 'Deep Teal',      cost: 0,  colors: ['#0d9488', '#2dd4bf', '#0d9488'] },
    { id: 'indigo',   nameKey: 'C_INDIGO',  name: 'Midnight Indigo',cost: 0,  colors: ['#4338ca', '#818cf8', '#4338ca'] },
    { id: 'white',    nameKey: 'C_WHITE',   name: 'Arctic White',   cost: 0,  colors: ['#94a3b8', '#e2e8f0', '#94a3b8'] },
    { id: 'lime',     nameKey: 'C_LIME',    name: 'Electric Lime',  cost: 0,  colors: ['#65a30d', '#a3e635', '#65a30d'] },
    { id: 'rose',     nameKey: 'C_ROSE',    name: 'Deep Rose',      cost: 0,  colors: ['#e11d48', '#fb7185', '#e11d48'] },
    { id: 'amber',    nameKey: 'C_AMBER',   name: 'Amber',          cost: 0,  colors: ['#b45309', '#fcd34d', '#b45309'] },
    { id: 'sky',      nameKey: 'C_SKY',     name: 'Sky Blue',       cost: 0,  colors: ['#0284c7', '#7dd3fc', '#0284c7'] },
    { id: 'violet',   nameKey: 'C_VIOLET',  name: 'Violet',         cost: 0,  colors: ['#7c3aed', '#c4b5fd', '#7c3aed'] }
];

// Vehicle config
const vehicleConfig = [
    { id: 'car',      nameKey: 'V_CAR',     name: '🚗 Sedan',       cost: 0 },
    { id: 'bicycle',  nameKey: 'V_BICYCLE', name: '🚲 Bicycle',      cost: 0 },
    { id: 'bike',     nameKey: 'V_BIKE',    name: '🏍 Motorcycle',  cost: 0 },
    { id: 'truck',    nameKey: 'V_TRUCK',   name: '🚚 Truck',        cost: 0 },
    { id: 'boat',     nameKey: 'V_BOAT',    name: '⛵ Boat',          cost: 0 },
    { id: 'plane',    nameKey: 'V_PLANE',   name: '✈️ Airplane',     cost: 0 },
    { id: 'ufo',      nameKey: 'V_UFO',     name: '🛸 UFO',          cost: 0 }
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
    unlockedVehicles: JSON.parse(localStorage.getItem('languid_unlocked_vehicles') || '["car"]'),
    currentVehicle: localStorage.getItem('languid_current_vehicle') || 'car',
    currentBgm: localStorage.getItem('languid_current_bgm') || 'Midnight piano.mp3',
    // Sleep system state
    sleepHistory: JSON.parse(localStorage.getItem('languid_sleep_history') || '[]'),
    currentEval: { fallAsleep: 0, stayAsleep: 0, freshness: 0 },
    lastPlayLog: JSON.parse(localStorage.getItem('languid_last_play_log') || 'null')
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

settingsOpenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsModal.classList.remove('hidden');
});

settingsCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsModal.classList.add('hidden');
});

shopOpenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    renderShop();
    shopModal.classList.remove('hidden');
});

shopCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    shopModal.classList.add('hidden');
});

langOpenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langModal.classList.remove('hidden');
});

langCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langModal.classList.add('hidden');
});

// --- Sleep System Logic ---
sleepLogOpenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    renderSleepHistory();
    sleepHistoryModal.classList.remove('hidden');
});

sleepHistoryCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sleepHistoryModal.classList.add('hidden');
});

sleepEvalOpenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sleepHistoryModal.classList.add('hidden');
    initSleepEval();
    sleepEvalModal.classList.remove('hidden');
});

sleepEvalSkipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sleepEvalModal.classList.add('hidden');
});

sleepEvalSubmitBtn.addEventListener('click', submitSleepEval);

function initSleepEval() {
    state.currentEval = { fallAsleep: 0, stayAsleep: 0, freshness: 0 };
    document.querySelectorAll('.sleep-rating').forEach(container => {
        container.innerHTML = '';
        const key = container.dataset.key;
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('div');
            star.className = 'sleep-star';
            star.innerHTML = '★';
            star.dataset.val = i;
            star.addEventListener('click', () => {
                state.currentEval[key] = i;
                updateStars(container, i);
            });
            container.appendChild(star);
        }
    });
}

function updateStars(container, val) {
    container.querySelectorAll('.sleep-star').forEach(s => {
        if (parseInt(s.dataset.val) <= val) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

function submitSleepEval() {
    if (state.currentEval.fallAsleep === 0 || state.currentEval.stayAsleep === 0 || state.currentEval.freshness === 0) {
        alert("すべての項目を評価してください");
        return;
    }
    const total = state.currentEval.fallAsleep + state.currentEval.stayAsleep + state.currentEval.freshness;
    const score = Math.round((total / 15) * 100);
    
    // Add to history
    const entry = {
        date: new Date().toISOString(),
        score: score,
        playData: state.lastPlayLog
    };
    state.sleepHistory.unshift(entry);
    if (state.sleepHistory.length > 7) state.sleepHistory.pop(); // Keep 1 week
    
    localStorage.setItem('languid_sleep_history', JSON.stringify(state.sleepHistory));
    
    sleepEvalModal.classList.add('hidden');
    renderSleepHistory();
    sleepHistoryModal.classList.remove('hidden');
}

function renderSleepHistory() {
    sleepHistoryList.innerHTML = '';
    if (state.sleepHistory.length === 0) {
        sleepHistoryList.innerHTML = '<p style="color:#64748b;font-size:12px;text-align:center;margin-bottom:10px;">記録がありません</p>';
        return;
    }
    state.sleepHistory.forEach(entry => {
        const d = new Date(entry.date);
        const dateStr = `${d.getMonth()+1}/${d.getDate()}`;
        let feedback = '';
        let color = '';
        if (entry.score >= 85) {
            feedback = '素晴らしいリフレッシュ'; color = '#4ade80';
        } else if (entry.score >= 60) {
            feedback = '標準的な睡眠'; color = '#fbbf24';
        } else {
            feedback = '少し疲れ気味'; color = '#f87171';
        }
        
        let playInfo = '';
        if (entry.playData) {
            const pm = Math.floor(entry.playData.playTimeSec / 60);
            playInfo = `(🚗 ${pm}分 / リラックス: ${entry.playData.relaxLevel})`;
        }

        const div = document.createElement('div');
        div.className = 'sleep-history-item';
        div.innerHTML = `
            <div>
                <div class="sleep-history-date">${dateStr} ${playInfo}</div>
                <div style="font-size:11px;color:${color}">${feedback}</div>
            </div>
            <div class="sleep-history-score" style="color:${color}">${entry.score}</div>
        `;
        sleepHistoryList.appendChild(div);
    });
}
// ----------------------------

function renderShopSection(config, currentId, unlockedList, storageKey, onSelect, container) {
    config.forEach(item => {
        const isUnlocked = unlockedList.includes(item.id);
        const isSelected = currentId === item.id;

        const div = document.createElement('div');
        div.className = `shop-item ${isUnlocked ? 'unlocked' : ''} ${isSelected ? 'selected' : ''}`;

        const infoDiv = document.createElement('div');
        infoDiv.style.display = 'flex';
        infoDiv.style.alignItems = 'center';

        if (item.colors) {
            const preview = document.createElement('div');
            preview.className = 'color-preview';
            preview.style.background = `linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]})`;
            infoDiv.appendChild(preview);
        }

        const nameSpan = document.createElement('span');
        nameSpan.style.color = '#fff';
        nameSpan.style.fontSize = '14px';
        nameSpan.innerText = item.nameKey ? t(item.nameKey, item.name) : item.name;
        // Make names update correctly if language changes while shop is open
        if(item.nameKey) {
            nameSpan.setAttribute('data-i18n', item.nameKey);
        }
        infoDiv.appendChild(nameSpan);
        div.appendChild(infoDiv);

        const btn = document.createElement('button');
        btn.className = 'shop-btn';

        if (isSelected) {
            btn.innerText = t('EQUIPPED', 'Equipped');
            btn.disabled = true;
            btn.style.opacity = '0.5';
        } else if (isUnlocked) {
            btn.classList.add('select');
            btn.innerText = t('SELECT', 'Select');
            btn.onclick = () => {
                onSelect(item.id);
                renderShop();
                render();
            };
        } else {
            btn.classList.add('buy');
            btn.innerText = `${item.cost} ${t('PTS', 'pts')}`;
            btn.onclick = () => {
                if (state.totalPoints >= item.cost) {
                    state.totalPoints -= item.cost;
                    totalPointsDisplay.innerText = state.totalPoints;
                    localStorage.setItem('languid_total_points', state.totalPoints);
                    unlockedList.push(item.id);
                    localStorage.setItem(storageKey, JSON.stringify(unlockedList));
                    onSelect(item.id);
                    renderShop();
                    render();
                } else {
                    alert(t('NOT_ENOUGH', 'Not enough points!'));
                }
            };
        }

        div.appendChild(btn);
        container.appendChild(div);
    });
}

function renderShop() {
    const vehicleContainer = document.getElementById('shop-items-vehicle');
    const colorContainer   = document.getElementById('shop-items-color');
    vehicleContainer.innerHTML = '';
    colorContainer.innerHTML   = '';

    renderShopSection(
        vehicleConfig,
        state.currentVehicle,
        state.unlockedVehicles,
        'languid_unlocked_vehicles',
        (id) => { state.currentVehicle = id; localStorage.setItem('languid_current_vehicle', id); },
        vehicleContainer
    );

    renderShopSection(
        colorConfig,
        state.currentColor,
        state.unlockedColors,
        'languid_unlocked_colors',
        (id) => { state.currentColor = id; localStorage.setItem('languid_current_color', id); },
        colorContainer
    );

    renderShopPreview();
}

function renderShopPreview() {
    if (!shopPreviewCtx) return;
    shopPreviewCtx.clearRect(0, 0, shopPreviewCanvas.width, shopPreviewCanvas.height);
    
    // Preview coordinates (centered, slightly lowered for visual balance)
    const px = shopPreviewCanvas.width / 2;
    const py = shopPreviewCanvas.height / 2 + 5;
    
    // Draw the currently selected vehicle
    drawPlayer(shopPreviewCtx, px, py);
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
const startHint = document.getElementById('start-hint');

function startGame() {
    if (!state.isTitleScreen) return;
    startMainBgm();
    state.isTitleScreen = false;
    state.startTime = Date.now();
    state.lastFrameTime = Date.now();
    titleScreen.classList.add('hidden');
    startHint.classList.add('hidden');
    uiOverlay.classList.remove('hidden');
}

startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startGame();
});

// Tap anywhere outside title panel to start
const panelIds = ['title-screen', 'shop-modal', 'settings-modal', 'lang-modal', 'start-hint'];
document.getElementById('game-container').addEventListener('click', (e) => {
    if (!state.isTitleScreen) return;
    
    // Prevent starting if any modal is currently open
    const modals = ['shop-modal', 'settings-modal', 'lang-modal', 'sleep-history-modal', 'sleep-eval-modal'];
    const isModalOpen = modals.some(id => {
        const el = document.getElementById(id);
        return el && !el.classList.contains('hidden');
    });
    if (isModalOpen) return;

    // Check if click is inside any panel
    const isInsidePanel = panelIds.some(id => {
        const el = document.getElementById(id);
        return el && el.contains(e.target);
    });
    if (!isInsidePanel) startGame();
});

document.getElementById('game-container').addEventListener('touchstart', (e) => {
    if (!state.isTitleScreen) return;
    
    // Prevent starting if any modal is currently open
    const modals = ['shop-modal', 'settings-modal', 'lang-modal', 'sleep-history-modal', 'sleep-eval-modal'];
    const isModalOpen = modals.some(id => {
        const el = document.getElementById(id);
        return el && !el.classList.contains('hidden');
    });
    if (isModalOpen) return;

    const touch = e.touches[0];
    const isInsidePanel = panelIds.some(id => {
        const el = document.getElementById(id);
        return el && el.contains(document.elementFromPoint(touch.clientX, touch.clientY));
    });
    if (!isInsidePanel) startGame();
}, { passive: true });

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

    // リアルタイム時計の更新
    const now = new Date();
    const rh = now.getHours().toString().padStart(2, '0');
    const rm = now.getMinutes().toString().padStart(2, '0');
    const rs = now.getSeconds().toString().padStart(2, '0');
    const clockEl = document.getElementById('realtime-clock');
    if (clockEl) clockEl.innerText = `${rh}:${rm}:${rs}`;

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

// ─── Vehicle drawing functions ───────────────────────────────────

function getColor() {
    return colorConfig.find(c => c.id === state.currentColor) || colorConfig[0];
}

function drawPlayer(ctx, x, y) {
    switch (state.currentVehicle) {
        case 'truck':   drawTruck(ctx, x, y);   break;
        case 'bike':    drawBike(ctx, x, y);     break;
        case 'bicycle': drawBicycle(ctx, x, y);  break;
        case 'camper':  drawCamper(ctx, x, y);   break;
        case 'boat':    drawBoat(ctx, x, y);     break;
        case 'plane':   drawPlane(ctx, x, y);    break;
        case 'ufo':     drawUFO(ctx, x, y);      break;
        default:        drawCar(ctx, x, y);      break;
    }
}

function drawCar(ctx, x, y) {
    const col = getColor();
    const w = 36, h = 64;
    ctx.shadowBlur = 20; ctx.shadowColor = col.colors[1];
    const g = ctx.createLinearGradient(x - w/2, y, x + w/2, y);
    g.addColorStop(0, col.colors[0]); g.addColorStop(0.5, col.colors[1]); g.addColorStop(1, col.colors[2]);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.roundRect(x - w/2, y - h/2, w, h, 8); ctx.fill();
    ctx.fillStyle = 'rgba(15,23,42,0.8)';
    ctx.beginPath(); ctx.roundRect(x - w/2 + 4, y - h/2 + 12, w - 8, 14, 3); ctx.fill();
    ctx.beginPath(); ctx.roundRect(x - w/2 + 6, y + h/2 - 20, w - 12, 10, 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath(); ctx.roundRect(x - w/2 + 6, y - h/2 + 28, w - 12, 14, 3); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.shadowBlur = 15; ctx.shadowColor = '#fff';
    ctx.fillRect(x - w/2 + 4, y - h/2 + 2, 8, 4);
    ctx.fillRect(x + w/2 - 12, y - h/2 + 2, 8, 4);
}

function drawTruck(ctx, x, y) {
    const col = getColor();
    const w = 48, h = 80;
    ctx.shadowBlur = 22; ctx.shadowColor = col.colors[1];
    // Cargo bed
    const g = ctx.createLinearGradient(x - w/2, y, x + w/2, y);
    g.addColorStop(0, col.colors[0]); g.addColorStop(0.5, col.colors[1]); g.addColorStop(1, col.colors[2]);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.roundRect(x - w/2, y - h/2 + 22, w, h - 22, 4); ctx.fill();
    // Cab
    ctx.fillStyle = col.colors[0];
    ctx.beginPath(); ctx.roundRect(x - w/2 + 4, y - h/2, w - 8, 30, 6); ctx.fill();
    // Windshield
    ctx.fillStyle = 'rgba(15,23,42,0.85)';
    ctx.beginPath(); ctx.roundRect(x - w/2 + 8, y - h/2 + 4, w - 16, 14, 3); ctx.fill();
    // Headlights
    ctx.fillStyle = '#fff'; ctx.shadowBlur = 18; ctx.shadowColor = '#fffbe0';
    ctx.fillRect(x - w/2 + 5, y - h/2 + 2, 10, 4);
    ctx.fillRect(x + w/2 - 15, y - h/2 + 2, 10, 4);
    // Wheels
    ctx.shadowBlur = 0; ctx.fillStyle = '#1e293b';
    [y - h/2 + 38, y + h/2 - 10].forEach(wy => {
        ctx.beginPath(); ctx.ellipse(x - w/2 + 5, wy, 6, 7, 0, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(x + w/2 - 5, wy, 6, 7, 0, 0, Math.PI*2); ctx.fill();
    });
}

function drawBike(ctx, x, y) {
    const col = getColor();
    ctx.shadowBlur = 18; ctx.shadowColor = col.colors[1];

    // ── 後輪（楕円・上から見た太いタイヤ）
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.ellipse(x, y + 26, 8, 13, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(x, y + 26, 8, 13, 0, 0, Math.PI*2); ctx.stroke();

    // ── 前輪
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.ellipse(x, y - 26, 7, 12, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(x, y - 26, 7, 12, 0, 0, Math.PI*2); ctx.stroke();

    // ── フレーム（縦軸）
    ctx.strokeStyle = col.colors[0]; ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.lineTo(x, y + 14); ctx.stroke();

    // ── タンク（胴体・菱形っぽい）
    const tg = ctx.createLinearGradient(x - 10, y, x + 10, y);
    tg.addColorStop(0, col.colors[0]); tg.addColorStop(0.5, col.colors[1]); tg.addColorStop(1, col.colors[2]);
    ctx.fillStyle = tg; ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.moveTo(x, y - 14);     // 前先端
    ctx.lineTo(x + 11, y - 2); // 右
    ctx.lineTo(x + 9, y + 10); // 右後ろ
    ctx.lineTo(x, y + 14);     // 後先端
    ctx.lineTo(x - 9, y + 10); // 左後ろ
    ctx.lineTo(x - 11, y - 2); // 左
    ctx.closePath(); ctx.fill();

    // ── エンジン（中央のブロック）
    ctx.fillStyle = 'rgba(15,23,42,0.7)';
    ctx.beginPath(); ctx.roundRect(x - 5, y - 4, 10, 10, 2); ctx.fill();

    // ── ハンドル（横棒）
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.shadowBlur = 0;
    ctx.beginPath(); ctx.moveTo(x - 13, y - 18); ctx.lineTo(x + 13, y - 18); ctx.stroke();
    // グリップ
    ctx.strokeStyle = col.colors[1]; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(x - 13, y - 18); ctx.lineTo(x - 13, y - 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 13, y - 18); ctx.lineTo(x + 13, y - 14); ctx.stroke();

    // ── ライダー（シルエット）
    ctx.fillStyle = col.colors[0]; ctx.shadowBlur = 8; ctx.shadowColor = col.colors[1];
    // 頭
    ctx.beginPath(); ctx.ellipse(x, y - 8, 5, 6, 0, 0, Math.PI*2); ctx.fill();
    // 胴
    ctx.beginPath(); ctx.ellipse(x, y + 3, 7, 9, 0, 0, Math.PI*2); ctx.fill();

    // ── マフラー
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x + 9, y + 10); ctx.bezierCurveTo(x + 16, y + 14, x + 18, y + 22, x + 14, y + 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 9, y + 10); ctx.bezierCurveTo(x - 16, y + 14, x - 18, y + 22, x - 14, y + 30); ctx.stroke();

    // ── ヘッドライト
    ctx.fillStyle = '#fff'; ctx.shadowBlur = 14; ctx.shadowColor = '#fffbe0';
    ctx.beginPath(); ctx.ellipse(x, y - 36, 4, 3, 0, 0, Math.PI*2); ctx.fill();
}

function drawBicycle(ctx, x, y) {
    const col = getColor();
    ctx.shadowBlur = 10; ctx.shadowColor = col.colors[1];

    // ── 後輪（細め）
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.ellipse(x, y + 24, 6, 11, 0, 0, Math.PI*2); ctx.stroke();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(x, y + 24, 6, 11, 0, 0, Math.PI*2); ctx.stroke();
    // スポーク
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI;
        ctx.beginPath(); ctx.moveTo(x, y + 24); ctx.lineTo(x + Math.cos(a) * 6, y + 24 + Math.sin(a) * 11); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y + 24); ctx.lineTo(x - Math.cos(a) * 6, y + 24 - Math.sin(a) * 11); ctx.stroke();
    }

    // ── 前輪
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.ellipse(x, y - 24, 6, 11, 0, 0, Math.PI*2); ctx.stroke();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(x, y - 24, 6, 11, 0, 0, Math.PI*2); ctx.stroke();
    // スポーク
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI;
        ctx.beginPath(); ctx.moveTo(x, y - 24); ctx.lineTo(x + Math.cos(a) * 6, y - 24 + Math.sin(a) * 11); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y - 24); ctx.lineTo(x - Math.cos(a) * 6, y - 24 - Math.sin(a) * 11); ctx.stroke();
    }

    // ── ダイヤモンドフレーム
    ctx.strokeStyle = col.colors[1]; ctx.lineWidth = 2.5; ctx.shadowBlur = 8;
    // トップチューブ（上部横）& ダウンチューブ
    ctx.beginPath();
    ctx.moveTo(x, y - 13);   // フォーク
    ctx.lineTo(x - 5, y);    // BB（クランク）
    ctx.lineTo(x, y + 13);   // リアエンド
    ctx.moveTo(x, y - 13);
    ctx.lineTo(x + 5, y);
    ctx.lineTo(x, y + 13);
    ctx.stroke();
    // シートチューブ（中央縦）
    ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4); ctx.stroke();
    // チェーンステー
    ctx.strokeStyle = col.colors[0]; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x - 4, y + 2); ctx.lineTo(x, y + 13); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 4, y + 2); ctx.lineTo(x, y + 13); ctx.stroke();

    // ── BB・クランク
    ctx.fillStyle = col.colors[1]; ctx.shadowBlur = 6;
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI*2); ctx.fill();
    // ペダル
    ctx.fillStyle = '#64748b'; ctx.shadowBlur = 0;
    ctx.fillRect(x - 9, y - 1.5, 6, 3);
    ctx.fillRect(x + 3, y - 1.5, 6, 3);

    // ── フォーク（前）
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, y - 13); ctx.lineTo(x, y - 14); ctx.stroke();

    // ── ハンドル
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x - 10, y - 17); ctx.lineTo(x + 10, y - 17); ctx.stroke();
    // グリップ
    ctx.strokeStyle = col.colors[0]; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x - 10, y - 17); ctx.lineTo(x - 10, y - 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 10, y - 17); ctx.lineTo(x + 10, y - 14); ctx.stroke();

    // ── サドル
    ctx.fillStyle = '#334155';
    ctx.beginPath(); ctx.roundRect(x - 6, y + 14, 12, 5, 2); ctx.fill();
    ctx.fillStyle = col.colors[0];
    ctx.beginPath(); ctx.roundRect(x - 5, y + 14, 10, 4, 2); ctx.fill();

    // ── ライダー
    ctx.fillStyle = col.colors[0]; ctx.shadowBlur = 8; ctx.shadowColor = col.colors[1];
    ctx.beginPath(); ctx.ellipse(x, y - 6, 4, 5, 0, 0, Math.PI*2); ctx.fill(); // 頭
    ctx.beginPath(); ctx.ellipse(x, y + 4, 5, 7, 0, 0, Math.PI*2); ctx.fill(); // 胴体
}

function drawCamper(ctx, x, y) {
    const col = getColor();
    const w = 44, h = 88;
    ctx.shadowBlur = 22; ctx.shadowColor = col.colors[1];
    // Body
    const g = ctx.createLinearGradient(x - w/2, y, x + w/2, y);
    g.addColorStop(0, col.colors[0]); g.addColorStop(0.5, col.colors[1]); g.addColorStop(1, col.colors[2]);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.roundRect(x - w/2, y - h/2, w, h, 8); ctx.fill();
    // Windows side (living area)
    ctx.fillStyle = 'rgba(15,23,42,0.8)';
    ctx.beginPath(); ctx.roundRect(x - w/2 + 6, y - h/2 + 18, w - 12, 12, 3); ctx.fill();
    ctx.beginPath(); ctx.roundRect(x - w/2 + 6, y - h/2 + 36, w - 12, 12, 3); ctx.fill();
    // Front windshield
    ctx.beginPath(); ctx.roundRect(x - w/2 + 6, y + h/2 - 22, w - 12, 12, 3); ctx.fill();
    // Roof rack line
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x - w/2 + 4, y - h/2 + 8); ctx.lineTo(x + w/2 - 4, y - h/2 + 8); ctx.stroke();
    // Headlights
    ctx.fillStyle = '#fff'; ctx.shadowBlur = 16; ctx.shadowColor = '#fffbe0';
    ctx.fillRect(x - w/2 + 4, y + h/2 - 6, 10, 4);
    ctx.fillRect(x + w/2 - 14, y + h/2 - 6, 10, 4);
}

function drawUFO(ctx, x, y) {
    const col = getColor();
    const frame = state.frame;
    const hover = Math.sin(frame * 0.08) * 4;
    const fy = y + hover;
    ctx.shadowBlur = 30; ctx.shadowColor = col.colors[1];
    // Beam
    const beamGrad = ctx.createLinearGradient(x, fy + 10, x, fy + 50);
    beamGrad.addColorStop(0, `${col.colors[1]}88`);
    beamGrad.addColorStop(1, `${col.colors[1]}00`);
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(x - 18, fy + 10); ctx.lineTo(x + 18, fy + 10);
    ctx.lineTo(x + 30, fy + 50); ctx.lineTo(x - 30, fy + 50); ctx.closePath(); ctx.fill();
    // Disc body
    ctx.shadowBlur = 25; ctx.shadowColor = col.colors[1];
    const g = ctx.createRadialGradient(x, fy, 2, x, fy, 30);
    g.addColorStop(0, col.colors[1]); g.addColorStop(1, col.colors[0]);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(x, fy, 30, 10, 0, 0, Math.PI*2); ctx.fill();
    // Dome
    ctx.fillStyle = 'rgba(15,23,42,0.7)';
    ctx.beginPath(); ctx.ellipse(x, fy - 4, 14, 10, 0, Math.PI, Math.PI*2); ctx.fill();
    ctx.strokeStyle = col.colors[1]; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(x, fy - 4, 14, 10, 0, Math.PI, Math.PI*2); ctx.stroke();
    // Lights around disc
    ctx.shadowBlur = 10;
    const lightCount = 6;
    for (let i = 0; i < lightCount; i++) {
        const angle = (i / lightCount) * Math.PI * 2 + frame * 0.05;
        const lx = x + Math.cos(angle) * 22;
        const ly = fy + Math.sin(angle) * 6;
        ctx.fillStyle = i % 2 === 0 ? '#fbbf24' : col.colors[1];
        ctx.beginPath(); ctx.arc(lx, ly, 2.5, 0, Math.PI*2); ctx.fill();
    }
}

function drawBoat(ctx, x, y) {
    const col = getColor();
    const frame = state.frame;
    // ゆらゆら揺れる
    const rock = Math.sin(frame * 0.06) * 3;
    const ry = y + rock;

    ctx.shadowBlur = 18; ctx.shadowColor = col.colors[1];

    // 水面の波紋
    ctx.strokeStyle = 'rgba(0,180,255,0.25)'; ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        const waveOff = (frame * 1.5 + i * 20) % 60 - 30;
        ctx.beginPath();
        ctx.ellipse(x, ry + 26, 24 + i * 8, 4, 0, 0, Math.PI*2);
        ctx.stroke();
    }

    // 船体（hull）
    const g = ctx.createLinearGradient(x - 26, ry, x + 26, ry);
    g.addColorStop(0, col.colors[0]); g.addColorStop(0.5, col.colors[1]); g.addColorStop(1, col.colors[2]);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x - 24, ry + 10);
    ctx.lineTo(x + 24, ry + 10);
    ctx.lineTo(x + 18, ry + 28);
    ctx.lineTo(x - 18, ry + 28);
    ctx.closePath(); ctx.fill();

    // デッキ（上部）
    ctx.fillStyle = col.colors[0];
    ctx.beginPath(); ctx.roundRect(x - 14, ry - 10, 28, 22, 4); ctx.fill();

    // キャビン窓
    ctx.fillStyle = 'rgba(15,23,42,0.85)';
    ctx.beginPath(); ctx.roundRect(x - 8, ry - 6, 16, 10, 3); ctx.fill();

    // マスト
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, ry - 10); ctx.lineTo(x, ry - 50); ctx.stroke();

    // 帆
    const sailSway = Math.sin(frame * 0.04) * 4;
    ctx.fillStyle = `rgba(255,255,255,0.85)`;
    ctx.beginPath();
    ctx.moveTo(x, ry - 48);
    ctx.quadraticCurveTo(x + 22 + sailSway, ry - 32, x + 2, ry - 14);
    ctx.closePath(); ctx.fill();

    // 灯台光
    ctx.fillStyle = '#fff'; ctx.shadowBlur = 12; ctx.shadowColor = '#fffbe0';
    ctx.beginPath(); ctx.arc(x, ry - 50, 3, 0, Math.PI*2); ctx.fill();
}

function drawPlane(ctx, x, y) {
    const col = getColor();
    const frame = state.frame;
    // 上下に浮遊
    const hover = Math.sin(frame * 0.05) * 3;
    const py = y + hover;

    ctx.shadowBlur = 22; ctx.shadowColor = col.colors[1];

    // エンジン噴射（後ろ）
    const thrustAlpha = 0.5 + Math.sin(frame * 0.2) * 0.3;
    const thrustGrad = ctx.createLinearGradient(x, py + 32, x, py + 62);
    thrustGrad.addColorStop(0, `rgba(255,140,0,${thrustAlpha})`);
    thrustGrad.addColorStop(0.5, `rgba(255,60,0,${thrustAlpha * 0.6})`);
    thrustGrad.addColorStop(1, 'rgba(255,80,0,0)');
    ctx.fillStyle = thrustGrad;
    ctx.beginPath();
    ctx.ellipse(x, py + 46, 6, 18, 0, 0, Math.PI*2); ctx.fill();

    // 胴体
    const g = ctx.createLinearGradient(x - 14, py, x + 14, py);
    g.addColorStop(0, col.colors[0]); g.addColorStop(0.5, col.colors[1]); g.addColorStop(1, col.colors[2]);
    ctx.fillStyle = g;
    ctx.beginPath();
    // 前方（先が尖った流線型）
    ctx.moveTo(x, py - 38);
    ctx.bezierCurveTo(x + 14, py - 20, x + 14, py + 20, x + 10, py + 38);
    ctx.lineTo(x - 10, py + 38);
    ctx.bezierCurveTo(x - 14, py + 20, x - 14, py - 20, x, py - 38);
    ctx.closePath(); ctx.fill();

    // コックピット窓
    ctx.fillStyle = 'rgba(15,23,42,0.85)';
    ctx.beginPath(); ctx.ellipse(x, py - 22, 6, 9, 0, 0, Math.PI*2); ctx.fill();

    // 主翼（左右）
    ctx.fillStyle = col.colors[0];
    // 左翼
    ctx.beginPath();
    ctx.moveTo(x - 10, py - 4);
    ctx.lineTo(x - 42, py + 14);
    ctx.lineTo(x - 30, py + 18);
    ctx.lineTo(x - 8, py + 6);
    ctx.closePath(); ctx.fill();
    // 右翼
    ctx.beginPath();
    ctx.moveTo(x + 10, py - 4);
    ctx.lineTo(x + 42, py + 14);
    ctx.lineTo(x + 30, py + 18);
    ctx.lineTo(x + 8, py + 6);
    ctx.closePath(); ctx.fill();

    // 水平尾翼
    ctx.fillStyle = col.colors[1];
    ctx.beginPath();
    ctx.moveTo(x - 8, py + 30);
    ctx.lineTo(x - 22, py + 38);
    ctx.lineTo(x - 8, py + 38);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 8, py + 30);
    ctx.lineTo(x + 22, py + 38);
    ctx.lineTo(x + 8, py + 38);
    ctx.closePath(); ctx.fill();

    // 航行灯
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#f87171'; ctx.shadowColor = '#f87171';
    ctx.beginPath(); ctx.arc(x - 42, py + 14, 2.5, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#4ade80'; ctx.shadowColor = '#4ade80';
    ctx.beginPath(); ctx.arc(x + 42, py + 14, 2.5, 0, Math.PI*2); ctx.fill();
    // フラッシュライト（点滅）
    if (frame % 30 < 15) {
        ctx.fillStyle = '#fff'; ctx.shadowBlur = 14; ctx.shadowColor = '#fff';
        ctx.beginPath(); ctx.arc(x, py - 38, 3, 0, Math.PI*2); ctx.fill();
    }
}

function triggerGameOver() {
    state.isGameOver = true;
    // 寝落ちしたリアル時刻を記録（タイマーが0になった瞬間）
    const sleepRealTime = new Date();
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
                // Set play time and relax level
                const finalPlaySec = Math.floor(state.elapsedTime / 1000);
                const pm = Math.floor(finalPlaySec / 60).toString().padStart(2, '0');
                const ps = (finalPlaySec % 60).toString().padStart(2, '0');
                document.getElementById('play-time-display').innerText = `${t('UI_10')} ${pm}:${ps}`;

                // Calculate Relax Level
                let relaxLevel = '中';
                if (finalPlaySec >= 600) {
                    relaxLevel = '高'; // 10 minutes+
                } else if (finalPlaySec < 120) {
                    relaxLevel = '低'; // < 2 minutes
                }
                
                state.lastPlayLog = {
                    date: sleepRealTime.toISOString(),
                    playTimeSec: finalPlaySec,
                    relaxLevel: relaxLevel,
                    checkpoints: state.checkpointsCollected
                };
                localStorage.setItem('languid_last_play_log', JSON.stringify(state.lastPlayLog));

                // 寝落ちリアル時刻を表示
                const sh = sleepRealTime.getHours().toString().padStart(2, '0');
                const sm = sleepRealTime.getMinutes().toString().padStart(2, '0');
                const ss = sleepRealTime.getSeconds().toString().padStart(2, '0');
                document.getElementById('sleep-real-time-display').innerText = `😴 ${sh}:${sm}:${ss}`;

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
    const playerY = h - 150;
    ctx.save();
    drawPlayer(ctx, state.playerX, playerY);
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
