const SlackBot = require('slackbots');
const axios = require('axios');
const slackToken = require('./module');

const bot = new SlackBot({
	token : slackToken.slack_token,
	name  : 'WeatherBot'
});

bot.on('start', () => {
	const params = {
		icon_emoji : ':sunny:'
	};

	bot.postMessageToChannel('general', 'Get your local Weather, with @WeatherBot!', params);
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
	if (data.type !== 'message') {
		return;
	}
	handleMessage(data.text);
});

// Response to Data
function handleMessage (message) {
	if (message.includes(' weather')) {
		localWeather();
	}
}

// Get Local Weather
function localWeather () {
	axios.get('http://api.icndb.com/jokes/random').then((res) => {
		const joke = res.data.value.joke;

		const params = {
			icon_emoji : ':partly_sunny:'
		};

		bot.postMessageToChannel('general', `Weather Forecast: ${joke}`, params);
	});
}
