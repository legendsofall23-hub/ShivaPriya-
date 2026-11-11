
"use strict";

// ==========================================
// AYYA'S LITTLE WORLD 💖
// ==========================================

// ==========================================
// OPENING ANIMATION
// ==========================================

const introScreen = document.getElementById("introScreen");
const enterBtn = document.getElementById("enterBtn");

enterBtn?.addEventListener("click", () => {
  introScreen?.classList.add("hide");
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

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const answerFeedback = document.getElementById("answerFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const quizScore = document.getElementById("quizScore");
const quizProgress = document.getElementById("quizProgress");
const quizResult = document.getElementById("quizResult");
const resultText = document.getElementById("resultText");

function showQuestion() {
  if (!questionText || !answerOptions) return;

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
    message = "10/10! Perfect! You really know our bond. 🏆💖";
  } else if (score >= 7) {
    message = `${score}/10! Pretty impressive, Ayya! 🫶`;
  } else if (score >= 4) {
    message = `${score}/10! Not bad! We need more happy memories. 😂`;
  } else {
    message = `${score}/10! Ahaa, we have some catching up to do! 💖`;
  }

  resultText.textContent = message;
}

nextQuestion?.addEventListener("click", () => {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

document.getElementById("replayQuiz")?.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

if (questionText) showQuestion();


// ==========================================
// SECRET PASSWORD
// PASSWORD: AYYA
// ==========================================

const secretPassword = document.getElementById("secretPassword");
const unlockSecret = document.getElementById("unlockSecret");

function checkPassword() {
  const password = secretPassword.value.trim();
  const feedback = document.getElementById("secretFeedback");
  const message = document.getElementById("secretMessage");

  if (password.toLowerCase() === "ayya") {
    feedback.textContent = "You found the secret! 💖";
    message.hidden = false;
  } else {
    feedback.textContent = "Ahaa, that's not the password! 😂";
    message.hidden = true;
  }
}

unlockSecret?.addEventListener("click", checkPassword);

secretPassword?.addEventListener("keydown", event => {
  if (event.key === "Enter") checkPassword();
});


// ==========================================
// FINAL SURPRISE
// ==========================================

document.getElementById("finalReveal")?.addEventListener("click", event => {
  document.getElementById("finalMessage").hidden = false;

  event.currentTarget.textContent = "Your surprise is open ♡";
  event.currentTarget.disabled = true;
});


// ==========================================
// PHOTO BOOTH - IMPROVED VERSION
// ==========================================

const DB_NAME = "AyyaPhotoBooth";
const STORE_NAME = "photos";
const DB_VERSION = 1;

let photoDB = null;
let databaseReady = null;
let isUploading = false;

const photoUpload = document.getElementById("photoUpload");
const boothGallery = document.getElementById("boothGallery");

const photoURLs = new Set();

function showPhotoError(message) {
  alert(message);
}

// OPEN DATABASE

function openPhotoDB() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is unavailable."));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

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
      const db = request.result;

      db.onversionchange = () => {
        db.close();
        photoDB = null;
      };

      resolve(db);
    };

    request.onerror = () => {
      reject(request.error);
    };

    request.onblocked = () => {
      console.warn("Photo database upgrade is blocked.");
    };
  });
}

// WAIT UNTIL DATABASE IS READY

databaseReady = openPhotoDB()
  .then(db => {
    photoDB = db;
    return db;
  })
  .catch(error => {
    console.error("Database initialization failed:", error);
    throw error;
  });

// WAIT FOR A WORKING DATABASE

async function getDatabase() {
  if (photoDB) return photoDB;

  return await databaseReady;
}

// SAVE PHOTO

async function savePhoto(file) {
  const db = await getDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");

    transaction.objectStore(STORE_NAME).add({
      name: file.name,
      image: file,
      created: Date.now()
    });

    transaction.oncomplete = () => resolve();

    transaction.onerror = () => {
      reject(transaction.error || new Error("Photo save failed."));
    };

    transaction.onabort = () => {
      reject(transaction.error || new Error("Photo save was aborted."));
    };
  });
}

// DELETE PHOTO

async function deletePhoto(id) {
  const db = await getDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");

    transaction.objectStore(STORE_NAME).delete(id);

    transaction.oncomplete = async () => {
      try {
        await loadPhotos();
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    transaction.onerror = () => {
      reject(transaction.error);
    };
  });
}

// RELEASE OLD IMAGE URLS

function clearPhotoURLs() {
  photoURLs.forEach(url => URL.revokeObjectURL(url));
  photoURLs.clear();
}

// LOAD SAVED PHOTOS

async function loadPhotos() {
  const db = await getDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");

    const request = transaction.objectStore(STORE_NAME).getAll();

    request.onsuccess = () => {
      const photos = request.result;

      clearPhotoURLs();
      boothGallery.replaceChildren();

      photos.forEach(photo => {
        const card = document.createElement("div");

        const img = document.createElement("img");
        img.alt = photo.name;
        img.loading = "lazy";

        const url = URL.createObjectURL(photo.image);
        photoURLs.add(url);
        img.src = url;

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Remove";

        remove.addEventListener("click", async () => {
          remove.disabled = true;

          try {
            await deletePhoto(photo.id);
          } catch (error) {
            console.error("Photo deletion failed:", error);
            remove.disabled = false;
            showPhotoError("Could not remove this photo.");
          }
        });

        card.append(img, remove);
        boothGallery.appendChild(card);
      });

      resolve(photos.length);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// UPLOAD VALIDATION

function validatePhoto(file) {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif"
  ];

  if (!allowedTypes.includes(file.type)) {
    return "Unsupported image format: " + file.name;
  }

  if (file.size > 15 * 1024 * 1024) {
    return "Image is larger than 15 MB: " + file.name;
  }

  return null;
}

// HANDLE MULTIPLE PHOTO UPLOADS

photoUpload?.addEventListener("change", async event => {
  if (isUploading) return;

  const files = Array.from(event.target.files || []);

  if (!files.length) return;

  isUploading = true;
  photoUpload.disabled = true;

  let successful = 0;
  let failed = 0;

  try {
    await getDatabase();

    for (const file of files) {
      const error = validatePhoto(file);

      if (error) {
        console.warn(error);
        failed++;
        continue;
      }

      try {
        await savePhoto(file);
        successful++;
      } catch (error) {
        console.error("Upload failed:", file.name, error);
        failed++;
      }
    }

    await loadPhotos();

    if (failed === 0) {
      showPhotoError(
        `${successful} photo(s) added successfully! 💖`
      );
    } else {
      showPhotoError(
        `${successful} photo(s) saved. ${failed} could not be saved.`
      );
    }

  } catch (error) {
    console.error("Photo booth error:", error);

    showPhotoError(
      "Photo storage could not be opened. Please check browser storage."
    );

  } finally {
    isUploading = false;
    photoUpload.disabled = false;
    photoUpload.value = "";
  }
});

// INITIALIZE PHOTO BOOTH

(async function initialisePhotoBooth() {
  if (!photoUpload || !boothGallery) return;

  try {
    await getDatabase();
    await loadPhotos();

  } catch (error) {
    console.error("Photo booth initialization failed:", error);
    showPhotoError("Photo booth could not be initialized.");
  }
})();
