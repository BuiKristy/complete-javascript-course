// function constructor

/*
var john = {
    name: "John", 
    yearOfBirth: 1990,
    job: "teacher"
};

var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function() {
    console.log(2016 - this.yearOfBirth);
};

var john = new Person("John", 1990, "teacher");
john.calculateAge();
*/

// Object.create
var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = "John";
john.yearOfBirth = 1990;
john.job = "teacher";

var jane = Object.create(personProto, {
    name: {value: "Jane"},
    yearOfBirth: { value: 1969 },
    job: { value: "designer" },
});

// =============================================================== //
// Coding Challenge 7
// =============================================================== //

// SIMPLE VERSION
/*
(function() {
    var Question = function(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for(var i = 0; i < this.answers.length; i++) {
            console.log(i + ": " + this.answers[i]);
        }
    };
    
    Question.prototype.checkAnswer = function(ans) {
        if(ans === this.correct) {
            console.log("Correct answer!!");
        } else {
            console.log("Wrong...");
        }
    }
    
    var arrQuestions = [];
    arrQuestions.push(new Question("Who is the coolest character in League?",
                        ["Lux", "Teemo", "Blitzcrank"],
                        0
        ));
    arrQuestions.push(new Question("Which cat is the coolest?",
                        ["Peach", "Leo", "Ninja", "Rengar"],
                        0
    ));
    arrQuestions.push(new Question ("Which drink is the best?",
                        ["Coke", "Pepsi", "Smoothies", "Bubble Tea"],
                        3
    ));
    
    var rand = Math.floor(Math.random() * arrQuestions.length);
    arrQuestions[rand].displayQuestion();
    var answer = parseInt(prompt("Please select the right answer"));
    arrQuestions[rand].checkAnswer(answer);
})();
*/



    var Question = function(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for(var i = 0; i < this.answers.length; i++) {
            console.log(i + ": " + this.answers[i]);
        }
    };
    
    Question.prototype.checkAnswer = function(ans, callback) {
        var score;

        if(ans === this.correct) {
            console.log("Correct answer!!");
            score = callback(true);
        } else {
            console.log("Wrong...");
            score = callback(false);
        }

        this.displayScore(score);
    }

    Question.prototype.displayScore = function(score) {
        console.log("Your current score is : " + score);
        console.log("-----------------------------------");
    }
    
    var arrQuestions = [];
    arrQuestions.push(new Question("Who is the coolest character in League?",
                        ["Lux", "Teemo", "Blitzcrank"],
                        0
        ));
    arrQuestions.push(new Question("Which cat is the coolest?",
                        ["Peach", "Leo", "Ninja", "Rengar"],
                        0
    ));
    arrQuestions.push(new Question ("Which drink is the best?",
                        ["Coke", "Pepsi", "Smoothies", "Bubble Tea"],
                        3
    ));

    function score() {
        var score = 0;
        return function(correct) {
            if(correct) {
                score++;
            }
            return score;
        }
    }

    var keepScore = score();
    function nextQuestion() {
        var rand = Math.floor(Math.random() * arrQuestions.length);
        arrQuestions[rand].displayQuestion();
        var answer = prompt("Please select the right answer");
        if(answer !== "exit") {
            arrQuestions[rand].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }
    }
    
    nextQuestion();