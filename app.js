// Satset, Ultra-Clean & Structured Jakarta Market Logic for NXG Natal 2026

const STORAGE_KEY = 'nxg_natal_bazaar_menu_state_v6';
const THEME_KEY = 'nxg_natal_theme_preference_v6';
const MODE_KEY = 'nxg_natal_market_mode_v6';

let currentData = [];
let currentMode = 'compare'; // 'compare', 'pasar', 'supermarket'
let currentBelanjaFilter = 'all'; // 'all' or menu.id

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadData();
  initMode();
  renderAll();
  setupEvents();
});

// Format Rupiah
function formatRupiah(number) {
  if (isNaN(number)) return 'Rp 0';
  return 'Rp ' + Math.round(number).toLocaleString('id-ID');
}

// Load Data
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      currentData = JSON.parse(saved);
    } catch (e) {
      currentData = JSON.parse(JSON.stringify(window.MENU_DATA || []));
    }
  } else {
    currentData = JSON.parse(JSON.stringify(window.MENU_DATA || []));
  }
}

// Save Data
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
}

// Init Mode
function initMode() {
  currentMode = localStorage.getItem(MODE_KEY) || 'compare';
  updateModeButtons();
}

function setMode(mode) {
  currentMode = mode;
  localStorage.setItem(MODE_KEY, mode);
  updateModeButtons();
  renderAll();
}

function updateModeButtons() {
  document.querySelectorAll('.market-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === currentMode);
  });
}

// Calculate an item
function calcItem(item) {
  const hppPasar = Number(item.hppPasar) || 0;
  const hppSuper = Number(item.hppSupermarket) || 0;
  const hargaJual = Number(item.hargaJualRekomendasi) || 0;
  const target = Number(item.targetJualDefault) || 0;

  // Pasar
  const untungPasar = hargaJual - hppPasar;
  const marginPasar = hargaJual > 0 ? (untungPasar / hargaJual) * 100 : 0;
  const totalModalPasar = hppPasar * target;
  const totalUntungPasar = untungPasar * target;

  // Supermarket
  const untungSuper = hargaJual - hppSuper;
  const marginSuper = hargaJual > 0 ? (untungSuper / hargaJual) * 100 : 0;
  const totalModalSuper = hppSuper * target;
  const totalUntungSuper = untungSuper * target;

  // Diff
  const selisihModalPerPorsi = hppSuper - hppPasar;
  const selisihTotalModal = totalModalSuper - totalModalPasar;
  const totalOmzet = hargaJual * target;

  return {
    hppPasar,
    hppSuper,
    hargaJual,
    target,
    untungPasar,
    marginPasar,
    totalModalPasar,
    totalUntungPasar,
    untungSuper,
    marginSuper,
    totalModalSuper,
    totalUntungSuper,
    selisihModalPerPorsi,
    selisihTotalModal,
    totalOmzet
  };
}

// Render All Components
function renderAll() {
  renderKPIs();
  renderDesktopTable();
  renderMobileCards();
  renderIngredientsTab();
  renderVideoLinks();
}

