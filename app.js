/* ============================================================
   Rugby Attendance Tracker — App Logic (app.js)
   ============================================================ */

'use strict';

// ── Firebase Configuration ──────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyB-2Pb7LW7y8_N_MfmtehBsKe1zjzZvjM4",
  authDomain: "rugby-attendance-509fc.firebaseapp.com",
  databaseURL: "https://rugby-attendance-509fc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rugby-attendance-509fc",
  storageBucket: "rugby-attendance-509fc.firebasestorage.app",
  messagingSenderId: "346795737660",
  appId: "1:346795737660:web:f0cbee02d3e7e50c59b939"
};

let db = null;
let useFirebase = false;
let auth = null;
let currentUser = null;

// Inicializar Firebase si está configurado
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();
  auth = firebase.auth();
  useFirebase = true;
  console.log('✅ Firebase initialized');
} catch (e) {
  console.warn('Firebase initialization failed:', e);
  useFirebase = false;
}

// ── Configuration ──────────────────────────────────────────
const SESSIONS = [
  { days: [1, 3], start: 18, end: 20, label: 'Mon/Wed  18:00–20:00' }, // Mon=1, Wed=3
  { days: [5],    start: 20, end: 21, label: 'Friday   20:00–21:00' }, // Fri=5
];

const STATUSES = ['present', 'sick', 'injured', 'travel', 'study', 'unknown'];

const STATUS_EMOJI = {
  present: '✅', sick: '🤕', injured: '🤕', travel: '✈️', study: '📚', unknown: '❓',
};

const DEFAULT_ROSTER = [
  { id: 'p1',  name: 'Liam Murphy',     position: 'Prop' },
  { id: 'p2',  name: 'Sean O\'Brien',   position: 'Hooker' },
  { id: 'p3',  name: 'Conor Ryan',      position: 'Lock' },
  { id: 'p4',  name: 'Jack Walsh',      position: 'Lock' },
  { id: 'p5',  name: 'Darragh Doyle',   position: 'Flanker' },
  { id: 'p6',  name: 'Finn McCarthy',   position: 'No. 8' },
  { id: 'p7',  name: 'Rory O\'Connor',  position: 'Scrum-half' },
  { id: 'p8',  name: 'James Kelly',     position: 'Fly-half' },
  { id: 'p9',  name: 'Patrick Burke',   position: 'Centre' },
  { id: 'p10', name: 'Tom Brennan',     position: 'Centre' },
  { id: 'p11', name: 'Cian Fitzgerald', position: 'Wing' },
  { id: 'p12', name: 'Niall Sheehan',   position: 'Wing' },
  { id: 'p13', name: 'Cathal Quinn',    position: 'Full-back' },
  { id: 'p14', name: 'Eoin MacDonald',  position: 'Flanker' },
  { id: 'p15', name: 'Aaron Clarke',    position: 'Prop' },
];

// ── State ───────────────────────────────────────────────────
let roster   = [];      // [{ id, name, position }]
let records  = {};      // { 'YYYY-MM-DD': { playerId: status } }
let currentDate = todayStr();
let currentFilter = 'all'; // Filtro activo

