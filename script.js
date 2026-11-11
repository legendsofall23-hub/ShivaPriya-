// ==========================================
// AYYA'S LITTLE WORLD 💖
// ==========================================


// OPENING ANIMATION

const introScreen = document.getElementById("introScreen");

document.getElementById("enterBtn").addEventListener("click", () => {
  introScreen.classList.add("hide");
});


// ==========================================
// FRIENDSHIP QUIZ
// ==========================================

const questions = [

  {
    q: "What nickname do I call you?",
    options: ["Ayya", "Gay", "Idiot", "Kullachi"],
    answer: 0
  },

  {
    q: "What is the most special thing about our bond?",
    options: ["Trust", "Support", "Memories", "Everything"],
    answer: 3
  },

  {
    q: "When I'm feeling low, who do I speak to?",
    options: ["Ayya 💖🫶", "My family", "My friends", "Nobody"],
    answer: 0
  },

  {
    q: "What is one thing we never want to lose?",
    options: ["Our bond", "Our memories", "Our trust", "All of these"],
    answer: 3
  },

  {
    q: "What do I promise you?",
    options: [
      "Always support you and be with you",
      "Never talk to you",
      "Forget our memories",
      "Nothing"
    ],
    answer: 0
  },

  {
    q: "Who is more likely to start a silly fight?",
    options: ["Me", "Ayya", "Both of us", "Neither"],
    answer: 1
  },

  {
    q: "Who apologises first after a fight?",
    options: ["Me", "Ayya", "Both of us", "Depends on the situation"],
    answer: 0
  },

  {
    q: "What do we do the most when we're together?",
    options: ["Laughing", "Roasting each other", "Speaking", "All of these"],
    answer: 2
  },

  {
    q: "What makes our bond special?",
    options: [
      "Trust",
      "Understanding",
      "Being there in hard times",
      "All of these"
    ],
    answer: 0
  },

  {
    q: "Who knows the other's secrets better?",
    options: ["Me", "Ayya", "Both of us", "It's a secret 😂"],
    answer: 2
  }

];

let currentQuestion = 0;
let score = 0;
let answered = false;


// QUIZ ELEMENTS

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const answerFeedback = document.getElementById("answerFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const quizScore = document.getElementById("quizScore");
const quizProgress = document.getElementById("quizProgress");
const quizResult = document.getElementById("quizResult");
const resultText = document.getElementById("resultText");


// DISPLAY QUESTION

function showQuestion() {

  const question = questions[currentQuestion];

  answered = false;

  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionText.textContent = question.q;

  quizScore.textContent = `Score: ${score}`;

  quizProgress.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  answerOptions.innerHTML = "";

  answerFeedback.textContent = "";

  nextQuestion.hidden = true;

  quizResult.hidden = true;

  answerOptions.hidden = false;

  questionText.hidden = false;


  question.options.forEach((option, index) => {

    const button = document.createElement("button");

    button.type = "button";

    button.textContent = option;

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answerOptions.appendChild(button);

  });

}


// CHECK ANSWER

function selectAnswer(selected) {

  if (answered) return;

  answered = true;

  const correct = questions[currentQuestion].answer;


  if (selected === correct) {

    score++;

    answerFeedback.textContent =
      "Correct! You know us well! 💖";

  } else {

    answerFeedback.textContent =
      `Not quite! The answer was "${questions[currentQuestion].options[correct]}". 😂`;

  }


  [...answerOptions.children].forEach((button, index) => {

    button.disabled = true;

    if (index === correct) {

      button.style.borderColor = "#9A5360";

      button.style.background = "#F6E9E6";

    }

  });


  quizScore.textContent = `Score: ${score}`;

  nextQuestion.textContent =
    currentQuestion === questions.length - 1
      ? "See my result ✨"
      : "Next question →";

  nextQuestion.hidden = false;

}


// NEXT QUESTION

nextQuestion.addEventListener("click", () => {

  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {

    showQuestion();

  } else {

    showResult();

  }

});


// QUIZ RESULT

function showResult() {

  questionNumber.textContent = "Quiz completed!";

  questionText.hidden = true;

  answerOptions.hidden = true;

  answerFeedback.textContent = "";

  nextQuestion.hidden = true;

  quizResult.hidden = false;

  quizProgress.style.width = "100%";


  let message;


  if (score === 10) {

    message =
      "10/10! Perfect! You really know our bond. 🏆💖";

  } else if (score >= 7) {

    message =
      `${score}/10! Pretty impressive, Ayya! 🫶`;

  } else if (score >= 4) {

    message =
      `${score}/10! Not bad! We need more happy memories. 😂`;

  } else {

    message =
      `${score}/10! Ahaa, we have some catching up to do! 💖`;

  }


  resultText.textContent = message;

}


// REPLAY QUIZ

document.getElementById("replayQuiz").addEventListener("click", () => {

  currentQuestion = 0;

  score = 0;

  showQuestion();

});


// START QUIZ

showQuestion();


// ==========================================
// SECRET PASSWORD
// PASSWORD: AYYA
// ==========================================

document.getElementById("unlockSecret").addEventListener("click", () => {

  const password =
    document.getElementById("secretPassword").value.trim();

  const feedback =
    document.getElementById("secretFeedback");

  const message =
    document.getElementById("secretMessage");


  if (password.toLowerCase() === "ayya") {

    feedback.textContent = "You found the secret! 💖";

    message.hidden = false;

  } else {

    feedback.textContent =
      "Ahaa, that's not the password! 😂";

    message.hidden = true;

  }

});


// ENTER KEY FOR PASSWORD

document.getElementById("secretPassword").addEventListener("keydown", event => {

  if (event.key === "Enter") {

    document.getElementById("unlockSecret").click();

  }

});


// ==========================================
// FINAL SURPRISE
// ==========================================

document.getElementById("finalReveal").addEventListener("click", () => {

  document.getElementById("finalMessage").hidden = false;

  const button = document.getElementById("finalReveal");

  button.textContent = "Your surprise is open ♡";

  button.disabled = true;

});


// ==========================================
// PHOTO BOOTH
// ==========================================

const DB_NAME = "AyyaPhotoBooth";

const STORE_NAME = "photos";

let photoDB;


// OPEN PHOTO DATABASE

function openPhotoDB() {

  return new Promise((resolve, reject) => {

    const request = indexedDB.open(DB_NAME, 1);


    request.onupgradeneeded = () => {

      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {

        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true
        });

      }

    };


    request.onsuccess = () => {

      resolve(request.result);

    };


    request.onerror = () => {

      reject(request.error);

    };

  });

}


