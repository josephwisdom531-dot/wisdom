      /* ---------- Données ---------- */
const QUESTIONS = [
  {
    question: "Que signifie HTML ?",
    answers: [
      "HyperText Markup Language",
      "High Tech Modern Language",
      "HyperText Machine Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Quel langage s'exécute dans le navigateur ?",
    answers: ["PHP", "JavaScript", "MySQL", "Python"],
    correct: 1
  },
  {
    question: "Quelle balise crée un lien hypertexte ?",
    answers: ["<link>", "<a>", "<href>", "<url>"],
    correct: 1
  },
  {
    question: "En CSS, quelle propriété change la couleur du texte ?",
    answers: ["background-color", "font-color", "color", "text-color"],
    correct: 2
  },
  {
    question: "Quel sélecteur cible un id ?",
    answers: [".monId", "#monId", "*monId", "monId"],
    correct: 1
  }
];

/* ---------- État ---------- */
let currentIndex = 0;
let score = 0;
let locked = false;

/* ---------- DOM ---------- */
const progressEl   = document.getElementById("progress");
const questionEl   = document.getElementById("question");
const answersEl    = document.getElementById("answers");
const feedbackEl   = document.getElementById("feedback");
const nextBtn      = document.getElementById("next-btn");
const quizScreen   = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreEl      = document.getElementById("score");
const restartBtn   = document.getElementById("restart-btn");

/* ---------- Rendu ---------- */
function renderQuestion() {
  locked = false;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.hidden = true;

  const q = QUESTIONS[currentIndex];
  progressEl.textContent = `Question ${currentIndex + 1} / ${QUESTIONS.length}`;
  questionEl.textContent = q.question;

  answersEl.innerHTML = "";
  q.answers.forEach((texte, i) => {
    const li  = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = texte;
    btn.dataset.index = i;
    li.appendChild(btn);
    answersEl.appendChild(li);
  });
}

/* ---------- Interaction ---------- */
answersEl.addEventListener("click", (event) => {
  const btn = event.target.closest(".answer");
  if (!btn || locked) return;
  locked = true;

  const choix = Number(btn.dataset.index);
  const q = QUESTIONS[currentIndex];

  answersEl.querySelectorAll(".answer").forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add("correct");
  });

  if (choix === q.correct) {
    score++;
    feedbackEl.textContent = "✅ Bonne réponse !";
    feedbackEl.className = "feedback ok";
  } else {
    btn.classList.add("wrong");
    feedbackEl.textContent = "❌ Mauvaise réponse.";
    feedbackEl.className = "feedback ko";
  }

  nextBtn.textContent =
    currentIndex === QUESTIONS.length - 1 ? "Voir le résultat" : "Suivant";
  nextBtn.hidden = false;
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

/* ---------- Fin de partie ---------- */
function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  const pct = Math.round((score / QUESTIONS.length) * 100);
  scoreEl.textContent = `Score : ${score} / ${QUESTIONS.length} (${pct} %)`;
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  renderQuestion();
});

/* ---------- Démarrage ---------- */
renderQuestion();