module.exports = async () => {
  var dares = [
	'Send a screenshot of your home screen',
	'Tell an embarrasing story',
	'Wear an outfit chosen be other players and send a picture',
	'Wear your clothes backwards',
	'Tell a dirty joke',
	'Eat something without using your hands',
	'Tell a funny joke',
	'Drink salt water',
	'Sent a screenshot of your browser history',
	'Wear your clothes inside out and send a picture',
	'Say something nice about the epic creator of this bot, <@303097521314725890> !',
	'Do twenty pushups',
	'Eat a slice of lemon',
	'Let a player pick a website for you to visit',
	'Draw a face on your stomach',
	'Give a tree a hug',
	'Tell everyone your strangest dream',
	'Video yourself recalling the alphabet backwards',
	'Send a selfie to the group',
	'Sing some Micheal Jackson',
	'Nominate someone else to do a dare',
	'What is the wierdest thing you have done with the opposite sex',
	'Message us a funny or spooky story... Your choice!!',
	'LEAVE THIS SPARE'
];

var truths = [
	'Who of all your family would you save if you could only save one?',
	'Do you love anyone (like a crush)',
	'Who do you like  (crush)',
	'Least favorite person in this server',
	'Most favorite person in this server',
	'Who do you hate most?',
	'How many discord servers are you in?',
	'Who was the last 5 people you dm’ed',
	'LEAVE SPARE'
];

var daresDone = [];
var truthsDone = [];
var currentDare;
var currentTuth;
var needDareReset = false;
var needTruthReset = false;
var chosen;
var currentNo = 0;

function chooseDare() {
	var conflict = 1;
	while (conflict > 0) {
		chosen = Math.floor(Math.random() * (dares.length - 1));
		var conflict = 0;
		if (daresDone.length == dares.length - 1) {
			needDareReset = true;
			break;
		} else {
			daresDone.forEach(function(i, index) {
				if (i == chosen) {
					conflict += 1;
				}
			});
		}
	}
}

function chooseTruth() {
	var conflict = 1;
	while (conflict > 0) {
		chosen = Math.floor(Math.random() * (truths.length - 1));
		var conflict = 0;
		if (truthsDone.length == truths.length - 1) {
			needTruthReset = true;
			break;
		} else {
			truthsDone.forEach(function(i, index) {
				if (i == chosen) {
					conflict += 1;
				}
			});
		}
	}
}
}