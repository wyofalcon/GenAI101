/* GenAI101 — quiz/test engine
 * Renders a question set, collects answers, grades them, and shows results.
 */

function buildQuestion(q, idx) {
  const card = document.createElement("div");
  card.className = "q-card";
  card.dataset.idx = idx;

  const text = document.createElement("div");
  text.className = "q-text";
  text.innerHTML = `<strong>Q${idx + 1}.</strong> ${renderInline(q.q)}`;
  card.appendChild(text);

  const opts = document.createElement("div");
  opts.className = "q-options";

  let choices;
  let inputType;
  if (q.type === "tf") {
    choices = ["True", "False"];
    inputType = "radio";
  } else if (q.type === "multi") {
    choices = q.choices;
    inputType = "checkbox";
  } else {
    choices = q.choices;
    inputType = "radio";
  }

  choices.forEach((c, ci) => {
    const label = document.createElement("label");
    label.className = "q-opt";
    const input = document.createElement("input");
    input.type = inputType;
    input.name = `q-${idx}`;
    input.value = String(ci);
    const span = document.createElement("span");
    span.innerHTML = renderInline(c);
    label.appendChild(input);
    label.appendChild(span);
    label.addEventListener("change", () => {
      if (inputType === "radio") {
        opts.querySelectorAll(".q-opt").forEach(o => o.classList.remove("selected"));
        label.classList.add("selected");
      } else {
        label.classList.toggle("selected", input.checked);
      }
    });
    opts.appendChild(label);
  });

  card.appendChild(opts);
  return card;
}

function readAnswer(q, idx, formEl) {
  const inputs = formEl.querySelectorAll(`input[name="q-${idx}"]`);
  if (q.type === "multi") {
    const picked = [];
    inputs.forEach(i => { if (i.checked) picked.push(+i.value); });
    return picked.sort((a, b) => a - b);
  }
  for (const i of inputs) if (i.checked) {
    if (q.type === "tf") return i.value === "0";  // 0 = True
    return +i.value;
  }
  return null;
}

function gradeOne(q, given) {
  if (given === null || given === undefined) return false;
  if (q.type === "tf") return given === q.answer;
  if (q.type === "multi") {
    const correct = (q.answer || []).slice().sort((a, b) => a - b);
    if (!Array.isArray(given)) return false;
    if (given.length !== correct.length) return false;
    return given.every((v, i) => v === correct[i]);
  }
  return given === q.answer;
}

function gradeAll(questions, formEl) {
  const items = [];
  let correct = 0;
  questions.forEach((q, idx) => {
    const given = readAnswer(q, idx, formEl);
    const ok = gradeOne(q, given);
    if (ok) correct++;
    items.push({
      q: q.q,
      given,
      correct: q.answer,
      ok,
      why: q.why || ""
    });
  });
  return { correct, total: questions.length, score: correct / questions.length, items };
}

function startCountdown(el, totalSec, onTick, onExpire) {
  el.hidden = false;
  let remaining = totalSec;
  function render() {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    el.textContent = `⏱ ${m}:${String(s).padStart(2, "0")}`;
    if (remaining <= 30) el.style.color = "var(--bad)";
    else if (remaining <= 60) el.style.color = "var(--warn)";
  }
  render();
  const id = setInterval(() => {
    remaining--;
    if (onTick) onTick(remaining);
    if (remaining <= 0) {
      clearInterval(id);
      onExpire();
      return;
    }
    render();
  }, 1000);
  return () => clearInterval(id);
}
