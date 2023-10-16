var clock = document.getElementById('timer');
var startBtn = document.getElementById('start-btn');
var submitBtn = document.getElementById('submit-btn')
var saveBtn = document.getElementById('save-btn');
var homeBtn = document.getElementById('home-btn');
var homePage = document.getElementById('quizHome');
var testPage = document.getElementById('testingPage');
var finalPage = document.getElementById('finalPage');
var testQuestion = document.getElementById('question');
var answerA = document.getElementById('answerA');
var answerB = document.getElementById('answerB');
var answerC = document.getElementById('answerC');
var answerD = document.getElementById('answerD');
var answerForm = document.getElementById('answerForm');
var hiScore = document.getElementById('hiScore');
var displayFinal = document.getElementById('displayFinal');
var userInitials = document.getElementById('initials');


var userScore = 0;
var countdown;
var time = 60;
var finalScore = time;

var questions = [
    {
        question: 'What is JavaScript primarily used for in web development?',
        answers: {
            A: 'Styling web pages.',
            B: 'Adding interactivity and dynamic behavior.',
            C: 'Defining HTML sctructure.',
            D: 'Creating database queries.'
        },
        correctAnswer: 'B'
    },
    {
        question: 'What is the output of the following code: console.log(5 + "5");?',
        answers: {
            A: '10',
            B: '"10"',
            C: '55',
            D: '"55"'
        },
        correctAnswer: 'D'
    },
    {
        question: 'How do you call a function in JavaScript?',
        answers: {
            A: 'By using "runFunction()".',
            B: 'By using "callFunction()".',
            C: 'By using "function.run()".',
            D: 'By using the function name followed by parenthases, e.g., "myFunction()".'
        },
        correctAnswer: 'D'
    },
    {
        question: 'What is the purpose of the "return" statement?',
        answers: {
            A: 'To declare a function.',
            B: 'To perform a calculation.',
            C: 'To specify the value a function should produce and end its execution.',
            D: 'To display a message on the screen.'
        },
        correctAnswer: 'C'
    },
    {
        question: 'How do you create an array in JavaScript?',
        answers: {
            A: 'createArray = [];',
            B: 'let array = new Array();',
            C: 'let array = [1, 2, 3];',
            D: 'All of the above'
        },
        correctAnswer: 'C'
    },
    {
        question: 'What is the difference between "null" and "undefined" in JavaScript?',
        answers: {
            A: 'They are the same and can be used interchangeably.',
            B: '"null" is used for uninitialized variables, while "undefined" is an intentionally assigned empty value.',
            C: '"undefined" is used for uninitialized variables, while "null" is an intentionally assigned empty value.',
            D: '"undefined" represents a number, while "null" represents a string.'
        },
        correctAnswer: 'C'
    },
    {
        question: 'How do you declare a variable in JavaScript?',
        answers: {
            A: 'variable myVar;',
            B: 'var myVar;',
            C: 'new myVar;',
            D: 'declare myVar;'
        },
        correctAnswer: 'B'
    },
    {
        question: 'Which keyword is used to declare a constant variable in JavaScript?',
        answers: {
            A: 'const',
            B: 'constant',
            C: 'let',
            D: 'var'
        },
        correctAnswer: 'A'       
    },
    {
        question: 'How do you comment a single line of code in JavaScript?',
        answers: {
            A: '/* Comment here */',
            B: '// Comment here',
            C: '<!-- Comment here -->',
            D: '# Comment here'
        },
        correctAnswer: 'B'
    },
    {
        question: 'What is a function in JavaScript?',
        answers: {
            A: 'A type of loop',
            B: 'A conditional statement',
            C: 'A reusable block of code',
            D: 'An HTML element'
        },
        correctAnswer: 'C'
    }
]
var answeredQuestions = [];

function beginQuiz() {
    homePage.classList.add('hide');
    testPage.classList.remove('hide');
    startTimer();
}

function startTimer() {
    if (!countdown) {
        countdown = setInterval(() => {
            time--;
            if (time <= 0) {
                clearInterval(countdown);
                endQuiz();
            } else {
                clock.textContent = time;
            }
        }, 1000);
    }
}

function getQuestion() {
    // Ends quiz if time is out OR questions are all complete
    if (answeredQuestions.length === 10 || time <= 0) {
        console.log('End');
        clearInterval(countdown); 
        endQuiz(); 
        return time;
    }

    // generates a question from the array at random
    var randomQuestion = Math.floor(Math.random() * questions.length);
    newQuestion = questions[randomQuestion];
    console.log(newQuestion);

    testQuestion.textContent = newQuestion.question;
    answerA.textContent = newQuestion.answers.A
    answerB.textContent = newQuestion.answers.B;
    answerC.textContent = newQuestion.answers.C;
    answerD.textContent = newQuestion.answers.D;

    questions.splice(randomQuestion, 1);
    answeredQuestions.push(newQuestion);
    console.log(answeredQuestions)
}

// Submits the answer and verifies if correct
function submitAnswer() {
    var choice = document.querySelector('input[name="answer"]:checked');
    if (!choice) {
        alert('Please select an answer above before continuing!');
        return;
    }
    checkAnswer(choice.value);
    answerForm.reset();
    getQuestion();
}

function checkAnswer(choice) {
    if (choice === answeredQuestions[answeredQuestions.length - 1].correctAnswer) {
        alert('CORRECT!');
        time += 5;
    } else {
        alert('INCORRECT!');
        if (time >= 10) {
            time -= 10;
        } else {
            time = 0;
        }
        clock.textContent = time;
    }
}

function endQuiz() {
    userScore = time;
    testPage.classList.add('hide');
    finalPage.classList.remove('hide'); 
    console.log('Quiz ended. Final score: ' + time);
    displayFinal.textContent = userScore;
}

// saves score to local storage for data persistence
function saveScore(initials) {
    userScore = time;
    var initials = userInitials.value;
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('userInitials', initials);
    hiScore.textContent = ('Hi-Score: ' + userScore + ' ' + initials);
    console.log('Saved successfully.');
}

function loadScore() {
    userScore = localStorage.getItem('userScore');
    initials = localStorage.getItem('userInitials');
    hiScore.textContent = ('Hi-Score: ' + userScore + ' by ' + initials);
}


// event listeners

startBtn.addEventListener('click', () => {
    startTimer(60);
    beginQuiz();
    getQuestion();
});

submitBtn.addEventListener('click', submitAnswer)
saveBtn.addEventListener('click', saveScore);
homeBtn.addEventListener('click', () => {
    location.reload();
})
// reloads the same score
window.addEventListener('load', loadScore)