// ── Helpers ─────────────────────────────────────────────────
function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function formatDateDisplay(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getStatusForDate(dateStr, playerId) {
  return (records[dateStr] && records[dateStr][playerId]) || 'unknown';
}

function setStatusForDate(dateStr, playerId, status) {
  if (!records[dateStr]) records[dateStr] = {};
  records[dateStr][playerId] = status;
  save();
}

function uniqueId() {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ── Persistence ─────────────────────────────────────────────
function save() {
  try {
    // Guardar en localStorage (backup local)
    localStorage.setItem('rugby_roster',  JSON.stringify(roster));
    localStorage.setItem('rugby_records', JSON.stringify(records));
    updateLastSaved();
    
    // Guardar en Firebase si está disponible
    if (useFirebase && db) {
      saveToFirebase();
    }
  } catch (e) { console.warn('LocalStorage unavailable:', e); }
}

function saveToFirebase() {
  const syncStatus = document.getElementById('sync-status');
  if (syncStatus) syncStatus.textContent = '🔄 Syncing...';
  
  db.ref('rugby-attendance').set({
    roster: roster,
    records: records,
    lastUpdate: new Date().toISOString()
  }).then(() => {
    if (syncStatus) {
      syncStatus.textContent = '✅ Synced';
      setTimeout(() => { syncStatus.textContent = ''; }, 2000);
    }
  }).catch(err => {
    console.error('Firebase save error:', err);
    if (syncStatus) syncStatus.textContent = '❌ Sync failed';
  });
}

function load() {
  try {
    const r = localStorage.getItem('rugby_roster');
    const d = localStorage.getItem('rugby_records');
    roster  = r ? JSON.parse(r) : DEFAULT_ROSTER;
    records = d ? JSON.parse(d) : {};
    
    // Cargar desde Firebase si está disponible
    if (useFirebase && db) {
      loadFromFirebase();
    }
  } catch (e) {
    console.warn('Failed to load data:', e);
    roster  = DEFAULT_ROSTER;
    records = {};
  }
}

function loadFromFirebase() {
  const syncStatus = document.getElementById('sync-status');
  if (syncStatus) syncStatus.textContent = '🔄 Loading...';
  
  db.ref('rugby-attendance').once('value').then(snapshot => {
    const data = snapshot.val();
    if (data) {
      roster = data.roster || DEFAULT_ROSTER;
      records = data.records || {};
      
      // Guardar en localStorage como backup
      localStorage.setItem('rugby_roster', JSON.stringify(roster));
      localStorage.setItem('rugby_records', JSON.stringify(records));
      
      renderTable(currentDate, currentSearch());
      if (syncStatus) {
        syncStatus.textContent = '✅ Loaded';
        setTimeout(() => { syncStatus.textContent = ''; }, 2000);
      }
    }
  }).catch(err => {
    console.error('Firebase load error:', err);
    if (syncStatus) syncStatus.textContent = '❌ Load failed';
  });
  
  // Escuchar cambios en tiempo real
  db.ref('rugby-attendance').on('value', snapshot => {
    const data = snapshot.val();
    if (data && data.lastUpdate) {
      const localUpdate = localStorage.getItem('rugby_last_update');
      if (!localUpdate || data.lastUpdate > localUpdate) {
        roster = data.roster || roster;
        records = data.records || records;
        localStorage.setItem('rugby_last_update', data.lastUpdate);
        renderTable(currentDate, currentSearch());
      }
    }
  });
}

function updateLastSaved() {
  const el = document.getElementById('last-saved');
  if (el) {
    const now = new Date();
    el.textContent = `Saved ${now.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' })}`;
  }
}

// ── Session Detection ────────────────────────────────────────
function detectSession(dateStr) {
  const dayOfWeek = new Date(dateStr + 'T12:00:00').getDay(); // 0=Sun … 6=Sat
  const nowHour   = (dateStr === todayStr()) ? new Date().getHours() + new Date().getMinutes() / 60 : null;

  for (const s of SESSIONS) {
    if (!s.days.includes(dayOfWeek)) continue;
    const isLive = nowHour !== null && nowHour >= s.start && nowHour < s.end;
    return { ...s, isLive };
  }
  return null;
}

function updateSessionBadge(dateStr) {
  const badge = document.getElementById('session-badge');
  const dot   = document.getElementById('session-dot');
  const label = document.getElementById('session-label');
  const session = detectSession(dateStr);

  if (session) {
    label.textContent = session.isLive ? `🔴 LIVE · ${session.label}` : session.label;
    dot.classList.toggle('active', !!session.isLive);
  } else {
    const d = new Date(dateStr + 'T12:00:00');
    const dayName = d.toLocaleDateString('en-IE', { weekday: 'long' });
    label.textContent = `No training on ${dayName}s`;
    dot.classList.remove('active');
  }
}

// ── Stats ────────────────────────────────────────────────────
function updateStats(dateStr) {
  const counts = { present: 0, sick: 0, injured: 0, travel: 0, study: 0, unknown: 0 };
  for (const p of roster) {
    const s = getStatusForDate(dateStr, p.id);
    counts[s] = (counts[s] || 0) + 1;
  }
  for (const [status, val] of Object.entries(counts)) {
    const el = document.getElementById('count-' + status);
    if (el) {
      const prev = parseInt(el.textContent, 10);
      if (prev !== val) {
        el.textContent = val;
        el.classList.add('bump');
        el.addEventListener('animationend', () => el.classList.remove('bump'), { once: true });
      }
    }
  }
}

// ── Render Table ─────────────────────────────────────────────
function renderTable(dateStr, filter = '') {
  const tbody = document.getElementById('player-tbody');
  const emptyState = document.getElementById('empty-state');
  if (!tbody) return;

  const query = filter.trim().toLowerCase();
  const visible = roster.filter(p => {
    // Filtro por nombre
    const matchesName = p.name.toLowerCase().includes(query);
    
    // Filtro por estado
    if (currentFilter === 'all') {
      return matchesName;
    } else {
      const status = getStatusForDate(dateStr, p.id);
      return matchesName && status === currentFilter;
    }
  });

  if (visible.length === 0) {
    tbody.innerHTML = '';
    emptyState.hidden = false;
    const filterName = currentFilter === 'all' ? '' : ` con estado "${getFilterLabel(currentFilter)}"`;
    emptyState.innerHTML = `
      <span class="empty-icon">🏉</span>
      <p>No se encontraron jugadores${filterName}${query ? ` que coincidan con "${filter}"` : ''}.</p>
    `;
    return;
  }
  emptyState.hidden = true;

  const fragment = document.createDocumentFragment();

  visible.forEach((player, idx) => {
    const status = getStatusForDate(dateStr, player.id);
    const row = document.createElement('tr');
    row.className = 'player-row';
    row.dataset.status  = status;
    row.dataset.playerId = player.id;
    row.innerHTML = `
      <td class="td-num">${idx + 1}</td>
      <td>
        <div class="player-name">${escapeHtml(player.name)}</div>
      </td>
      ${STATUSES.map(s => `
        <td class="td-status">
          <input
            type="radio"
            class="status-radio"
            name="status-${player.id}"
            data-player-id="${player.id}"
            data-status="${s}"
            aria-label="${s}"
            title="${STATUS_EMOJI[s]} ${capitalize(s)}"
            ${status === s ? 'checked' : ''}
          />
        </td>
      `).join('')}
      <td class="td-actions">
        <button class="btn-delete" data-player-id="${player.id}" title="Remove player" aria-label="Remove ${escapeHtml(player.name)}">✕</button>
      </td>
    `;
    fragment.appendChild(row);
  });

  tbody.innerHTML = '';
  tbody.appendChild(fragment);
  updateStats(dateStr);
  updateFilterCounts(dateStr);
}

function getFilterLabel(filter) {
  const labels = {
    all: 'Todos',
    present: 'Presentes',
    sick: 'Lesionado-Presente',
    injured: 'Lesionado-Ausente',
    travel: 'Viaje',
    study: 'Estudio',
    unknown: 'Llegada-Tarde'
  };
  return labels[filter] || filter;
}

// ── Update Filter Counts ─────────────────────────────────────
function updateFilterCounts(dateStr) {
  const counts = { all: roster.length, present: 0, sick: 0, injured: 0, travel: 0, study: 0, unknown: 0 };
  
  roster.forEach(p => {
    const status = getStatusForDate(dateStr, p.id);
    counts[status]++;
  });
  
  // Actualizar badges en los filtros
  document.querySelectorAll('.filter-chip').forEach(chip => {
    const filter = chip.dataset.filter;
    const count = counts[filter] || 0;
    const badge = chip.querySelector('.chip-badge');
    
    if (badge) {
      badge.textContent = count;
    } else if (filter !== 'all') {
      const badgeEl = document.createElement('span');
      badgeEl.className = 'chip-badge';
      badgeEl.textContent = count;
      chip.appendChild(badgeEl);
    }
  });
}

// ── Event delegation for table clicks ────────────────────────
function bindTableEvents() {
  const tbody = document.getElementById('player-tbody');

  tbody.addEventListener('change', e => {
    const radio = e.target;
    if (!radio.classList.contains('status-radio')) return;

    const { playerId, status } = radio.dataset;
    setStatusForDate(currentDate, playerId, status);

    // Update row tint
    const row = tbody.querySelector(`tr[data-player-id="${playerId}"]`);
    if (row) {
      row.dataset.status = status;
      row.classList.add('row-flash');
    }
    updateStats(currentDate);
    showToast(`${getPlayerName(playerId)} → ${STATUS_EMOJI[status]} ${capitalize(status)}`);
  });

  tbody.addEventListener('click', e => {
    const btn = e.target.closest('.btn-delete');
    if (!btn) return;
    const { playerId } = btn.dataset;
    deletePlayer(playerId);
  });
}

function getPlayerName(id) {
  const p = roster.find(r => r.id === id);
  return p ? p.name : id;
}

// ── Player Management ────────────────────────────────────────
function deletePlayer(id) {
  const name = getPlayerName(id);
  if (!confirm(`Remove "${name}" from the roster?`)) return;
  roster = roster.filter(p => p.id !== id);
  // Remove from all records
  for (const day of Object.keys(records)) {
    delete records[day][id];
  }
  save();
  renderTable(currentDate, currentSearch());
  showToast(`${name} removed from roster`, 'warn');
}

function addPlayer(name) {
  const trimmed = name.trim();
  if (!trimmed) { showToast('Please enter a player name', 'error'); return; }
  if (roster.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
    showToast('A player with that name already exists', 'error');
    return;
  }
  const player = { id: uniqueId(), name: trimmed };
  roster.push(player);
  save();
  renderTable(currentDate, currentSearch());
  showToast(`${escapeHtml(player.name)} added to roster 🏉`);
}

// ── Date Navigation ──────────────────────────────────────────
function goToDate(dateStr) {
  currentDate = dateStr;
  document.getElementById('date-picker').value = dateStr;
  updateSessionBadge(dateStr);
  renderTable(dateStr, currentSearch());
}

function shiftDate(days) {
  const d = new Date(currentDate + 'T12:00:00');
  d.setDate(d.getDate() + days);
  goToDate(d.toISOString().slice(0, 10));
}

// ── Search ───────────────────────────────────────────────────
function currentSearch() {
  return document.getElementById('search-input')?.value || '';
}

// ── Toast Notifications ──────────────────────────────────────
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? '' : type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toast-out 0.25s ease forwards';
    toast.addEventListener('animationend', () => toast.remove());
  }, 2800);
}

