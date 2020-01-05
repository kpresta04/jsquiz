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
      "What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?",
    choices: ["strip()", "trim()", "trimmed()", "stripped()"],
    answer: "trim()"
  }
];

$(document).ready(function() {
  let disp = document.querySelector("#timer");
  function shuffle(array) {
    //shuffles questions
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffle(questions);
  //shuffle choices
  for (let i = 0; i < questions.length; i++) {
    shuffle(questions[i].choices);
  }
  //   console.log(questions);
  $("#start-button").on("click", startGame);

  let questionNumber = 0;

  function generateQuestion(round) {
    //Clear display
    $("#display").empty();
    console.log(questions[round].title);

    console.log(questions[round].choices);
    console.log(questions[round].answer);
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
    console.log(`Question number: ${round + 1}`);
  }

  function startGame() {
    //

    generateQuestion(questionNumber);
  }

  function checkAnswer(btn) {
    //user clicked button, check if they are correct
    // console.log("Button pressed");
    // console.log($(btn).text());
    if ($(btn).text() === questions[questionNumber].answer) {
      console.log("correct!");
      if (questionNumber < questions.length - 1) {
        questionNumber++;
        generateQuestion(questionNumber);
      }
    } else {
      console.log("incorrect!");
      if (questionNumber < questions.length - 1) {
        questionNumber++;
        generateQuestion(questionNumber);
      }
    }
  }
});
