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
	//react to it's messages
	let guild = bot.guilds.cache.get('738107329643544587');
   	let rolesChan = guild.channels.cache.find(channel => channel.id === "738110183389003818");
	rolesChan.messages.fetch('738112386279669792').then(m => {
		m.react('✅')
	});
	rolesChan.messages.fetch("738116196729225226").then(m => {
	m.react("1️⃣");
	m.react("2️⃣");
	m.react("3️⃣");
	});
	rolesChan.messages.fetch("738444446768824372").then(m => {
		m.react("🔴");
		m.react("🔵");
		m.react("🟢");
		m.react("🟠");
		m.react("🟣");
	});
	rolesChan.messages.fetch("738722915217833996").then(m => {
		m.react("👨");
		m.react("👩");
		m.react("⭕");
	});
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
	if(user.id != bot.user.id){
		if(reaction.message.id === '738112386279669792' && !(reaction.message.guild.members.cache.find(member => member.id == user.id).roles.cache.find(role => role.name === "Verified"))){
			reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Verified"));
			user.send("You have been verified in my server! Please remember to be respectful and kind at all times! Other than that, do what you like!");
			reaction.message.reactions.resolve('✅').users.remove(user.id);
		}
		else if(reaction.message.id === '738112386279669792'){
			reaction.message.reactions.resolve('✅').users.remove(user.id);
		}
		if(reaction.message.id === '738116196729225226'){
			let msg = await reaction.message.channel.messages.fetch('738116196729225226');
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "13-14")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "13-14"));
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "15-16")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "15-16"));
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "17-18")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "17-18"));
			}
			if(reaction.emoji.name == '1️⃣' && reaction.message.id === '738116196729225226'){
				reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "13-14"));
				user.send("You have the `13-14` role!");
				reaction.message.reactions.resolve("1️⃣").users.remove(user.id);
			}
			if(reaction.emoji.name == '2️⃣' && reaction.message.id === '738116196729225226'){
				reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "15-16"));
				user.send("You have the `15-16` role!");
				reaction.message.reactions.resolve("2️⃣").users.remove(user.id);
			}
			if(reaction.emoji.name == '3️⃣' && reaction.message.id === '738116196729225226'){
				reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "17-18"));
				user.send("You have the `17-18` role!");
				reaction.message.reactions.resolve("3️⃣").users.remove(user.id);
			}
		}
		if(reaction.message.id === '738444446768824372'){
			let msg = await reaction.message.channel.messages.fetch('738444446768824372');
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "red")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "red"));
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "blue")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "blue").id);
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "green")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "green").id);
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "orange")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "orange").id);
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "purple")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "purple").id);
			}
			if(reaction.emoji.name == '🔴'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "red"));
				user.send('You chose the color `red`');
				reaction.message.reactions.resolve("🔴").users.remove(user.id);
			}
			if(reaction.emoji.name == '🔵'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "blue"));
				user.send('You chose the color `blue`');
				reaction.message.reactions.resolve("🔵").users.remove(user.id);
			}
			if(reaction.emoji.name == '🟢'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "green"));
				user.send('You chose the color `green`');
				reaction.message.reactions.resolve("🟢").users.remove(user.id);
			}
			if(reaction.emoji.name == '🟠'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "orange"));
				user.send('You chose the color `orange`');
				reaction.message.reactions.resolve("🟠").users.remove(user.id);
			}
			if(reaction.emoji.name == '🟣'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "purple"));
				user.send('You chose the color `purple`');
				reaction.message.reactions.resolve("🟣").users.remove(user.id);
			}
		} 
		if(reaction.message.id === "738722915217833996"){
			let msg = await reaction.message.channel.messages.fetch('738722915217833996');
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Male")){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Male").id);
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Female")){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Female").id);
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Other")){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Other").id);
			}
			if(reaction.emoji.name == '👨'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Male"));
				user.send("You chose the `Male` role");
				reaction.message.reactions.resolve('👨').users.remove(user.id);
			}
			if(reaction.emoji.name == '👩'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Female"));
				user.send("You chose the `Female` role");
				reaction.message.reactions.resolve('👩').users.remove(user.id);
			}
			if(reaction.emoji.name == '⭕'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Other"));
				user.send("You chose the `Other` role");
				reaction.message.reactions.resolve('⭕').users.remove(user.id);
			}
		} 
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
		msg.channel.send("Hey! Heres a list of commands:\n `-truth` \n `-dare` \n `-resetTruth` \n `-resetDare` \n `Hey Bot!` \n `-nickname [your new nickname]` just `-nickname` will reset your nickname \n `-dice [Number of dice to roll](not required)` \n*ADMIN COMMANDS* \n `-delete [numberOfMessages](not required)` \n `-kick [user]` \n `-ban [user]` \n `-unban [user]` \n `-giveRole [user] [role]` \n `-removeRole [user] [role]`");
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
	if(msg.content.startsWith('-nickname')){
		let nickname = msg.content.slice(10);
		msg.member.setNickname(nickname);
	}
	if(msg.content.startsWith('-dice')){
		let number = msg.content.slice(6);
		result = '';
		if(number === '' || number == '1'){
			msg.channel.send('You rolled a... ' + (Math.floor(Math.random() * Math.floor(6)) + 1) + "!");
		}
		else{
			if(isNaN(number)){
				msg.channel.send("Invalid Input");
			}
			else if(number <= 600){
				var total = 0;
				number = parseInt(number, 10);
				result += (Math.floor(Math.random() * Math.floor(6)) + 1); 
				total += parseInt(result, 10);
				if(number > 2){
					for(i = 0; i < number - 2; i++){
						var current = (Math.floor(Math.random() * Math.floor(6)) + 1);
						result += ", " + current;
						total += parseInt(current, 10);
					}
				}
				var current = (Math.floor(Math.random() * Math.floor(6)) + 1);
				result += " and a " + current;
				total += current;
				msg.channel.send("You rolled a " + result + " for a total of " + total + "!");
			}
			else{
				msg.channel.send("Please pick a value equal to or below 600!");
			}
		}
	}
	//admin commands
	if(msg.content.startsWith('-delete') && msg.member.roles.cache.find(role => role.name === 'Admins')){
		let amount = msg.content.slice(8);
		if(isNaN(amount) && amount != ''){
			msg.channel.send("Please enter a valid number");
		}
		else if(amount == ''){
			msg.channel.messages.fetch({limit: 2}).then(messages => {
				msg.channel.bulkDelete(messages);
			});
		}
		else{
			amount = parseInt(amount, 10);
			if(amount >= 99){
				msg.channel.messages.fetch({limit: 100}).then(messages => {
					msg.channel.bulkDelete(messages);
				});
			}
			else{
				msg.channel.messages.fetch({limit: amount + 1}).then(messages => {
					msg.channel.bulkDelete(messages);
				});
			}
		}
	}
	else if(msg.content.startsWith('-delete')){
		msg.channel.send("You must have the `Admins` role to use this command");
	}
	if(msg.content.startsWith('-kick') && msg.member.roles.cache.find(role => role.name === 'Admins')){
		let userToKick = msg.content.slice(6);
		userToKick = userToKick.replace(/[\\<>@#&!]/g, "");
		try{
			msg.guild.members.cache.find(member => member.id === userToKick).kick();
			msg.delete();
		}
		catch{
			msg.channel.send("Invalid User");
		}
	}
	else if(msg.content.startsWith('-kick')){
		msg.channel.send("You must have the `Admins` role to use this command")
	}
	if(msg.content.startsWith('-ban') && msg.member.roles.cache.find(role => role.name === 'Admins')){
		let userToKick = msg.content.slice(5);
		userToKick = userToKick.replace(/[\\<>@#&!]/g, "");
		try{
			msg.guild.members.cache.find(member => member.id === userToKick).ban();
			msg.delete();
		}
		catch{
			msg.channel.send("Invalid User");
		}
	}
	else if(msg.content.startsWith('-ban')){
		msg.channel.send("You must have the `Admins` role to use this command")
	}
	if(msg.content.startsWith('-unban') && msg.member.roles.cache.find(role => role.name === 'Admins')){
		let userToKick = msg.content.slice(8);
		userToKick = userToKick.replace(/[\\<>@#&!]/g, "");
		try{
			msg.guild.members.unban(userToKick);
			msg.delete();
		}
		catch{
			msg.channel.send("Invalid User");
		}
	}
	else if(msg.content.startsWith('-unban')){
		msg.channel.send("You must have the `Admins` role to use this command");
	}
	if(msg.content.startsWith('-giveRole') && msg.member.roles.cache.find(role => role.name === 'Admins')){
		let usertoRole = msg.content.slice(10, 31);
		usertoRole = usertoRole.replace(/[\\<>@#&!]/g, "");
		if(usertoRole.length == 17){
			usertoRole = usertoRole.substring(0, 17);
		}
		let roletogive = msg.content.slice(33);
		roletogive = roletogive.replace(/[\\<>@#&!]/g, "");
		try{
			if(msg.guild.roles.cache.find(role => role.id === roletogive)){
				msg.guild.members.cache.find(member => member.id === usertoRole).roles.add(msg.guild.roles.cache.find(role => role.id === roletogive));
				msg.channel.send('successfully gave role <@&'+ msg.guild.roles.cache.find(role => role.id === roletogive).id + '> to <@' + msg.guild.members.cache.find(member => member.id === usertoRole).id + '>');
			}
			else if(msg.guild.members.cache.find(member => member.id === usertoRole)){
				msg.channel.send("No such role exists!");
			}
			else{
				msg.channel.send("No such user exists!");
			}
		}
		catch{
			msg.channel.send('Invalid Input');
		}
	}
	else if(msg.content.startsWith('-giveRole')){
		msg.channel.send("You must have the `Admins` role to use this command!");
	}
	if(msg.content.startsWith('-removeRole') && msg.member.roles.cache.find(role => role.name === 'Admins')){
		let usertoRole = msg.content.slice(12, 33);
		usertoRole = usertoRole.replace(/[\\<>@#&!]/g, "");
		if(usertoRole.length == 17){
			usertoRole = usertoRole.substring(0, 17);
		}
		let roletogive = msg.content.slice(35);
		roletogive = roletogive.replace(/[\\<>@#&!]/g, "");
		try{
			if(msg.guild.members.cache.find(member => member.id === usertoRole).roles.cache.find(role => role.id === roletogive)){
				msg.guild.members.cache.find(member => member.id === usertoRole).roles.remove(msg.guild.roles.cache.find(role => role.id === roletogive));
				msg.channel.send('successfully removed role <@&'+ msg.guild.roles.cache.find(role => role.id === roletogive).id + '> from <@' + msg.guild.members.cache.find(member => member.id === usertoRole).id + '>');
			}
			else if(msg.guild.members.cache.find(member => member.id === usertoRole)){
				msg.channel.send("This user does not have the role specified!");
			}
			else{
				msg.channel.send("No such user exists!");
			}
		}
		catch{
			msg.channel.send('Invalid Input');
		}
	}
	else if(msg.content.startsWith('-removeRole')){
		msg.channel.send("You must have the `Admins` role to use this command!");
	}
});                 