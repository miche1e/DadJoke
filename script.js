const request = require("request");
const fs = require("fs");

if (process.argv[2]) {
    let options = {
        url: `https://icanhazdadjoke.com/search?term=${process.argv[2]}`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'My Library (https://github.com/miche1e/DadJoke)'
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.log(error);
        }
        let json = JSON.parse(body);
        if(json.total_jokes === 0){
            console.log("Jokes not found!");
        } else {
            let jokes = json.results;
            let output = jokes[Math.round(Math.random()) * (jokes.length - 1)].joke;
            fs.createWriteStream('jokes.txt').write(output);
        }
    });
} else {
    console.log("Insert an argument!");
}