// Render KPIs
function renderKPIs() {
  let totalPorsi = 0;
  let totalModalPasar = 0;
  let totalModalSuper = 0;
  let totalOmzet = 0;
  let totalUntungPasar = 0;
  let totalUntungSuper = 0;

  currentData.forEach(item => {
    const calc = calcItem(item);
    totalPorsi += calc.target;
    totalModalPasar += calc.totalModalPasar;
    totalModalSuper += calc.totalModalSuper;
    totalOmzet += calc.totalOmzet;
    totalUntungPasar += calc.totalUntungPasar;
    totalUntungSuper += calc.totalUntungSuper;
  });

  const totalHemat = totalModalSuper - totalModalPasar;
  const percentHemat = totalModalSuper > 0 ? (totalHemat / totalModalSuper) * 100 : 0;

  // Banner
  const bannerBadge = document.getElementById('bannerSavingBadge');
  if (bannerBadge) {
    bannerBadge.textContent = `Estimasi Hemat ${formatRupiah(totalHemat)} (${percentHemat.toFixed(0)}%)`;
  }
  const bannerText = document.getElementById('bannerSavingText');
  if (bannerText) {
    bannerText.innerHTML = `
      Belanja di <strong>Pasar Tradisional</strong> butuh kas <strong>${formatRupiah(totalModalPasar)}</strong> vs Supermarket <strong>${formatRupiah(totalModalSuper)}</strong> (Hemat <strong>${formatRupiah(totalHemat)}</strong>).
    `;
  }

  // Summary Cards
  const elPorsi = document.getElementById('kpiTotalPorsi');
  const elOmzet = document.getElementById('kpiTotalOmzet');
  const elTitleModal = document.getElementById('kpiTitleModal');
  const elTotalModal = document.getElementById('kpiTotalModal');
  const elSubModal = document.getElementById('kpiSubModal');
  const elTitleLaba = document.getElementById('kpiTitleLaba');
  const elTotalLaba = document.getElementById('kpiTotalLaba');
  const elSubLaba = document.getElementById('kpiSubLaba');

  if (elPorsi) elPorsi.textContent = `${totalPorsi.toLocaleString('id-ID')} Porsi`;
  if (elOmzet) elOmzet.textContent = formatRupiah(totalOmzet);

  if (currentMode === 'pasar') {
    if (elTitleModal) elTitleModal.textContent = 'Modal Pasar';
    if (elTotalModal) elTotalModal.textContent = formatRupiah(totalModalPasar);
    if (elSubModal) elSubModal.textContent = `Hemat ${formatRupiah(totalHemat)} vs super`;

    if (elTitleLaba) elTitleLaba.textContent = 'Untung Pasar';
    if (elTotalLaba) elTotalLaba.textContent = formatRupiah(totalUntungPasar);
    const avgMargin = totalOmzet > 0 ? (totalUntungPasar / totalOmzet) * 100 : 0;
    if (elSubLaba) elSubLaba.textContent = `Margin: ${avgMargin.toFixed(0)}%`;
  } else if (currentMode === 'supermarket') {
    if (elTitleModal) elTitleModal.textContent = 'Modal Super';
    if (elTotalModal) elTotalModal.textContent = formatRupiah(totalModalSuper);
    if (elSubModal) elSubModal.textContent = `+${formatRupiah(totalHemat)} vs pasar`;

    if (elTitleLaba) elTitleLaba.textContent = 'Untung Super';
    if (elTotalLaba) elTotalLaba.textContent = formatRupiah(totalUntungSuper);
    const avgMargin = totalOmzet > 0 ? (totalUntungSuper / totalOmzet) * 100 : 0;
    if (elSubLaba) elSubLaba.textContent = `Margin: ${avgMargin.toFixed(0)}%`;
  } else {
    // Compare Mode
    if (elTitleModal) elTitleModal.textContent = 'Est. Modal Kas';
    if (elTotalModal) {
      elTotalModal.innerHTML = `<span style="color: var(--primary);">${formatRupiah(totalModalPasar)}</span>`;
    }
    if (elSubModal) {
      elSubModal.innerHTML = `Vs Super: ${formatRupiah(totalModalSuper)}`;
    }

    if (elTitleLaba) elTitleLaba.textContent = 'Est. Untung Bersih';
    if (elTotalLaba) {
      elTotalLaba.innerHTML = `<span style="color: var(--profit-color);">${formatRupiah(totalUntungPasar)}</span>`;
    }
    const avgMarginPasar = totalOmzet > 0 ? (totalUntungPasar / totalOmzet) * 100 : 0;
    if (elSubLaba) {
      elSubLaba.textContent = `Margin ${avgMarginPasar.toFixed(0)}% (Hemat ${formatRupiah(totalHemat)})`;
    }
  }

  // Floating Mobile Bar
  const floatPorsi = document.getElementById('floatTotalPorsi');
  const floatModal = document.getElementById('floatTotalModal');
  const floatUntung = document.getElementById('floatTotalUntung');
  const floatLabel = document.getElementById('floatModalLabel');

  if (floatPorsi && floatModal && floatUntung) {
    floatPorsi.textContent = `${totalPorsi} Porsi`;
    if (currentMode === 'supermarket') {
      if (floatLabel) floatLabel.textContent = 'Estimasi Modal Super';
      floatModal.textContent = formatRupiah(totalModalSuper);
      floatUntung.textContent = `+${formatRupiah(totalUntungSuper)}`;
    } else {
      if (floatLabel) floatLabel.textContent = 'Estimasi Modal Pasar';
      floatModal.textContent = formatRupiah(totalModalPasar);
      floatUntung.textContent = `+${formatRupiah(totalUntungPasar)}`;
    }
  }
}

