const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
var customResponse = require(config.customPath);
var citations = require(config.citationsPath);
var data = require(config.dataPath);
var warning = false;
var cooldown = 0;
var nbthinking = 0;
var nbthinkingreac = 0;
var actualMessage;
var messagesAnalyses = 0;
//var rp = require(config.rpPath);
//var stuff = require(config.stuffPath);
var fs = require('fs');
var imgsThinking = fs.readdirSync(config.imgs+"thinkings/");
var imgsDessin = fs.readdirSync(config.imgs+"dessins/");
//var stuffs = [[]];

bot.on("ready",function(){
	fs.writeFile(config.dataPath.replace('.json','_backup.json'), JSON.stringify(data), function (err){if(err){return console.log(err);}});
	fs.writeFile(config.customPath.replace('.json','_backup.json'), JSON.stringify(customResponse), function (err){if(err){return console.log(err);}});
	fs.writeFile(config.citationsPath.replace('.json','_backup.json'), JSON.stringify(citations), function (err){if(err){return console.log(err);}});
	console.log("Ready!");
/*	fs.readFile('datas.txt', (err, data) => {
			if (err) throw err;
			console.log("The file was read!");
			data.toString('utf8').split("\r\n").forEach(function(x){var arr = x.split(" ");stuffs[arr[0]] = [parseInt(arr[1])||0,arr[2]||"",arr[3]||""];console.log(arr[0]);});
		});*/
});
bot.on("guildMemberAdd",function(member){
	let guild = member.guild;
//	guild.defaultChannel.sendMessage("Un nouveau raton est né :baby: Bienvenue "+member.user+" ! :hugging:");
});
bot.on("message", function(message){
	if(message.author.bot)return;
	if(message.content.startsWith(config.prefix)){
		let commande = message.content.split(" ")[0];
		commande=commande.slice(config.prefix.length).toLowerCase();
		let args = message.content.split(" ").slice(1);
		var effect;
		if(commande === "help"){effect = function(){
			message.channel.sendMessage("Avec un "+config.prefix+" je peux danser, twerker, réfléchir, vous montrer des dessins et parler comme vous. *("+message.author.username+")*");
//			message.channel.sendMessage("Avec un "+config.prefix+" je peux danser, twerker, réfléchir, vous montrer des dessins et parler comme vous. (Pour ajouter une citation : !addCitation [auteur] [citation] ou : !addModiie [citation]) *("+message.author.username+")*");
		};} else if(commande === "twerk" || commande === "twerker"){effect = function(){
			message.channel.sendMessage(config.twerkGifs[Math.floor(Math.random()*config.twerkGifs.length)]+" *("+message.author.username+")*");
//			message.channel.sendFile(config.twerkGifs[Math.floor(Math.random()*config.twerkGifs.length)]);
		};} else if(commande === "danse" || commande === "danser" || commande === "modidanse" || commande === "modiDanse" || commande === "dance" || commande === "modidance" || commande === "modiDance"){effect = function(){
			message.channel.sendMessage("https://cdn.discordapp.com/attachments/224158736573399040/286560860392914944/danse_zboub.gif *("+message.author.username+")*");
		};} else if(commande === "mange" || commande === "amande" || commande === "modiMange" || commande === "modimange" || commande === "manger" || commande === "yerk" || commande === "modiyerk" || commande === "modiYerk"){effect = function(){
			message.channel.sendMessage("https://cdn.discordapp.com/attachments/224158736573399040/293147877960712192/bloggif_5846fffd2c174.gif *("+message.author.username+")*");
		};} else if(commande === "say" || commande === "meme" || commande === "parler" || commande === "parle"){effect = function(){
//			var raccoonMemes = ["C'est la faute à "+message.channel.members.get("139095058212323328").user,"Nique trunks :neutral_face:","ok d'accord :thinking:"];
			var modiieNum = (args[0] ? (parseInt(args[0]) - 1) : Math.floor(Math.random()*config.say.length));
			message.channel.sendMessage(config.say[modiieNum]);
		};} else if(commande === "octo" || commande === "Octo" || commande === "decoupeOcto" || commande === "decoupeocto"){effect = function(){
			message.channel.sendMessage("<:phoque1:290592305516118016>:knife:<:phoque2:290592247420813313>:knife:<:phoque3:290592353981431810>");
		};} else if(commande === "bot"){effect = function(){
			message.channel.sendMessage("Je suis codé en Javascript avec discord.js (pour Node.js), "+message.author.username);
		};} else if(commande === "addmodiie" || commande === "addModiie"){effect = function(){
			addCitation(args.join(" "),"Modiie",message);
		};} else if(commande === "addcitation" || commande === "addCitation"){effect = function(){
			addCitation(args.slice(1).join(" "),args[0],message);
		};} else if(commande === "dessin" || commande === "dessins" || commande === "modidessin" || commande === "modiDessin"){effect = function(){
			var modiieNum = (args[0] ? (parseInt(args[0]) - 1) : Math.floor(Math.random()*imgsDessin.length));
			message.channel.sendFile(config.imgs+"dessins/"+imgsDessin[modiieNum]);
		};} else if(commande === "botengreve" || commande === "botEnGreve" || commande === "BotEnGreve"){
			message.channel.sendMessage("https://cdn.discordapp.com/attachments/224158736573399040/286527362055536641/modiie_-_middle_finger.gif *("+message.author.username+")*");
		} else if(commande === "thinking"){
			message.channel.sendFile(config.imgs+"thinkings/"+imgsThinking[Math.floor(Math.random()*imgsThinking.length)]);
			deletion(message);
		} else if(commande === "ah" || commande === "Ah" || commande === "zrtah" || commande === "zrtAh"){
			message.channel.sendFile(config.imgs+"ah.png");
			deletion(message);
		} else if(commande === "sob" || commande === "pleurebb" || commande === "pleureBB" || commande === "pleure"){
			message.channel.sendFile(config.imgs+"pleurebb.png");
			deletion(message);
		} else if(commande === "joy" || commande === "pleurepas" || commande === "pleurePas" || commande === "pleurepasbb" || commande === "pleurePasBB"){
			message.channel.sendFile(config.imgs+"pleurepasbb.png");
			deletion(message);
		} else if(commande === "facepalm" || commande === "face_palm" || commande === "facePalm"){
			message.channel.sendFile(config.imgs+"facepalm.png");
			deletion(message);
		} else if(message.author.id === "152901292090458113"){
			if(commande === "allthinkings"){
				message.channel.sendFile(config.imgs+"allthinking.png");
			} else if(commande === "thinkings" || commande === "nbthinking" || commande === "nbthinkings"){
				nbthinking = 0;
				nbthinkingreac = 0;
				messagesAnalyses = 0;
				message.channel.sendMessage("Début du scan...").then(function(messageLog){
					actualMessage = messageLog;
					if(!data.hasOwnProperty(actualMessage.channel.id)){data[actualMessage.channel.id]={"nbThinking":0,"nbThinkingReac":0,"lastMessageId":"0","nbMessages":0};}
					compteurThinking(actualMessage);
				},function(raison){console.log(raison);}).catch(console.error);
			} else if(commande === "toto"){
				message.channel.fetchMessage("289157068550569984").then(function(x){
					console.log(x);
					var test = ": ";
					x.reactions.forEach(function(y){
						test += y.emoji.id+" "+y.emoji.identifier+" "+y.emoji.name+" "+y.emoji.count+" ";
					});
					x.channel.sendMessage("ce message contient "+test);
				},function(raison){console.log(raison);}).catch(console.error);
				message.channel.fetchMessage("280450419975651338").then(function(x){
					console.log(x);
					var test = ": ";
					x.reactions.forEach(function(y){
						test += y.emoji.id+" "+y.emoji.identifier+" "+y.emoji.name+" "+y.emoji.count+" ";
					});
					x.channel.sendMessage("ce message contient "+test);
				},function(raison){console.log(raison);}).catch(console.error);
			} else if(commande === "cite" || commande === "modiie"){
				var modiieNum = (args[0] ? (parseInt(args[0]) - 1) : Math.floor(Math.random()*citations.length));
				if(citations[modiieNum]){
					message.channel.sendMessage("Citation n°"+(modiieNum+1)+" : \""+citations[modiieNum].citation+"\" "+citations[modiieNum].author+citations[modiieNum].date+" *("+message.author.username+")*");
				} else {
					message.reply("Il n'y a pas "+(modiieNum+1)+" citations, ne fais pas l'enfant.");
				}
			} else if(commande === "refresh"){
				if(arg[0]==="D"){
					imgsDessin = fs.readdirSync(config.imgs+"dessins/");
				} else {
					imgsThinking = fs.readdirSync(config.imgs+"thinkings/");
				}
			} else {
				return;
			}
			deletion(message);
		}
		if(effect){
			var d = new Date();
			d = d.getTime();
			if(d-cooldown>config.cooldown*1000){
				effect();
				cooldown = d;
			} else {
				if(!warning){
					warning=true;
					message.channel.sendMessage("*commandes disponibles dans "+(Math.floor((cooldown-d)/100+config.cooldown*10)/10)+"s "+message.author.username+"*").then(function(messageLog){
						setTimeout(function(){messageLog.delete();warning=false;},cooldown-d+config.cooldown*1000);
					},function(raison){console.log(raison);}).catch(console.error);
				}
			}
			deletion(message);
		}
	}
});
function deletion(message){
	console.log(message.author.username+": "+message.content);
	message.delete();
}
function addCitation(citation,author,messageSource){
	var d = new Date();
	citations.push({"citation":citation,"author":author,"date":d.getDate()+(d.getMonth()<9 ? "/0" : "/")+(d.getMonth()+1)+"/"+d.getFullYear(),"source":messageSource.author.username});
	fs.writeFile(config.citationsPath, JSON.stringify(citations), function (err){if(err){return console.log(err);}});
//	messageSource.channel.sendMessage("Citation n°"+citations.length+" : \""+citations[citations.length-1].citation+"\" "+citations[citations.length-1].author+citations[citations.length-1].date+" (by "+citations[citations.length-1].source+") *("+messageSource.author.username+")*");
}

