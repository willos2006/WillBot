//require('dotenv').config(); 
const Discord = require('discord.js');
const bot = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
	bot.user.setStatus('available')
	bot.user.setActivity('with the server!', {
		type: 'PLAYING'
	});
	
	var index = 0;
	setInterval(function(){
		if(index === 0){
			bot.user.setActivity("out for -help", {type: "WATCHING"});
			index = 1;
		}
		else{
			index = 0;
			bot.user.setActivity("with the server!", {type: "PLAYING"});}
	}, 7000);
});
		
		
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
	'LEAVE THIS SPARE',
]

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
]

var daresDone = [];
var truthsDone = [];

var currentDare;
var currentTuth;

var needDareReset = false;
var needTruthReset = false;

var chosen;

var currentNo = 0;

function chooseDare(){
	var conflict = 1;
	while(conflict > 0){
		chosen = Math.floor(Math.random() * (dares.length - 1));
		var conflict = 0;
		if(daresDone.length == dares.length - 1){
			needDareReset = true;
			break;
		}
		else {
			daresDone.forEach(function (i, index){
				if(i == chosen){
					conflict += 1;
				}
			});
		}
	}
}   

function chooseTruth(){
	var conflict = 1;
	while(conflict > 0){
		chosen = Math.floor(Math.random() * (truths.length - 1));
		var conflict = 0;
		if(truthsDone.length == truths.length - 1){
			needTruthReset = true;
			break;
		}
		else {
			truthsDone.forEach(function (i, index){
				if(i == chosen){
					conflict += 1;
				}
			});
		}
	}
}   

bot.on('guildMemberAdd', member => {
	member.guild.members.fetch();
	let welcomeChan = member.guild.channels.cache.find(channel => channel.id === '738107329643544590');
	welcomeChan.send("Yay! <@" + member.id + "> Is here! Make yourself comfortable and go on over to <#738110183389003818> to verify yourself!");
});

bot.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	if(reaction.message.id === '738112386279669792'){
		reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Verified"));
		user.send("You have been verified in my server! Please remember to be respectful and kind at all times! Other than that, do what you like!");
	}
	if(reaction.emoji.name == '1️⃣' && reaction.message.id === '738116196729225226'){
		reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "13-14"));
		user.send("You have the `13-14` role!");
	}
	if(reaction.emoji.name == '2️⃣' && reaction.message.id === '738116196729225226'){
		reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "15-16"));
		user.send("You have the `15-16` role!");
	}
	if(reaction.emoji.name == '3️⃣' && reaction.message.id === '738116196729225226'){
		reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "17-18"));
		user.send("You have the `17-18` role!");
	}
	if(reaction.message.id === '738444446768824372'){
		if(reaction.emoji.name == '🔴' || reaction.emoji.name == '🔵'){
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "red")){
				reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove((role => role.name === "red").id);
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "blue")){
				reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove((role => role.name === "blue").id);
			}
			if(reaction.emoji.name == '🔴'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "red"));
			}
			if(reaction.emoji.name == '🔵'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "blue"));
			}
			reaction.remove();
		}
	}  
});

bot.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	if(reaction.emoji.name == '1️⃣' && reaction.message.id === '738116196729225226'){
		reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "13-14"));
		user.send("You have removed the `13-14` role!");
	}
	if(reaction.emoji.name == '2️⃣' && reaction.message.id === '738116196729225226'){
		reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "15-16"));
		user.send("You have removed the `15-16` role!");
	}
	if(reaction.emoji.name == '3️⃣' && reaction.message.id === '738116196729225226'){
		reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "17-18"));
		user.send("You have removed the `17-18` role!");
	}
});

bot.on('message', msg => {
	if(msg.content === '-troubleshoot members'){
		msg.guild.members.cache.forEach(member => console.log(member.user.username)); 
	}
	if(msg.content === '-truth' && msg.channel.id === '738109060640931952'){
		if(needTruthReset){
			msg.channel.send("You have gone through them all! Please use the `-resetTruth` command to start over, or just do some dares!");
		}
		else{
			if(truthsDone.length == truths.length - 1){
				msg.channel.send("You have gone through them all! Please use the `-resetTruth` command to start over, or just do some dares!");
				needTruthReset = true;
			}
			else{
				msg.channel.send('thinking of truth...');
				chooseTruth();
				msg.reply(truths[chosen]);
				truthsDone.push(chosen);
			}
		}
	}
	else if(msg.content === '-truth'){
		msg.channel.send("You can only use me in the truth or dare channel!"); 
	}
	
	if(msg.content === '-dare'  && msg.channel.id === '738109060640931952'){
		if(needDareReset){
			msg.channel.send("You have gone through them all! Please use the `-resetDare` command to start over, or just do some truths!");
		}
		else{
			if(daresDone.length == dares.length - 1){
				msg.channel.send("You have gone through them all! Please use the `-resetDare` command to start over, or just do some truths!");
				needDareReset = true;
			}
			else{
				msg.channel.send('thinking of dare...');
				chooseDare();
				msg.reply('I dare you to... ' + dares[chosen]);
				daresDone.push(chosen);
			}
		}
	}
	else if(msg.content === '-dare'){
		msg.channel.send("You can only use me in the truth or dare channel!"); 
	}
	
	if(msg.content === '-resetDare'  && msg.channel.id === '738109060640931952'){
		msg.channel.send('Reset Dares!');
		daresDone = [];
		needDareReset = false;
	}
	else if(msg.content === '-resetDare'){
		msg.channel.send("You can only use me in the truth or dare channel!"); 
	}
	if(msg.content === '-resetTruth'  && msg.channel.id === '738109060640931952'){
		msg.channel.send('Reset Truths!');
		truthsDone = [];
		needTruthReset = false;
	}
	else if(msg.content === '-resetTruth'){
		msg.channel.send("You can only use me in the truth or dare channel!"); 
	}
	if(msg.content === 'hey bot!'){
		msg.reply('Hi!');
	}
	if(msg.content === 'shutdown'){
		bot.destroy();
	}
	if(msg.content === '-help'){
		msg.channel.send("Hey! Heres a list of commands:\n -truth \n -dare \n -resetTruth \n -resetDare \n Hey Bot!");
	}
	if(msg.channel.id === '738109254036226228'){
		if(!isNaN(msg.content)){
			if(msg.content == currentNo + 1){
				msg.react('✅');
				currentNo += 1;
			}
			else{
				msg.react('❌');
				currentNo = 0;
				msg.channel.send("<@" + msg.author.id + ">  has ruined it! The current number has been reset... start again from 1!");
			}
		}
	}
});