// Render Desktop Table
function renderDesktopTable() {
  const thead = document.getElementById('tableHead');
  const tbody = document.getElementById('tableBody');
  const tfoot = document.getElementById('tableFoot');
  if (!thead || !tbody || !tfoot) return;

  let totalPorsi = 0;
  let totalModalPasar = 0;
  let totalModalSuper = 0;
  let totalUntungPasar = 0;
  let totalUntungSuper = 0;

  currentData.forEach(item => {
    const calc = calcItem(item);
    totalPorsi += calc.target;
    totalModalPasar += calc.totalModalPasar;
    totalModalSuper += calc.totalModalSuper;
    totalUntungPasar += calc.totalUntungPasar;
    totalUntungSuper += calc.totalUntungSuper;
  });

  if (currentMode === 'compare') {
    thead.innerHTML = `
      <tr>
        <th style="width: 35px;">No</th>
        <th>Nama Menu & Kemasan</th>
        <th style="width: 110px; color: var(--pasar-color);">Estimasi Pasar</th>
        <th style="width: 110px; color: #dc2626;">Estimasi Super</th>
        <th style="width: 95px;">Estimasi Hemat</th>
        <th style="width: 110px;">Estimasi Harga Jual</th>
        <th style="width: 110px; text-align: center;">Target Porsi</th>
        <th style="width: 130px;">Estimasi Modal (Pasar vs Super)</th>
        <th style="width: 135px;">Estimasi Untung (Pasar vs Super)</th>
      </tr>
    `;

    tbody.innerHTML = currentData.map((item, index) => {
      const calc = calcItem(item);
      const badgeClass = item.kategori.toLowerCase().includes('minuman') ? 'badge-minuman' :
                         item.kategori.toLowerCase().includes('dessert') ? 'badge-dessert' : 'badge-snack';

      return `
        <tr data-id="${item.id}">
          <td style="color: var(--text-muted); font-weight: 700; text-align: center;">${index + 1}</td>
          <td>
            <div class="item-name-cell">
              <div class="item-title">${item.nama}</div>
              <div class="item-sub">${item.kemasan || item.bahanSingkat}</div>
              <span class="badge ${badgeClass}">${item.kategori}</span>
            </div>
          </td>
          <td>
            <div class="input-rupiah" style="width: 100px;">
              <span>Rp</span>
              <input type="number" inputmode="numeric" class="input-field input-hpp-pasar" data-id="${item.id}" step="500" value="${calc.hppPasar}">
            </div>
          </td>
          <td>
            <div class="input-rupiah" style="width: 100px;">
              <span>Rp</span>
              <input type="number" inputmode="numeric" class="input-field input-hpp-super" data-id="${item.id}" step="500" value="${calc.hppSuper}">
            </div>
          </td>
          <td>
            <span class="selisih-tag">+${formatRupiah(calc.selisihModalPerPorsi)}</span>
          </td>
          <td>
            <div class="input-rupiah" style="width: 100px;">
              <span>Rp</span>
              <input type="number" inputmode="numeric" class="input-field input-harga" data-id="${item.id}" step="500" value="${calc.hargaJual}">
            </div>
          </td>
          <td style="text-align: center;">
            <div class="stepper" style="width: 100px; margin: 0 auto;">
              <button class="btn-stepper btn-minus" data-id="${item.id}">−</button>
              <input type="number" inputmode="numeric" class="stepper-val input-porsi" data-id="${item.id}" min="1" value="${calc.target}">
              <button class="btn-stepper btn-plus" data-id="${item.id}">+</button>
            </div>
          </td>
          <td style="font-size: 0.8rem;">
            <div style="font-weight: 700; color: var(--pasar-color);">Pasar: ${formatRupiah(calc.totalModalPasar)}</div>
            <div style="color: var(--text-muted);">Super: ${formatRupiah(calc.totalModalSuper)}</div>
          </td>
          <td style="font-size: 0.8rem;">
            <div style="font-weight: 800; color: var(--profit-color);">Pasar: +${formatRupiah(calc.totalUntungPasar)}</div>
            <div style="color: #ea580c; font-weight: 700;">Super: +${formatRupiah(calc.totalUntungSuper)}</div>
          </td>
        </tr>
      `;
    }).join('');

    const totalHemat = totalModalSuper - totalModalPasar;
    tfoot.innerHTML = `
      <tr>
        <td colspan="2">TOTAL KESELURUHAN</td>
        <td style="color: var(--pasar-color); font-weight: 800;">(Pasar)</td>
        <td style="color: #dc2626; font-weight: 800;">(Super)</td>
        <td><span class="selisih-tag" style="font-size: 0.775rem;">Hemat ${formatRupiah(totalHemat)}</span></td>
        <td></td>
        <td style="text-align: center; font-weight: 800;">${totalPorsi} Porsi</td>
        <td>
          <div style="color: var(--pasar-color); font-weight: 800;">${formatRupiah(totalModalPasar)}</div>
          <div style="color: var(--text-muted); font-size: 0.75rem;">Super: ${formatRupiah(totalModalSuper)}</div>
        </td>
        <td>
          <div style="color: var(--profit-color); font-weight: 800;">+${formatRupiah(totalUntungPasar)}</div>
          <div style="color: #ea580c; font-size: 0.75rem;">Super: +${formatRupiah(totalUntungSuper)}</div>
        </td>
      </tr>
    `;
  } else {
    const isPasar = currentMode === 'pasar';
    const activeColor = isPasar ? 'var(--pasar-color)' : '#dc2626';
    const labelMarket = isPasar ? 'Pasar Jakarta' : 'Supermarket';

    thead.innerHTML = `
      <tr>
        <th style="width: 35px;">No</th>
        <th>Nama Menu & Kemasan</th>
        <th style="width: 120px; color: ${activeColor};">Estimasi Modal / Porsi (${labelMarket})</th>
        <th style="width: 120px;">Estimasi Harga Jual</th>
        <th style="width: 110px;">Estimasi Untung / Porsi</th>
        <th style="width: 85px;">Margin</th>
        <th style="width: 110px; text-align: center;">Target Porsi</th>
        <th style="width: 125px;">Estimasi Total Modal</th>
        <th style="width: 125px;">Estimasi Total Untung</th>
      </tr>
    `;

    tbody.innerHTML = currentData.map((item, index) => {
      const calc = calcItem(item);
      const hpp = isPasar ? calc.hppPasar : calc.hppSuper;
      const untung = isPasar ? calc.untungPasar : calc.untungSuper;
      const margin = isPasar ? calc.marginPasar : calc.marginSuper;
      const totalModal = isPasar ? calc.totalModalPasar : calc.totalModalSuper;
      const totalUntung = isPasar ? calc.totalUntungPasar : calc.totalUntungSuper;
      const badgeClass = item.kategori.toLowerCase().includes('minuman') ? 'badge-minuman' :
                         item.kategori.toLowerCase().includes('dessert') ? 'badge-dessert' : 'badge-snack';
      const inputClass = isPasar ? 'input-hpp-pasar' : 'input-hpp-super';

      return `
        <tr data-id="${item.id}">
          <td style="color: var(--text-muted); font-weight: 700; text-align: center;">${index + 1}</td>
          <td>
            <div class="item-name-cell">
              <div class="item-title">${item.nama}</div>
              <div class="item-sub">${item.kemasan || item.bahanSingkat}</div>
              <span class="badge ${badgeClass}">${item.kategori}</span>
            </div>
          </td>
          <td>
            <div class="input-rupiah" style="width: 105px;">
              <span>Rp</span>
              <input type="number" inputmode="numeric" class="input-field ${inputClass}" data-id="${item.id}" step="500" value="${hpp}">
            </div>
          </td>
          <td>
            <div class="input-rupiah" style="width: 105px;">
              <span>Rp</span>
              <input type="number" inputmode="numeric" class="input-field input-harga" data-id="${item.id}" step="500" value="${calc.hargaJual}">
            </div>
          </td>
          <td class="profit-text" style="color: ${isPasar ? 'var(--profit-color)' : '#ea580c'};">
            +${formatRupiah(untung)}
          </td>
          <td>
            <span class="margin-tag">${margin.toFixed(0)}%</span>
          </td>
          <td style="text-align: center;">
            <div class="stepper" style="width: 100px; margin: 0 auto;">
              <button class="btn-stepper btn-minus" data-id="${item.id}">−</button>
              <input type="number" inputmode="numeric" class="stepper-val input-porsi" data-id="${item.id}" min="1" value="${calc.target}">
              <button class="btn-stepper btn-plus" data-id="${item.id}">+</button>
            </div>
          </td>
          <td style="font-weight: 700;">
            ${formatRupiah(totalModal)}
          </td>
          <td class="profit-text" style="font-weight: 800; font-size: 0.95rem; color: ${isPasar ? 'var(--profit-color)' : '#ea580c'};">
            +${formatRupiah(totalUntung)}
          </td>
        </tr>
      `;
    }).join('');

    const activeTotalModal = isPasar ? totalModalPasar : totalModalSuper;
    const activeTotalUntung = isPasar ? totalUntungPasar : totalUntungSuper;
    const avgProfit = totalPorsi > 0 ? activeTotalUntung / totalPorsi : 0;
    const avgMargin = (activeTotalUntung / (activeTotalModal + activeTotalUntung)) * 100;

    tfoot.innerHTML = `
      <tr>
        <td colspan="2">TOTAL KESELURUHAN (${labelMarket})</td>
        <td style="color: ${activeColor}; font-weight: 800;">-</td>
        <td></td>
        <td style="color: ${isPasar ? 'var(--profit-color)' : '#ea580c'}; font-weight: 800;">Avg +${formatRupiah(avgProfit)}</td>
        <td style="font-weight: 800;">${avgMargin.toFixed(0)}%</td>
        <td style="text-align: center; font-weight: 800;">${totalPorsi} Porsi</td>
        <td style="font-weight: 800;">${formatRupiah(activeTotalModal)}</td>
        <td style="color: ${isPasar ? 'var(--profit-color)' : '#ea580c'}; font-weight: 800; font-size: 1rem;">
          +${formatRupiah(activeTotalUntung)}
        </td>
      </tr>
    `;
  }
}

