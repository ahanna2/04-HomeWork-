// variables and questions 
var questionBank = [
  
  {   
      question: "What tag is used to define an image – or add an image – to an HTML page?",
      selection: ["<table>", "<img>", "<div>", "<meta>"],
      answer: "<img>"
  },
  {   
      question: "What tag is used to define an interactive field where users can enter data?", 
      selection: ["<input>", "<datalist>", "<enterpoint>", "<dialog>"],
      answer: "<input>"
  },
  {
      question: "What is a JavaScript element that represents either TRUE or FALSE values?",
      selection: ["Event", "Condition", "Boolean", "RegExp"],
      answer: "Boolean"
  },
  {
      question: "In JavaScript, what element is used to store multiple values in a single variable?",
      selection: ["Functions", "Variables", "Strings", "Arrays"],
      answer: "Arrays"
  },
  {
      question: "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
      selection: ["While Loop", "For Loop", "Else Loop", "Conditional Loop"],
      answer: "Conditional Loop"
  },
  {
      question: "Where is the JavaScript placed inside an HTML document or page?",
      selection: ["In the <footer> section.", "In the <meta> section.", "In the <body> and <head> sections.", "In the <title> section."],
      answer: "In the <body> and <head> sections."
  },
  {
      question: "What tag can be used to insert a line break or blank line in an HTML document?",
      selection: ["<title></title>", "<head></head>", "<br></br>", "<body></body>"],
      answer: "<br></br>"
  },
  {
      question: "What is the CSS property that sets the size of the whitespace outside the borders of the content?",
      selection: ["Margin", "Line", "Block-level", "Spacer"],
      answer: "Margin"
  }

];

var startQuiz = document.querySelector("#startBtn");
var leaderBtn = document.querySelector("#leaderBtn");
var timerDisplay = document.querySelector(".timer");
var gameCard = document.querySelector("#gameCard");
var question = document.querySelector("#question");
var answerA = document.querySelector("#answerA");
var answerB = document.querySelector("#answerB");
var answerC = document.querySelector("#answerC");
var answerD = document.querySelector("#answerD");
var answer = document.querySelector("#answer");
var assessment = document.querySelector("#assessment1");
var card = document.querySelector("#multipleChoice");
var inputForm = document.querySelector("#inputForm");
var scoreCard = document.querySelector("#scoreCard");
var scoreBtn = document.querySelector("#scoreBtn");
var initialsBox = document.querySelector("#initialsBox");
var submitBtn = document.querySelector("#submitBtn");
var backBtn = document.querySelector("#backBtn");
var clearBtn = document.querySelector("#clearBtn");
var start = document.querySelector(".start");
var timeLeft = questionBank.length * 15;
var questions = 0;
var score = 0;
var scoreList = [];
var timeInterval;

startScoring();

// questions and answers
function displayAllQuestions() {
  if (questions < questionBank.length) {
    question.textContent = questionBank[questions].question;
    answerA.textContent = questionBank[questions].selection[0];
    answerB.textContent = questionBank[questions].selection[1];
    answerC.textContent = questionBank[questions].selection[2];
    answerD.textContent = questionBank[questions].selection[3];
  } else {
    gameOver();
  }
}

// right or wrong answer
function compareAnswer(event) {
  if (questions >= questionBank.length) {
    gameOver();
    clearInterval(timeInterval);
  } else {
    if (event === questionBank[questions].answer) {
      assessment1.textContent = "That's true, thanks.";
    } else {
      timeLeft -= 10;
      assessment1.textContent = "You are incorrect!";
    }
    score = timeLeft;
    questions++;
    displayAllQuestions();
  }
}

// Displaying & hiding page
function gameOver() {
  scoreBtn.innerHTML = score;
  scoreBtn.style.display = "box";
  gameCard.classList.add("hide");
  inputForm.classList.remove("hide");
  timerDisplay.classList.add("hide");
  leaderBtn.classList.add("hide");
  leaderBoard();
}

// local storage
function startScoring() {
  var storedScore = JSON.parse(localStorage.getItem("highScore"));
  if (storedScore !== null) {
    scoreList = storedScore;
  }
}

// Save scores in local storage
function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
}

// Keeping track for top 10 scores
function leaderBoard() {
  removeFromLeaderBoard();
  addToLeaderBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });

  //only show 10 scores.
  firstTen = scoreList.slice(0, 10);

  for (var i = 0; i < firstTen.length; i++) {
    var player = firstTen[i].player;
    var score = firstTen[i].score;

    var newSection = document.createElement("section");
    leaderBoardSection.appendChild(newSection);

    var newLabel = document.createElement("label");
    newLabel.textContent = player + " - " + score;
    newSection.appendChild(newLabel);
  }
}


// initial
function addToLeaderBoard() {
  leaderBoardSection = document.createElement("section");
  leaderBoardSection.setAttribute("id", "userInitials");
  document.getElementById("leaderBoard").appendChild(leaderBoardSection);
}


// Removing initials
function removeFromLeaderBoard() {
  var removeScores = document.getElementById("userInitials");
  if (removeScores !== null) {
    removeScores.remove();
  } else {
  }
}


// timer 
function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = "Timer: " + timeLeft + " sec";

    if (timeLeft === 0 || questions >= questionBank.length) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

// Event listeners
startQuiz.addEventListener("click", function (event) {
  timer();
  displayAllQuestions();
  start.classList.add("hide");
  gameCard.classList.remove("hide");
  leaderBtn.style.display = "none";
  scoreCard.classList.add("hide");
});

card.addEventListener("click", function (event) {
  var event = event.target;
  compareAnswer(event.textContent.trim());
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var userInitials = initialsBox.value.trim();
  var newScore = {
    player: userInitials,
    score: score,
  };
  
  scoreList.push(newScore);
  saveScore();
  leaderBoard();
  inputForm.classList.add("hide");
  scoreCard.classList.remove("hide");
});

leaderBtn.addEventListener("click", function (event) {
  scoreCard.classList.remove("hide");
  leaderBtn.classList.add("hide");
  start.classList.add("hide");
  leaderBoard();
});

// Event listener for go back button 
backBtn.addEventListener("click", function (event) {
  location.reload();
});

// Event listener for clear scores button 
clearBtn.addEventListener("click", function (event) {
  scoreList = [];
  start.classList.add("hide");
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  leaderBoard();
  saveScore();
});