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
var actualMessage = null;
var messagesAnalyses = 0;
var fs = require('fs');
var imgsThinking = fs.readdirSync(config.imgs+"thinkings/");
var imgsDessin = fs.readdirSync(config.imgs+"dessins/");

bot.on("ready",function(){
	fs.writeFile(config.dataPath.replace('.json','_backup.json'), JSON.stringify(data), function (err){if(err){return console.log(err);}});
	fs.writeFile(config.customPath.replace('.json','_backup.json'), JSON.stringify(customResponse), function (err){if(err){return console.log(err);}});
	fs.writeFile(config.citationsPath.replace('.json','_backup.json'), JSON.stringify(citations), function (err){if(err){return console.log(err);}});
	var d = new Date();
	console.log(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" Ready!");
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
		switch(commande){
//commandesbotbalise
			case "help"://%"Avec un "${config.prefix}" je peux danser, twerker, réfléchir, vous montrer des dessins et parler comme vous. La commande ${config.prefix}help admet maintenant un paramètre permettant d'obtenir plus de détails en MP (1 : liste complète, 2 : + les alias de chaque commande, 3 : + description de chaque commande) *(${actualMessage.author.username})*"
				createHelp(message,(args[0] ? parseInt(args[0]-1) : -1));
				deletion(message);break;
			case "bot"://%"Je suis codé en Javascript avec discord.js, ${actualMessage.author.username}"//%
				message.channel.sendMessage("Je suis codé en Javascript avec discord.js (pour Node.js), "+message.author.username);
				deletion(message);break;

			case "twerk":case "twerker":effect = function(){//%[gif de twerk de robot aléatoire]//%
				message.channel.sendMessage(config.twerkGifs[Math.floor(Math.random()*config.twerkGifs.length)]+" *("+message.author.username+")*");
	//			message.channel.sendFile(config.twerkGifs[Math.floor(Math.random()*config.twerkGifs.length)]);
				deletion(message);};break;
			case "danse":case "danser":case "modidanse":case "modiiedanse":case "dance":case "modidance":case "modiiedance":effect = function(){//%[gif de la danse du zboub par Modiie]//%
				message.channel.sendMessage("https://cdn.discordapp.com/attachments/224158736573399040/286560860392914944/danse_zboub.gif *("+message.author.username+")*");
				deletion(message);};break;
			case "mange":case "amande":case "modimange":case "modiiemange":case "manger":case "yerk":case "modiyerk":case "modiieyerk":effect = function(){//%[gif de l'amande amère par Modiie]//%
				message.channel.sendMessage("https://cdn.discordapp.com/attachments/224158736573399040/293147877960712192/bloggif_5846fffd2c174.gif *("+message.author.username+")*");
				deletion(message);};break;
			case "aled":effect = function(){//%[gif de chaton appellant à l'aide]//%
				message.channel.sendMessage("https://giphy.com/gifs/cat-fire-rescue-phJ6eMRFYI6CQ *("+message.author.username+")*");
				};break;
			case "oskour":case "oscour":case "oskours":case "oscours":case "oskourt":case "oscourt":effect = function(){//%[gif de personne se noyant appellant à l'aide]//%
				message.channel.sendMessage("https://giphy.com/gifs/gene-tierney-leave-her-to-heaven-esB20S2G29w1G *("+message.author.username+")*");
				};break;
			case "botengreve":case "botgreve":case "greve":case "grevedubot":effect = function(){//%[gif du doigt d'honneur par Modiie]//%
				message.channel.sendMessage("https://cdn.discordapp.com/attachments/224158736573399040/286527362055536641/modiie_-_middle_finger.gif *("+message.author.username+")*");
				};break;
			case "onesided":case "monologue":case "alone":case "vent":effect = function(){//%[extrait vidéo représentant un dialogue de sourds]//%
				message.channel.sendMessage("https://www.youtube.com/watch?v=gBvbOEXKApE <:Kappa:289121214339743744>");
				deletion(message);};break;
			case "dessin":case "dessins":case "modidessin":case "modiiedessin":effect = function(){//%[dessin aléatoire de Modiie] (le numéro voulu peut être précisé en paramètre)//%
				var modiieNum = (args[0] ? (parseInt(args[0]) - 1) : Math.floor(Math.random()*imgsDessin.length));
				message.channel.sendFile(config.imgs+"dessins/"+imgsDessin[modiieNum]);
				};break;
			case "unsub":case "desub":case "goprolo":effect = function(){//%[dessin unsub par Octophoque]//%
				message.channel.sendFile(config.imgs+"unsub.png");
				};break;
			case "pave":case "pavé":case "pavecesar":case "pavécesar":case "pavecésar":case "pavécésar":case "tldr":effect = function(){//%[dessin de pavé par Cow]//%
				message.channel.sendFile(config.imgs+"pave.png");
				deletion(message);};break;
			case "votemodiie":case "votemodiiie":case "votezmodiie":case "votezmodiiie":case "votermodiie":case "votermodiiie":effect = function(){//%[affiche de campagne de Modiie]//%
				message.channel.sendFile(config.imgs+"votezModiie.png");
				deletion(message);};break;
			case "modialien":case "alienmodiie":case "ufodiie":case "foreheadmodiie":effect = function(){//%[alien Modiie par Cow]//%
				message.channel.sendFile(config.imgs+"MODIIESANSFONDFAITDUSKIDEFOND.png");
				deletion(message);};break;
			case "modillumine":case "saintemodiie":case "modiiangel":effect = function(){//%[sainte Modiie par Cow]//%
				message.channel.sendFile(config.imgs+"MODIILLUMINEE.png");
				deletion(message);};break;
			case "modiiegame":case "playmodiie":case "raccoonplaysyou":case "raccoonplaysmodiie":case "racoonplaysyou":case "racoonplaysmodiie":effect = function(){//%[gif RacoonPlaysYou par Konoker]//%
				message.channel.sendMessage("https://cdn.discordapp.com/attachments/224158736573399040/304273330540642305/Racoon_plays_you.gif *("+message.author.username+")*");
				deletion(message);};break;
			case "france":case "fronse":case "fronce":case "carte":case "map":case "cartefrance":case "cartefronce":case "cartefronse":effect = function(){//%[carte de la Fronse par Fritte7 et RakWraithraiserJahad]//%
				message.channel.sendMessage("https://cdn.discordapp.com/attachments/224158736573399040/314157035799314432/fronse.png *("+message.author.username+")*");
				deletion(message);};break;

			case "say":case "meme":case "parler":case "parle":effect = function(){//%[phrase aléatoire parmi : "${config.say.join("\", \"")}"] (le numéro voulu peut être précisé en paramètre)//%
				var modiieNum = (args[0] ? (parseInt(args[0]) - 1) : Math.floor(Math.random()*config.say.length));
				if(modiieNum==26){
					var smileyList = [":thinking:","<:Kappa:289121214339743744>",":sob:",":joy:",":nauseated_face:","<:malaise:304775433768009728>",":facepalm:",":smirk:",":slight_smile:",":neutral_face:",":stuck_out_tongue_winking_eye:",":flushed:",":rofl:","<:modiRage:226775322979205120>"];
					modiieNum = Math.floor(Math.random()*smileyList.length);
					message.channel.sendMessage(config.say[26]+" "+smileyList[modiieNum]);
				}else{
					message.channel.sendMessage(config.say[modiieNum]);
				}
				deletion(message);};break;
			case "addmodiie":effect = function(){//%[ajoute le texte en paramètre aux citations de Modiie] (utilisation : ${config.prefix}addModiie citation)//%
				addCitation(args.join(" "),"Modiie",message);
				deletion(message);};break;
			case "addcitation":effect = function(){//%[ajoute le texte en paramètre aux citations de l'auteur (nommé, sans espace dans son nom, **avant** le texte de la citation)] (utilisation : ${config.prefix}addCitation auteur citation)//%
				addCitation(args.slice(1).join(" "),args[0],message);
				deletion(message);};break;

			case "octo":case "decoupeocto":case "decoupephoque":case "decoupeoctophoque":case "découpeocto":case "découpephoque":case "découpeoctophoque"://%[gif découpage de phoque par Cow]//%
				message.channel.sendFile(config.imgs+"octo_coupe.gif");
				deletion(message);break;
			case "repareocto":case "reparephoque":case "repareoctophoque":case "répareocto":case "réparephoque":case "répareoctophoque":case "recolleocto":case "recollephoque":case "recolleoctophoque"://%[gif du phoque recousu par Cow]//%
				message.channel.sendFile(config.imgs+"reparocto.gif");
				deletion(message);break;
			case "fuzhyon":case "decoupefuzhyon":case "decoupelapin":case "découpefuzhyon":case "découpelapin"://%[émote du lapin découpé par Cow]//%
				message.channel.sendMessage("<:lapin:293503592298446848>");
				deletion(message);break;
			case "misty":case "talent":case "mistycat":case "mistychat":case "boubou"://%[dessin de chat par Misty] (un 2 en paramètre affichera l'autre chat, un 3 la vache)//%
				switch(args[0]){
					case "2":
						message.channel.sendFile(config.imgs+"miaou.png");
						break;
					case "3":
						message.channel.sendFile(config.imgs+"meuh.png");
						break;
					default:
						message.channel.sendFile(config.imgs+"talent.png");
				}
				deletion(message);break;
			case "fritte7":case "frite":case "frites":case "fritte":case "frittes"://%[dessin de Fritte7 par Misty] (un 2 en paramètre affichera la maxi_frite)//%
				switch(args[0]){
					case "2":
						message.channel.sendFile(config.imgs+"Maxi_frite.png");
						break;
					default:
						message.channel.sendFile(config.imgs+"CapFritte.png");
				}
				deletion(message);break;
			case "tetefuzhyon":case "tetelapin":case "rabbithead"://%[émote de la tête de lapin coupée par Cow]//%
				message.channel.sendFile(config.imgs+"tetedelapin.png");
				deletion(message);break;
			case "thinking"://%[une émote thinking parmi les ${imgsThinking.length} disponibles]//%
				var modiieNum = (args[0] ? parseInt(args[0]) : Math.floor(Math.random()*(imgsThinking.length+1)))-1;
				if(modiieNum<0){
					message.channel.sendMessage(":thinking:");
				}else{
					message.channel.sendFile(config.imgs+"thinkings/"+imgsThinking[modiieNum]);
				}
				deletion(message);break;
			case "pof":case "piece":case "coin":case "pileouface":case "pileface":case "monnaie":case "euro":case "thinkingeuro":case "thinkeuro":case "ratoneuro":case "euroraton"://%[euro-thinking (pile) de Konoker ou euro-ratonie (face) de Vambok, à probabilités égales]//%
				var modiieNum = Math.random();
				if(modiieNum<0.475){
					message.channel.sendFile(config.imgs+"pile.png");
				}else if(modiieNum<0.95){
					message.channel.sendFile(config.imgs+"face.png");
				}else{
					message.channel.sendFile(config.imgs+"tranche.png");
				}
				break;
			case "ah":case "zrtah"://%[émote Ah de Denis Brognart]//%
				message.channel.sendFile(config.imgs+"ah.png");
				deletion(message);break;
			case "sob":case "pleurebb":case "pleure"://%[émote pleurebb par Octophoque]//%
				message.channel.sendFile(config.imgs+"pleurebb.png");
				deletion(message);break;
			case "joy":case "pleurepas":case "pleurepasbb"://%[émote pleurepasbb par Octophoque]//%
				message.channel.sendFile(config.imgs+"pleurepasbb.png");
				deletion(message);break;
			case "facepalm":case "face_palm":case "fp"://%[une émote aléatoire parmi les facepalm de Cow et d'Octophoque]//%
				message.channel.sendFile(config.imgs+((Math.random()<0.5) ? "fp.png" : "facepalm.png"));
				deletion(message);break;
			case "rage":case "jpp":case "enerve"://%[émote énervée par Cow]//%
				message.channel.sendFile(config.imgs+"jpp.png");
				deletion(message);break;
			case "roue":case "cartwheel":case "acrobate":case "acrobatie"://%[émote roue par Octophoque]//%
				message.channel.sendFile(config.imgs+"roue.png");
				deletion(message);break;
			case "pasmarrant":case "unamused":case "notfunny"://%[dessin ...unamused par Octophoque]//%
				message.channel.sendFile(config.imgs+"pasmarrant.png");
				deletion(message);break;
			case "zboub":case "zbub":case "zbubzbub":case "zbub_zbub"://%[dessin de souris zbub_zbub par Misty] (un 2 en paramètre affichera celle avec une bulle, un 3 celle qui pète, un 4 celle qui pète sans texte)//%
				switch(args[0]){
					case "2":
						message.channel.sendFile(config.imgs+"zbub_zbub2.png");
						break;
					case "3":
						message.channel.sendFile(config.imgs+"zbub_v2.png");
						break;
					case "4":
						message.channel.sendFile(config.imgs+"zbub_v3.png");
						break;
					default:
						message.channel.sendFile(config.imgs+"zbub_zbub.png");
				}
				deletion(message);break;
			case "cow":case "vache":case "tetecow":case "cowhead":case "tetevache"://%[dessin de vache par Cow]//%
				message.channel.sendFile(config.imgs+"cow.png");
				deletion(message);break;
			case "reboot":case "modireboot":case "modiiereboot"://%[émote Modiie reboot]//%
				message.channel.sendFile(config.imgs+"modiReboot.png");
				deletion(message);break;
			case "issou":case "risitas"://%[émote issou de la chaine Twitch Pantoufl]//%
				message.channel.sendFile(config.imgs+"issou.png");
				deletion(message);break;
			case "notlikethis":case "nlt"://%[émote NotLikeThis de Twitch]//%
				message.channel.sendFile(config.imgs+"notlikethis.png");
				deletion(message);break;
			case "chaton":case "chat":case "potitchat":case "potit_chat"://%[émote de potit chat]//%
				message.channel.sendFile(config.imgs+"chaton.png");
				deletion(message);break;
			case "pig":case "cochon":case "pighero":case "herocochon"://%[émote cochon par Fritte7]//%
				message.channel.sendFile(config.imgs+((Math.random()<0.9) ? "pigHero.png" : "pigHeroGlasses.png"));
				deletion(message);break;
//commandesbotbalise
			default:if(message.author.id === "152901292090458113"){switch(commande){
				case "allthinkings":
					message.channel.sendFile(config.imgs+"allthinking.png");
					break;
				case "thinkings":case "nbthinking":case "nbthinkings":
					if(!actualMessage){
						nbthinking = 0;
						nbthinkingreac = 0;
						messagesAnalyses = 0;
						if(!data.hasOwnProperty(message.channel.id)){data[message.channel.id]={"nbThinking":0,"nbThinkingReac":0,"lastMessageId":"0","nbMessages":0};}
						message.channel.sendMessage("Début du scan...").then(function(messageLog){actualMessage=messageLog;compteurThinking(messageLog);},function(raison){console.log(raison);}).catch(console.error);
						message.channel.sendFile(config.imgs+"littleCopter.gif");
					} else {
						message.channel.sendMessage("Désolé je suis en pleine introspection, veuillez réessayer dans quelques secondes.");
					}
					break;
				case "toto":
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
					break;
				case "cite":case "modiie":
					var modiieNum = (args[0] ? (parseInt(args[0]) - 1) : Math.floor(Math.random()*citations.length));
					if(citations[modiieNum]){
						message.channel.sendMessage("Citation n°"+(modiieNum+1)+" : \""+citations[modiieNum].citation+"\" "+citations[modiieNum].author+citations[modiieNum].date+" *("+message.author.username+")*");
					}else{
						message.reply("Il n'y a pas "+(modiieNum+1)+" citations, ne fais pas l'enfant.");
					}break;
				case "delete":case "erase":case "suppr":if(args[0]){
					message.channel.fetchMessage(args[0]).then(function(cible){
						console.log("DELETED "+cible.author.username+"'s message: "+cible.content);
						cible.delete();
					},function(raison){console.log(raison);}).catch(console.error);}
					break;
				case "refresh":
					if(args[0]==="D"){
						imgsDessin = fs.readdirSync(config.imgs+"dessins/");
					}else{
						imgsThinking = fs.readdirSync(config.imgs+"thinkings/");
					}break;
				default:
					return;
			}deletion(message);}
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
				deletion(message);
			}
		}
	}
});
function deletion(message){
	var d = new Date();
	console.log(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" "+message.author.username+": "+message.content);
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
	actualMessage = null;
}

