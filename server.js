const weather = require('openweather-apis');
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
const app = express();

weather.setLang('en');

app.get('/', async (req, resp) =>{

    let { city, lat, lon } = req.query;
    let search;

    if (city){
        search = querystring.stringify({ q: encodeURIComponent(city) });

    }else if (lat && lon){
        search = querystring.stringify({ lat, lon });
    }

    let urlOpenWeather = `http://api.openweathermap.org/data/2.5/weather?${search}&units=metric&appid=b77e07f479efe92156376a8b07640ced`;

    try {

        const responseTemp =  await axios.get(urlOpenWeather);

        const { temp } = responseTemp.data.main;

        spotifyApi.

        resp.json({ temp });
        
    } catch (error) {

        const { response } = error;

        const errorStatus = !response ? 500 : response.status;
        const errorMessage = !response ? "Server error" : response.statusText;
        
        resp.sendStatus(errorStatus).send({ message: errorMessage }); 
    }

    resp.json();
});

app.listen(1001);