let isTransposed = localStorage.getItem('isTransposed') === 'true';

function toggleTranspose() {
    isTransposed = !isTransposed;
    localStorage.setItem('isTransposed', isTransposed);
    render();
}

let gCount = parseInt(localStorage.getItem('gCount')) || 5;
let cCount = parseInt(localStorage.getItem('cCount')) || 6;
let hSize = parseFloat(localStorage.getItem('hSize')) || 3.0;
let fSize = parseFloat(localStorage.getItem('fSize')) || 1.1;
let tWidth = parseInt(localStorage.getItem('tWidth')) || 80;
let rHeight = parseInt(localStorage.getItem('rHeight')) || 8;
let sSize = parseFloat(localStorage.getItem('sSize')) || 1.3;
let headingColor = localStorage.getItem('headingColor') || '#ffffff';
let compHeaderColor = localStorage.getItem('compHeaderColor') || '';
let compHeaderTextColor = localStorage.getItem('compHeaderTextColor') || '#ffffff';


const presetColors = [
    { bg: '#000000', text: '#ffffff', label: 'Black' },
    { bg: '#ffffff', text: '#000000', label: 'White' },
    { bg: '#607d8b', text: '#ffffff', label: 'Grey' },
    { bg: '#c0392b', text: '#ffffff', label: 'Red' },
    { bg: '#1565c0', text: '#ffffff', label: 'Blue' },
    { bg: '#2e7d32', text: '#ffffff', label: 'Green' },
    { bg: '#e65100', text: '#ffffff', label: 'Orange' },
    { bg: '#6a1b9a', text: '#ffffff', label: 'Purple' },
    { bg: '#4e342e', text: '#ffffff', label: 'Brown' },
    { bg: '#f9a825', text: '#000000', label: 'Gold' },
    { bg: '#e91e63', text: '#ffffff', label: 'Pink' },
    { bg: '#00838f', text: '#ffffff', label: 'Turquoise' },
    { bg: '#558b2f', text: '#ffffff', label: 'Olive' },
    { bg: '#0d47a1', text: '#ffffff', label: 'Dark Blue' },
    { bg: '#b71c1c', text: '#ffffff', label: 'Dark Red' },
    { bg: '#0288d1', text: '#ffffff', label: 'Sky Blue' },
    { bg: '#ff5722', text: '#ffffff', label: 'Coral' },
    { bg: '#90a4ae', text: '#000000', label: 'Silver' },
    { bg: '#c6e03a', text: '#000000', label: 'Lime' },
    { bg: '#1b5e20', text: '#ffffff', label: 'Dark Green' },
    { bg: '#4a148c', text: '#ffffff', label: 'Violet' }
];

function toggleFullScreen(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.isContentEditable) return;

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            if ('keyboard' in navigator && 'lock' in navigator.keyboard) {
                navigator.keyboard.lock(['Escape']).catch(err => console.log('Keyboard lock failed', err));
            }
        }).catch(err => {
            console.log(`Error: ${err.message}`);
        });
    }
}


function enterApp() {
    const ws = document.getElementById('welcomeScreen');
    ws.classList.add('fade-out');
    setTimeout(() => {
        ws.style.display = 'none';
        
        
        const savedBg = localStorage.getItem('bgTheme');
        for (let i = 0; i < bgThemes.length; i++) document.body.classList.remove('bg-' + i);
        if (savedBg !== null) {
            document.body.classList.add('bg-' + savedBg);
        }
        applySbTimerUI();

        
        setTimeout(() => {
            let firstCell = document.querySelector('.score-input');
            if (firstCell) {
                firstCell.focus();
            }
        }, 50);
    }, 800);
}


