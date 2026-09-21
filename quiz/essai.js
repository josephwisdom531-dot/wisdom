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

let currentIndex = 0;
let score = 0;
let locked = false;
const progressElement = document.querySelector("#progress");
const questionElement = document.querySelector("#question");
const answersElement = document.querySelector("#answers");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-btn");
const resultScreen = document.querySelector("#result-screen");
const scoreElement = document.querySelector("#score");
const restartButton = document.querySelector("#restart-btn");

function afficherQuestion() {
  const currentQuestion = QUESTIONS[currentIndex];
  progressElement.textContent = `Question ${currentIndex + 1} sur ${QUESTIONS.length}`;

  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = "";
  currentQuestion.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    li.appendChild(button);
    answersElement.appendChild(li);
  });
  console.log("Question affichée :", currentQuestion.question);
}

answersElement.addEventListener("click", (event) => {
  const button = event.target.closest(".answer");
  console.log("Bouton cliqué :", button);
  if (!button || locked) return;
  locked = true;
  const choix = Number(button.dataset.index);
  const currentQuestion = QUESTIONS[currentIndex];
  console.log("Réponse choisie :", currentQuestion.answers[choix]);
  answersElement.querySelectorAll(".answer").forEach((btn, index) => {
    btn.disabled = true;
    if (index === currentQuestion.correct) btn.classList.add("correct");
  });


  if (choix === currentQuestion.correct) {
    score++;
    feedbackElement.textContent = "Bonne réponse !";
    feedbackElement.className = "feedback ok"
  } else {
    feedbackElement.textContent = "Mauvaise réponse !";
    feedbackElement.className = "feedback ko"
  }


  nextButton.textContent = currentIndex === QUESTIONS.length - 1 ? "Voir les résultats" : "Suivant";
  nextButton.hidden = false;

  nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < QUESTIONS.length) {
      afficherQuestion();
    } else {
      questionElement.hidden = true;
      answersElement.hidden = true;
      feedbackElement.hidden = true;
      nextButton.hidden = true;
      resultScreen.hidden = false;
      scoreElement.textContent = `Votre score : ${score} sur ${QUESTIONS.length}`;
      afficherResultats();
    }
  });

});

function afficherResultats() {
  resultScreen.hidden = false;
  const pourcentage = Math.round((score / QUESTIONS.length) * 100);
  scoreElement.textContent = `Votre score : ${score} sur ${QUESTIONS.length} (${pourcentage}%)`;
}

restartButton.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  locked = false;
  resultScreen.hidden = true;
  afficherQuestion();
});

afficherQuestion();