function createHelp(message,param){
	if(param<0){
		message.channel.sendMessage("Avec un \""+config.prefix+"\" je peux danser, twerker, réfléchir, vous montrer des dessins et parler comme vous !\r\nLa commande "+config.prefix+"help admet maintenant un paramètre permettant d'obtenir plus de détails en MP (1 : liste complète, 2 : + les alias de chaque commande, 3 : + description de chaque commande) *("+message.author.username+")*");
	} else if(!actualMessage){
		messagesAnalyses = param;
		actualMessage = message;
		fs.readFile('bot2.js', (err, data) => {if (err) throw err;
			console.log("The file was read!");
			var helpText = [""];
			var indice = 0;
			data.toString('utf8').split("//commandesbotbalise")[1].split("\r\n\t\t\tcase \"").slice(1).forEach(function(x){
				var aliases = [];
				var arr = x.split("\":case \"");
				for(var i=0;i<arr.length-1;i++){
					aliases.push(arr[i]);
				}
				arr = arr[arr.length-1].split("\":");
				aliases.push(arr[0]);
				var addedtext = config.prefix+aliases[0];
				if(messagesAnalyses>0){
					addedtext += (aliases.length>1 ? " (ou "+aliases[1] : "");
					for(var i=2;i<aliases.length;i++){addedtext += ", "+aliases[i];}
					addedtext += (aliases.length>1 ? ")" : "") + ((arr[1].indexOf("//%")>-1 && messagesAnalyses>1) ? " : "+eval("`"+arr[1].split("//%")[1]+"`")+"\r\n" : "\r\n");
				} else {
					addedtext += ", ";
				}
				if(helpText[indice].length + addedtext.length < 2001){
					helpText[indice] += addedtext;
				} else {
					if(messagesAnalyses==0){helpText[indice] = helpText[indice].slice(0,-2);}
					indice++;
					helpText[indice] = addedtext;
				}
			});
			if(messagesAnalyses==0){helpText[indice] = helpText[indice].slice(0,-2);}
			for(var i=0;i<helpText.length;i++){
				actualMessage.author.sendMessage(helpText[i]);
			}
			actualMessage = null;
		});
	} else {
		message.author.sendMessage("Désolé je suis en pleine introspection, veuillez réessayer dans quelques secondes.");
	}
}

function httpGet(theUrl,premiermess){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	xmlHttp.setRequestHeader("Authorization","Bot "+config.token);
	xmlHttp.send({"after":premiermess,"limit":100});
	return xmlHttp.responseText;
}

bot.login(config.token);
