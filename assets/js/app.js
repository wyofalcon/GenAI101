/* GenAI101 — app shell, routing, views */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const appRoot = $("#app");

let progress = loadProgress();

/* ---------- top bar ---------- */
function refreshTopBar() {
  const pill = $("#learner-pill");
  if (!progress) { pill.hidden = true; return; }
  pill.hidden = false;
  $("#learner-name").textContent = progress.name;
}
$("#export-btn").addEventListener("click", () => showExport());
$("#reset-btn").addEventListener("click", () => {
  if (confirm("Wipe all progress and start over?")) {
    endSession(progress);
    resetProgress();
    progress = null;
    refreshTopBar();
    route();
  }
});

/* ---------- routing ---------- */
function route() {
  appRoot.innerHTML = "";
  if (!progress) return showWelcome();
  showDashboard();
}

function mountTemplate(id) {
  const tpl = $(`#${id}`);
  appRoot.innerHTML = "";
  appRoot.appendChild(tpl.content.cloneNode(true));
}

function flash(msg) {
  let b = $(".banner");
  if (!b) {
    b = document.createElement("div");
    b.className = "banner";
    document.body.appendChild(b);
  }
  b.textContent = msg;
  b.classList.add("show");
  clearTimeout(b._t);
  b._t = setTimeout(() => b.classList.remove("show"), 2200);
}

/* ---------- welcome ---------- */
function showWelcome() {
  mountTemplate("tpl-welcome");
  $("#signup-form").addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get("name").trim();
    if (!name) return;
    progress = newProgress(name);
    recomputeUnlocks(progress);
    saveProgress(progress);
    startSession();
    refreshTopBar();
    route();
  });
}

/* ---------- dashboard ---------- */
function showDashboard() {
  mountTemplate("tpl-dashboard");
  $$("[data-passing-grade]").forEach(el => { el.textContent = Math.round(PASSING_GRADE * 100); });

  const pct = overallPct(progress);
  $("#overall-fill").style.width = `${pct}%`;
  $("#overall-label").textContent = `${pct}%`;

  const list = $("#module-list");
  MODULES.forEach((m, i) => {
    const st = progress.modules[m.id] || { unlocked: i === 0 };
    const done = st.passed || progress.skipped.includes(m.id);
    const li = document.createElement("li");
    li.className = done ? "done" : (st.unlocked ? "" : "locked");

    const num = document.createElement("div"); num.className = "num"; num.textContent = i + 1;
    const meta = document.createElement("div"); meta.className = "meta";
    meta.innerHTML = `<h3>${m.title}</h3><p>${m.blurb}</p>`;
    const status = document.createElement("div"); status.className = "status";
    if (done) status.innerHTML = `<span class="pct">${Math.round((st.bestScore||0)*100)}%</span> · ${progress.skipped.includes(m.id) ? "skipped via test" : "passed"}`;
    else if (st.unlocked) status.innerHTML = st.attempts && st.attempts.length ? `Best ${Math.round((st.bestScore||0)*100)}%` : "Not started";
    else status.textContent = "Locked";

    const actions = document.createElement("div"); actions.className = "actions";
    if (st.unlocked || done) {
      const lbtn = document.createElement("button");
      lbtn.className = "btn";
      lbtn.textContent = done ? "Review" : "Start";
      lbtn.addEventListener("click", () => showLesson(m.id));
      actions.appendChild(lbtn);
    }
    li.append(num, meta, status, actions);
    list.appendChild(li);
  });

  const skipList = $("#test-list-skip");
  const finalList = $("#test-list-final");
  TESTS.forEach(t => {
    const st = progress.tests[t.id] || {};
    const isFinal = !!t.finalChallenge;
    const unlocked = isFinal ? isFinalTestUnlocked(progress) : true;
    const li = document.createElement("li");
    if (!unlocked) li.className = "locked";

    const meta = document.createElement("div"); meta.className = "meta";
    const passedLabel = st.passed ? `<span class="pct" style="color:var(--ok)">passed</span> · best ${Math.round((st.bestScore||0)*100)}%` : "";
    const lockedLabel = !unlocked ? `<span class="muted">Unlocks after every module is done or skipped.</span>` : "";
    meta.innerHTML = `<span class="badge">${isFinal ? "final" : "test"}</span> <h3>${t.title}</h3><p>${t.blurb}</p><p class="muted">${passedLabel || lockedLabel}</p>`;

    const actions = document.createElement("div"); actions.className = "actions";
    const btn = document.createElement("button");
    btn.className = "btn primary";
    btn.textContent = st.passed ? "Retake" : "Take test";
    if (!unlocked) { btn.disabled = true; btn.textContent = "Locked"; }
    else btn.addEventListener("click", () => showTest(t.id));
    actions.appendChild(btn);

    li.append(meta, actions);
    (isFinal ? finalList : skipList).appendChild(li);
  });
}