const bgThemes = [
    { label: 'Classic Blue', gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' },
    { label: 'Dark Night',  gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
    { label: 'Sunset',      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { label: 'Ocean Mint',  gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { label: 'Golden Hour', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
    { label: 'Deep Space',  gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
    { label: 'Rose Gold',   gradient: 'linear-gradient(135deg, #f8cdda 0%, #1d2b64 100%)' },
    { label: 'Lush Green',  gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' },
    { label: 'Fire Blaze',  gradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' },
    { label: 'Arctic Ice',  gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { label: 'Midnight',    gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
    { label: 'Pure White',  gradient: '#ffffff' }
];

let isAutoSortEnabled = localStorage.getItem('isAutoSortEnabled') !== 'false';

function showToast(message) {
    let existing = document.getElementById('sortToast');
    if (existing) {
        existing.innerText = message;
        existing.style.opacity = '1';
        clearTimeout(existing.timeoutId);
    } else {
        const toast = document.createElement('div');
        toast.id = 'sortToast';
        toast.style.position = 'fixed';
        toast.style.bottom = '15%';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'rgba(0,0,0,0.8)';
        toast.style.color = 'white';
        toast.style.padding = '10px 25px';
        toast.style.borderRadius = '30px';
        toast.style.fontSize = '1.3rem';
        toast.style.fontWeight = 'bold';
        toast.style.zIndex = '100000';
        toast.style.transition = 'opacity 0.3s ease';
        toast.style.pointerEvents = 'none';
        toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        toast.innerText = message;
        document.body.appendChild(toast);
        existing = toast;
    }

    existing.timeoutId = setTimeout(() => {
        existing.style.opacity = '0';
        setTimeout(() => {
            if (existing && existing.parentNode) {
                existing.parentNode.removeChild(existing);
            }
        }, 300);
    }, 2000);
}

function toggleAutoSort() {
    isAutoSortEnabled = !isAutoSortEnabled;
    localStorage.setItem('isAutoSortEnabled', isAutoSortEnabled);
    updateSortBtnUI();
    
    if (isAutoSortEnabled) {
        playBeep(800, 100, 0.1);
        setTimeout(() => playBeep(1000, 150, 0.1), 150);
        showToast("Sort ON");
    } else {
        playBeep(600, 150, 0.1);
        showToast("Sort OFF");
    }
    
    if (typeof isTransposed !== 'undefined') {
        isTransposed ? sortCols() : sortGroups();
    }
}

function updateSortBtnUI() {
    const btn = document.getElementById('toggleSortBtn');
    if (btn) {
        btn.innerText = isAutoSortEnabled ? 'Auto-Sort: ON' : 'Auto-Sort: OFF';
        btn.style.backgroundColor = isAutoSortEnabled ? '#27ae60' : '#e74c3c';
    }
}
window.addEventListener('load', updateSortBtnUI);

function applyBg(idx) {
    for (let i = 0; i < bgThemes.length; i++) document.body.classList.remove('bg-' + i);
    document.body.classList.add('bg-' + idx);
    localStorage.setItem('bgTheme', idx);
}


(function() {
    const saved = localStorage.getItem('bgTheme');
    if (saved !== null) applyBg(parseInt(saved));
})();

function showBgPanel() {
    const grid = document.getElementById('bgGrid');
    grid.innerHTML = '';
    const current = localStorage.getItem('bgTheme') || '0';
    bgThemes.forEach((theme, idx) => {
        const card = document.createElement('div');
        card.className = 'bg-card' + (String(idx) === current ? ' active' : '');
        card.style.background = theme.gradient;
        card.title = theme.label;
        card.innerHTML = `<span class="bg-card-label">${theme.label}</span>`;
        card.onclick = () => { applyBg(idx); showBgPanel(); };
        grid.appendChild(card);
    });
    document.getElementById('bgPanel').classList.add('show');
}

function closeBgPanel() {
    document.getElementById('bgPanel').classList.remove('show');
}

function hideBgPanel(e) {
    if (e.target.id === 'bgPanel') closeBgPanel();
}

async function exportData() {
    let data = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
    }
    
    try {
        const cache = await caches.open('app-logo-cache');
        const response = await cache.match('/app-logo');
        if (response) {
            const blob = await response.blob();
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
            data['exported_app_logo_base64'] = base64;
        }
    } catch(e) {
        console.error("Logo export error: ", e);
    }

    let blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "MUQAMI_ERA_2026.json";
    a.click();
}

function importData() {
    document.getElementById('importInput').click();
}

function processFile(input) {
    let file = input.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = async function (e) {
            let data = JSON.parse(e.target.result);
            localStorage.clear();
            
            
            if (data['exported_app_logo_base64']) {
                try {
                    const res = await fetch(data['exported_app_logo_base64']);
                    const blob = await res.blob();
                    const cache = await caches.open('app-logo-cache');
                    await cache.put('/app-logo', new Response(blob));
                } catch(err) {
                    console.error("Logo import error:", err);
                }
                
                delete data['exported_app_logo_base64'];
            }

            for (let key in data) {
                localStorage.setItem(key, data[key]);
            }

            alert("ڈیٹا کامیابی سے لوڈ ہو گیا ہے!\n(ایپ اب ریفریش ہو گی تاکہ تمام سیٹنگز، ٹائمر، اور ٹاس اپڈیٹ ہو سکیں)");
            window.location.reload();
        };
        reader.readAsText(file);
    }
}

function updateStyles() {
    document.documentElement.style.setProperty('--h-size', hSize + 'rem');
    document.documentElement.style.setProperty('--f-size', fSize + 'rem');
    document.documentElement.style.setProperty('--t-width', tWidth + '%');
    document.documentElement.style.setProperty('--row-height', rHeight + 'px');
    document.documentElement.style.setProperty('--s-size', sSize + 'rem');
    document.documentElement.style.setProperty('--heading-color', headingColor);
}
updateStyles();

function changeH(d) { hSize += d; localStorage.setItem('hSize', hSize); updateStyles(); }
function changeF(d) { fSize += d; localStorage.setItem('fSize', fSize); updateStyles(); }
function changeW(d) { tWidth = Math.min(Math.max(tWidth + d, 30), 100); localStorage.setItem('tWidth', tWidth); updateStyles(); }
function changeRowHeight(d) { rHeight = Math.min(Math.max(rHeight + d, 2), 100); localStorage.setItem('rHeight', rHeight); updateStyles(); }
function changeS(d) { sSize += d; localStorage.setItem('sSize', sSize); updateStyles(); }

const titleEl = document.getElementById('mainTitle');
const adminControls = document.getElementById('adminControls');
if (adminControls.classList.contains('hidden-controls')) {
    document.body.classList.add('hide-inline-del');
}

titleEl.innerHTML = localStorage.getItem('sb_title') || 'ٹائٹل لکھیں';
titleEl.onblur = () => localStorage.setItem('sb_title', titleEl.innerHTML);

function applyGroupColor(element, gIndex) {
    const bg = localStorage.getItem(`gc_bg_${gIndex}`);
    const text = localStorage.getItem(`gc_text_${gIndex}`);
    if (bg) {
        element.style.backgroundColor = bg;
        element.style.color = text || '#fff';
        element.style.borderColor = (text === '#000000' || text === '#000') ? '#ccc' : 'rgba(255,255,255,0.3)';
    } else {
        element.style.backgroundColor = '';
        element.style.color = '';
        element.style.borderColor = '#ccc';
    }
}

function applyCompHeaderColor(element) {
    if (compHeaderColor) {
        element.style.backgroundColor = compHeaderColor;
        element.style.color = compHeaderTextColor || '#ffffff';
        element.style.borderColor = (compHeaderTextColor === '#000000' || compHeaderTextColor === '#000') ? '#ccc' : 'rgba(255,255,255,0.3)';
    } else {
        element.style.backgroundColor = '';
        element.style.color = '';
        element.style.borderColor = '#ccc';
    }
}


function showColorPanel() {
    document.getElementById('colorPanelTitle').textContent = '🎨 گروپ رنگ منتخب کریں';
    const list = document.getElementById('colorGroupList');
    list.innerHTML = '';
    for (let g = 1; g <= gCount; g++) {
        const gName = localStorage.getItem('gn' + g) || 'گروپ ' + g;
        const savedBg = localStorage.getItem(`gc_bg_${g}`) || '';

        const row = document.createElement('div');
        row.className = 'color-group-row';

        const label = document.createElement('div');
        label.className = 'color-group-label';
        label.textContent = gName;
        row.appendChild(label);

        const swatches = document.createElement('div');
        swatches.className = 'color-swatches';

        
        const reset = document.createElement('div');
        reset.className = 'swatch-reset';
        reset.title = 'رنگ ہٹائیں';
        reset.textContent = '✕';
        reset.onclick = () => setGroupColor(g, '', '');
        swatches.appendChild(reset);

        presetColors.forEach(pc => {
            const sw = document.createElement('div');
            sw.className = 'swatch' + (savedBg === pc.bg ? ' active' : '');
            sw.style.backgroundColor = pc.bg;
            sw.style.border = pc.bg === '#ffffff' ? '3px solid #999' : '3px solid transparent';
            sw.title = pc.label;
            sw.dataset.g = g;
            sw.dataset.bg = pc.bg;
            sw.onclick = () => setGroupColor(g, pc.bg, pc.text);
            swatches.appendChild(sw);
        });

        row.appendChild(swatches);
        list.appendChild(row);
    }
    document.getElementById('colorPanel').classList.add('show');
}

function showHeadingColorPanel() {
    document.getElementById('colorPanelTitle').textContent = '🎨 ہیڈنگ رنگ منتخب کریں';
    const list = document.getElementById('colorGroupList');
    list.innerHTML = '';

    const row = document.createElement('div');
    row.className = 'color-group-row';

    const label = document.createElement('div');
    label.className = 'color-group-label';
    label.textContent = 'ہیڈنگ رنگ';
    row.appendChild(label);

    const swatches = document.createElement('div');
    swatches.className = 'color-swatches';

    const reset = document.createElement('div');
    reset.className = 'swatch-reset';
    reset.title = 'رنگ واپس ڈیفالٹ کریں';
    reset.textContent = '✕';
    reset.onclick = () => setHeadingColor('');
    swatches.appendChild(reset);

    const savedColor = localStorage.getItem('headingColor') || '#ffffff';
    presetColors.forEach(pc => {
        const sw = document.createElement('div');
        sw.className = 'swatch' + (savedColor === pc.bg ? ' active' : '');
        sw.style.backgroundColor = pc.bg;
        sw.style.border = pc.bg === '#ffffff' ? '3px solid #999' : '3px solid transparent';
        sw.title = pc.label;
        sw.onclick = () => setHeadingColor(pc.bg);
        swatches.appendChild(sw);
    });

    row.appendChild(swatches);
    list.appendChild(row);
    document.getElementById('colorPanel').classList.add('show');
}

function showCompHeaderColorPanel() {
    document.getElementById('colorPanelTitle').textContent = '🎨 مقابلہ ہیڈر رنگ منتخب کریں';
    const list = document.getElementById('colorGroupList');
    list.innerHTML = '';

    const row = document.createElement('div');
    row.className = 'color-group-row';

    const label = document.createElement('div');
    label.className = 'color-group-label';
    label.textContent = 'مقابلہ ہیڈر';
    row.appendChild(label);

    const swatches = document.createElement('div');
    swatches.className = 'color-swatches';

    const reset = document.createElement('div');
    reset.className = 'swatch-reset';
    reset.title = 'رنگ واپس ڈیفالٹ کریں';
    reset.textContent = '✕';
    reset.onclick = () => setCompHeaderColor('', '');
    swatches.appendChild(reset);

    const savedColor = localStorage.getItem('compHeaderColor') || '';
    presetColors.forEach(pc => {
        const sw = document.createElement('div');
        sw.className = 'swatch' + (savedColor === pc.bg ? ' active' : '');
        sw.style.backgroundColor = pc.bg;
        sw.style.border = pc.bg === '#ffffff' ? '3px solid #999' : '3px solid transparent';
        sw.title = pc.label;
        sw.onclick = () => setCompHeaderColor(pc.bg, pc.text);
        swatches.appendChild(sw);
    });

    row.appendChild(swatches);
    list.appendChild(row);
    document.getElementById('colorPanel').classList.add('show');
}

function setHeadingColor(color) {
    if (color) {
        headingColor = color;
        localStorage.setItem('headingColor', color);
    } else {
        headingColor = '#ffffff';
        localStorage.removeItem('headingColor');
    }
    
    
    localStorage.setItem('timerTitleColor', headingColor);
    if (typeof timerTitleColor !== 'undefined') timerTitleColor = headingColor;
    const timerTitleEl = document.getElementById('timerMainTitle');
    if (timerTitleEl) timerTitleEl.style.color = headingColor;
    
    localStorage.setItem('tossHeadingColor', headingColor);
    if (typeof tossHeadingColor !== 'undefined') tossHeadingColor = headingColor;
    const tossTitleEl = document.getElementById('tossMainTitle');
    if (tossTitleEl) tossTitleEl.style.color = headingColor;
    
    
    const elTimerInput = document.getElementById('timerTitleColor');
    if (elTimerInput) elTimerInput.value = headingColor;
    const elTossInput = document.getElementById('tossHeadingColor');
    if (elTossInput) elTossInput.value = headingColor;

    updateStyles();
    showHeadingColorPanel();
}

function setCompHeaderColor(bg, text) {
    if (bg) {
        compHeaderColor = bg;
        compHeaderTextColor = text || '#ffffff';
        localStorage.setItem('compHeaderColor', bg);
        localStorage.setItem('compHeaderTextColor', compHeaderTextColor);
    } else {
        compHeaderColor = '';
        compHeaderTextColor = '#ffffff';
        localStorage.removeItem('compHeaderColor');
        localStorage.removeItem('compHeaderTextColor');
    }
    render();
    showCompHeaderColorPanel();
}

function setGroupColor(g, bg, text) {
    if (bg) {
        localStorage.setItem(`gc_bg_${g}`, bg);
        localStorage.setItem(`gc_text_${g}`, text);
    } else {
        localStorage.removeItem(`gc_bg_${g}`);
        localStorage.removeItem(`gc_text_${g}`);
    }
    render();
    showColorPanel(); 
}

function closeColorPanel() {
    document.getElementById('colorPanel').classList.remove('show');
}

function hideColorPanel(e) {
    if (e.target.id === 'colorPanel') closeColorPanel();
}

const saveStep = (transposed, c, v) => {
    localStorage.setItem(`step_${transposed ? 'T' : 'N'}_${c}`, v);
};

window.saveSubStep = (transposed, c, v) => {
    localStorage.setItem(`sub_step_${transposed ? 'T' : 'N'}_${c}`, v);
};

window.adjustValue = (gIdx, cIdx, direction, headerColIdx, btnElement) => {
    let step = 1;
    if (direction === 1) {
        step = parseFloat(localStorage.getItem(`step_${isTransposed ? 'T' : 'N'}_${headerColIdx}`)) || 1;
    } else {
        step = parseFloat(localStorage.getItem(`sub_step_${isTransposed ? 'T' : 'N'}_${headerColIdx}`)) || 1;
    }
    let oldVal = parseFloat(localStorage.getItem(`v_${gIdx}_${cIdx}`)) || 0;
    let newVal = +(oldVal + (direction * step)).toFixed(2);
    let wrapper = btnElement.closest('.cell-input-wrapper');
    let inputEl = wrapper.querySelector('input');
    inputEl.value = newVal === 0 ? '' : newVal;
    saveV(gIdx, cIdx, newVal);
};

window.toggleManual = (transposed, c, isChecked) => {
    localStorage.setItem(`manual_${transposed ? 'T' : 'N'}_${c}`, isChecked);
    render();
};

function render() {
    const h = document.getElementById('hRow');
    const b = document.getElementById('bRow');

    h.innerHTML = '';
    let thMain = document.createElement('th');
    let cornerText = localStorage.getItem('thMainText_' + isTransposed) || (isTransposed ? 'مقابلہ' : 'گروپ');
    thMain.innerHTML = `<div contenteditable="true" onblur="localStorage.setItem('thMainText_'+${isTransposed}, this.innerText);" style="width: 100%; height: 100%; min-height: 40px; display: flex; align-items: center; justify-content: center; outline: none;">${cornerText}</div>`;
    applyCompHeaderColor(thMain);
    h.appendChild(thMain);
    let headersCount = isTransposed ? gCount : cCount;
    let rowsCount = isTransposed ? cCount : gCount;

    for (let i = 1; i <= headersCount; i++) {
        if (isTransposed) {
            let gName = localStorage.getItem('gn' + i) || 'گروپ ' + i;
            let th = document.createElement('th');
            th.dataset.g = i;
            th.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:center;">
                    <button class="inline-del" onclick="deleteSpecificGroup(${i})" title="گروپ ڈیلیٹ کریں">❌</button>
                    <div contenteditable="true" onblur="saveN('g',${i},this)" style="flex:1;">${gName}</div>
                </div>`;
            applyGroupColor(th, i);
            h.appendChild(th);
        } else {
            let cName = localStorage.getItem('cn' + i) || 'م ' + i;
            let th = document.createElement('th');
            th.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 4px;">
                    <div contenteditable="true" onblur="saveN('c',${i},this)" style="width:100%;">${cName}</div>
                    <button class="inline-del" onclick="deleteSpecificComp(${i})" title="مقابلہ ڈیلیٹ کریں">❌</button>
                </div>
            `;
            applyCompHeaderColor(th);
            h.appendChild(th);
        }
    }
    if (!isTransposed) {
        let thTotal = document.createElement('th');
        thTotal.className = 'clickable-total';
        thTotal.onclick = showWinnerScreen;
        thTotal.title = 'نتائج دیکھنے کے لیے کلک کریں';
        thTotal.innerText = 'کل پوائنٹس';
        applyCompHeaderColor(thTotal);
        h.appendChild(thTotal);
    }

    b.innerHTML = '';

    let manualRow = document.createElement('tr');
    manualRow.id = 'manualRow';
    if (document.body.classList.contains('hide-inline-del')) {
        manualRow.style.display = 'none';
    }
    let tdManualLabel = document.createElement('td');
    tdManualLabel.className = 'group-name-cell';
    tdManualLabel.innerHTML = `<div style="font-size: 0.85rem; color: #444; background: #eee; padding: 4px; border-radius: 4px; pointer-events: none; line-height: 1.2;">مینول پوائنٹس:</div>`;
    manualRow.appendChild(tdManualLabel);

    for (let c = 1; c <= headersCount; c++) {
        let isManual = localStorage.getItem(`manual_${isTransposed ? 'T' : 'N'}_${c}`) === 'true';
        let tdManual = document.createElement('td');
        if (isTransposed) tdManual.dataset.g = c;
        tdManual.innerHTML = `<input type="checkbox" onchange="toggleManual(${isTransposed}, ${c}, this.checked)" ${isManual ? 'checked' : ''} style="transform: scale(1.5); cursor: pointer; display: block; margin: auto;">`;
        manualRow.appendChild(tdManual);
    }
    
    
    let stepRow = document.createElement('tr');
    stepRow.id = 'stepRow';
    if (document.body.classList.contains('hide-inline-del')) {
        stepRow.style.display = 'none';
    }
    let tdStepLabel = document.createElement('td');
    tdStepLabel.className = 'group-name-cell';
    tdStepLabel.innerHTML = `<div style="font-size: 0.85rem; color: #444; background: #eee; padding: 4px; border-radius: 4px; pointer-events: none; line-height: 1.2;">جمع پوائنٹس:</div>`;
    stepRow.appendChild(tdStepLabel);

    for (let c = 1; c <= headersCount; c++) {
        let isManual = localStorage.getItem(`manual_${isTransposed ? 'T' : 'N'}_${c}`) === 'true';
        let savedStep = localStorage.getItem(`step_${isTransposed ? 'T' : 'N'}_${c}`) || '1';
        let tdStep = document.createElement('td');
        if (isTransposed) tdStep.dataset.g = c;
        tdStep.innerHTML = `<input type="number" class="step-input" oninput="saveStep(${isTransposed}, ${c}, this.value)" value="${savedStep}" ${isManual ? 'disabled style="opacity:0.3;"' : ''}>`;
        stepRow.appendChild(tdStep);
    }
    
    let subStepRow = document.createElement('tr');
    subStepRow.id = 'subStepRow';
    if (document.body.classList.contains('hide-inline-del')) {
        subStepRow.style.display = 'none';
    }
    let tdSubStepLabel = document.createElement('td');
    tdSubStepLabel.className = 'group-name-cell';
    tdSubStepLabel.innerHTML = `<div style="font-size: 0.85rem; color: #444; background: #eee; padding: 4px; border-radius: 4px; pointer-events: none; line-height: 1.2;">منفی پوائنٹس:</div>`;
    subStepRow.appendChild(tdSubStepLabel);

    for (let c = 1; c <= headersCount; c++) {
        let isManual = localStorage.getItem(`manual_${isTransposed ? 'T' : 'N'}_${c}`) === 'true';
        let savedSubStep = localStorage.getItem(`sub_step_${isTransposed ? 'T' : 'N'}_${c}`) || '1';
        let tdSubStep = document.createElement('td');
        if (isTransposed) tdSubStep.dataset.g = c;
        tdSubStep.innerHTML = `<input type="number" class="step-input" oninput="saveSubStep(${isTransposed}, ${c}, this.value)" value="${savedSubStep}" ${isManual ? 'disabled style="opacity:0.3;"' : ''}>`;
        subStepRow.appendChild(tdSubStep);
    }

    if (!isTransposed) {
        let tdManualTotalPlaceholder = document.createElement('td');
        tdManualTotalPlaceholder.style.background = "#fafafa";
        manualRow.appendChild(tdManualTotalPlaceholder);
        
        let tdStepTotalPlaceholder = document.createElement('td');
        tdStepTotalPlaceholder.style.background = "#fafafa";
        stepRow.appendChild(tdStepTotalPlaceholder);
        
        let tdSubStepTotalPlaceholder = document.createElement('td');
        tdSubStepTotalPlaceholder.style.background = "#fafafa";
        subStepRow.appendChild(tdSubStepTotalPlaceholder);
    }
    b.appendChild(manualRow);
    b.appendChild(stepRow);
    b.appendChild(subStepRow);

    for (let r = 1; r <= rowsCount; r++) {
        let tr = document.createElement('tr');
        if (!isTransposed) tr.dataset.g = r;

        let tdName = document.createElement('td');
        tdName.className = 'group-name-cell';

        if (isTransposed) {
            let cName = localStorage.getItem('cn' + r) || 'م ' + r;
            tdName.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 4px;">
                    <div contenteditable="true" onblur="saveN('c',${r},this)" style="width:100%;">${cName}</div>
                    <button class="inline-del" onclick="deleteSpecificComp(${r})" title="مقابلہ ڈیلیٹ کریں">❌</button>
                </div>`;
            applyCompHeaderColor(tdName);
        } else {
            let gName = localStorage.getItem('gn' + r) || 'گروپ ' + r;
            tdName.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:center;">
                    <button class="inline-del" onclick="deleteSpecificGroup(${r})" title="گروپ ڈیلیٹ کریں">❌</button>
                    <div contenteditable="true" onblur="saveN('g',${r},this)" style="flex:1;">${gName}</div>
                </div>`;
            applyGroupColor(tdName, r);
        }
        tr.appendChild(tdName);

        for (let c = 1; c <= headersCount; c++) {
            let gIdx = isTransposed ? c : r;
            let cIdx = isTransposed ? r : c;
            let isManual = localStorage.getItem(`manual_${isTransposed ? 'T' : 'N'}_${c}`) === 'true';
            let val = localStorage.getItem(`v_${gIdx}_${cIdx}`) || '';
            if (val === '0') val = '';
            let tdInput = document.createElement('td');
            if (isTransposed) tdInput.dataset.g = gIdx;
            tdInput.innerHTML = `
                <div class="cell-input-wrapper">
                    <input type="number" class="score-input" data-gidx="${gIdx}" data-cidx="${cIdx}" data-stepcol="${c}" oninput="saveV(${gIdx},${cIdx},this.value)" onblur="isTransposed ? sortCols() : sortGroups()" value="${val}" ${isManual ? '' : 'readonly'}>
                </div>`;
            tr.appendChild(tdInput);
        }

        if (!isTransposed) {
            let tdTotal = document.createElement('td');
            tdTotal.id = 't_' + r;
            tdTotal.className = 'total-score-cell';
            tdTotal.innerText = '0';
            tr.appendChild(tdTotal);
            b.appendChild(tr);
            updateTotal(r);
        } else {
            b.appendChild(tr);
        }
    }

    if (isTransposed) {
        let tFootRow = document.createElement('tr');
        tFootRow.id = 'totalRow';
        let tfName = document.createElement('td');
        tfName.innerText = 'کل پوائنٹس';
        tfName.className = 'group-name-cell clickable-total';
        tfName.onclick = showWinnerScreen;
        tfName.title = "نتائج دیکھنے کے لیے کلک کریں";
        applyCompHeaderColor(tfName);
        tFootRow.appendChild(tfName);

        for (let g = 1; g <= headersCount; g++) {
            let tdTotal = document.createElement('td');
            tdTotal.id = 't_' + g;
            tdTotal.dataset.g = g;
            tdTotal.className = 'total-score-cell';
            tdTotal.innerText = '0';
            tFootRow.appendChild(tdTotal);
        }
        b.appendChild(tFootRow);
        for (let g = 1; g <= headersCount; g++) {
            updateTotal(g);
        }
    }

    highlightWinner();
    isTransposed ? sortCols() : sortGroups();
    makeResizable();
}

const saveN = (t, i, e) => {
    localStorage.setItem(t + 'n' + i, e.innerHTML);
    if (t === 'g') applyGroupColor(e.closest('th, td'), i);
    if (t === 'c' && !isTransposed) render();
};

const saveV = (g, c, v) => {
    localStorage.setItem(`v_${g}_${c}`, v);
    updateTotal(g);
    highlightWinner();
};

function updateTotal(g) {
    let s = 0;
    for (let c = 1; c <= cCount; c++) s += parseFloat(localStorage.getItem(`v_${g}_${c}`)) || 0;
    document.getElementById('t_' + g).innerText = s === 0 ? '' : s;
}

function makeResizable() {
    const hRow = document.getElementById('hRow');
    const bRow = document.getElementById('bRow');
    if (!hRow || !bRow) return;

    Array.from(hRow.children).forEach((cell, idx) => {
        let savedW = localStorage.getItem(`colW_${isTransposed ? 'T' : 'N'}_${idx}`);
        if (savedW) cell.style.width = savedW;

        const resizer = document.createElement('div');
        resizer.className = 'resizer-col';
        cell.appendChild(resizer);

        let startX, startWidth;
        resizer.addEventListener('mousedown', function (e) {
            startX = e.clientX;
            startWidth = parseInt(window.getComputedStyle(cell).width, 10);
            document.documentElement.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';

            const mouseMoveHandler = function (e) {
                const dx = startX - e.clientX;
                const newWidth = startWidth + dx;
                if (newWidth > 30) {
                    cell.style.width = newWidth + 'px';
                }
            };

            const mouseUpHandler = function () {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
                document.documentElement.style.cursor = '';
                document.body.style.userSelect = '';
                localStorage.setItem(`colW_${isTransposed ? 'T' : 'N'}_${idx}`, cell.style.width);
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });
    });

    Array.from(bRow.children).forEach((tr, idx) => {
        let cell = tr.children[0];
        if (!cell) return;

        let savedH = localStorage.getItem(`rowH_${isTransposed ? 'T' : 'N'}_${idx}`);
        if (savedH) cell.style.height = savedH;

        const resizer = document.createElement('div');
        resizer.className = 'resizer-row';
        cell.appendChild(resizer);

        let startY, startHeight;
        resizer.addEventListener('mousedown', function (e) {
            startY = e.clientY;
            startHeight = parseInt(window.getComputedStyle(cell).height, 10);
            document.documentElement.style.cursor = 'row-resize';
            document.body.style.userSelect = 'none';

            const mouseMoveHandler = function (e) {
                const dy = e.clientY - startY;
                const newHeight = startHeight + dy;
                if (newHeight > 20) {
                    cell.style.height = newHeight + 'px';
                }
            };

            const mouseUpHandler = function () {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
                document.documentElement.style.cursor = '';
                document.body.style.userSelect = '';
                localStorage.setItem(`rowH_${isTransposed ? 'T' : 'N'}_${idx}`, cell.style.height);
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });
    });
}

function showWinnerScreen() {
    let groupScores = [];
    for (let g = 1; g <= gCount; g++) {
        let cell = document.getElementById('t_' + g);
        if (cell) {
            let v = parseFloat(cell.innerText) || 0;
            let gName = localStorage.getItem('gn' + g) || 'گروپ ' + g;
            groupScores.push({ name: gName, score: v });
        }
    }

    let scoreMap = {};
    groupScores.forEach(gs => {
        if (gs.score > 0) {
            if (!scoreMap[gs.score]) scoreMap[gs.score] = [];
            scoreMap[gs.score].push(gs.name);
        }
    });

    let uniqueScores = Object.keys(scoreMap).map(Number).sort((a, b) => b - a);

    let gridHTML = "";
    let ranks = [
        { rankClass: 'ws-rank-1', label: 'اول' },
        { rankClass: 'ws-rank-2', label: 'دوم' },
        { rankClass: 'ws-rank-3', label: 'سوم' }
    ];

    for (let i = 0; i < 3; i++) {
        if (uniqueScores[i]) {
            let s = uniqueScores[i];
            let names = scoreMap[s].join(' ، ');
            let rankObj = ranks[i];
            
            
            let cardStyle = `border-color: ${headingColor}; color: ${headingColor};`;
            
            gridHTML += `
                <div class="ws-card ${rankObj.rankClass}" style="${cardStyle}">
                    <div>
                        <span style="font-size:1.5rem; opacity:0.8;">(${rankObj.label})</span>
                        <span class="ws-group-name">${names}</span>
                    </div>
                    <div class="ws-points">${s}</div>
                </div>
            `;
        }
    }

    if (gridHTML === "") {
        gridHTML = "<div style='text-align:center; font-size:2rem;'>کوئی سکور موجود نہیں!</div>";
    }

    let mTitle = document.getElementById('mainTitle').innerText || 'نتیجہ';
    const winnerScreen = document.getElementById('winnerScreen');
    const wsTitle = document.getElementById('wsTitle');

    wsTitle.innerText = mTitle;
    wsTitle.style.color = headingColor;

    const selectedTheme = localStorage.getItem('bgTheme');
    if (selectedTheme !== null && bgThemes[selectedTheme]) {
        winnerScreen.style.background = bgThemes[selectedTheme].gradient;
    } else {
        winnerScreen.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }

    document.getElementById('wsGrid').innerHTML = gridHTML;
    winnerScreen.classList.add('show');
}

function hideWinnerScreen() {
    document.getElementById('winnerScreen').classList.remove('show');
}

function highlightWinner() {
    let scores = [];
    for (let g = 1; g <= gCount; g++) {
        let tCell = document.getElementById('t_' + g);
        if (tCell) {
            let v = parseFloat(tCell.innerText) || 0;
            scores.push(v);
            tCell.classList.remove('winner-cell');
        }
    }
    let uniqueScores = [...new Set(scores)].filter(s => s > 0).sort((a, b) => b - a);
    for (let g = 1; g <= gCount; g++) {
        let cell = document.getElementById('t_' + g);
        if (cell) {
            let v = parseFloat(cell.innerText) || 0;
            let rankHTML = "";
            if (v > 0) {
                if (v === uniqueScores[0]) {
                    rankHTML = `<span class="rank-tag">(اول)</span>`;
                    cell.classList.add('winner-cell');
                } else if (v === uniqueScores[1]) {
                    rankHTML = `<span class="rank-tag">(دوم)</span>`;
                } else if (v === uniqueScores[2]) {
                    rankHTML = `<span class="rank-tag">(سوم)</span>`;
                }
            }
            cell.innerHTML = (v === 0 ? '' : v) + rankHTML;
        }
    }
}

function sortGroups() {
    const tbody = document.getElementById('bRow');
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const dataRows = rows.filter(r => r.id !== 'manualRow' && r.id !== 'stepRow' && r.id !== 'subStepRow' && r.id !== 'totalRow');
    const manualRow = rows.find(r => r.id === 'manualRow');
    const stepRow = rows.find(r => r.id === 'stepRow');
    const subStepRow = rows.find(r => r.id === 'subStepRow');
    const totalRow = rows.find(r => r.id === 'totalRow');

    dataRows.sort((a, b) => {
        if (isAutoSortEnabled) {
            const cellA = a.querySelector('.total-score-cell');
            const cellB = b.querySelector('.total-score-cell');
            const totalA = cellA ? parseFloat(cellA.innerText) || 0 : 0;
            const totalB = cellB ? parseFloat(cellB.innerText) || 0 : 0;
            if (totalB !== totalA) {
                return totalB - totalA;
            }
        }
        return parseInt(a.dataset.g) - parseInt(b.dataset.g);
    });

    tbody.innerHTML = '';
    if (manualRow) tbody.appendChild(manualRow);
    if (stepRow) tbody.appendChild(stepRow);
    if (subStepRow) tbody.appendChild(subStepRow);
    dataRows.forEach(row => tbody.appendChild(row));
    if (totalRow) tbody.appendChild(totalRow);
}

function sortCols() {
    const hRow = document.getElementById('hRow');
    const bRow = document.getElementById('bRow');
    if (!bRow || !hRow || bRow.children.length === 0) return;

    const totRow = bRow.lastChild;
    if (!totRow || totRow.id !== 'totalRow') return;

    let colsInfo = [];
    for (let g = 1; g <= gCount; g++) {
        let cell = document.getElementById('t_' + g);
        if (cell) {
            let totalA = parseFloat(cell.innerText) || 0;
            colsInfo.push({ g: g, total: totalA });
        }
    }

    colsInfo.sort((a, b) => {
        if (isAutoSortEnabled) {
            if (b.total !== a.total) {
                return b.total - a.total;
            }
        }
        return a.g - b.g;
    });

    let thElements = Array.from(hRow.children);
    colsInfo.forEach(info => {
        let th = thElements.find(th => parseInt(th.dataset.g) === info.g);
        if (th) hRow.appendChild(th);
    });

    Array.from(bRow.children).forEach(tr => {
        let tdElements = Array.from(tr.children);
        colsInfo.forEach(info => {
            let td = tdElements.find(cell => parseInt(cell.dataset.g) === info.g);
            if (td) tr.appendChild(td);
        });
    });
}

const addGroup = () => { gCount++; localStorage.setItem('gCount', gCount); render(); };
const addComp = () => { cCount++; localStorage.setItem('cCount', cCount); render(); };
const clearData = () => { if (confirm("Clear All Data?")) { localStorage.clear(); location.reload(); } };

function deleteSpecificGroup(gIndex) {
    if (gCount <= 1) {
        alert("کم از کم ایک گروپ ہونا ضروری ہے!");
        return;
    }
    if (!confirm("کیا آپ واقعی اس گروپ کو حذف (Delete) کرنا چاہتے ہیں؟")) return;

    for (let g = gIndex; g < gCount; g++) {
        let nextG = g + 1;

        
        let nextName = localStorage.getItem('gn' + nextG);
        if (nextName !== null) localStorage.setItem('gn' + g, nextName);
        else localStorage.setItem('gn' + g, 'گروپ ' + nextG);

        
        let nextBg   = localStorage.getItem(`gc_bg_${nextG}`);
        let nextText = localStorage.getItem(`gc_text_${nextG}`);
        if (nextBg) {
            localStorage.setItem(`gc_bg_${g}`, nextBg);
            localStorage.setItem(`gc_text_${g}`, nextText || '#ffffff');
        } else {
            localStorage.removeItem(`gc_bg_${g}`);
            localStorage.removeItem(`gc_text_${g}`);
        }

        
        for (let c = 1; c <= cCount; c++) {
            let nextVal = localStorage.getItem(`v_${nextG}_${c}`);
            if (nextVal !== null) localStorage.setItem(`v_${g}_${c}`, nextVal);
            else localStorage.removeItem(`v_${g}_${c}`);
        }
    }

    
    localStorage.removeItem('gn' + gCount);
    localStorage.removeItem(`gc_bg_${gCount}`);
    localStorage.removeItem(`gc_text_${gCount}`);
    for (let c = 1; c <= cCount; c++) {
        localStorage.removeItem(`v_${gCount}_${c}`);
    }

    gCount--;
    localStorage.setItem('gCount', gCount);
    render();
}

function deleteSpecificComp(cIndex) {
    if (cCount <= 1) {
        alert("کم از کم ایک مقابلہ ہونا ضروری ہے!");
        return;
    }
    if (!confirm("کیا آپ واقعی اس مقابلے کو حذف (Delete) کرنا چاہتے ہیں؟")) return;

    for (let c = cIndex; c < cCount; c++) {
        let nextC = c + 1;
        let nextName = localStorage.getItem('cn' + nextC);
        if (nextName !== null) localStorage.setItem('cn' + c, nextName);
        else localStorage.removeItem('cn' + c);

        for (let g = 1; g <= gCount; g++) {
            let nextVal = localStorage.getItem(`v_${g}_${nextC}`);
            if (nextVal !== null) localStorage.setItem(`v_${g}_${c}`, nextVal);
            else localStorage.removeItem(`v_${g}_${c}`);
        }
    }

    localStorage.removeItem('cn' + cCount);
    for (let g = 1; g <= gCount; g++) {
        localStorage.removeItem(`v_${g}_${cCount}`);
    }

    cCount--;
    localStorage.setItem('cCount', cCount);
    render();
}


titleEl.addEventListener('dblclick', (e) => {
    e.stopPropagation(); 
    document.getElementById('adminControls').classList.toggle('hidden-controls');
    const isHidden = document.body.classList.toggle('hide-inline-del');
    
    
    const manualRow = document.getElementById('manualRow');
    if (manualRow) manualRow.style.display = isHidden ? 'none' : '';
    const stepRow = document.getElementById('stepRow');
    if (stepRow) stepRow.style.display = isHidden ? 'none' : '';
    const subStepRow = document.getElementById('subStepRow');
    if (subStepRow) subStepRow.style.display = isHidden ? 'none' : '';
});

const dragElement = (elmnt) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
        e = e || window.event; e.preventDefault();
        pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event; e.preventDefault();
        pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
        pos3 = e.clientX; pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() { document.onmouseup = null; document.onmousemove = null; }
}

dragElement(document.getElementById("adminControls"));
render();

document.addEventListener('keydown', function (event) {
    if (event.altKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        let ws = document.getElementById('winnerScreen');
        if (ws.classList.contains('show')) {
            hideWinnerScreen();
        } else {
            showWinnerScreen();
        }
    }
});


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./offline.js').then(reg => {
            console.log('Service Worker registered', reg);
        }).catch(err => {
            console.warn('Service Worker not registered', err);
        });
    });
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function showCustomAlert(title, msg) {
    document.getElementById('customAlertTitle').innerText = title;
    document.getElementById('customAlertMessage').innerText = msg;
    document.getElementById('customAlertOverlay').style.display = 'flex';
}

function closeCustomAlert() {
    document.getElementById('customAlertOverlay').style.display = 'none';
}

async function clearAppCache() {
    if (confirm("Are you sure you want to clear the app cache? This will redownload the app files next time you are online.")) {
        try {
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (let registration of registrations) {
                    await registration.unregister();
                }
            }
            const cacheNames = await caches.keys();
            for (let name of cacheNames) {
                await caches.delete(name);
            }
            alert("Cache cleared successfully! The app will now reload.");
            location.reload();
        } catch (err) {
            console.error('Error clearing cache:', err);
            alert("Failed to clear cache. Please try manually from browser settings.");
        }
    }
}


document.addEventListener('keydown', function(e) {
    if (e.target && e.target.classList.contains('score-input')) {
        let currentInput = e.target;
        let currentTr = currentInput.closest('tr');
        
        let isShiftF5 = (e.key === 'F5' && e.shiftKey);
        let isEsc = (e.key === 'Escape');
        let isB = (e.key.toLowerCase() === 'b');
        let isPageUp = (e.key === 'PageUp');
        let isPageDown = (e.key === 'PageDown');
        
        let isMoveUp = (e.key === 'ArrowUp');
        let isMoveDown = (e.key === 'ArrowDown' || isPageDown);
        let isMoveLeft = (e.key === 'ArrowLeft' || isPageUp);
        let isMoveRight = (e.key === 'ArrowRight');
        
        let isAdd = (e.key === '+' || e.key === '=' || isShiftF5 || isEsc);
        let isSubtract = (e.key === '-' || isB);
        
        if (isMoveUp || isMoveDown) {
            e.preventDefault();
            let inputsInRow = Array.from(currentTr.querySelectorAll('.score-input'));
            let colIdx = inputsInRow.indexOf(currentInput);
            
            let targetTr = currentTr;
            let tbody = currentTr.closest('tbody');
            
            if (isMoveUp) {
                targetTr = targetTr.previousElementSibling;
                while(targetTr && (targetTr.id === 'stepRow' || targetTr.id === 'subStepRow' || targetTr.id === 'totalRow' || targetTr.querySelector('.score-input') === null)) {
                    targetTr = targetTr.previousElementSibling;
                }
                if (!targetTr) {
                    
                    let allRows = Array.from(tbody.querySelectorAll('tr'));
                    for (let i = allRows.length - 1; i >= 0; i--) {
                        let r = allRows[i];
                        if (r.id !== 'stepRow' && r.id !== 'subStepRow' && r.id !== 'totalRow' && r.querySelector('.score-input') !== null) {
                            targetTr = r;
                            break;
                        }
                    }
                }
            } else if (isMoveDown) {
                targetTr = targetTr.nextElementSibling;
                while(targetTr && (targetTr.id === 'stepRow' || targetTr.id === 'subStepRow' || targetTr.id === 'totalRow' || targetTr.querySelector('.score-input') === null)) {
                    targetTr = targetTr.nextElementSibling;
                }
                if (!targetTr) {
                    
                    let allRows = Array.from(tbody.querySelectorAll('tr'));
                    for (let i = 0; i < allRows.length; i++) {
                        let r = allRows[i];
                        if (r.id !== 'stepRow' && r.id !== 'subStepRow' && r.id !== 'totalRow' && r.querySelector('.score-input') !== null) {
                            targetTr = r;
                            break;
                        }
                    }
                }
            }
            
            if (targetTr) {
                let targetInputs = targetTr.querySelectorAll('.score-input');
                if (targetInputs[colIdx]) {
                    targetInputs[colIdx].focus();
                }
            }
        }
        else if (isMoveLeft || isMoveRight) {
            
            let inputsInRow = Array.from(currentTr.querySelectorAll('.score-input'));
            let colIdx = inputsInRow.indexOf(currentInput);
            
            
            
            if (isMoveLeft) {
                e.preventDefault();
                if (colIdx < inputsInRow.length - 1) {
                    inputsInRow[colIdx + 1].focus();
                } else {
                    inputsInRow[0].focus(); 
                }
            } else if (isMoveRight) {
                e.preventDefault();
                if (colIdx > 0) {
                    inputsInRow[colIdx - 1].focus();
                } else {
                    inputsInRow[inputsInRow.length - 1].focus(); 
                }
            }
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            currentInput.blur(); 
            
            setTimeout(() => {
                let cell = document.querySelector(`.score-input[data-gidx="${currentInput.dataset.gidx}"][data-cidx="${currentInput.dataset.cidx}"]`);
                if(cell) cell.focus();
            }, 50);
        }
        else if (isAdd || isSubtract) {
            e.preventDefault();
            let direction = isSubtract ? -1 : 1;
            let gIdx = currentInput.dataset.gidx;
            let cIdx = currentInput.dataset.cidx;
            let stepCol = currentInput.dataset.stepcol;
            adjustValue(gIdx, cIdx, direction, stepCol, currentInput);
            
             currentInput.blur();
             setTimeout(() => {
                let cell = document.querySelector(`.score-input[data-gidx="${gIdx}"][data-cidx="${cIdx}"]`);
                if(cell) cell.focus();
            }, 50);
        }
    }
});


document.addEventListener('keydown', function(e) {
    
    const isInputEl = e.target.tagName === 'INPUT';
    const isScoreInput = e.target.classList.contains('score-input');
    const isEditable = e.target.isContentEditable;

    if ((e.code === 'Space' || e.key.toLowerCase() === 'b') && (!isEditable && (!isInputEl || isScoreInput))) {
        const timerScreen = document.getElementById('timerScreen');
        const tossScreen = document.getElementById('tossScreen');
        const ws = document.getElementById('welcomeScreen');
        
        if (timerScreen && timerScreen.style.display === 'flex') {
            e.preventDefault();
            toggleTimer();
        } else if (tossScreen && tossScreen.style.display === 'flex') {
            e.preventDefault();
            handleTossAction();
        } else if ((!ws || ws.style.display === 'none') && isSbTimerVisible) {
            
            if (e.code === 'Space') {
                e.preventDefault();
                toggleSbTimer();
            }
        }
    }
    
    
    if (e.key.toLowerCase() === 'r' && (!isEditable && (!isInputEl || isScoreInput))) {
        const ws = document.getElementById('welcomeScreen');
        const timerScreen = document.getElementById('timerScreen');
        const tossScreen = document.getElementById('tossScreen');
        
        if (timerScreen && timerScreen.style.display === 'flex') {
            e.preventDefault();
            resetTimer();
        } else if ((!ws || ws.style.display === 'none') && 
            (!tossScreen || tossScreen.style.display !== 'flex') && 
            isSbTimerVisible) {
            e.preventDefault();
            resetSbTimer();
        }
    }

    
    if (e.key.toLowerCase() === 't' && (!isEditable && (!isInputEl || isScoreInput))) {
        const ws = document.getElementById('welcomeScreen');
        const timerScreen = document.getElementById('timerScreen');
        const tossScreen = document.getElementById('tossScreen');
        
        
        if ((!ws || ws.style.display === 'none') && 
            (!timerScreen || timerScreen.style.display !== 'flex') && 
            (!tossScreen || tossScreen.style.display !== 'flex')) {
            e.preventDefault();
            toggleSbTimerVisibility();
        }
    }

    
    if (e.key.toLowerCase() === 's' && (!isEditable && (!isInputEl || isScoreInput))) {
        const ws = document.getElementById('welcomeScreen');
        const timerScreen = document.getElementById('timerScreen');
        const tossScreen = document.getElementById('tossScreen');
        
        
        if ((!ws || ws.style.display === 'none') && 
            (!timerScreen || timerScreen.style.display !== 'flex') && 
            (!tossScreen || tossScreen.style.display !== 'flex')) {
            e.preventDefault();
            toggleAutoSort();
        }
    }

    
    if (['ArrowUp', 'PageUp', 'ArrowDown', 'PageDown'].includes(e.key) && e.target.tagName !== 'INPUT' && !e.target.isContentEditable) {
        const timerScreen = document.getElementById('timerScreen');
        if (timerScreen && timerScreen.style.display === 'flex') {
            e.preventDefault();
            if (isTimerRunning) return; 
            
            if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                timerRemainingSeconds += 5;
            } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                timerRemainingSeconds = Math.max(0, timerRemainingSeconds - 5);
            }
            timerTotalSeconds = timerRemainingSeconds; 
            localStorage.setItem('timerTotalSeconds', timerTotalSeconds);
            localStorage.setItem('timerRemainingSeconds', timerRemainingSeconds);
            updateTimerDisplay();
        }
    }

    
    if (e.key === 'Backspace' && e.target.tagName !== 'INPUT' && !e.target.isContentEditable) {
        e.preventDefault();
        
        
        const timerModal = document.getElementById('timerSettingsModal');
        if (timerModal && timerModal.classList.contains('show')) {
            timerModal.classList.remove('show');
            return;
        }
        
        const logoModal = document.getElementById('logoSettingsModal');
        if (logoModal && logoModal.style.display === 'flex') {
            logoModal.style.display = 'none';
            return;
        }

        const timerScreen = document.getElementById('timerScreen');
        if (timerScreen && timerScreen.style.display === 'flex') {
            timerScreen.style.display = 'none';
        }

        const tossScreen = document.getElementById('tossScreen');
        if (tossScreen && tossScreen.style.display === 'flex') {
            tossScreen.style.display = 'none';
        }

        const logoScreen = document.getElementById('logoScreen');
        if (logoScreen && logoScreen.style.display === 'flex') {
            logoScreen.style.display = 'none';
        }

        const ws = document.getElementById('welcomeScreen');
        if (ws && ws.style.display === 'none') {
            ws.style.display = 'flex';
            ws.classList.remove('fade-out');
        }
        applySbTimerUI();
    }

    
    if (e.key === 'F5' && e.shiftKey) {
        e.preventDefault();
        return false;
    }
    
    
    if (e.key === 'Escape') {
        e.preventDefault();
    }
});





let tossTeams = JSON.parse(localStorage.getItem('tossTeams')) || [];
let tossFlipped = JSON.parse(localStorage.getItem('tossFlipped')) || [];
let isTossShuffled = localStorage.getItem('isTossShuffled') === 'true';
let isTossShuffling = false;
let isTossConfirming = false;

if (tossFlipped.length !== tossTeams.length) {
    tossFlipped = new Array(tossTeams.length).fill(false);
    localStorage.setItem('tossFlipped', JSON.stringify(tossFlipped));
}
let tossCardSize = parseInt(localStorage.getItem('tossCardSize')) || 150;
let tossFontSize = parseFloat(localStorage.getItem('tossFontSize')) || 1.8;
let tossNumberSize = parseFloat(localStorage.getItem('tossNumberSize')) || 1.0;
let tossNumberColor = localStorage.getItem('tossNumberColor') || '#666666';
let tossHeadingSize = parseFloat(localStorage.getItem('tossHeadingSize')) || 4.0;
let tossHeadingColor = localStorage.getItem('tossHeadingColor') || '#ffffff';
let tossBgTheme = localStorage.getItem('tossBgTheme') || '0';
let tossBoxBackColor = localStorage.getItem('tossBoxBackColor') || '#1cb5e0';
let tossBoxTextColor = localStorage.getItem('tossBoxTextColor') || '#ffffff';

function initTossInputs() {
    document.getElementById('tossCardSize').value = tossCardSize;
    document.getElementById('tossFontSize').value = tossFontSize;
    document.getElementById('tossNumberSize').value = tossNumberSize;
    document.getElementById('tossNumberColor').value = tossNumberColor;
    document.getElementById('tossHeadingSize').value = tossHeadingSize;
    document.getElementById('tossHeadingColor').value = tossHeadingColor;
    document.getElementById('tossBgTheme').value = tossBgTheme;
    
    document.getElementById('tossBoxBackColorPicker').value = tossBoxBackColor;
    document.getElementById('tossBoxTextColorPicker').value = tossBoxTextColor;
    
    const tossTitleEl = document.getElementById('tossMainTitle');
    if (tossTitleEl) {
        tossTitleEl.innerHTML = localStorage.getItem('toss_title') || 'ٹاس / قرعہ اندازی';
        tossTitleEl.style.setProperty('font-size', tossHeadingSize + 'rem', 'important');
        tossTitleEl.style.setProperty('color', tossHeadingColor, 'important');
        tossTitleEl.onblur = () => localStorage.setItem('toss_title', tossTitleEl.innerHTML);
    }
}

function openTossSettings(e) {
    if(e) e.stopPropagation();
    const modal = document.getElementById('tossSettingsModal');
    if(modal.classList.contains('show')) {
        modal.classList.remove('show');
    } else {
        modal.classList.add('show');
    }
}

function closeTossSettings() {
    const modal = document.getElementById('tossSettingsModal');
    if(modal) modal.classList.remove('show');
}

function hideTossSettings(e) {
    if (e.target.id === 'tossSettingsModal') closeTossSettings();
}

function applyTossSettings() {
    tossCardSize = parseInt(document.getElementById('tossCardSize').value) || 150;
    tossFontSize = parseFloat(document.getElementById('tossFontSize').value) || 1.8;
    tossNumberSize = parseFloat(document.getElementById('tossNumberSize').value) || 1.0;
    tossNumberColor = document.getElementById('tossNumberColor').value;
    tossHeadingSize = parseFloat(document.getElementById('tossHeadingSize').value) || 4.0;
    tossHeadingColor = document.getElementById('tossHeadingColor').value;
    tossBgTheme = document.getElementById('tossBgTheme').value;
    
    tossBoxBackColor = document.getElementById('tossBoxBackColorPicker').value;
    tossBoxTextColor = document.getElementById('tossBoxTextColorPicker').value;
    
    localStorage.setItem('tossBoxBackColor', tossBoxBackColor);
    localStorage.setItem('tossBoxTextColor', tossBoxTextColor);
    
    localStorage.setItem('tossCardSize', tossCardSize);
    localStorage.setItem('tossFontSize', tossFontSize);
    localStorage.setItem('tossNumberSize', tossNumberSize);
    localStorage.setItem('tossNumberColor', tossNumberColor);
    localStorage.setItem('tossHeadingSize', tossHeadingSize);
    localStorage.setItem('tossHeadingColor', tossHeadingColor);
    localStorage.setItem('tossBgTheme', tossBgTheme);
    
    for (let i = 0; i < bgThemes.length; i++) {
        document.body.classList.remove('bg-' + i);
    }
    document.body.classList.add('bg-' + tossBgTheme);

    const tossTitleEl = document.getElementById('tossMainTitle');
    if (tossTitleEl) {
        tossTitleEl.style.setProperty('font-size', tossHeadingSize + 'rem', 'important');
        tossTitleEl.style.setProperty('color', tossHeadingColor, 'important');
    }
    
    closeTossSettings();
    renderTossGrid();
}

function showTossScreen() {
    const ws = document.getElementById('welcomeScreen');
    if (ws) {
        ws.classList.add('fade-out');
        setTimeout(() => { ws.style.display = 'none'; }, 500);
    }
    
    document.getElementById('tossScreen').style.display = 'flex';
    
    initTossInputs();
    for (let i = 0; i < bgThemes.length; i++) {
        document.body.classList.remove('bg-' + i);
    }
    document.body.classList.add('bg-' + tossBgTheme);

    
    if(tossTeams.length === 0) {
        syncScoreboardTeams();
    } else {
        renderTossGrid();
    }
}

function hideTossScreen() {
    const tossScreen = document.getElementById('tossScreen');
    if (tossScreen) tossScreen.style.display = 'none';

    const ws = document.getElementById('welcomeScreen');
    if (ws) {
        ws.style.display = 'flex';
        ws.classList.remove('fade-out');
    }
}

function saveToss() {
    localStorage.setItem('tossTeams', JSON.stringify(tossTeams));
    localStorage.setItem('tossFlipped', JSON.stringify(tossFlipped));
}

function addTossTeam() {
    tossTeams.push(`گروپ ${tossTeams.length + 1}`);
    tossFlipped.push(false);
    isTossShuffled = false;
    localStorage.setItem('isTossShuffled', 'false');
    saveToss();
    renderTossGrid();
}

function removeTossTeam(idx) {
    tossTeams.splice(idx, 1);
    tossFlipped.splice(idx, 1);
    saveToss();
    renderTossGrid();
}

function clearTossTeams() {
    if(confirm("کیا آپ تمام ٹیمیں حذف کرنا چاہتے ہیں؟")) {
        tossTeams = [];
        tossFlipped = [];
        isTossShuffled = false;
        localStorage.setItem('isTossShuffled', 'false');
        saveToss();
        renderTossGrid();
    }
}

function syncScoreboardTeams() {
    tossTeams = [];
    tossFlipped = [];
    isTossShuffled = false;
    localStorage.setItem('isTossShuffled', 'false');
    let count = parseInt(localStorage.getItem('gCount')) || 5;
    for (let i = 1; i <= count; i++) {
        let name = localStorage.getItem('gn' + i) || 'گروپ ' + i;
        tossTeams.push(name);
        tossFlipped.push(false);
    }
    saveToss();
    renderTossGrid();
}

function renderTossGrid(keepFlipped = null) {
    const grid = document.getElementById('tossGrid');
    grid.innerHTML = '';
    
    tossTeams.forEach((team, idx) => {
        const wrap = document.createElement('div');
        wrap.className = 'toss-card-wrapper';

        const delBtn = document.createElement('button');
        delBtn.className = 'toss-del-btn';
        delBtn.innerHTML = '✕';
        delBtn.onclick = () => removeTossTeam(idx);
        wrap.appendChild(delBtn);

        const isFlippedNow = keepFlipped !== null ? keepFlipped : tossFlipped[idx];
        const card = document.createElement('div');
        card.className = 'toss-card' + (isFlippedNow ? ' is-flipped' : '');
        card.style.width = tossCardSize + 'px';
        card.style.height = tossCardSize + 'px';

        const inner = document.createElement('div');
        inner.className = 'toss-card-inner';

        const front = document.createElement('div');
        front.className = 'toss-card-front';
        front.style.fontSize = tossFontSize + 'rem';
        
        const numSpan = document.createElement('span');
        numSpan.className = 'toss-number';
        numSpan.style.fontSize = tossNumberSize + 'rem';
        numSpan.style.color = tossNumberColor;
        
        
        if (!isTossShuffled) {
            numSpan.style.display = 'none';
        } else {
            numSpan.innerText = String(idx + 1);
        }
        
        const textSpan = document.createElement('span');
        textSpan.contentEditable = "true";
        textSpan.className = 'toss-team-name';
        textSpan.innerText = team;
        
        
        textSpan.onclick = (e) => e.stopPropagation();
        textSpan.onblur = () => {
            tossTeams[idx] = textSpan.innerText.trim();
            saveToss();
        };
        textSpan.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                textSpan.blur();
            }
        };

        front.appendChild(numSpan);
        front.appendChild(textSpan);

        const back = document.createElement('div');
        back.className = 'toss-card-back';
        
        back.style.background = tossBoxBackColor;
        back.style.color = tossBoxTextColor;
        
        if (typeof currentLogoObjectURL !== 'undefined' && currentLogoObjectURL) {
            back.innerHTML = `<img src="${currentLogoObjectURL}" style="max-width: 80%; max-height: 80%; object-fit: contain; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));" alt="Logo">`;
        } else {
            back.innerHTML = '❓';
        }

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        
        card.onclick = () => {
            initAudio();
            playBeep(800, 50, 0.05);
            card.classList.toggle('is-flipped');
            tossFlipped[idx] = card.classList.contains('is-flipped');
            saveToss();
        };

        wrap.appendChild(card);
        grid.appendChild(wrap);
    });
}

