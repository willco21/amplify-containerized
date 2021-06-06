const express = require("express");
const bodyParser = require('body-parser');
const http = require('http');
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// すべてのメソッドに対し CORS を有効にする
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.get("/fizzbuzz", (req, res, next) => {
    const options = {
        port: 5000,
        host: 'localhost', // ローカル開発の場合は 'python' に置き換えます
        method: 'GET',
        path: '/random'
    };

    http.get(options, data => {
        var body = '';
        data.on('data', (chunk) => {
            body += chunk;
        });
        data.on('end', () => {
            console.log(body);
            const randomNumber = body
            let fizzOrBuzz = ''
            if (randomNumber % 15 === 0) {
                fizzOrBuzz = 'FizzBuzz'
            }
            else if (randomNumber % 3 === 0) {
                fizzOrBuzz = 'Fizz'
            }
            else if (randomNumber % 5 === 0) {
                fizzOrBuzz = 'Buzz'
            }
            else {
                fizzOrBuzz = randomNumber
            }

            try {
                res.contentType("application/json").send({
                    "newRandomNumber": body,
                    "fizzOrBuzz": fizzOrBuzz
                });
            } catch (err) {
                console.log(err);
                next(err);
            }
        }).on('error', (error) => {
            console.log(error);
        });
    })
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port);
});