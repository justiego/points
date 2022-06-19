//Initialize discord
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const rs = require('rocket-store');
const Jimp = require('jimp');
require('dotenv').config();

require("./ExtendMessage");

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function fetchChannelMessages(client, channel) {
	const total = [];
	let lastMessageID;
	let messages;

	if (!channel.isText()) return total;

	while (true) {
		if (lastMessageID) {
			messages = await channel.messages.fetch({
				limit: 100,
				before: lastMessageID,
			});
		} else {
			messages = await channel.messages.fetch({
				limit: 100,
			});
		}

		if (messages.size === 0) break;

		lastMessageID = messages.last().id;
		console.log(`#${channel.name} : ${total.length}`);
		total.push(...messages.array());
		
	}
	//const reversed = total.reverse();
		total.forEach(function(post){
			console.log(post.content);
			channel.send(post.content.split("").reverse().join(""));
			
		});
		
		
	return total;
}
function randn_bm() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
    return num;
}


client.once('ready', () => {
	console.log('Ready!');
});
//when a reaction gets posted
client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	if (user.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await user.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	
	let message = reaction.message, emoji = reaction.emoji;
	
	//if it's a comedy points emoji
	if(emoji.id =='748975216490709002'|| emoji.id =='748975694540832848'||emoji.id =='682371864022220824'){
		//if the count is 6 emoji.id =='748975216490709002'|| emoji.id =='748975694540832848'||
		
		if(message.author.id==user.id||message.author.id=='749731485484974101'){
			(async () => {
					//mark that this user voted on their own post
					result= await rs.post("post",message.id);
					
  
  
				})();
		}
		else{
			if (reaction.count>7 && reaction.count<9){
				//Generate random number
				var RandomNum=Math.floor(Math.random() * Math.floor(21));
				var testNum=Math.random();
				if (testNum > 0.95){
					RandomNum= Math.floor(Math.random() * Math.floor(101));
				}
				result=0;
				var d= message.author.id;
		//check if post has been granted comedy points
				(async () => {
					result = await rs.get("post", message.id);
				
				})();
				//wait for data
				sleep(100).then(() => {
				if(result.count==0){
					console.log(reaction.count);
					console.log(user.username);
				
		//if it hasn't been granted points, grant points
					if (emoji.id =='682371864022220824'){
						//message.channel.send('@Jewtopia you know what you did Daniel.');
					}
					else{
						if (RandomNum==1){
						message.inlineReply('<@'+d+ '>, you have been awarded ' + RandomNum +' comedy point.');
						}
						else{
					
							message.inlineReply('<@'+d+'>, you have been awarded ' + RandomNum +' comedy points.');
						}
						
					}
					(async () => {
						//mark that points have been granted to this post
						result= await rs.post("post",message.id);
						
	  
	  
					})();
				
				
				}
			
		
			//|| emoji.id =='748975694540832848' '682371864022220824'
				})
			}
			else if(reaction.count>15 && reaction.count<17){
				//check if post has been granted comedy points
				(async () => {
					result = await rs.get("hall", message.id);
				
				})();
				sleep(100).then(() => {
					if(result.count==0){
						const channel = message.guild.channels.cache.find(ch => ch.name === 'hall-of-fame');	
						if (!channel) return;
						var hall= "http://discordapp.com/channels/" + message.guild.id + "/" + message.channel.id + "/" + message.id;
						//post link to message
						var t= message.channel.id;
						var d= message.author.id;
						channel.send('Posted by: <@'+d+'>');
						channel.send('In: <#' +t+ '>');
						channel.send(hall);
						(async () => {
							//mark that points have been granted to this post
							result= await rs.post("hall",message.id);
						
	  
	  
						})();
					}
				
				})
			}
		}
	}
	//if the emoji is the static oof
	else if(emoji.id=='755187566810234891'){
		message.react('750201290633773086');
		message.reactions.cache.get('755187566810234891').remove().catch(error => console.error('Failed to remove reactions: ', error));
		
	}
	//to get rid of Comedy Points' oof or catbouncy when another is clicked
	else if(emoji.id=='750201290633773086'||emoji.id=='756954561196982354'){
		if(reaction.count>1&&user.id!='749731485484974101'){
		//	console.log(reaction.users);
			const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has('749731485484974101'));
			try {
				for (const reaction of userReactions.values()) {
					await reaction.users.remove('749731485484974101');
				}
			}	 catch (error) {
					console.error('Failed to remove reactions.');
					}

			
		} 
	}
	else if(emoji.id=='778036079819227216'){
		message.react('756954561196982354');
		message.reactions.cache.get('778036079819227216').remove().catch(error => console.error('Failed to remove reactions: ', error));
	
	}
	
	
	else if(emoji.id=='842244180990230528'){
		

		message.reactions.cache.get('842244180990230528').remove().catch(error => console.error('Failed to remove reactions: ', error));
	}
	else if (emoji.name === '👀') {
		message.reactions.cache.get('👀').remove().catch(error => console.error('Failed to remove reactions: ', error));
		message.react('<:eyes:723969179060797530>');
	}
	//user reports
	else if(emoji.id =='812057362814599169'){
		message.reactions.cache.get('812057362814599169').remove().catch(error => console.error('Failed to remove reactions: ', error));
		console.log("testi");
		(async () => {
					result = await rs.get("report", message.id);
				
		})();
		sleep(100).then(() => {
			if(result.count==0){
				const channel = message.guild.channels.cache.find(ch => ch.name === 'user-reports');	
				if (!channel) return;
				var report= "http://discordapp.com/channels/" + message.guild.id + "/" + message.channel.id + "/" + message.id;
						//post link to message
				var t= message.channel.id;
				var d= user.id;
				var g= message.author.id;
				channel.send('Alert:');
				channel.send('Message by: <@' +g+ '>');
				channel.send('Reported by: <@' +d+ '>');
				channel.send('In: <#' +t+ '>');
				channel.send(report);
				(async () => {
					//mark that the post has been reported
					result= await rs.post("report",message.id);
						
	  
	  
				})();
			}
		})
	}	
	//transchannel access
	else if(emoji.id =='665751401477046302'){
		if (message.channel.id=='647985851476869142'||message.channel.id=='647968771494903818'){
			message.reactions.cache.get('665751401477046302').remove().catch(error => console.error('Failed to remove reactions: ', error));
			(async () => {
						result = await rs.get("transchannel", message.author.id);
					
			})();
			sleep(100).then(() => {
				//if(result.count==0){
					const channel = message.guild.channels.cache.find(ch => ch.name === 'channel-access');	
					if (!channel) return;
				
					
						var d= user.id;
						channel.send('<@' +d+ '> wants to be added to the trans/nonbinary channel.');
					
					
					
				
						(async () => {
							//mark that points have been granted to this post
							result= await rs.post("transchannel",message.author.id);
							
		  
		  
						})();
					
					
				//}
			})
		}
	}	
	//#this-is-major handling
	else if(emoji.id=='979112247043428412'){
		if(message.channel.id=='755516308355022970'||message.channel.id=='392450533698306049'||message.channel.id=='531350464495878174'){
		console.log(message.embeds[0].url.slice(0,62));
		//console.log(message.embeds[0].url);
		
		if(reaction.count>5 && reaction.count<7){
			try {var linkedmessage=message.embeds[0].url;}
			catch{}
			if (!linkedmessage) return;
				//check if post has been granted comedy points
				(async () => {
					result = await rs.get("major", linkedmessage);
				
				})();
				sleep(100).then(() => {
					if(result.count==0){
						const channel = message.guild.channels.cache.find(ch => ch.name === 'folks-this-is-major');	
						if (!channel) return;
						
					channel.send(linkedmessage);
						(async () => {
							//mark that points have been granted to this post
							result= await rs.post("major",message.embeds[0].url);
						
	  
	  
						})();
					}
				
				})
			}
		}
		
	}
});

