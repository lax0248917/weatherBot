const SlackBot = require('slackbots');
const axios = require('axios');
const slackToken = require('./module');
const apiKey = require('./module');

const bot = new SlackBot({
	token : slackToken.slack_token,
	name  : 'WeatherBot'
});

bot.on('start', () => {
	const icon = {
		icon_emoji : ':sunny:'
	};

	bot.postMessageToChannel('general', 'Get your local Weather, with @WeatherBot!', icon);
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

const params = {
	access_key : apiKey.api_key,
	query : 'Saint Joseph',
	units : 'f',
};

function localWeather () {
	axios.get('http://api.weatherstack.com/current', {params}).then((res) => {
		const currentTemp = res.data.current.temperature;
		const weatherCondition = res.data.current.weather_descriptions

		const icon = {
			icon_emoji : ':partly_sunny:'
		};

		bot.postMessageToChannel('general', `Current Forecast for Saint Joseph, Michigan is: ${weatherCondition} and ${currentTemp}`, icon);
	});
}
