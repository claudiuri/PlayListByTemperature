const weather = require('openweather-apis');
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
const app = express();

weather.setLang('en');

weather.setAPPID('b77e07f479efe92156376a8b07640ced');

app.get('/', async (req, resp) =>{

    let { city, lat, lon } = req.query;
    let search;

    if (city){
        search = querystring.stringify({ q: encodeURIComponent(city) });

    }else if (lat && lon){
        search = querystring.stringify({ lat, lon });
    }

    let url = `http://api.openweathermap.org/data/2.5/weather?${search}&units=metric&appid=b77e07f479efe92156376a8b07640ced`;

    await axios.get(url)
        .then((res) => {
          resp.send(res.data);
        })
        .catch((err) => { resp.status(err.response.status).send({ message: err.response.statusText }) })

    resp.json();
});

app.listen(1001);