/* ---------- lesson ---------- */
async function showLesson(moduleId) {
  const m = MODULES.find(x => x.id === moduleId);
  if (!m) return;
  mountTemplate("tpl-lesson");
  $("[data-action='back']").addEventListener("click", route);
  $("#lesson-num").textContent = `Module ${MODULES.indexOf(m) + 1}`;
  $("#lesson-title").textContent = m.title;
  $("#lesson-blurb").textContent = m.blurb;
  const body = $("#lesson-body");
  const lessonHTML = (typeof LESSONS !== "undefined") ? LESSONS[m.id] : null;
  if (lessonHTML) {
    body.innerHTML = lessonHTML;
  } else {
    body.innerHTML = `<p class="muted">Lesson content missing for <code>${m.id}</code>. Re-run <code>node scripts/build-lessons.js</code> to regenerate <code>assets/js/lessons.js</code>.</p>`;
  }

  const quizBtn = $("#lesson-quiz-btn");

  // Inline setup checklist (if this module has one). Gates the quiz button.
  if (m.setup) {
    const lessonView = $(".lesson-view");
    const block = renderSetupBlock(m, () => updateLessonGate(m, quizBtn));
    lessonView.insertBefore(block, $(".lesson-foot"));
    updateLessonGate(m, quizBtn);
  }

  quizBtn.addEventListener("click", () => {
    if (m.setup && !isModuleSetupComplete(progress, m.id)) {
      flash("Finish the setup checklist first.");
      return;
    }
    showQuiz(moduleId);
  });
}

function updateLessonGate(m, btn) {
  const done = !m.setup || isModuleSetupComplete(progress, m.id);
  btn.disabled = !done;
  // Add/update inline gate message next to the button.
  const foot = $(".lesson-foot");
  let msg = foot.querySelector(".gate-msg");
  if (!done) {
    if (!msg) {
      msg = document.createElement("span");
      msg.className = "gate-msg";
      foot.insertBefore(msg, btn);
    }
    msg.textContent = "Check off the setup items above to unlock the quiz.";
  } else if (msg) {
    msg.remove();
  }
}

/* ---------- setup checklist ---------- */
function renderSetupBlock(m, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "setup-block";
  const head = document.createElement("div"); head.className = "setup-head";
  head.innerHTML = `<span class="badge">setup</span><h3>${m.setup.title || "Setup checkpoint"}</h3>`;
  wrap.appendChild(head);

  if (m.setup.intro) {
    const intro = document.createElement("p");
    intro.className = "setup-intro";
    intro.innerHTML = renderInline(m.setup.intro);
    wrap.appendChild(intro);
  }

  const list = document.createElement("ul"); list.className = "setup-items";
  const state = getSetupState(progress, m.id);
  m.setup.items.forEach(it => {
    const li = document.createElement("li"); li.className = "setup-item";
    const checked = !!(state[it.id] && state[it.id].checked);
    if (checked) li.classList.add("checked");
    const cb = document.createElement("input"); cb.type = "checkbox";
    cb.checked = checked;
    cb.addEventListener("change", () => {
      setSetupItem(progress, m.id, it.id, cb.checked);
      li.classList.toggle("checked", cb.checked);
      updateSetupProgress(wrap, m);
      onChange && onChange();
    });
    const body = document.createElement("div"); body.className = "item-body";
    body.innerHTML = `<div class="item-label">${renderInline(it.label)}</div>${it.hint ? `<div class="item-hint">${renderInline(it.hint)}</div>` : ""}`;
    li.append(cb, body);
    li.addEventListener("click", (e) => {
      // Clicking the row (not the checkbox itself) toggles the checkbox.
      if (e.target.tagName === "INPUT" || e.target.closest("a")) return;
      cb.checked = !cb.checked;
      cb.dispatchEvent(new Event("change"));
    });
    list.appendChild(li);
  });
  wrap.appendChild(list);

  const prog = document.createElement("div"); prog.className = "setup-progress";
  wrap.appendChild(prog);
  updateSetupProgress(wrap, m);

  return wrap;
}

