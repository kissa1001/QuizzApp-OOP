$(document).ready(function(){
//Animations
//intro0-text
$(".intro0-text").typed({
    strings: [" ", "With more than 1 billion members and counting, Facebook is one of the fastest-growing phenomena to come out of a college dorm room. From Web-based applications to pokes, from photo uploads to fan pages, there's something about this social networking service that sucks people in and won't let them go. What do you know about Facebook?"],
    typeSpeed: 10
});




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

Quizz.prototype.show = function(){
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
		question: 'Who founded Facebook?',
		choices: ['Steve Jobs','Mortimer Zuckerman','Barry Zuckercorn'],
		answer: 'Mark Zuckerberg'
	});
	var question2 = new Question ({
		question: 'How much did Facebook pay to get its current domain name?',
		choices: ['$2000','$20,000','$2,000,000'],
		answer: '$200,000'
	});
	var question3 = new Question ({
		question: 'Which major software company bought a stake in Facebook in 2007?',
		choices: ['Google','Yahoo','Apple'],
		answer: 'Microsoft'
	});
	var question4 = new Question ({
		question: 'Where are Facebooks main offices located?',
		choices: ['Harvard','San Francisco','Silicon Valley'],
		answer: 'Palo Alto'
	});
	var question5 = new Question ({
		question: 'About 30 million people access their Facebook profile using what?',
		choices: ['laptops','computers','minds'],
		answer: 'mobile phones'
	});
	var quizz = new Quizz ([
		question1,
		question2,
		question3,
		question4,
		question5
	]);


var Character =  function (character) {
	this.intro = character.intro;
	this.stand = character.stand;
	this.correct = character.correct;
	this.wrong = character.wrong;
	this.fail = character.fail;
	this.win = character.win;
};
var Mugsy = new Character ({
	intro: $('#mugsy.intro'),
	stand: $('#mugsy.stand'),
	correct: $('#mugsy.correct'),
	wrong: $('#mugsy.wrong'),
	fail: $('#mugsy.fail'),
	win: $('#mugsy.win')
});
var Mango = new Character ({
	intro: $('#mango.intro'),
	stand: $('#mango.stand'),
	correct: $('#mango.correct'),
	wrong: $('#mango.wrong'),
	fail: $('#mango.fail'),
	win: $('#mango.win')
});

Quizz.prototype.start = function(){
 	//intro0 section appear
	$('#intro0').fadeIn(500);
//intro section appear
	$('.btn-danger').on('click',function(){
	$('#intro0').hide();
	$('#intro').fadeIn(1000);
	var template = Handlebars.compile($('#characters-template').html());
		$('#intro.container').append(template);
	});
	//show the game
	$('.intro').on('click',function(){
		switch(characters) {
    	case Mugsy:
        	$('#mugsy').show();
        	$('#mango').hide();
       		break;
    	case Mango:
        	$('#mango').show();
        	$('#mugsy').hide();
        	break;
		}
	this.show();
	//show the 1st question
	this.currentQuestion().show();
	});
}; 

	quizz.start();
});