function handleTossAction() {
    if (isTossShuffling) return;

    if (isTossConfirming) {
        confirmTossReset();
        return;
    }

    if (isTossShuffled) {
        showTossConfirm();
    } else {
        shuffleToss();
    }
}

function showTossConfirm() {
    isTossConfirming = true;
    document.getElementById('tossConfirmOverlay').style.display = 'flex';
}

function closeTossConfirm() {
    isTossConfirming = false;
    document.getElementById('tossConfirmOverlay').style.display = 'none';
}

function confirmTossReset() {
    closeTossConfirm();
    isTossShuffled = false;
    localStorage.setItem('isTossShuffled', 'false');
    
    
    tossFlipped = new Array(tossTeams.length).fill(false);
    saveToss();
    renderTossGrid();
}

async function shuffleToss() {
    if (isTossShuffling) return;
    isTossShuffling = true;

    initAudio();     
    const cards = document.querySelectorAll('.toss-card');
    if(cards.length === 0) { isTossShuffling = false; return; }

    
    cards.forEach(c => c.classList.add('is-flipped'));
    playBeep(400, 150, 0.1);

    await new Promise(r => setTimeout(r, 600));

    
    cards.forEach(c => c.classList.add('is-mixing'));
    playBeep(300, 1000, 0.1);

    await new Promise(r => setTimeout(r, 1200));

    
    cards.forEach(c => c.classList.remove('is-mixing'));
    
    
    tossTeams = tossTeams.sort(() => Math.random() - 0.5);
    tossFlipped = new Array(tossTeams.length).fill(true); 
    saveToss();
    
    
    isTossShuffled = true;
    localStorage.setItem('isTossShuffled', 'true');
    
    
    renderTossGrid(true);

    await new Promise(r => setTimeout(r, 400));

    
    const newCards = document.querySelectorAll('.toss-card');
    for (let i = 0; i < newCards.length; i++) {
        setTimeout(() => {
            newCards[i].classList.remove('is-flipped');
            tossFlipped[i] = false;
            saveToss();
            playBeep(600 + (i * 30), 100, 0.1);
        }, i * 350); 
    }

    
    setTimeout(() => {
        isTossShuffling = false;
        isTossShuffled = true;
        localStorage.setItem('isTossShuffled', 'true');
    }, newCards.length * 350 + 100);
}





