/* GenAI101 — progress tracking
 * Keeps everything in localStorage and supports JSON export for Nolan.
 */

const STORAGE_KEY = "genai101.progress.v1";

function nowISO() { return new Date().toISOString(); }

function newProgress(name) {
  return {
    name,
    startedAt: nowISO(),
    lastSeenAt: nowISO(),
    totalTimeMs: 0,
    sessions: [],                  // [{startedAt, endedAt, ms}]
    modules: {},                   // moduleId -> { unlocked, passed, bestScore, attempts: [{at,score,ms,answers}] }
    tests:   {},                   // testId   -> { passed, bestScore, fastestMs, attempts: [...] }
    skipped: [],                   // moduleIds skipped via test
    setup:   {}                    // moduleId -> { [itemId]: { checked: true, at: ISO } }
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("progress: could not parse localStorage", e);
    return null;
  }
}

function saveProgress(p) {
  p.lastSeenAt = nowISO();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

/* ---------- session timing ---------- */
let _sessionStart = null;
function startSession() {
  _sessionStart = Date.now();
}
function endSession(p) {
  if (!_sessionStart || !p) return;
  const ended = Date.now();
  const ms = ended - _sessionStart;
  p.sessions.push({
    startedAt: new Date(_sessionStart).toISOString(),
    endedAt: new Date(ended).toISOString(),
    ms
  });
  p.totalTimeMs = (p.totalTimeMs || 0) + ms;
  _sessionStart = ended;            // start a fresh segment immediately
  saveProgress(p);
}

/* ---------- module/test state helpers ---------- */
function ensureModuleState(p, mid) {
  if (!p.modules[mid]) {
    p.modules[mid] = { unlocked: true, passed: false, bestScore: 0, attempts: [] };
  }
  return p.modules[mid];
}
function ensureTestState(p, tid) {
  if (!p.tests[tid]) {
    p.tests[tid] = { passed: false, bestScore: 0, fastestMs: null, attempts: [] };
  }
  return p.tests[tid];
}

function recomputeUnlocks(p) {
  // All modules are always available — learners can tackle them in any order.
  for (const m of MODULES) ensureModuleState(p, m.id).unlocked = true;
}

function recordQuizAttempt(p, moduleId, result) {
  const st = ensureModuleState(p, moduleId);
  st.attempts.push({ at: nowISO(), ...result });
  if (result.score > st.bestScore) st.bestScore = result.score;
  if (result.score >= PASSING_GRADE) st.passed = true;
  recomputeUnlocks(p);
  saveProgress(p);
}

function recordTestAttempt(p, testId, result) {
  const st = ensureTestState(p, testId);
  st.attempts.push({ at: nowISO(), ...result });
  if (result.score > st.bestScore) st.bestScore = result.score;
  if (result.score >= PASSING_GRADE) {
    st.passed = true;
    if (st.fastestMs === null || result.elapsedMs < st.fastestMs) st.fastestMs = result.elapsedMs;
    const test = TESTS.find(t => t.id === testId);
    if (test && result.elapsedMs <= test.timeLimitSec * 1000) {
      // Skip the modules covered by this test
      for (const mid of test.covers) {
        if (!p.skipped.includes(mid)) p.skipped.push(mid);
        const ms = ensureModuleState(p, mid);
        ms.passed = true;
        ms.unlocked = true;
        if (ms.bestScore < result.score) ms.bestScore = result.score;
      }
    }
  }
  recomputeUnlocks(p);
  saveProgress(p);
}

/* ---------- setup checklist ---------- */
function getSetupState(p, moduleId) {
  if (!p.setup) p.setup = {};
  if (!p.setup[moduleId]) p.setup[moduleId] = {};
  return p.setup[moduleId];
}
function setSetupItem(p, moduleId, itemId, checked) {
  const s = getSetupState(p, moduleId);
  if (checked) s[itemId] = { checked: true, at: nowISO() };
  else delete s[itemId];
  saveProgress(p);
}
function isModuleSetupComplete(p, moduleId) {
  const m = MODULES.find(x => x.id === moduleId);
  if (!m || !m.setup) return true;
  const s = getSetupState(p, moduleId);
  return m.setup.items.every(it => s[it.id] && s[it.id].checked);
}
function modulesNeedingSetupForTest(p, testId) {
  const t = TESTS.find(x => x.id === testId);
  if (!t) return [];
  return t.covers
    .map(mid => MODULES.find(m => m.id === mid))
    .filter(m => m && m.setup && !isModuleSetupComplete(p, m.id));
}
function allModulesDoneOrSkipped(p) {
  return MODULES.every(m => {
    const st = p.modules[m.id];
    return (st && st.passed) || p.skipped.includes(m.id);
  });
}
function isFinalTestUnlocked(p) {
  return allModulesDoneOrSkipped(p);
}

/* ---------- summary ---------- */
function overallPct(p) {
  if (!p) return 0;
  const total = MODULES.length;
  let done = 0;
  for (const m of MODULES) {
    const st = p.modules[m.id];
    if (st && (st.passed || p.skipped.includes(m.id))) done++;
  }
  return Math.round((done / total) * 100);
}

function fmtDuration(ms) {
  if (!ms || ms < 0) return "0s";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${sec}s`;
  return `${sec}s`;
}
