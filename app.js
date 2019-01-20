const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const id = 'c6e565efcb47a6';

let encodedAddress = encodeURIComponent(argv.address);
let geoCodeUrl =  `https://us1.locationiq.com/v1/search.php?key=${id}&q=${encodedAddress}&format=json`;

axios.get(geoCodeUrl)
    .then((res) => {
        let lat = res.data[0].lat;
        let lon = res.data[0].lon;
        let weatherUrl = `https://api.darksky.net/forecast/993767198788471901f2b816ee992b9a/${lat},${lon}`;
        
        console.log(`Your full input address ${res.data[0].display_name}`);
        console.log('-----------');

        return axios(weatherUrl);
    })
    .then((res) => {
        let temperature = res.data.currently.temperature;
        let apparentTemperature = res.data.currently.apparentTemperature;

        console.log(`The temperature is:  ${temperature} F`);
        console.log(`The apperent temperature is: ${apparentTemperature} F`);  
    })
    .catch((err) => {
        if (err.code === 'ENOTFOUND') {
            console.log('Unable to connect to API server');
        } else if (err.response.data.error == 'Unable to geocode') {
            console.log('Unable to fetch that address');
        } else {
            console.log(err.message);
        }
    })