let timerInterval = null;
let timerTotalSeconds = parseInt(localStorage.getItem('timerTotalSeconds'));
if (isNaN(timerTotalSeconds)) timerTotalSeconds = 300; 
let timerRemainingSeconds = parseInt(localStorage.getItem('timerRemainingSeconds'));
if (isNaN(timerRemainingSeconds)) timerRemainingSeconds = timerTotalSeconds;
let timerWarningSeconds = parseInt(localStorage.getItem('timerWarningSeconds')) || 10;
let isTimerRunning = false;
let audioCtx = null;

let timerTitleSize = localStorage.getItem('timerTitleSize') || 5;
let timerTitleColor = localStorage.getItem('timerTitleColor') || localStorage.getItem('headingColor') || '#ffffff';
let timerFontSize = localStorage.getItem('timerFontSize') || 15;
let timerNormalColor = localStorage.getItem('timerNormalColor') || '#ffffff';
let timerWarningColor = localStorage.getItem('timerWarningColor') || '#ff4d4d';
let timerZeroColor = localStorage.getItem('timerZeroColor') || '#ff4d4d';
let timerBgTheme = localStorage.getItem('timerBgTheme') || localStorage.getItem('bgTheme') || '0';
let timerTopMargin = parseInt(localStorage.getItem('timerTopMargin')) || 0;