// SAVE PHOTO

function savePhoto(file) {

  return new Promise((resolve, reject) => {

    const transaction =
      photoDB.transaction(STORE_NAME, "readwrite");

    transaction.objectStore(STORE_NAME).add({

      name: file.name,

      image: file,

      created: Date.now()

    });


    transaction.oncomplete = resolve;

    transaction.onerror = () => {

      reject(transaction.error);

    };

  });

}


// DELETE PHOTO

function deletePhoto(id) {

  const transaction =
    photoDB.transaction(STORE_NAME, "readwrite");

  transaction.objectStore(STORE_NAME).delete(id);

  transaction.oncomplete = loadPhotos;

}


// DISPLAY PHOTOS

function loadPhotos() {

  const transaction =
    photoDB.transaction(STORE_NAME, "readonly");

  const request =
    transaction.objectStore(STORE_NAME).getAll();


  request.onsuccess = () => {

    const gallery =
      document.getElementById("boothGallery");

    gallery.innerHTML = "";


    request.result.forEach(photo => {

      const card = document.createElement("div");

      const img = document.createElement("img");

      const remove = document.createElement("button");


      img.src = URL.createObjectURL(photo.image);

      img.alt = photo.name;


      remove.textContent = "Remove";

      remove.type = "button";


      remove.addEventListener("click", () => {

        deletePhoto(photo.id);

      });


      card.append(img, remove);

      gallery.appendChild(card);

    });

  };

}


// UPLOAD PHOTOS

document.getElementById("photoUpload").addEventListener("change", async event => {

  const files = [...event.target.files].filter(file =>
    file.type.startsWith("image/")
  );


  try {

    for (const file of files) {

      await savePhoto(file);

    }

    loadPhotos();

  } catch (error) {

    console.error("Could not save photo:", error);

    alert("Sorry, the photo could not be saved in this browser.");

  }


  event.target.value = "";

});


// INITIALISE PHOTO BOOTH

(async function initialisePhotoBooth() {

  if (!("indexedDB" in window)) return;

  try {

    photoDB = await openPhotoDB();

    loadPhotos();

  } catch (error) {

    console.error("Photo booth could not be opened:", error);

  }

})();