function updateSetupProgress(wrap, m) {
  const s = getSetupState(progress, m.id);
  const total = m.setup.items.length;
  const done = m.setup.items.filter(it => s[it.id] && s[it.id].checked).length;
  const prog = wrap.querySelector(".setup-progress");
  prog.textContent = done === total ? "All set ✓" : `${done} / ${total} done`;
  prog.style.color = done === total ? "var(--ok)" : "var(--text-mute)";
}

/* ---------- quiz ---------- */
function showQuiz(moduleId) {
  const m = MODULES.find(x => x.id === moduleId);
  if (!m) return;
  mountTemplate("tpl-quiz");
  $("[data-action='back']").addEventListener("click", route);
  $("#quiz-kind").textContent = "quiz";
  $("#quiz-title").textContent = `Quiz — ${m.title}`;
  $("#quiz-blurb").textContent = `Pass ≥ ${Math.round(PASSING_GRADE*100)}% to unlock the next module.`;
  $("#quiz-progress").textContent = `${m.quiz.length} questions`;

  const form = $("#quiz-form");
  m.quiz.forEach((q, i) => form.appendChild(buildQuestion(q, i)));

  const startedAt = Date.now();
  $("#quiz-submit").addEventListener("click", () => {
    const ms = Date.now() - startedAt;
    const result = gradeAll(m.quiz, form);
    recordQuizAttempt(progress, moduleId, { score: result.score, correct: result.correct, total: result.total, ms, items: result.items });
    showResult({ kind: "quiz", moduleId, result, ms });
  });
}

/* ---------- test ---------- */
function showTest(testId) {
  const t = TESTS.find(x => x.id === testId);
  if (!t) return;

  // If this test covers any module with unmet setup, gate it first.
  const needSetup = modulesNeedingSetupForTest(progress, testId);
  if (needSetup.length) return showTestSetupGate(t, needSetup);

  mountTemplate("tpl-quiz");
  $("[data-action='back']").addEventListener("click", route);
  $("#quiz-kind").textContent = "test";
  $("#quiz-title").textContent = t.title;
  $("#quiz-blurb").textContent = `${t.questions.length} questions · pass ≥ ${Math.round(PASSING_GRADE*100)}% within ${Math.round(t.timeLimitSec/60)} min to skip the modules it covers.`;
  $("#quiz-progress").textContent = `${t.questions.length} questions`;

  const form = $("#quiz-form");
  t.questions.forEach((q, i) => form.appendChild(buildQuestion(q, i)));

  const startedAt = Date.now();
  const timerEl = $("#quiz-timer");
  let submitted = false;

  const submit = () => {
    if (submitted) return; submitted = true;
    stopTimer && stopTimer();
    const elapsedMs = Date.now() - startedAt;
    const result = gradeAll(t.questions, form);
    recordTestAttempt(progress, testId, {
      score: result.score, correct: result.correct, total: result.total,
      elapsedMs, items: result.items, withinTime: elapsedMs <= t.timeLimitSec * 1000
    });
    showResult({ kind: "test", testId, result, ms: elapsedMs });
  };

  const stopTimer = startCountdown(timerEl, t.timeLimitSec, null, () => {
    flash("Time's up — auto-submitting your test.");
    submit();
  });

  $("#quiz-submit").addEventListener("click", submit);
}

function showTestSetupGate(test, modulesToSetUp) {
  mountTemplate("tpl-setup-gate");
  $("[data-action='back']").addEventListener("click", route);
  $("#setup-gate-title").textContent = `Setup needed before: ${test.title}`;
  $("#setup-gate-blurb").innerHTML = `This test covers modules that require things to be installed. Confirm the setup below before starting the test — if you skip these modules, we still need to know your environment is ready.`;
  const body = $("#setup-gate-body");
  const cont = $("#setup-gate-continue");

  const refresh = () => {
    const stillNeeded = modulesNeedingSetupForTest(progress, test.id);
    cont.disabled = stillNeeded.length > 0;
    cont.textContent = stillNeeded.length === 0 ? "Start the test →" : `Check off the items above to continue`;
  };

  modulesToSetUp.forEach(m => body.appendChild(renderSetupBlock(m, refresh)));
  refresh();

  cont.addEventListener("click", () => {
    if (modulesNeedingSetupForTest(progress, test.id).length === 0) showTest(test.id);
  });
}