function initTimerInputs() {
    let elTimerWarning = document.getElementById('timerWarning');
    if (!elTimerWarning) return;
    
    elTimerWarning.value = timerWarningSeconds;
    
    document.getElementById('timerTitleSize').value = timerTitleSize;
    document.getElementById('timerTitleColor').value = timerTitleColor;
    document.getElementById('timerFontSize').value = timerFontSize;
    document.getElementById('timerNormalColor').value = timerNormalColor;
    document.getElementById('timerWarningColor').value = timerWarningColor;
    document.getElementById('timerZeroColor').value = timerZeroColor;
    document.getElementById('timerBgTheme').value = timerBgTheme;
    let elTimerTopMargin = document.getElementById('timerTopMargin');
    if (elTimerTopMargin) elTimerTopMargin.value = timerTopMargin;

    
    const timerTitleEl = document.getElementById('timerMainTitle');
    if (timerTitleEl) {
        timerTitleEl.innerHTML = localStorage.getItem('timer_title') || 'ٹائمر ٹائٹل';
        timerTitleEl.onblur = () => localStorage.setItem('timer_title', timerTitleEl.innerHTML);
        timerTitleEl.style.setProperty('font-size', timerTitleSize + 'rem', 'important');
        timerTitleEl.style.setProperty('color', timerTitleColor, 'important');
    }

    
    let displayEl = document.getElementById('smartTimerDisplay');
    if (displayEl) displayEl.style.fontSize = timerFontSize + 'rem';
    let wrapperEl = document.getElementById('timerTopWrapper');
    if (wrapperEl) wrapperEl.style.marginTop = timerTopMargin + 'px';

    updateTimerDisplay();
}
let selectedWelcomeIndex = 0;

