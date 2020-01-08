const questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title:
      "What is the HTML tag under which one can write the JavaScript code?",
    choices: ["<javascript>", "<scripted>", "<script>", "<js>"],
    answer: "<script>"
  },
  {
    title:
      "Which of the following is the correct syntax to display 'Hello' in an alert box using JavaScript?",
    choices: [
      "alertbox('Hello')",
      "msg('Hello')",
      "msgBox('Hello')",
      "alert('Hello')"
    ],
    answer: "alert('Hello')"
  },
  {
    title:
      "The external JavaScript file must contain <script> tag. True or False?",
    choices: ["True", "False"],
    answer: "False"
  },
  {
    title: "Which of the following is not a reserved word in JavaScript?",
    choices: ["interface", "throws", "program", "short"],
    answer: "program"
  },
  {
    title: "How is a function called in JavaScript?",
    choices: [
      "call aFunc()",
      "call function aFunc()",
      "aFunc()",
      "function aFunc()"
    ],
    answer: "aFunc()"
  },
  {
    title: "What is the correct syntax for adding comments in JavaScript?",
    choices: [
      "<!–This is a comment–&gt",
      "//This is a comment",
      "–This is a comment",
      " **This is a comment**"
    ],
    answer: "//This is a comment"
  },
  {
    title: "What is the JavaScript syntax for printing values in Console?",
    choices: [
      "print(5)",
      "console.log(5)",
      "console.print(5)",
      "print.console(5)"
    ],
    answer: "console.log(5)"
  },
  {
    title:
      "What is the method in JavaScript used to remove the whitespace at the beginning and end of any string?",
    choices: ["strip()", "trim()", "trimmed()", "stripped()"],
    answer: "trim()"
  }
];