/* ---------- result ---------- */
function showResult({ kind, moduleId, testId, result, ms }) {
  mountTemplate("tpl-result");
  $("[data-action='back']").addEventListener("click", route);

  const pct = Math.round(result.score * 100);
  const passed = result.score >= PASSING_GRADE;
  const card = $("#result-card");
  card.classList.add(passed ? "pass" : "fail");

  const ringHTML = `<div class="score-ring">${pct}%</div>`;
  let heading, sub;
  if (kind === "quiz") {
    heading = passed ? "Nice — you passed." : "Not quite — give it another go.";
    sub = passed ? "Next module unlocked." : `You need ${Math.round(PASSING_GRADE*100)}%+ to advance.`;
  } else {
    const t = TESTS.find(x => x.id === testId);
    const withinTime = ms <= t.timeLimitSec * 1000;
    const isFinal = !!t.finalChallenge;
    if (isFinal) {
      if (passed && withinTime) { heading = "Final challenge passed — you're done."; sub = "That's the curriculum. Export your progress and send it to Nolan."; }
      else if (passed && !withinTime) { heading = "Passed, but over the time limit."; sub = "Re-take it faster if you want a clean record."; }
      else { heading = "Not quite."; sub = "Review the modules you're shakiest on, then try again."; }
    } else if (passed && withinTime) { heading = "Test passed in time — modules skipped."; sub = `You skipped ${t.covers.length} modules.`; }
    else if (passed && !withinTime) { heading = "Passed, but over the time limit."; sub = "Modules NOT skipped — work through them, or retake the test faster."; }
    else { heading = "Test not passed."; sub = "Try again or work through the modules first."; }
  }

  card.innerHTML = `
    ${ringHTML}
    <h2>${heading}</h2>
    <p class="muted">${sub} · Time: ${fmtDuration(ms)}</p>
    <div class="breakdown">
      ${result.items.map((it, i) => `
        <details>
          <summary class="${it.ok ? "ok" : "bad"}">${it.ok ? "✓" : "✗"} Q${i + 1}. ${renderInline(it.q)}</summary>
          <p class="muted">${it.why || ""}</p>
        </details>`).join("")}
    </div>
  `;

  if (kind === "quiz") {
    if (passed) {
      const idx = MODULES.findIndex(m => m.id === moduleId);
      if (idx >= 0 && idx + 1 < MODULES.length) {
        const next = MODULES[idx + 1];
        const btn = $("#result-next");
        btn.hidden = false;
        btn.textContent = `Next: ${next.title} →`;
        btn.addEventListener("click", () => showLesson(next.id));
      }
    } else {
      const r = $("#result-retry");
      r.hidden = false;
      r.addEventListener("click", () => showQuiz(moduleId));
    }
  } else {
    const r = $("#result-retry");
    r.hidden = false;
    r.addEventListener("click", () => showTest(testId));
  }
}

/* ---------- export ---------- */
function showExport() {
  if (!progress) { flash("Sign in first."); return; }
  endSession(progress);
  startSession();
  mountTemplate("tpl-export");
  $("[data-action='back']").addEventListener("click", route);

  const payload = {
    schema: "genai101-progress-v1",
    exportedAt: new Date().toISOString(),
    ...progress,
    summary: {
      overallPct: overallPct(progress),
      totalTime: fmtDuration(progress.totalTimeMs),
      modulesPassed: Object.values(progress.modules).filter(m => m.passed).length,
      testsPassed: Object.values(progress.tests).filter(t => t.passed).length,
      skipped: progress.skipped
    }
  };
  const json = JSON.stringify(payload, null, 2);
  $("#export-text").value = json;
  $("#export-copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(json); flash("Copied. Send it to Nolan."); }
    catch { flash("Copy failed — use Download instead."); }
  });
  $("#export-download").addEventListener("click", () => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safe = (progress.name || "learner").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    a.href = url;
    a.download = `genai101-${safe}-${Date.now()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });
}

/* ---------- lifecycle ---------- */
window.addEventListener("beforeunload", () => { endSession(progress); });
document.addEventListener("visibilitychange", () => {
  if (document.hidden) endSession(progress);
  else if (progress) startSession();
});

// boot
if (progress) {
  recomputeUnlocks(progress);
  saveProgress(progress);
  startSession();
}
refreshTopBar();
route();
