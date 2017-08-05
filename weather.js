const https = require('https');
const keyId = '81d23a76145927d6';

function printWeather(weather) {
	const message = `Current Temperature in ${weather.current_observation.display_location.city} is ${weather.current_observation.temp_f} F `;
	console.log(message);

}

function getResponse(query) {
	const request = https.get(`https://api.wunderground.com/api/${keyId}/conditions/q/${query}.json`, (response) => {
		if(response.statusCode === 200) {
			let responseBody = "";

			response.on("data",(dataChunk) => {
				responseBody += dataChunk.toString();
			})

			response.on("end", () => {
				try {
					console.log(responseBody);
					const weather = JSON.parse(responseBody);
					printWeather(weather);
				} catch(error) {
					console.error(error.message)
				}
			});
		} else {
			console.error(response.statusCode);
		}
	});
}

module.exports.get = getResponse;