const request = require('request');



const url = 'https://api.darksky.net/forecast/852a20df836cfd5323551208dcdec73e/37.8267,-122.4233?units=si&lang=de';

// request({ url, json: true }, (err, response) => {

//     if (err) {

//         console.log('Unable to connect to weather service')
//     } else if (response.body.error){

//         console.log('Unable to conect to weather service!')
//     } else {

//         const { temperature, precipProbability} = response.body.currently

//         console.log(` ${response.body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)


//     }


//     }


// );


const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/852a20df836cfd5323551208dcdec73e/${latitude},${longitude}?units=si`;

    request({url, json: true }, (err, response) =>{

        if(err){

            callback('Unable to connect to weather service', undefined);
        } else if(response.body.error){

            callback('Unable to find location', undefined);

        } else {

            const { temperature, precipProbability, humidity, windSpeed} = response.body.currently

            const result = ` ${response.body.daily.data[0].summary} It is currently ${temperature} degrees outside. There is a ${precipProbability}% chance of rain. The humidity and wind speed are ${humidity} and ${windSpeed} respectively.`


            callback(undefined, result);
        }

    })





}




module.exports = forecast