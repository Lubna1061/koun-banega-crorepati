const questions = [
  {
    question: "1. w3.CSS is a standard CSS that has:",
    options: ["A. jQuery Library", "B. JavaScript Library", "C. Both A and B True", "D. Both A and B are False"],
    correct: 4
  },
  {
    question: "2. Bootstrap was first introduced in...",
    options: ["A. Google", "B. Twitter", "C. Instagram", "D. Snapchat"],
    correct: 2
  },
  {
    question: "3. Identify the basic lists in w3.css",
    options: ["A. w3-ol", "B. w3-border", "C. w3-center", "D. All of the Above"],
    correct: 1
  },
  {
    question: "4. How many columns are there in the basic grid of a skeleton?",
    options: ["A. 10", "B. 17", "C. 12", "D. 16"],
    correct: 3
  },
  {
    question: "5. How many columns are supported in the responsive grid?",
    options: ["A. 10", "B. 11", "C. 12", "D. 13"],
    correct: 3
  },
  {
    question: "6. Which of the following is not included in the framework?",
    options: ["A. Font size", "B. CSS reset", "C. Button style", "D. Forms"],
    correct: 1
  },
  {
    question: "7. Which is not a valid list type in w3.list?",
    options: ["A. Small", "B. X-small", "C. Large", "D. X-large"],
    correct: 4
  },
  {
    question: "8. Identify which is not the correct image class in W3.image",
    options: ["A. w3-round", "B. w3-circle", "C. w3-border", "D. w3-oval"],
    correct: 4
  },
  {
    question: "9. To cluster a group of elements together to apply formatting...",
    options: ["A. tag", "B. class", "C. id", "D. div"],
    correct: 4
  },
  {
    question: "10. Autofocus attribute can be used on which element?",
    options: ["A. select", "B. input", "C. all the above", "D. select"],
    correct: 2
  },
  {
    question: "11. Identify the non-semantic element in HTML tags.",
    options: ["A. <div>", "B. <form>", "C. <table>", "D. <article>"],
    correct: 1
  },
  {
    question: "12. The ... tool places text into an image.",
    options: ["A. Bucket", "B. Eraser", "C. Text", "D. Fuzzy selection"],
    correct: 3
  },
  {
    question: "13. What does the color mode RGB stand for?",
    options: ["A. red green brown", "B. red green black", "C. red green blue", "D. red gray brown"],
    correct: 3
  },
  {
    question: "14. Scale option is used to change the ... of an image.",
    options: ["A. color", "B. size", "C. area", "D. all of these"],
    correct: 2
  },
  {
    question: "15. How many types of marquee tools are there in Photoshop?",
    options: ["A. 2", "B. 3", "C. 4", "D. 5"],
    correct: 3
  }
];

let totalMoneyWon = 0;
let prizeList = [0, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000, 1250000, 2500000, 5000000, 10000000, 50000000];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 30;


function quitGame() {
  totalMoneyWon = prizeList[currentQuestionIndex];
  localStorage.setItem('totalMoneyWon', totalMoneyWon);
  location.reload();
}

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById('question').innerText = q.question;
  const buttons = document.querySelectorAll('.options button');

  buttons.forEach((button, index) => {
    button.innerText = q.options[index];
    button.style.display = 'inline-block'; // Reset display
    button.onclick = () => checkAnswer(index + 1);
  });
 
  resetTimer();
  startTimer();
  highlightCurrentQuestion();


}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimer();
}

function startTimer() {
  timer = setInterval(countdown, 1000);
}