function compteurThinking(message){
	message.channel.fetchMessages({before:message.id,limit:100}).then(function(messages){
		if(messages.size > 0){
			if(messages.has(data[actualMessage.channel.id].lastMessageId)){
				var keys = messages.keyArray();
				for(var i=0;i<keys.length;i++){
					if(keys[i]==data[actualMessage.channel.id].lastMessageId){
						messagesAnalyses+=i+1;
						returnThinkings();
					} else {
						cptThInMsg(messages.get(keys[i]));
					}
				}
			} else {
				messages.forEach(cptThInMsg);
				messagesAnalyses+=messages.size;
				actualMessage.edit(messagesAnalyses+" messages scannés...");
				compteurThinking(messages.last());
			}
		} else {
			returnThinkings();
		}
	},function(raison){console.log(raison);}).catch(console.error);
}
function cptThInMsg(message){
	nbthinking += message.content.split("🤔").length + message.content.split(":thinking:").length - 2;
//	message.reactions.forEach(function(x){if(x.emoji.id==){}});
}
function returnThinkings(){
	var channelId = actualMessage.channel.id;
	data[channelId].nbThinking += nbthinking;
	data[channelId].nbMessages += messagesAnalyses;
	data[channelId].nbThinkingReac += nbthinkingreac;
	data[channelId].lastMessageId = actualMessage.id;
	actualMessage.edit("Le channel "+actualMessage.channel.name+" contient "+data[channelId].nbMessages+" messages et "+data[channelId].nbThinking+" :thinking:");
	fs.writeFile(config.dataPath, JSON.stringify(data), function (err){if(err){return console.log(err);}});
}

function httpGet(theUrl,premiermess){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	xmlHttp.setRequestHeader("Authorization","Bot "+config.token);
    xmlHttp.send({"after":premiermess,"limit":100});
    return xmlHttp.responseText;
}

bot.login(config.token);