// ── Utility ──────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[m]);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Export to Excel ──────────────────────────────────────────
function exportToExcel() {
  openDateSelectionModal();
}

function openDateSelectionModal() {
  const modal = document.getElementById('date-selection-modal');
  const dateList = document.getElementById('date-selection-list');
  
  const allDates = Object.keys(records).sort().reverse(); // Más recientes primero
  
  if (allDates.length === 0) {
    showToast('No hay datos para exportar', 'warn');
    return;
  }
  
  // Generar lista de fechas con checkboxes
  let html = '<div class="date-selection-header"><label><input type="checkbox" id="select-all-dates" /> <strong>Seleccionar todas</strong></label></div>';
  
  allDates.forEach(date => {
    const formattedDate = formatDateDisplay(date);
    const isCurrentDate = date === currentDate;
    html += `
      <label class="date-checkbox-item ${isCurrentDate ? 'current-date' : ''}">
        <input type="checkbox" class="date-checkbox" value="${date}" ${isCurrentDate ? 'checked' : ''} />
        <span class="date-label">${formattedDate}</span>
        ${isCurrentDate ? '<span class="current-badge">Actual</span>' : ''}
      </label>
    `;
  });
  
  dateList.innerHTML = html;
  modal.hidden = false;
  
  // Event listener para "Seleccionar todas"
  document.getElementById('select-all-dates').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.date-checkbox');
    checkboxes.forEach(cb => cb.checked = this.checked);
  });
}