function updateWelcomeSelection() {
    const btns = document.querySelectorAll('.welcome-btn');
    if(btns.length === 0) return;
    btns.forEach((btn, idx) => {
        if(idx === selectedWelcomeIndex) {
            btn.classList.add('keyboard-selected');
        } else {
            btn.classList.remove('keyboard-selected');
        }
    });
}

document.addEventListener('keydown', (e) => {
    const ws = document.getElementById('welcomeScreen');
    
    if (ws && ws.style.display !== 'none' && !ws.classList.contains('fade-out')) {
        const btns = document.querySelectorAll('.welcome-btn');
        if(btns.length === 0) return;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedWelcomeIndex = (selectedWelcomeIndex + 1) % btns.length;
            updateWelcomeSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedWelcomeIndex = (selectedWelcomeIndex - 1 + btns.length) % btns.length;
            updateWelcomeSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            btns[selectedWelcomeIndex].click();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initTimerInputs();
    const timerSub = document.getElementById('timerSubtitle');
    if (timerSub) {
        timerSub.innerText = localStorage.getItem('timerSubtitle') || 'Any Text';
    }
    const tossSub = document.getElementById('tossSubtitle');
    if (tossSub) {
        tossSub.innerText = localStorage.getItem('tossSubtitle') || 'Any Text';
    }
    const welcomeTitle = document.getElementById('welcomeTitleText');
    if (welcomeTitle) {
        welcomeTitle.innerText = localStorage.getItem('welcome_title') || 'MUQAMI ERA 2026';
    }
    const welcomeSub = document.getElementById('welcomeSubtitleText');
    if (welcomeSub) {
        welcomeSub.innerText = localStorage.getItem('welcome_subtitle') || 'بسم اللہ الرحمن الرحیم';
    }
    
    const devText1 = document.getElementById('devText1');
    if (devText1) {
        devText1.innerText = localStorage.getItem('devText1') || 'Developed by';
    }
    const devText2 = document.getElementById('devText2');
    if (devText2) {
        devText2.innerText = localStorage.getItem('devText2') || 'Dost Muhammad';
    }
    
    
    const welcomeBtns = document.querySelectorAll('.welcome-btn');
    welcomeBtns.forEach((btn, idx) => {
        btn.addEventListener('mouseenter', () => {
            selectedWelcomeIndex = idx;
            updateWelcomeSelection();
        });
    });
    updateWelcomeSelection(); 
});

function showTimerScreen() {
    const ws = document.getElementById('welcomeScreen');
    if (ws) {
        ws.classList.add('fade-out');
        setTimeout(() => {
            ws.style.display = 'none';
        }, 500);
    }
    const timerScreen = document.getElementById('timerScreen');
    if (timerScreen) {
        timerScreen.style.display = 'flex';
        
        for (let i = 0; i < bgThemes.length; i++) {
            document.body.classList.remove('bg-' + i);
        }
        document.body.classList.add('bg-' + timerBgTheme);
        initTimerInputs();
    }
}

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playBeep(frequency = 800, duration = 100, vol = 0.1, type = 'sine') {
    if (!audioCtx) return;
    try {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        
        gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration/1000);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration/1000);
    } catch(e) { console.error('Audio play error', e); }
}