// Render Mobile Touch Cards
function renderMobileCards() {
  const container = document.getElementById('mobileCardsContainer');
  if (!container) return;

  container.innerHTML = currentData.map((item, index) => {
    const calc = calcItem(item);
    const badgeClass = item.kategori.toLowerCase().includes('minuman') ? 'badge-minuman' :
                       item.kategori.toLowerCase().includes('dessert') ? 'badge-dessert' : 'badge-snack';

    return `
      <div class="m-card" data-id="${item.id}">
        <div class="m-card-header">
          <div class="m-card-title-group">
            <span class="m-card-title">${index + 1}. ${item.nama}</span>
            <span class="m-card-sub">${item.kemasan || item.bahanSingkat}</span>
          </div>
          <span class="badge ${badgeClass}">${item.kategori}</span>
        </div>

        <div class="m-card-compare-badge">
          <span>🏪 Estimasi Pasar: <strong>${formatRupiah(calc.hppPasar)}</strong></span>
          <span style="color: var(--text-muted);">vs</span>
          <span style="color: #dc2626;">🏬 Super: <strong>${formatRupiah(calc.hppSuper)}</strong></span>
          <span class="selisih-tag">Hemat ${formatRupiah(calc.selisihModalPerPorsi)}</span>
        </div>

        <div class="m-card-inputs">
          <div class="m-input-box">
            <label>Estimasi Modal Pasar</label>
            <div class="input-rupiah">
              <span>Rp</span>
              <input type="number" inputmode="numeric" class="input-field input-hpp-pasar" data-id="${item.id}" step="500" value="${calc.hppPasar}">
            </div>
          </div>
          <div class="m-input-box">
            <label>Estimasi Harga Jual</label>
            <div class="input-rupiah">
              <span>Rp</span>
              <input type="number" inputmode="numeric" class="input-field input-harga" data-id="${item.id}" step="500" value="${calc.hargaJual}">
            </div>
          </div>
        </div>

        <div class="m-card-inputs" style="align-items: center;">
          <div class="m-input-box">
            <label>Target Penjualan</label>
            <div class="stepper">
              <button class="btn-stepper btn-minus" data-id="${item.id}">−</button>
              <input type="number" inputmode="numeric" class="stepper-val input-porsi" data-id="${item.id}" min="1" value="${calc.target}">
              <button class="btn-stepper btn-plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <div class="m-input-box" style="justify-content: flex-end; padding-bottom: 4px;">
            <label>Estimasi Untung / Porsi</label>
            <div style="font-size: 1rem; font-weight: 800; color: var(--profit-color);">
              +${formatRupiah(calc.untungPasar)}
              <span class="margin-tag" style="margin-left: 4px; font-size: 0.65rem;">${calc.marginPasar.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div class="m-card-footer">
          <div>
            <span style="color: var(--text-muted); font-size: 0.725rem;">Estimasi Total Modal:</span>
            <strong>${formatRupiah(calc.totalModalPasar)}</strong>
          </div>
          <div style="text-align: right;">
            <span style="color: var(--text-muted); font-size: 0.725rem;">Estimasi Total Untung:</span>
            <strong style="color: var(--profit-color); font-size: 0.95rem;">+${formatRupiah(calc.totalUntungPasar)}</strong>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Tab 2: Clean, Spacious & Beautifully Structured Ingredient Breakdown
function renderIngredientsTab() {
  const container = document.getElementById('ingredientsContainer');
  if (!container) return;

  const itemsToRender = currentBelanjaFilter === 'all' 
    ? currentData 
    : currentData.filter(i => i.id === currentBelanjaFilter);

  if (itemsToRender.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px; color: var(--text-muted);">
        Tidak ada data menu yang dipilih.
      </div>
    `;
    return;
  }

  container.innerHTML = itemsToRender.map((item, index) => {
    let totalPasar = 0;
    let totalSuper = 0;

    // Desktop Table Rows
    const desktopRowsHtml = item.rincianBahan.map(b => {
      totalPasar += b.hargaPasar;
      totalSuper += b.hargaSupermarket;
      const hematItem = b.hargaSupermarket - b.hargaPasar;

      return `
        <tr>
          <td>
            <div class="b-ing-title">
              <span>${b.nama}</span>
              <span class="badge-kategori-bahan">${b.kategoriBahan || 'Bahan'}</span>
            </div>
            <div class="b-ing-note">${b.catatan || ''}</div>
          </td>
          <td>
            <span class="b-takaran-pill">${b.takaran}</span>
          </td>
          <td class="b-price-pasar">${formatRupiah(b.hargaPasar)}</td>
          <td class="b-price-super">${formatRupiah(b.hargaSupermarket)}</td>
          <td class="b-price-diff">+${formatRupiah(hematItem)}</td>
        </tr>
      `;
    }).join('');

    // Mobile Structured List Items
    const mobileItemsHtml = item.rincianBahan.map(b => {
      const hematItem = b.hargaSupermarket - b.hargaPasar;
      return `
        <div class="b-item-mobile">
          <div class="b-item-mobile-top">
            <div>
              <div style="font-weight: 800; font-size: 0.9rem; color: var(--text-main);">${b.nama}</div>
              <div style="font-size: 0.725rem; color: var(--text-muted); margin-top: 1px;">${b.catatan || ''}</div>
            </div>
            <span class="b-takaran-pill" style="font-size: 0.725rem;">${b.takaran}</span>
          </div>

          <div class="b-item-mobile-prices">
            <div class="b-price-box">
              <span class="b-price-box-label">Pasar Jkt</span>
              <span class="b-price-box-val" style="color: var(--pasar-color);">${formatRupiah(b.hargaPasar)}</span>
            </div>
            <div class="b-price-box">
              <span class="b-price-box-label">Supermarket</span>
              <span class="b-price-box-val" style="color: #dc2626;">${formatRupiah(b.hargaSupermarket)}</span>
            </div>
            <div class="b-price-box" style="text-align: right;">
              <span class="b-price-box-label">Hemat</span>
              <span class="b-price-box-val" style="color: var(--primary);">+${formatRupiah(hematItem)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const hppPasarPorsi = Math.round(totalPasar / item.porsiBatch);
    const hppSuperPorsi = Math.round(totalSuper / item.porsiBatch);
    const hematBatch = totalSuper - totalPasar;
    const hematPorsi = hppSuperPorsi - hppPasarPorsi;
    const badgeClass = item.kategori.toLowerCase().includes('minuman') ? 'badge-minuman' :
                       item.kategori.toLowerCase().includes('dessert') ? 'badge-dessert' : 'badge-snack';

    return `
      <div class="b-card" data-id="${item.id}">
        <div class="b-card-header">
          <div class="b-card-title-group">
            <span class="b-card-title">${index + 1}. ${item.nama}</span>
            <span class="badge ${badgeClass}">${item.kategori}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="b-card-batch-badge">Takaran 1 Batch = ${item.porsiBatch} Porsi</span>
          </div>
        </div>

        <!-- Desktop Spacious Table View -->
        <table class="b-table-desktop">
          <thead>
            <tr>
              <th style="width: 42%;">Bahan Belanjaan & Keterangan Acuan</th>
              <th style="width: 16%;">Takaran 1 Batch</th>
              <th style="width: 14%; text-align: right; color: var(--pasar-color);">Estimasi Pasar</th>
              <th style="width: 14%; text-align: right; color: #dc2626;">Estimasi Super</th>
              <th style="width: 14%; text-align: right; color: var(--primary);">Estimasi Hemat</th>
            </tr>
          </thead>
          <tbody>
            ${desktopRowsHtml}
            <tr style="background-color: var(--bg-subtle); font-weight: 800;">
              <td colspan="2">TOTAL ESTIMASI BELANJA 1 BATCH (${item.porsiBatch} PORSI)</td>
              <td class="b-price-pasar" style="font-size: 0.95rem;">${formatRupiah(totalPasar)}</td>
              <td class="b-price-super" style="font-size: 0.95rem;">${formatRupiah(totalSuper)}</td>
              <td class="b-price-diff" style="font-size: 0.95rem;">Hemat ${formatRupiah(hematBatch)}</td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile Clean Item List -->
        <div class="b-list-mobile">
          ${mobileItemsHtml}
          <div style="padding: 12px 16px; background: var(--bg-subtle); font-weight: 800; font-size: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
            <span>Total 1 Batch (${item.porsiBatch} Porsi)</span>
            <span style="color: var(--primary);">Hemat ${formatRupiah(hematBatch)}</span>
          </div>
        </div>

        <!-- Clean Card Footer Summary -->
        <div class="b-card-footer">
          <div>
            <strong>⚖️ Rangkuman Estimasi Modal per Porsi:</strong>
            Pasar <strong>${formatRupiah(hppPasarPorsi)}</strong> vs Supermarket <strong>${formatRupiah(hppSuperPorsi)}</strong>
          </div>
          <div>
            <span class="selisih-tag" style="font-size: 0.8rem;">
              👉 Estimasi Hemat Kas: ${formatRupiah(hematPorsi)} / porsi
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Video Links in Tab 3
function renderVideoLinks() {
  const container = document.getElementById('videoLinksList');
  if (!container) return;

  container.innerHTML = currentData.map(item => {
    return item.links.map(link => {
      const icon = link.platform === 'tiktok' ? '🎵' : '📺';
      return `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="video-link-item">
          <span>${icon} <strong>${item.nama}:</strong> ${link.label}</span>
          <span style="color: var(--primary);">Tonton ↗</span>
        </a>
      `;
    }).join('');
  }).join('');
}

// Setup Event Listeners
function setupEvents() {
  // Mode switcher (Pasar vs Supermarket vs Compare)
  document.querySelectorAll('.market-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.mode);
    });
  });

  // Tab switcher
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.dataset.tab;
      const targetPane = document.getElementById(targetTab);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Tab 2 Menu Filter Pills
  document.querySelectorAll('.menu-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.menu-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBelanjaFilter = btn.dataset.filter;
      renderIngredientsTab();
    });
  });

  // Stepper Buttons (+ / -) for Porsi
  document.addEventListener('click', (e) => {
    const stepperBtn = e.target.closest('.btn-stepper');
    if (!stepperBtn) return;

    const id = stepperBtn.dataset.id;
    const item = currentData.find(i => i.id === id);
    if (!item) return;

    const isPlus = stepperBtn.classList.contains('btn-plus');
    const step = 5;

    if (isPlus) {
      item.targetJualDefault = (Number(item.targetJualDefault) || 0) + step;
    } else {
      item.targetJualDefault = Math.max(5, (Number(item.targetJualDefault) || 0) - step);
    }

    saveData();
    renderKPIs();
    renderDesktopTable();
    renderMobileCards();
  });

  // Direct Input Listeners
  document.addEventListener('input', (e) => {
    const target = e.target;
    if (target.classList.contains('input-hpp-pasar') || 
        target.classList.contains('input-hpp-super') || 
        target.classList.contains('input-harga') || 
        target.classList.contains('input-porsi')) {
      
      const id = target.dataset.id;
      const item = currentData.find(i => i.id === id);
      if (!item) return;

      if (target.classList.contains('input-hpp-pasar')) {
        item.hppPasar = Math.max(0, Number(target.value) || 0);
      } else if (target.classList.contains('input-hpp-super')) {
        item.hppSupermarket = Math.max(0, Number(target.value) || 0);
      } else if (target.classList.contains('input-harga')) {
        item.hargaJualRekomendasi = Math.max(0, Number(target.value) || 0);
      } else if (target.classList.contains('input-porsi')) {
        item.targetJualDefault = Math.max(1, Number(target.value) || 1);
      }

      saveData();
      renderKPIs();

      // Synchronize counterpart inputs across desktop & mobile
      document.querySelectorAll(`.input-porsi[data-id="${id}"]`).forEach(el => {
        if (el !== target) el.value = item.targetJualDefault;
      });
      document.querySelectorAll(`.input-hpp-pasar[data-id="${id}"]`).forEach(el => {
        if (el !== target) el.value = item.hppPasar;
      });
      document.querySelectorAll(`.input-harga[data-id="${id}"]`).forEach(el => {
        if (el !== target) el.value = item.hargaJualRekomendasi;
      });

      renderDesktopTable();
      renderMobileCards();
    }
  });

  // Theme toggle
  document.getElementById('btnThemeToggle').addEventListener('click', toggleTheme);

  // Reset to default
  document.getElementById('btnResetData').addEventListener('click', () => {
    if (confirm('Kembalikan semua nilai estimasi modal, harga jual, dan target porsi ke nilai acuan awal?')) {
      localStorage.removeItem(STORAGE_KEY);
      loadData();
      renderAll();
    }
  });

  // Print button (optional)
  const btnPrint = document.getElementById('btnPrint');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Export CSV (optional)
  const btnExport = document.getElementById('btnExportCsv');
  if (btnExport) {
    btnExport.addEventListener('click', exportToCsv);
  }
}