function closeDateSelectionModal() {
  document.getElementById('date-selection-modal').hidden = true;
}

function confirmExportDates() {
  const selectedDates = Array.from(document.querySelectorAll('.date-checkbox:checked'))
    .map(cb => cb.value)
    .sort();
  
  if (selectedDates.length === 0) {
    showToast('Selecciona al menos una fecha', 'warn');
    return;
  }
  
  closeDateSelectionModal();
  exportSelectedDatesToExcel(selectedDates);
}

function exportSelectedDatesToExcel(selectedDates) {
  try {
    const wb = XLSX.utils.book_new();
    
    // Crear una hoja por cada fecha seleccionada
    selectedDates.forEach(dateStr => {
      const formattedDate = formatDateDisplay(dateStr);
      
      const data = [
        ['Fuengirola RC M-18 - Attendance Report'],
        [`Fecha: ${formattedDate}`],
        [],
        ['#', 'Jugador', 'Estado']
      ];
      
      roster.forEach((player, idx) => {
        const status = getStatusForDate(dateStr, player.id);
        let statusText = '';
        switch(status) {
          case 'present': statusText = 'Presente'; break;
          case 'sick': statusText = 'Lesionado-Presente'; break;
          case 'injured': statusText = 'Lesionado-Ausente'; break;
          case 'travel': statusText = 'Viaje'; break;
          case 'study': statusText = 'Estudio'; break;
          default: statusText = 'Llegada-Tarde';
        }
        data.push([idx + 1, player.name, statusText]);
      });
      
      // Agregar resumen
      const counts = { present: 0, sick: 0, injured: 0, travel: 0, study: 0, unknown: 0 };
      for (const p of roster) {
        const s = getStatusForDate(dateStr, p.id);
        counts[s] = (counts[s] || 0) + 1;
      }
      
      data.push([]);
      data.push(['Resumen']);
      data.push(['Presente', counts.present]);
      data.push(['Lesionado-Presente', counts.sick]);
      data.push(['Lesionado-Ausente', counts.injured]);
      data.push(['Viaje', counts.travel]);
      data.push(['Estudio', counts.study]);
      data.push(['Llegada-Tarde', counts.unknown]);
      
      const ws = XLSX.utils.aoa_to_sheet(data);
      
      // Ajustar anchos de columna
      ws['!cols'] = [
        { wch: 5 },  // #
        { wch: 25 }, // Jugador
        { wch: 20 }  // Estado
      ];
      
      // Nombre de hoja: usar fecha corta (máx 31 caracteres)
      const sheetName = dateStr;
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });
    
    // Descargar archivo
    const today = new Date().toISOString().slice(0, 10);
    const fileName = selectedDates.length === 1 
      ? `asistencia_${selectedDates[0]}.xlsx`
      : `asistencia_multiple_${today}.xlsx`;
    
    XLSX.writeFile(wb, fileName);
    showToast(`Excel con ${selectedDates.length} fecha${selectedDates.length > 1 ? 's' : ''} descargado 📊`);
  } catch (error) {
    console.error('Error al exportar Excel:', error);
    showToast('Error al exportar. Verifica que permites descargas en tu navegador', 'error');
  }
}

