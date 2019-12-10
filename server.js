const weather = require('openweather-apis');
const express = require('express');
const app = express();

weather.setLang('en');

weather.setAPPID('b77e07f479efe92156376a8b07640ced');

app.get('/', async (req, res) =>{

    const { city, lat, long } = req.query;

    if (city){

        weather.setCity(city);

        weather.getTemperature(function(err, temp){
            if(err){
                console.log(err);
            }else{
                console.log(temp);
            }
        });
        
    } else{
        
        weather.setCoordinate(lat, long);
        
        weather.getTemperature(function(err, temp){
            if(err){
                console.log(err);
            }else{
                console.log(temp);
            }
        });
    }

    res.json();
});

app.listen(1001);