// Theme handling
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  document.body.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme') || 'light';
  const newTheme = current === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('btnThemeToggle');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Export to CSV
function exportToCsv() {
  const headers = [
    'No',
    'Nama Menu',
    'Kategori',
    'Estimasi Modal Pasar (Rp)',
    'Estimasi Modal Supermarket (Rp)',
    'Estimasi Hemat di Pasar (Rp)',
    'Estimasi Harga Jual (Rp)',
    'Target Porsi',
    'Estimasi Total Modal Pasar (Rp)',
    'Estimasi Total Modal Supermarket (Rp)',
    'Estimasi Total Untung Pasar (Rp)',
    'Estimasi Total Untung Supermarket (Rp)',
    'Estimasi Penghematan Kas (Rp)'
  ];

  const rows = currentData.map((item, index) => {
    const calc = calcItem(item);
    return [
      index + 1,
      `"${item.nama}"`,
      `"${item.kategori}"`,
      calc.hppPasar,
      calc.hppSuper,
      calc.selisihModalPerPorsi,
      calc.hargaJual,
      calc.target,
      calc.totalModalPasar,
      calc.totalModalSuper,
      calc.totalUntungPasar,
      calc.totalUntungSuper,
      calc.selisihTotalModal
    ];
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + 
    [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'Estimasi_Komparasi_Harga_Bazaar_NXG_Natal_2026.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
