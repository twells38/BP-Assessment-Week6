const express = require("express");
const bots = require("./src/botsData");
const shuffle = require("./src/shuffle");

const playerRecord = {
  wins: 0,
  losses: 0,
};
const app = express();
app.use(express.json());
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '6d7cd3b8af3f48da89f83d64ea343a5a',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


app.use(express.static(`public`))
app.use(express.static(`${__dirname}/public`))  // middleware just functions that run in between the request and the response.

// Add up the total health of all the robots
const calculateTotalHealth = (robots) =>
  robots.reduce((total, { health }) => total + health, 0);

// Add up the total damage of all the attacks of all the robots
const calculateTotalAttack = (robots) =>
  robots
    .map(({ attacks }) =>
      attacks.reduce((total, { damage }) => total + damage, 0)
    )
    .reduce((total, damage) => total + damage, 0);

// Calculate both players' health points after the attacks
const calculateHealthAfterAttack = ({ playerDuo, compDuo }) => {
  const compAttack = calculateTotalAttack(compDuo);
  const playerHealth = calculateTotalHealth(playerDuo);
  const playerAttack = calculateTotalAttack(playerDuo);
  const compHealth = calculateTotalHealth(compDuo);

  return {
    compHealth: compHealth - playerAttack,
    playerHealth: playerHealth - compAttack,
  };
};

app.get("/api/robots", (req, res) => {
  
  try {
    rollbar.info(`10 robot cards display : ${bots[0].name},${bots[1].name},${bots[2].name},${bots[3].name},${bots[5].name},${bots[6].name},${bots[7].name},${bots[8].name} , ${bots[9].name}`)
    res.status(200).send(bots); //edit to bots
  } catch (error) {
    console.error("ERROR GETTING BOTS", error);
    res.sendStatus(400);
  }
});

app.get("/api/robots/shuffled", (req, res) => {
  try {
    let shuffled = shuffle(bots);
    rollbar.info(`5 shuffled robot cards: "${shuffled[0].name},${shuffled[1].name},${shuffled[2].name},${shuffled[3].name},${shuffled[4].name} " after clicking draw button.`)
    res.status(200).send(shuffled);
  } catch (error) {
    console.error("ERROR GETTING SHUFFLED BOTS", error);
    res.sendStatus(400);
  }
});

app.post("/api/duel", (req, res) => {
  try {
    const { compDuo, playerDuo } = req.body;

    const { compHealth, playerHealth } = calculateHealthAfterAttack({
      compDuo,
      playerDuo,
    });

    // comparing the total health to determine a winner
    if (compHealth > playerHealth) {
      playerRecord.losses += 1;
      rollbar.info(`Player lost`)
      res.status(200).send("You lost!");
    } else {
      playerRecord.wins += 1;
      rollbar.info(`Player won`)
      res.status(200).send("You won!");
    }
  } catch (error) {
    rollbar.critical(`Error dueling`)
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    rollbar.info(`Player Record: "${playerRecord.wins} : ${playerRecord.losses}"`)
  res.status(200).send(playerRecord);
    
  } catch (error) {
    rollbar.critical(`Error getting player stats`)
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);
  }
});

app.listen(4000, () => {
  console.log(`Listening on 8000`);
});



