//Import fs
const fs = require("fs");
//Import fastify
const fastify = require("fastify")();
//Importing coinCount from p3-module.js
const { coinCount, coins } = require("./p3-module.js");
const http = require("http");
const hostname = "127.0.0.1";
const port = 8080;

fastify.get("/", (request, reply) => {
  let fileLocationOfHomePage = __dirname + "/index.html";
  fs.readFile(fileLocationOfHomePage, (err, data) => {
    if (err) {
      console.log("ERROR!");
      reply
        .code(500)
        .header("Content-type", "text/html; charset=utf-8")
        .send("ERROR");
    } else {
      reply
        .code(200)
        .header("Content-type", "text/html; charset=utf-8")
        .send(data);
    }
  });
});
//Coin route
fastify.get("/coin", (request, reply) => {
  const { denom = 0, count = 0 } = request.query;
  let coin = {
    denom: parseInt(denom),
    count: parseInt(count),
  };
  //const coinage = denom && count ? [{denom, count}] : console.log("Error, missing values");
  const coinValue = coinCount(coin);
  console.log(denom, count);
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

// Coins route
fastify.get("/coins", (request, reply) => {
    let { option } = request.query;
    //some sort of switch statement
    let coinValue = "";
    switch(option) {
        case "1":
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
            case "2":
                coinValue = coinCount(...coins);
            break;
            case "3":
                coinValue = coinCount(coins);
            break;

    }
    //coinCount expressions
    
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(
        `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
      );
  });
  

//Fastify listening
const listenIP = "localhost";
fastify.listen(port, listenIP, () => {
  console.log(`Server listening on http://${listenIP}:${port}`);
});