// ── Export Statistics to Excel ───────────────────────────────
function exportStatsToExcel() {
  try {
    const allDates = Object.keys(records).sort();
    
    if (allDates.length === 0) {
      showToast('No hay datos para exportar', 'warn');
      return;
    }
    
    // Hoja 1: Estadísticas por jugador
    const playerData = [
      ['Fuengirola RC M-18 - Estadísticas por Jugador'],
      [],
      ['Jugador', 'Presente', 'Lesionado-Presente', 'Lesionado-Ausente', 'Viaje', 'Estudio', 'Llegada-Tarde', 'Total Sesiones', '% Asistencia']
    ];
    
    roster.forEach(player => {
      const stats = { present: 0, sick: 0, injured: 0, travel: 0, study: 0, unknown: 0 };
      let total = 0;
      
      allDates.forEach(date => {
        if (records[date] && records[date][player.id]) {
          const status = records[date][player.id];
          stats[status]++;
          total++;
        }
      });
      
      const attendance = total > 0 ? ((stats.present / total) * 100).toFixed(1) : 0;
      
      playerData.push([
        player.name,
        stats.present,
        stats.sick,
        stats.injured,
        stats.travel,
        stats.study,
        stats.unknown,
        total,
        `${attendance}%`
      ]);
    });
    
    // Hoja 2: Resumen general
    const summaryData = [
      ['Fuengirola RC M-18 - Resumen General'],
      [],
      ['Total de jugadores', roster.length],
      ['Total de sesiones registradas', allDates.length],
      ['Primera sesión', allDates[0]],
      ['Última sesión', allDates[allDates.length - 1]],
      [],
      ['Promedio por sesión'],
      ['Estado', 'Promedio']
    ];
    
    const avgStats = { present: 0, sick: 0, injured: 0, travel: 0, study: 0, unknown: 0 };
    allDates.forEach(date => {
      const counts = { present: 0, sick: 0, injured: 0, travel: 0, study: 0, unknown: 0 };
      roster.forEach(p => {
        const status = getStatusForDate(date, p.id);
        counts[status]++;
      });
      Object.keys(avgStats).forEach(k => avgStats[k] += counts[k]);
    });
    
    const numSessions = allDates.length;
    summaryData.push(['Presente', (avgStats.present / numSessions).toFixed(1)]);
    summaryData.push(['Lesionado-Presente', (avgStats.sick / numSessions).toFixed(1)]);
    summaryData.push(['Lesionado-Ausente', (avgStats.injured / numSessions).toFixed(1)]);
    summaryData.push(['Viaje', (avgStats.travel / numSessions).toFixed(1)]);
    summaryData.push(['Estudio', (avgStats.study / numSessions).toFixed(1)]);
    summaryData.push(['Llegada-Tarde', (avgStats.unknown / numSessions).toFixed(1)]);
    
    // Hoja 3: Historial completo
    const historyData = [
      ['Fuengirola RC M-18 - Historial Completo'],
      [],
      ['Fecha', ...roster.map(p => p.name)]
    ];
    
    allDates.forEach(date => {
      const row = [date];
      roster.forEach(player => {
        const status = getStatusForDate(date, player.id);
        let statusText = '';
        switch(status) {
          case 'present': statusText = 'P'; break;
          case 'sick': statusText = 'LP'; break;
          case 'injured': statusText = 'LA'; break;
          case 'travel': statusText = 'V'; break;
          case 'study': statusText = 'E'; break;
          default: statusText = '?';
        }
        row.push(statusText);
      });
      historyData.push(row);
    });
    
    // Crear libro con múltiples hojas
    const wb = XLSX.utils.book_new();
    
    const ws1 = XLSX.utils.aoa_to_sheet(playerData);
    ws1['!cols'] = [{ wch: 25 }, { wch: 10 }, { wch: 18 }, { wch: 18 }, { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 15 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws1, 'Por Jugador');
    
    const ws2 = XLSX.utils.aoa_to_sheet(summaryData);
    ws2['!cols'] = [{ wch: 30 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, ws2, 'Resumen General');
    
    const ws3 = XLSX.utils.aoa_to_sheet(historyData);
    const cols3 = [{ wch: 12 }];
    roster.forEach(() => cols3.push({ wch: 15 }));
    ws3['!cols'] = cols3;
    XLSX.utils.book_append_sheet(wb, ws3, 'Historial');
    
    // Descargar
    const today = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `estadisticas_rugby_${today}.xlsx`);
    showToast('Estadísticas exportadas a Excel 📊');
  } catch (error) {
    console.error('Error al exportar estadísticas:', error);
    showToast('Error al exportar. Verifica que permites descargas en tu navegador', 'error');
  }
}

// ── Print Report ─────────────────────────────────────────────
function printReport() {
  // Agregar fecha al header para impresión
  const headerCenter = document.querySelector('.header-center-text');
  if (headerCenter) {
    headerCenter.setAttribute('data-print-date', formatDateDisplay(currentDate));
  }
  
  window.print();
  showToast('Abriendo diálogo de impresión 🖨️');
}

// ── Statistics Modal ─────────────────────────────────────────
function openStatsModal() {
  const modal = document.getElementById('stats-modal-overlay');
  const content = document.getElementById('stats-content');
  
  const allDates = Object.keys(records).sort();
  
  if (allDates.length === 0) {
    content.innerHTML = '<p class="empty-message">No hay datos de asistencia registrados aún.</p>';
    modal.hidden = false;
    return;
  }
  
  // Calcular estadísticas por jugador
  const playerStats = roster.map(player => {
    const stats = { present: 0, sick: 0, injured: 0, travel: 0, study: 0, unknown: 0 };
    let total = 0;
    
    allDates.forEach(date => {
      if (records[date] && records[date][player.id]) {
        const status = records[date][player.id];
        stats[status]++;
        total++;
      }
    });
    
    const attendance = total > 0 ? ((stats.present / total) * 100).toFixed(1) : 0;
    
    return {
      name: player.name,
      ...stats,
      total,
      attendance
    };
  });
  
  // Calcular estadísticas generales
  const generalStats = { present: 0, sick: 0, injured: 0, travel: 0, study: 0, unknown: 0 };
  let totalRecords = 0;
  
  allDates.forEach(date => {
    roster.forEach(p => {
      const status = getStatusForDate(date, p.id);
      generalStats[status]++;
      totalRecords++;
    });
  });
  
  const avgAttendance = totalRecords > 0 ? ((generalStats.present / totalRecords) * 100).toFixed(1) : 0;
  
  // Generar HTML
  let html = `
    <div class="stats-section">
      <h3>📊 Resumen General</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card-value">${roster.length}</div>
          <div class="stat-card-label">Jugadores</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value">${allDates.length}</div>
          <div class="stat-card-label">Sesiones</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value">${avgAttendance}%</div>
          <div class="stat-card-label">Asistencia Promedio</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value">${generalStats.present}</div>
          <div class="stat-card-label">Total Presentes</div>
        </div>
      </div>
    </div>
    
    <div class="stats-section">
      <h3>👥 Estadísticas por Jugador</h3>
      <div class="stats-table-wrapper">
        <table class="stats-table">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>✅ Presente</th>
              <th>🤕 Les-Pres</th>
              <th>🤕 Les-Aus</th>
              <th>✈️ Viaje</th>
              <th>📚 Estudio</th>
              <th>❓ Desc</th>
              <th>Total</th>
              <th>% Asist</th>
            </tr>
          </thead>
          <tbody>
  `;
  
  playerStats
    .sort((a, b) => b.attendance - a.attendance)
    .forEach(stat => {
      const attendanceClass = stat.attendance >= 80 ? 'good' : stat.attendance >= 60 ? 'medium' : 'low';
      html += `
        <tr>
          <td class="player-name-cell">${escapeHtml(stat.name)}</td>
          <td>${stat.present}</td>
          <td>${stat.sick}</td>
          <td>${stat.injured}</td>
          <td>${stat.travel}</td>
          <td>${stat.study}</td>
          <td>${stat.unknown}</td>
          <td><strong>${stat.total}</strong></td>
          <td class="attendance-${attendanceClass}"><strong>${stat.attendance}%</strong></td>
        </tr>
      `;
    });
  
  html += `
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  content.innerHTML = html;
  modal.hidden = false;
}

function closeStatsModal() {
  document.getElementById('stats-modal-overlay').hidden = true;
}

// ── Modal ────────────────────────────────────────────────────
function openModal() {
  document.getElementById('modal-overlay').hidden = false;
  document.getElementById('new-player-name').value = '';
  document.getElementById('new-player-name').focus();
}
function closeModal() {
  document.getElementById('modal-overlay').hidden = true;
}

// ── Init ─────────────────────────────────────────────────────
function init() {
  // Registrar Service Worker para PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
          console.log('✅ Service Worker registrado:', registration.scope);
        })
        .catch(error => {
          console.log('❌ Error al registrar Service Worker:', error);
        });
    });
  }

  // Verificar autenticación
  if (useFirebase && auth) {
    auth.onAuthStateChanged(user => {
      if (user) {
        currentUser = user;
        showMainApp();
        load();
        initializeApp();
      } else {
        currentUser = null;
        showLoginScreen();
      }
    });
  } else {
    // Sin Firebase, mostrar app directamente
    showMainApp();
    load();
    initializeApp();
  }
}

function showLoginScreen() {
  document.getElementById('login-screen').hidden = false;
  document.getElementById('main-app').hidden = true;
}

function showMainApp() {
  document.getElementById('login-screen').hidden = true;
  document.getElementById('main-app').hidden = false;
}

function initializeApp() {
  const datePicker = document.getElementById('date-picker');
  datePicker.value = currentDate;

  updateSessionBadge(currentDate);
  renderTable(currentDate);
  bindTableEvents();

  // --- Date controls ---
  document.getElementById('prev-day').addEventListener('click', () => shiftDate(-1));
  document.getElementById('next-day').addEventListener('click', () => shiftDate(+1));
  document.getElementById('today-btn').addEventListener('click', () => goToDate(todayStr()));

  datePicker.addEventListener('change', () => {
    if (datePicker.value) goToDate(datePicker.value);
  });

  // --- Search ---
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  searchInput.addEventListener('input', e => {
    searchClear.style.display = e.target.value ? 'block' : 'none';
    renderTable(currentDate, e.target.value);
  });
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.style.display = 'none';
    renderTable(currentDate, '');
    searchInput.focus();
  });

  // --- Filter chips ---
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      // Remover active de todos
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      
      // Activar el clickeado
      chip.classList.add('active');
      
      // Actualizar filtro actual
      currentFilter = chip.dataset.filter;
      
      // Re-renderizar tabla
      renderTable(currentDate, currentSearch());
      
      // Toast informativo
      const filterLabel = getFilterLabel(currentFilter);
      if (currentFilter === 'all') {
        showToast('Mostrando todos los jugadores 👥');
      } else {
        showToast(`Filtrando por: ${filterLabel} 🔍`);
      }
    });
  });

  // --- Bulk actions ---
  document.getElementById('mark-all-present').addEventListener('click', () => {
    const query = currentSearch().trim().toLowerCase();
    const targets = roster.filter(p =>
      p.name.toLowerCase().includes(query)
    );
    targets.forEach(p => {
      setStatusForDate(currentDate, p.id, 'present');
    });
    renderTable(currentDate, currentSearch());
    showToast(`${targets.length} player${targets.length !== 1 ? 's' : ''} marked present ✅`);
  });

  document.getElementById('reset-all').addEventListener('click', () => {
    if (!confirm('Reset all attendance for this date to Unknown?')) return;
    if (records[currentDate]) {
      for (const id of Object.keys(records[currentDate])) {
        records[currentDate][id] = 'unknown';
      }
      save();
    }
    renderTable(currentDate, currentSearch());
    showToast('Attendance reset to Unknown ↺', 'warn');
  });

  // --- Modal ---
  document.getElementById('add-player-btn').addEventListener('click', openModal);
  document.getElementById('modal-cancel').addEventListener('click', closeModal);

  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });

  document.getElementById('modal-confirm').addEventListener('click', () => {
    const name = document.getElementById('new-player-name').value;
    if (!name.trim()) {
      document.getElementById('new-player-name').focus();
      return;
    }
    addPlayer(name);
    closeModal();
  });

  document.getElementById('new-player-name').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('modal-confirm').click();
    if (e.key === 'Escape') closeModal();
  });

  // --- Keyboard shortcut: Escape closes modal ---
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // --- Export & Print buttons ---
  document.getElementById('export-excel-btn').addEventListener('click', () => {
    // Mostrar mensaje de ayuda si es la primera vez
    const firstTime = !localStorage.getItem('excel_export_done');
    if (firstTime) {
      showToast('Si no se descarga, permite las descargas en tu navegador 💡', 'info');
      localStorage.setItem('excel_export_done', 'true');
    }
    exportToExcel();
  });
  
  document.getElementById('print-btn').addEventListener('click', printReport);
  
  // --- Stats modal ---
  document.getElementById('stats-btn').addEventListener('click', openStatsModal);
  document.getElementById('stats-modal-close').addEventListener('click', closeStatsModal);
  document.getElementById('stats-modal-cancel').addEventListener('click', closeStatsModal);
  document.getElementById('export-stats-excel').addEventListener('click', () => {
    const firstTime = !localStorage.getItem('stats_export_done');
    if (firstTime) {
      showToast('Si no se descarga, permite las descargas en tu navegador 💡', 'info');
      localStorage.setItem('stats_export_done', 'true');
    }
    exportStatsToExcel();
  });
  
  // --- Date selection modal ---
  document.getElementById('date-selection-close').addEventListener('click', closeDateSelectionModal);
  document.getElementById('date-selection-cancel').addEventListener('click', closeDateSelectionModal);
  document.getElementById('date-selection-confirm').addEventListener('click', confirmExportDates);
  
  document.getElementById('date-selection-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('date-selection-modal')) closeDateSelectionModal();
  });
  
  document.getElementById('stats-modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('stats-modal-overlay')) closeStatsModal();
  });

  // --- Logout button ---
  if (useFirebase && auth) {
    document.getElementById('logout-btn').addEventListener('click', () => {
      if (confirm('¿Cerrar sesión?')) {
        auth.signOut().then(() => {
          showToast('Sesión cerrada 👋');
        }).catch(err => {
          console.error('Logout error:', err);
          showToast('Error al cerrar sesión', 'error');
        });
      }
    });
  } else {
    document.getElementById('logout-btn').style.display = 'none';
  }

  // --- Auto-refresh session badge every minute ---
  setInterval(() => updateSessionBadge(currentDate), 60_000);

  // --- Animate stat bump ---
  const style = document.createElement('style');
  style.textContent = `@keyframes bump { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } } .bump { animation: bump 0.28s ease; }`;
  document.head.appendChild(style);
}

// ── Authentication ───────────────────────────────────────────
function setupLoginHandlers() {
  const loginBtn = document.getElementById('login-btn');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const rememberCheckbox = document.getElementById('remember-email');
  const errorDiv = document.getElementById('login-error');

  // Cargar email recordado al iniciar
  loadRememberedEmail();

  const handleLogin = () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      showLoginError('Por favor ingresa email y contraseña');
      return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = '🔄 Iniciando sesión...';
    errorDiv.hidden = true;

    // Configurar persistencia de sesión (con fallback si falla en móvil)
    const doLogin = () => auth.signInWithEmailAndPassword(email, password);

    const persistence = firebase.auth.Auth.Persistence.LOCAL;
    auth.setPersistence(persistence).catch(() => {}).then(() => {
      return doLogin();
    }).then(() => {
      // Guardar email si está marcado "recordar"
      if (rememberCheckbox.checked) {
        localStorage.setItem('rugby_remembered_email', email);
      } else {
        localStorage.removeItem('rugby_remembered_email');
      }
      
      showToast('¡Bienvenido! 👋');
    }).catch(error => {
      console.error('Login error:', error);
      let message = 'Error al iniciar sesión';
      
      switch(error.code) {
        case 'auth/invalid-email':
          message = 'Email inválido';
          break;
        case 'auth/user-disabled':
          message = 'Usuario deshabilitado';
          break;
        case 'auth/user-not-found':
          message = 'Usuario no encontrado';
          break;
        case 'auth/wrong-password':
          message = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-credential':
          message = 'Credenciales inválidas';
          break;
      }
      
      showLoginError(message);
      loginBtn.disabled = false;
      loginBtn.textContent = '🔐 Iniciar Sesión';
    });
  };

  loginBtn.addEventListener('click', handleLogin);
  
  passwordInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });
  
  emailInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') passwordInput.focus();
  });
}

function loadRememberedEmail() {
  const rememberedEmail = localStorage.getItem('rugby_remembered_email');
  const emailInput = document.getElementById('login-email');
  const rememberCheckbox = document.getElementById('remember-email');
  
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberCheckbox.checked = true;
    // Enfocar el campo de contraseña si hay email recordado
    document.getElementById('login-password').focus();
  } else {
    // Enfocar el campo de email si no hay email recordado
    emailInput.focus();
  }
}

function showLoginError(message) {
  const errorDiv = document.getElementById('login-error');
  errorDiv.textContent = message;
  errorDiv.hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
  setupLoginHandlers();
  init();
});