$(document).ready(function() {
  let disp = document.querySelector("#timer");

  $("#hsView").on("click", viewHighScores);

  function viewHighScores() {
    stopTimer();
    $("#timer").empty();
    $("#hrFormRow").empty();
    $("#display").empty();

    let getObj = JSON.parse(localStorage.getItem("storeObj"));
    // console.log(getObj);
    if (getObj !== null) {
      //if scores exist,
      //sort scores by highest score
      getObj.sort((a, b) => (a.score < b.score ? 1 : -1));
      //slice top 3 scores
      let slicedObj = getObj.slice(0, 3);

      //make scores table
      let scoresTable = $(`<table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td id="name0">Mark</td>
          <td id="score0">Otto</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td id="name1"></td>
          <td id="score1"></td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td id="name2"></td>
          <td id="score2"></td>
        </tr>
      </tbody>
    </table> `);
      $("#display").append($("<h2>High Score List</h2>"));

      $("#display").append(scoresTable);
      slicedObj.forEach(function(obj, i) {
        // console.log(i, obj.name, obj.score);
        // console.log(slicedObj[i].name);
        // console.log($("#name0").text);
        let objName = document.querySelector(`#name${i}`);
        let objScore = document.querySelector(`#score${i}`);
        // console.log(objName.textContent);
        objName.textContent = slicedObj[i].name;
        objScore.textContent = slicedObj[i].score;
      });
    } else {
      //No scores to display
      let noScores = $("<h2>");
      $(noScores).text("No scores to display!");
      $("#display").append(noScores);
    }
    //add play button
    let playButton = $("<button>");
    let rowDiv = $("<div>");
    $(rowDiv).addClass("row");
    $(playButton).text("Start Quiz");
    $("#display").append(playButton);
    $(playButton).on("click", startGame);
  }
  var Clock = {
    Timer: function(duration, display) {
      var start = Date.now(),
        diff,
        minutes,
        seconds;
      function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = diff % 60 | 0;
        timeValue--;

        // minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "Time: " + minutes + ":" + seconds;
        if (timeValue < 0) {
          onCompletion();
        }

        if (diff <= 0) {
          // add one second so that the count down starts at the full duration
          // example 05:00 not 04:59
          start = Date.now() + 1000;
        }
      }
      this.Timer.timer = timer;
    }
  };
  function playSound() {
    document.querySelector("#doorbell").play();
  }
  function resetTimer() {
    running = false;
    //reset timeValue
    timeValue = minutes * 60;

    //display timeValue
    disp.textContent = minutes + ":" + seconds + "0";
  }

  //initial variables
  var running = false;
  var minutes = 2.5;
  var seconds = 0;
  var timeValue = minutes * 60;

  function startTimer() {
    //Check if already running first
    if (!running && timeValue >= 0) {
      Clock.Timer(timeValue, disp);
      // we don't want to wait a full second before the timer starts

      Clock.Timer.timer();
      interv = setInterval(Clock.Timer.timer, 1000);
      running = true;
    }
  }
  function onCompletion() {
    stopTimer();
    $("#display").empty();
    // $("#timer").empty();
    let timeBonus = 0;
    if (timeValue > 0) {
      timeBonus = timeValue;
      score += timeValue;
    }
    let totalScore = $("<h4>");
    let bonusScore = $("<h4>");
    let c_answers = $("<h4>");
    $(bonusScore).text(`Time bonus: ${timeBonus}`);
    $(c_answers).text(`Correct answers: ${correctAnswers}`);

    $(totalScore).text(`Total score: ${score}`);
    $("#display").append(c_answers);

    $("#display").append(bonusScore);

    $("#display").append(totalScore);
    let playButton = $("<button>");
    let rowDiv = $("<div>");
    $(rowDiv).addClass("row");
    $(playButton).text("Play again");
    $("#display").append(playButton);
    $(playButton).on("click", startGame);
    //create initials form

    let ifield = $("<input>");
    $(ifield).addClass("form-control");
    $(ifield).attr("id", "initials");
    $(ifield).attr("placeholder", "Enter initials");
    $("#hrFormRow").append(ifield);

    //create save button

    let sButton = $("<button>");
    $(sButton).attr("id", "store-button");
    $(sButton).text("Save score");
    $("#hrFormRow").append(sButton);
    $(sButton).on("click", storeScore);
  }
  function storeScore() {
    let initials = document.querySelector("#initials").value;
    if (initials !== "") {
      let getObj = JSON.parse(localStorage.getItem("storeObj"));
      if (getObj !== null) {
        // console.log(getObj);
        scoreArray = getObj;
      }
      //empty the score object to prevent duplicates being stored

      let scoreObj = {};

      scoreObj = {
        name: initials,
        score: score
      };

      // console.log(scoreObj);
      scoreArray.push(scoreObj);
      // console.log(scoreArray);
      localStorage.setItem("storeObj", JSON.stringify(scoreArray));

      $("#hrFormRow").empty();
      $("#announce").text("Score saved!");
      setTimeout(function() {
        $("#announce").empty();
      }, 1000);
    }
  }
  function stopTimer() {
    clearInterval(interv);
    running = false;
  }

  function shuffle(array) {
    //shuffles questions
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //   console.log(questions);
  $("#start-button").on("click", startGame);
  // let getObj = JSON.parse(localStorage.getItem("storeObj"));

  let scoreArray = [];
  // scoreArray.push(getObj);
  let questionNumber = 0;
  let score = 0;
  let correctAnswers = 0;
  let answerPoints = 20;

  function generateQuestion(round) {
    //Clear display
    $("#display").empty();
    // console.log(questions[round].title);

    // console.log(questions[round].choices);
    // console.log(questions[round].answer);
    //Add question title
    let title = $("<h2>");
    $(title).text(questions[round].title);
    $("#display").append(title);

    //Add choice buttons

    let choiceArray = questions[round].choices;
    choiceArray.forEach(function(choice) {
      let choiceBtn = $("<button>");
      let rowDiv = $("<div>");
      $(rowDiv).addClass("row");
      $(choiceBtn).text(choice);

      //   console.log($(choiceBtn).text());
      $(choiceBtn).on("click", function() {
        checkAnswer(choiceBtn);
      });

      $(rowDiv).append(choiceBtn);

      $("#display").append(rowDiv);
    });
    // console.log(`Question number: ${round + 1}`);
  }

  function startGame() {
    //empty save bttn row

    $("#hrFormRow").empty();
    //shuffle questions
    shuffle(questions);
    //shuffle choices
    for (let i = 0; i < questions.length; i++) {
      shuffle(questions[i].choices);
    }
    //reset score and question number first
    questionNumber = 0;
    score = 0;
    correctAnswers = 0;

    //start the timer
    timeValue = 150;
    startTimer();

    //Game starts

    generateQuestion(questionNumber);
  }

  function showAnswer(bool) {
    //Announces to user whether their choice was right or wrong
    if (bool === true) {
      // console.log("Correct");
      // $("#bottomRow").empty();
      $("#announce").text("Correct!");
      setTimeout(function() {
        $("#announce").empty();
      }, 1000);
    } else {
      $("#announce").text("Wrong!");
      setTimeout(function() {
        $("#announce").empty();
      }, 1000);
    }
  }

  function checkAnswer(btn) {
    //user clicked button, check if they are correct
    // console.log("Button pressed");
    // console.log($(btn).text());
    if ($(btn).text() === questions[questionNumber].answer) {
      showAnswer(true);
      score += answerPoints;
      correctAnswers++;
      // console.log(`Score is: ${score}`);
      if (questionNumber < questions.length - 1) {
        questionNumber++;
        generateQuestion(questionNumber);
      } else {
        onCompletion();
      }
    } else {
      showAnswer(false);

      if (questionNumber < questions.length - 1) {
        questionNumber++;
        generateQuestion(questionNumber);
        timeValue -= 15;
        if (timeValue < 0) {
          onCompletion();
        } else {
          // console.log(timeValue);
          stopTimer();
          startTimer();
        }
      } else {
        onCompletion();
      }
    }
  }
});