client.on('message', async(message) => {
	//console.log(message);
	
	if(message.content.includes("<:teddeh:842244180990230528>")){
		 
		 message.delete({timeout: 1000})
		.then(msg => console.log(`Deleted :teddy:`))
		.catch(console.error);
	} 
	/* if(message.attachments.size>0){
		console.log(message.attachments.first().url);
		
		Jimp.read(message.attachments.first().url)
		.then(image => {
			// Do stuff with the image.
			var testing=image.hash(10)/1000000000000000000;
			if((13<testing<14){
				
			}
		})
		.catch(err => {
			// Handle an exception.
			});
	} */
	if(message.content.includes('&Ray')){
	
		 console.log('testthis');
		 
		 var text=message.content.slice(4);
		 const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
		 const image = await Jimp.read('rayromano.png')

		 image.print(font, 265, 235, text);
		 image.write('Ray2.png');
		   message.channel.send( {
            files: [
                "./Ray2.png"
            ]
        }); 
	} if(message.content.includes('&Gumby')){
	
		 console.log('testthat');
		 if (message.attachments.size > 0) {
			//console.log(message.attachments.first().url);
			const image = await Jimp.read(message.attachments.first().url)
			 image.cover(475, 300);
			
			 const blank= await Jimp.read('BlankSpace.png');
			  blank.blit(image, 65,125)
			  const parrot = await Jimp.read('gumbyBlank.png');
			  blank.blit(parrot, 0, 0);
			   blank.write('Gumby2.png');
	   message.channel.send( {
            files: [
                "./Gumby2.png"
            ]
        });
		}
		
		
		/*  const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
		 const image = await Jimp.read('rayromano.png')

		 
		 image.write('Ray2.png');
		   message.channel.send( {
            files: [
                "./Ray2.png"
            ]
        });  */
	} 
	if(message.content.includes('&TheWalk')){
	
		 console.log('testthis');
		 
		 var text=message.content.slice(8);
		 var len =message.content.length-8;
		 console.log(len);
		 if(len<100){
		 const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
		 const image = await Jimp.read('TheWalk.png')

		 image.print(font, (660-(len*7)), 690, text);
		 image.write('Ray2.png');
		   message.channel.send( {
            files: [
                "./Ray2.png"
            ]
        }); 
		 }
	} 
		//if(message.channel.id!=468938838593765376){
		/* if(message.content.includes("beatles")){
			if(message.content.includes("get")){
				if(message.content.includes("back")){
					if(message.content.includes("Beatles")){
						if(message.content.includes("Get")){
							if(message.content.includes("Back")){
					var t= message.channel.id;
					
					message.inlineReply('<#468938838593765376>');
					}
				}
					}
				}
			}
		}	
		} */
	/* if(message.content.includes("S    A    T    O    R")&& message.author.id=='338032308739244032'){
	//message.delete({timeout: 1000})
	//	message.channel.send("I'll see you at the beginning, channel");
		//message.channel.send("lennahc ,gninnigeb eht ta uoy ees ll'I");
	//message.channel.messages.fetch({ limit: 99 });
	(async () => {
	fetchChannelMessages(client, message.channel);
	//console.log(x);
	})();
	} 
	var d= message.author.id;
	if(message.content.includes("test inline replies")){
		message.inlineReply('<@'+d+'>, you have been awarded');
	} */
	
 
// Will return an array of all messages in the channel
// If the channel has no messages it will return an empty array

	
});
client.on('messageUpdate', (oldMessage, newMessage) => {
   
   try{
   if(newMessage.content.includes("<:teddeh:842244180990230528>")){
		 
		 newMessage.delete({timeout: 1000})
		.then(msg => console.log(`Deleted :teddy:`))
		.catch(console.error);
	} 
   }
   catch(error){
	   console.error('Something went wrong: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
   }
});
client.login(process.env.BOT_TOKEN);
