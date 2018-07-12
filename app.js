var Twit = require('twit');
var config = require('./config');

var bot = new Twit(config);

setInterval(getTweets, 60 * 1000 * 5); //every 5 minutes


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTweets(){

	bot.get('search/tweets', { q: '"coding books"', count: 5, tweet_mode: 'extended', lang: 'en'}, function(err, data, response) {

  		for(var i = 0; i < 5; i++){
  			var tweet = data.statuses[i].full_text;
  			if(tweet.substring(0, 2) != "RT"){
  				var id = data.statuses[i].id_str;
  				console.log(tweet);
  				reTweet(id);
  			}
  		}
	});
}


function reTweet(tweetId){
	bot.post('statuses/retweet/' + tweetId, function(err, data, response){
		if(err){
			console.log(err);
		}
	});

}


