"use strict";

const word = document.getElementById("word");
const text = document.getElementById("text");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("setting-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// Lists of words
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

//Init data
let randomWord;
let score = 0;
let time = 10; //sec

// difficulty from localStorage
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value = difficulty;

// Input-focus for cursor
text.focus();

// Game Over
const gameOver = () => {
  endgameEl.innerHTML = `
	<h1>Time ran out</h1>
	<p>Your final score is ${score}</p>
	<button onclick="location.reload()">New Game</button>
	`;

  endgameEl.style.display = "flex";
};

// Update time
const updateTime = () => {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
};

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

// Add word to DOM
const addWordToDom = () => {
  randomWord = getRandomWord();

  word.innerHTML = randomWord;
};

const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

addWordToDom();

// addEventListener to input
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();

    e.target.value = "";

    // add time if you quickly enter a word

    if (difficulty === "easy") {
      time += 5;
    } else if (difficulty === "medium") {
      time += 4;
    } else {
      time += 3;
    }

    updateTime();
  }
});

// Difficulty - addEventListener
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
});