function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

function updateTimerDisplay() {
    const display = document.getElementById('smartTimerDisplay');
    if(!display) return;
    display.innerText = formatTime(timerRemainingSeconds);
    
    if (timerRemainingSeconds <= timerWarningSeconds && timerRemainingSeconds > 0 && isTimerRunning) {
        display.classList.add('timer-pulsate');
        display.style.color = timerWarningColor;
    } else if (timerRemainingSeconds === 0) {
        display.classList.remove('timer-pulsate');
        display.style.color = timerZeroColor;
    } else {
        display.classList.remove('timer-pulsate');
        display.style.color = timerNormalColor;
    }
}

function openTimerSettings(e) {
    e.stopPropagation();
    document.getElementById('timerSettingsModal').classList.add('show');
}

function closeTimerSettings() {
    document.getElementById('timerSettingsModal').classList.remove('show');
}

function hideTimerSettings(e) {
    if (e.target.id === 'timerSettingsModal') closeTimerSettings();
}

function applyTimerSettings() {
    initAudio();
    timerWarningSeconds = parseInt(document.getElementById('timerWarning').value) || 0;
    
    timerTitleSize = parseFloat(document.getElementById('timerTitleSize').value) || 5;
    timerTitleColor = document.getElementById('timerTitleColor').value;
    timerFontSize = parseFloat(document.getElementById('timerFontSize').value) || 15;
    timerNormalColor = document.getElementById('timerNormalColor').value;
    timerWarningColor = document.getElementById('timerWarningColor').value;
    timerZeroColor = document.getElementById('timerZeroColor').value;
    timerBgTheme = document.getElementById('timerBgTheme').value;
    timerTopMargin = parseInt(document.getElementById('timerTopMargin').value) || 0;
    
    
    localStorage.setItem('timerWarningSeconds', timerWarningSeconds);
    localStorage.setItem('timerTitleSize', timerTitleSize);
    localStorage.setItem('timerTitleColor', timerTitleColor);
    localStorage.setItem('timerFontSize', timerFontSize);
    localStorage.setItem('timerNormalColor', timerNormalColor);
    localStorage.setItem('timerWarningColor', timerWarningColor);
    localStorage.setItem('timerZeroColor', timerZeroColor);
    localStorage.setItem('timerBgTheme', timerBgTheme);
    localStorage.setItem('timerTopMargin', timerTopMargin);
    
    
    const timerTitleEl = document.getElementById('timerMainTitle');
    if (timerTitleEl) {
        timerTitleEl.style.setProperty('font-size', timerTitleSize + 'rem', 'important');
        timerTitleEl.style.setProperty('color', timerTitleColor, 'important');
    }
    const displayEl = document.getElementById('smartTimerDisplay');
    if (displayEl) displayEl.style.fontSize = timerFontSize + 'rem';
    let wrapperEl = document.getElementById('timerTopWrapper');
    if (wrapperEl) wrapperEl.style.marginTop = timerTopMargin + 'px';
    
    for (let i = 0; i < bgThemes.length; i++) {
        document.body.classList.remove('bg-' + i);
    }
    document.body.classList.add('bg-' + timerBgTheme);

    pauseTimer();
    updateTimerDisplay();
    closeTimerSettings();
}

function toggleTimer() {
    initAudio();
    
    
    if (timerRemainingSeconds <= 0 && !isTimerRunning) {
        timerRemainingSeconds = timerTotalSeconds;
        localStorage.setItem('timerRemainingSeconds', timerRemainingSeconds);
        updateTimerDisplay();
        return; 
    }
    
    if (isTimerRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    if (isTimerRunning || timerRemainingSeconds <= 0) return;
    isTimerRunning = true;
    
    
    playBeep(1000, 200, 0.2);
    
    timerInterval = setInterval(() => {
        timerRemainingSeconds--;
        localStorage.setItem('timerRemainingSeconds', timerRemainingSeconds);
        
        if (timerRemainingSeconds <= timerWarningSeconds && timerRemainingSeconds > 0) {
            playBeep(800, 150, 0.1); 
        }
        
        if (timerRemainingSeconds <= 0) {
            timerRemainingSeconds = 0;
            pauseTimer();
            
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    playBeep(1046, 150, 0.2, 'square'); 
                    setTimeout(() => playBeep(1046, 150, 0.2, 'square'), 200);
                }, i * 800);
            }
        }
        
        updateTimerDisplay();
    }, 1000);
}

function resetTimer() {
    pauseTimer();
    timerRemainingSeconds = timerTotalSeconds;
    localStorage.setItem('timerRemainingSeconds', timerRemainingSeconds);
    updateTimerDisplay();
}





let logoBgTheme = localStorage.getItem('logoBgTheme') || localStorage.getItem('bgTheme') || '0';
let logoTitleSize = parseFloat(localStorage.getItem('logoTitleSize')) || 5;
let logoTitleColor = localStorage.getItem('logoTitleColor') || localStorage.getItem('headingColor') || '#ffffff';
let logoTopMargin = parseInt(localStorage.getItem('logoTopMargin')) || 0;
let logoSizeSettings = parseInt(localStorage.getItem('logoSizeSettings')) || 300;

function showLogoScreen() {
    const ws = document.getElementById('welcomeScreen');
    if (ws) {
        ws.classList.add('fade-out');
        setTimeout(() => { ws.style.display = 'none'; }, 500);
    }
    
    document.getElementById('logoScreen').style.display = 'flex';
    
    initLogoInputs();
    
    
    for (let i = 0; i < bgThemes.length; i++) {
        document.body.classList.remove('bg-' + i);
    }
    document.body.classList.add('bg-' + logoBgTheme);
    
    
    const logoImg = document.getElementById('logoBig');
    if (currentLogoObjectURL) {
        logoImg.src = currentLogoObjectURL;
        logoImg.style.display = 'block';
        logoImg.style.height = logoSizeSettings + 'px';
    } else {
        logoImg.style.display = 'none';
    }
}

function initLogoInputs() {
    document.getElementById('logoTopMargin').value = logoTopMargin;
    document.getElementById('logoSizeSettingsInput').value = logoSizeSettings;
    document.getElementById('logoTitleSize').value = logoTitleSize;
    document.getElementById('logoTitleColor').value = logoTitleColor;
    document.getElementById('logoBgTheme').value = logoBgTheme;

    const titleEl = document.getElementById('logoMainTitle');
    if (titleEl) {
        titleEl.innerHTML = localStorage.getItem('logo_title') || 'ٹائٹل لکھیں!';
        titleEl.onblur = () => localStorage.setItem('logo_title', titleEl.innerHTML);
        titleEl.style.setProperty('font-size', logoTitleSize + 'rem', 'important');
        titleEl.style.setProperty('color', logoTitleColor, 'important');
    }
    
    const wrapper = document.getElementById('logoTopWrapper');
    if (wrapper) wrapper.style.marginTop = logoTopMargin + 'px';
}

function openLogoSettings(e) {
    if (e) e.stopPropagation();
    document.getElementById('logoSettingsModal').style.display = 'flex';
}

function hideLogoSettings(e) {
    if (e.target.id === 'logoSettingsModal') {
        document.getElementById('logoSettingsModal').style.display = 'none';
    }
}

function applyLogoScreenSettings() {
    logoTopMargin = parseInt(document.getElementById('logoTopMargin').value) || 0;
    logoSizeSettings = parseInt(document.getElementById('logoSizeSettingsInput').value) || 300;
    logoTitleSize = parseFloat(document.getElementById('logoTitleSize').value) || 5;
    logoTitleColor = document.getElementById('logoTitleColor').value;
    logoBgTheme = document.getElementById('logoBgTheme').value;
    
    localStorage.setItem('logoTopMargin', logoTopMargin);
    localStorage.setItem('logoSizeSettings', logoSizeSettings);
    localStorage.setItem('logoTitleSize', logoTitleSize);
    localStorage.setItem('logoTitleColor', logoTitleColor);
    localStorage.setItem('logoBgTheme', logoBgTheme);
    
    for (let i = 0; i < bgThemes.length; i++) {
        document.body.classList.remove('bg-' + i);
    }
    document.body.classList.add('bg-' + logoBgTheme);
    
    const titleEl = document.getElementById('logoMainTitle');
    if (titleEl) {
        titleEl.style.setProperty('font-size', logoTitleSize + 'rem', 'important');
        titleEl.style.setProperty('color', logoTitleColor, 'important');
    }
    
    const logoImg = document.getElementById('logoBig');
    if (currentLogoObjectURL && logoImg) {
        logoImg.style.height = logoSizeSettings + 'px';
    }
    
    const wrapper = document.getElementById('logoTopWrapper');
    if (wrapper) wrapper.style.marginTop = logoTopMargin + 'px';
    
    document.getElementById('logoSettingsModal').style.display = 'none';
}





function openGlobalSettings() {
    document.getElementById('globalSettingsModal').style.display = 'flex';
    document.getElementById('logoSizeInput').value = localStorage.getItem('appLogoSize') || 100;
}

function hideGlobalSettings(e) {
    if (e && e.target.id === 'globalSettingsModal') {
        closeGlobalSettings();
    }
}

function closeGlobalSettings() {
    document.getElementById('globalSettingsModal').style.display = 'none';
}

async function clearAllAppCaches() {
    if (confirm("کیا آپ واقعی تمام کیچز صاف کرنا چاہتے ہیں؟ اس سے سارا ڈیٹا ڈیلیٹ ہو جائے گا۔")) {
        localStorage.clear();
        try {
            await caches.delete('app-logo-cache');
        } catch(e) { console.error(e); }
        window.location.reload();
    }
}

async function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        try {
            const cache = await caches.open('app-logo-cache');
            await cache.put('/app-logo', new Response(file));
            
            
            if (currentLogoObjectURL) {
                URL.revokeObjectURL(currentLogoObjectURL);
                currentLogoObjectURL = null;
            }
            
            await applyLogoSettings();
        } catch (e) {
            console.error("Cache saving error:", e);
        }
    }
}

async function removeAppLogo() {
    if (confirm("کیا آپ واقعی لوگو ہٹانا چاہتے ہیں؟")) {
        try {
            await caches.delete('app-logo-cache');
            if (currentLogoObjectURL) {
                URL.revokeObjectURL(currentLogoObjectURL);
                currentLogoObjectURL = null;
            }
            document.getElementById('logoUploadInput').value = '';
            await applyLogoSettings();
        } catch (e) {
            console.error("Cache deletion error:", e);
        }
    }
}