function countdown() {
  timeLeft--;
  updateTimer();
  if (timeLeft <= 0) {
    clearInterval(timer);
    document.getElementById('timeout-message-box').style.display = 'block';
    document.getElementById('pricelist').style.display = 'none';
    document.getElementById('question_bar').style.display = 'none';
  }
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function highlightCurrentQuestion() {
  const allListItems = document.querySelectorAll('#price_list li');
  allListItems.forEach(item => {
    item.classList.remove('highlight');
  });
  const currentListItem = document.getElementById(`q${currentQuestionIndex + 1}`);
  if (currentListItem) {
    currentListItem.classList.add('highlight');
  }
}

function checkAnswer(answerIndex) {
  const correctAnswerIndex = questions[currentQuestionIndex].correct;
  const buttons = document.querySelectorAll('.options button');

  clearInterval(timer);

  if (answerIndex === correctAnswerIndex) {
    buttons[correctAnswerIndex - 1].classList.add('correct');
    document.getElementById('success-sound').play();
     document.getElementById('timer_music').pause();
    setTimeout(() => {
      buttons[correctAnswerIndex - 1].classList.remove('correct');
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        document.getElementById('timer_music').play();
        document.dispatchEvent(new Event('nextQuestion'));
      } else {
        document.getElementById('congratulations-message-box').style.display = 'block';
      }
    }, 5000);
  } else {
    buttons[answerIndex - 1].classList.add('incorrect');
    document.getElementById('error-sound').play();
    setTimeout(() => {
      buttons[answerIndex - 1].classList.remove('incorrect');
      document.getElementById('message-box').style.display = 'block';
    });
     document.getElementById('timer_music').pause();
  }
}


function callStart() {
  console.log("callStart function invoked");
  const callBox = document.querySelector(".call_box");
  if (callBox.style.display === "none" || callBox.style.display === "") {
      callBox.style.display = "block";
      document.getElementById("ring").play();
      document.getElementById('timer_music').pause();
  }
}

function callEnd() {
  const callBox = document.querySelector(".call_box");
  callBox.style.display = "none";
  document.getElementById("ring").pause();
  document.getElementById("ring").currentTime = 0; // Reset the audio to the beginning
   document.getElementById('timer_music').play();
}

function startGame() {
  document.querySelector('.welcome-container').style.display = 'none';
  document.querySelector('.question_bar').style.display = 'block';
  document.querySelector('.timer').style.display = 'block';
  document.getElementById('timer_music').play();
  document.getElementById('result').style.display="none";
  loadQuestion();

  // Create a div to display the username
  const usernameDiv = document.createElement('div');
  usernameDiv.id = 'username-display';
  usernameDiv.innerHTML = ` Name: ${localStorage.getItem('username')}  `;
  document.body.appendChild(usernameDiv);

  // Disable the quit game button
  document.getElementById('quit-button').disabled = true;
}

  function resetGame() {
    // Redirect to the main page
    location.reload(); // This will reload the current page
  }


function useFiftyFifty() {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll('.options button');
  const correctAnswerIndex = currentQuestion.correct - 1;
  const incorrectAnswers = [];

  buttons.forEach((button, index) => {
    if (index !== correctAnswerIndex) {
      incorrectAnswers.push(index);
    }
  });

  const randomIndexes = [];
  while (randomIndexes.length < 2 && incorrectAnswers.length > 0) {
    const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
    randomIndexes.push(incorrectAnswers[randomIndex]);
    incorrectAnswers.splice(randomIndex, 1); // Ensure no duplicates
  }

  randomIndexes.forEach(index => {
    buttons[index].style.display = 'none';
  });

  // Disable the 50:50 option for this question
  document.getElementById('fifty-fifty').disabled = true;
}

// Add an event listener to reset the options when moving to the next question
document.addEventListener('nextQuestion', () => {
  const buttons = document.querySelectorAll('.options button');
  buttons.forEach(button => {
    button.style.display = 'inline-block'; // Show all answer options
  });
  document.getElementById('fifty-fifty').disabled = false; // Re-enable 50:50 option
});

// Handle the page load to check local storage
window.onload = () => {
  document.querySelector('.timer').style.display = 'none'; // Hide timer initially
  document.querySelector('.question_bar').style.display = 'none'; // Hide question bar initially
  
  // Check if there's a stored totalMoneyWon value
  const storedTotalMoneyWon = localStorage.getItem('totalMoneyWon');
  if (storedTotalMoneyWon) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Congratulations, ${localStorage.getItem('username')}! You won a total of $${storedTotalMoneyWon}!`;
    resultDiv.style.display = 'block'; // Show the result
    localStorage.removeItem('totalMoneyWon'); // Clear the stored value
  }
};




