$(document).ready(function(){
var Quizz = function(questions){
	this.questions = questions;
	this.currentQuestionIndex = 0;
	var quizz = this;
	this.questions.forEach(function(e,i,a){
		e.quizz = quizz;
	});
	this.score = 0;
};
Quizz.prototype.currentQuestion = function() {
	return this.questions[this.currentQuestionIndex];
};

Quizz.prototype.start = function (){
	//show the game
	this.show();
	//show the 1st question
	this.currentQuestion().show();
};

Quizz.prototype.show = function (){
	$('body').append('<div id="quizz"></div>');
};

Quizz.prototype.next = function(){
	this.currentQuestionIndex++;
	$('.question').hide();
	if(this.currentQuestionIndex < this.questions.length){
		this.currentQuestion().show();
	}
	else{
		this.end();
	}
};
Quizz.prototype.end = function() {
	console.log('Game Over ' + 'Score is ' + this.score );
	$('#quizz').append('<h1>Game Over</h1> ' +'Your score is ' + this.score + ' of '+ this.questions.length);
};

var Question = function(data){
	this.question = data.question;
	this.choices = _.shuffle(data.choices.concat(data.answer));
	this.answer = data.answer;
};
Question.prototype.show = function(){
	var template = Handlebars.compile($('#question-template').html());
	$('#quizz').append(template(this));
	var question = this;
	$('.choices li').on('click',function(){
		console.log(question);
		if ($(this).text() == question.answer) {
			console.log('Correct');
			question.quizz.score++;
		}
		else {
			console.log('wrong');
		}
		question.quizz.next();
	});
};
	var question1 = new Question ({
		question: 'What is your name?',
		choices: ['A','B','C'],
		answer: 'Lina'
	});
	var question2 = new Question ({
		question: 'What is your age?',
		choices: ['A','B','C'],
		answer: '21'
	});
	var question3 = new Question ({
		question: 'What are you from?',
		choices: ['A','B','C'],
		answer: 'Ukraine'
	});
	var quizz = new Quizz ([
		question1,
		question2,
		question3
	]);

	quizz.start();
});