let currentLogoObjectURL = null;

async function applyLogoSettings(isFromInput = false) {
    let size;
    if (isFromInput) {
        size = document.getElementById('logoSizeInput').value || 100;
        localStorage.setItem('appLogoSize', size);
    } else {
        size = localStorage.getItem('appLogoSize') || 100;
        document.getElementById('logoSizeInput').value = size;
    }
    
    if (!currentLogoObjectURL) {
        try {
            const cache = await caches.open('app-logo-cache');
            const response = await cache.match('/app-logo');
            if (response) {
                const blob = await response.blob();
                currentLogoObjectURL = URL.createObjectURL(blob);
            }
        } catch(e) {
            console.error("Cache loading error:", e);
        }
    }
    
    const logos = ['logoScoreboard', 'logoTimer', 'logoToss', 'logoBig', 'wsLogo'];
    
    logos.forEach(id => {
        const img = document.getElementById(id);
        if (img) {
            if (currentLogoObjectURL) {
                img.src = currentLogoObjectURL;
                
                if (id !== 'logoBig') {
                    img.style.height = size + 'px';
                }
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        }
    });

    if (typeof tossTeams !== 'undefined' && tossTeams.length > 0 && typeof renderTossGrid === 'function') {
        renderTossGrid();
    }
}
window.addEventListener('load', applyLogoSettings);


function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
}





let isSbTimerVisible = localStorage.getItem('isSbTimerVisible') === 'true';
let isSbTimerRunning = false;
let sbTimerInterval = null;
let sbTimerTotalSeconds = parseInt(localStorage.getItem('sbTimerTotalSeconds')) || 180;
let sbTimerRemainingSeconds = parseInt(localStorage.getItem('sbTimerRemainingSeconds'));
if (isNaN(sbTimerRemainingSeconds)) sbTimerRemainingSeconds = sbTimerTotalSeconds;

let sbTimerWarningSeconds = parseInt(localStorage.getItem('sbTimerWarningSeconds')) || 30;
let sbTimerFontSize = parseFloat(localStorage.getItem('sbTimerFontSize')) || 5;
let sbTimerPosX = localStorage.getItem('sbTimerPosX');
let sbTimerPosY = localStorage.getItem('sbTimerPosY');
let sbTimerNormalColor = localStorage.getItem('sbTimerNormalColor') || '#ffffff';
let sbTimerWarningColor = localStorage.getItem('sbTimerWarningColor') || '#ff4d4d';
let sbTimerZeroColor = localStorage.getItem('sbTimerZeroColor') || '#ff4d4d';
let sbTimerBgColor = localStorage.getItem('sbTimerBgColor') || '#000000';
let sbTimerBgOpacity = localStorage.getItem('sbTimerBgOpacity') || '0.6';

function hexToRgba(hex, opacity) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function applySbTimerUI() {
    const cont = document.getElementById('sbTimerContainer');
    const disp = document.getElementById('sbTimerDisplay');
    if(!cont || !disp) return;

    const ws = document.getElementById('welcomeScreen');
    const ts = document.getElementById('timerScreen');
    const toss = document.getElementById('tossScreen');
    const inScoreboard = (!ws || ws.style.display === 'none') && 
                         (!ts || ts.style.display !== 'flex') && 
                         (!toss || toss.style.display !== 'flex');

    if (isSbTimerVisible && inScoreboard) {
        cont.style.display = 'block';
    } else {
        cont.style.display = 'none';
    }

    disp.style.fontSize = sbTimerFontSize + 'rem';
    cont.style.background = hexToRgba(sbTimerBgColor, sbTimerBgOpacity);
    
    if (sbTimerPosX !== null && sbTimerPosY !== null) {
        cont.style.left = sbTimerPosX + 'px';
        cont.style.top = sbTimerPosY + 'px';
        cont.style.right = 'auto';
        cont.style.bottom = 'auto';
    } else {
        cont.style.left = 'auto';
        cont.style.top = 'auto';
        cont.style.right = '30px';
        cont.style.bottom = '30px';
    }
    
    if (sbTimerRemainingSeconds <= 0) {
        disp.style.color = sbTimerZeroColor;
    } else if (sbTimerRemainingSeconds <= sbTimerWarningSeconds) {
        disp.style.color = sbTimerWarningColor;
    } else {
        disp.style.color = sbTimerNormalColor;
    }

    let m = Math.floor(Math.abs(sbTimerRemainingSeconds) / 60);
    let s = Math.abs(sbTimerRemainingSeconds) % 60;
    let sign = sbTimerRemainingSeconds < 0 ? "-" : "";
    disp.innerText = sign + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function toggleSbTimerVisibility() {
    isSbTimerVisible = !isSbTimerVisible;
    localStorage.setItem('isSbTimerVisible', isSbTimerVisible);
    applySbTimerUI();
}

function resetSbTimerPos() {
    sbTimerPosX = null;
    sbTimerPosY = null;
    localStorage.removeItem('sbTimerPosX');
    localStorage.removeItem('sbTimerPosY');
    applySbTimerUI();
    document.getElementById('sbTimerSettingsModal').style.display = 'none';
}

function openSbTimerSettings(e) {
    if(e) e.stopPropagation();
    document.getElementById('sbTimerMin').value = Math.floor(sbTimerTotalSeconds / 60);
    document.getElementById('sbTimerSec').value = sbTimerTotalSeconds % 60;
    document.getElementById('sbTimerWarnInput').value = sbTimerWarningSeconds;
    document.getElementById('sbTimerSizeInput').value = sbTimerFontSize;
    document.getElementById('sbTimerColorNormal').value = sbTimerNormalColor;
    document.getElementById('sbTimerColorWarn').value = sbTimerWarningColor;
    document.getElementById('sbTimerColorZero').value = sbTimerZeroColor;
    document.getElementById('sbTimerBgColor').value = sbTimerBgColor;
    document.getElementById('sbTimerBgOpacity').value = sbTimerBgOpacity;
    
    document.getElementById('sbTimerSettingsModal').style.display = 'flex';
}

function hideSbTimerSettings(e) {
    if (e.target.id === 'sbTimerSettingsModal') {
        document.getElementById('sbTimerSettingsModal').style.display = 'none';
    }
}

function applySbTimerSettings() {
    let m = parseInt(document.getElementById('sbTimerMin').value) || 0;
    let s = parseInt(document.getElementById('sbTimerSec').value) || 0;
    sbTimerTotalSeconds = m * 60 + s;
    if(!isSbTimerRunning && sbTimerRemainingSeconds === sbTimerTotalSeconds) {
       sbTimerRemainingSeconds = sbTimerTotalSeconds;
    }
    
    sbTimerRemainingSeconds = sbTimerTotalSeconds;
    isSbTimerRunning = false;
    clearInterval(sbTimerInterval);
    
    sbTimerWarningSeconds = parseInt(document.getElementById('sbTimerWarnInput').value) || 30;
    sbTimerFontSize = parseFloat(document.getElementById('sbTimerSizeInput').value) || 5;
    sbTimerNormalColor = document.getElementById('sbTimerColorNormal').value;
    sbTimerWarningColor = document.getElementById('sbTimerColorWarn').value;
    sbTimerZeroColor = document.getElementById('sbTimerColorZero').value;
    sbTimerBgColor = document.getElementById('sbTimerBgColor').value;
    sbTimerBgOpacity = document.getElementById('sbTimerBgOpacity').value;
    
    localStorage.setItem('sbTimerTotalSeconds', sbTimerTotalSeconds);
    localStorage.setItem('sbTimerRemainingSeconds', sbTimerRemainingSeconds);
    localStorage.setItem('sbTimerWarningSeconds', sbTimerWarningSeconds);
    localStorage.setItem('sbTimerFontSize', sbTimerFontSize);
    localStorage.setItem('sbTimerNormalColor', sbTimerNormalColor);
    localStorage.setItem('sbTimerWarningColor', sbTimerWarningColor);
    localStorage.setItem('sbTimerZeroColor', sbTimerZeroColor);
    localStorage.setItem('sbTimerBgColor', sbTimerBgColor);
    localStorage.setItem('sbTimerBgOpacity', sbTimerBgOpacity);
    
    document.getElementById('sbTimerSettingsModal').style.display = 'none';
    applySbTimerUI();
}


let isDraggingSbTimer = false;
let sbTimerDragOffsetX = 0;
let sbTimerDragOffsetY = 0;

document.addEventListener('DOMContentLoaded', () => {
    applySbTimerUI();
    const sbTimerCont = document.getElementById('sbTimerContainer');
    
    if (sbTimerCont) {
        sbTimerCont.addEventListener('mousedown', (e) => {
            isDraggingSbTimer = true;
            sbTimerCont.style.cursor = 'grabbing';
            const rect = sbTimerCont.getBoundingClientRect();
            sbTimerDragOffsetX = e.clientX - rect.left;
            sbTimerDragOffsetY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDraggingSbTimer) return;
            
            let newX = e.clientX - sbTimerDragOffsetX;
            let newY = e.clientY - sbTimerDragOffsetY;
            
            
            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX + sbTimerCont.offsetWidth > window.innerWidth) newX = window.innerWidth - sbTimerCont.offsetWidth;
            if (newY + sbTimerCont.offsetHeight > window.innerHeight) newY = window.innerHeight - sbTimerCont.offsetHeight;
            
            sbTimerPosX = newX;
            sbTimerPosY = newY;
            
            applySbTimerUI();
        });

        document.addEventListener('mouseup', () => {
            if (isDraggingSbTimer) {
                isDraggingSbTimer = false;
                sbTimerCont.style.cursor = 'grab';
                localStorage.setItem('sbTimerPosX', sbTimerPosX);
                localStorage.setItem('sbTimerPosY', sbTimerPosY);
            }
        });
    }
});

function toggleSbTimer() {
    initAudio();
    
    
    if (sbTimerRemainingSeconds <= 0 && !isSbTimerRunning) {
        sbTimerRemainingSeconds = sbTimerTotalSeconds;
        localStorage.setItem('sbTimerRemainingSeconds', sbTimerRemainingSeconds);
        applySbTimerUI();
        return; 
    }
    
    if (isSbTimerRunning) {
        
        isSbTimerRunning = false;
        clearInterval(sbTimerInterval);
        playBeep(400, 100, 0.1);
    } else {
        
        isSbTimerRunning = true;
        playBeep(800, 100, 0.1);
        sbTimerInterval = setInterval(() => {
            sbTimerRemainingSeconds--;
            localStorage.setItem('sbTimerRemainingSeconds', sbTimerRemainingSeconds);
            applySbTimerUI();
            
            if (sbTimerRemainingSeconds <= sbTimerWarningSeconds && sbTimerRemainingSeconds > 0) {
                
                playBeep(800, 150, 0.1); 
            }
            if (sbTimerRemainingSeconds <= 0) {
                
                isSbTimerRunning = false;
                clearInterval(sbTimerInterval);
                sbTimerRemainingSeconds = 0;
                applySbTimerUI();
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        playBeep(1046, 150, 0.2, 'square');
                        setTimeout(() => playBeep(1046, 150, 0.2, 'square'), 200);
                    }, i * 800);
                }
            }
        }, 1000);
    }
}

function resetSbTimer() {
    isSbTimerRunning = false;
    clearInterval(sbTimerInterval);
    sbTimerRemainingSeconds = sbTimerTotalSeconds;
    localStorage.setItem('sbTimerRemainingSeconds', sbTimerRemainingSeconds);
    applySbTimerUI();
}

document.addEventListener('DOMContentLoaded', () => { 
    applySbTimerUI();
});


