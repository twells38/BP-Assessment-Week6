//selenium test

const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

//start automated testing
describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });
  test("clicking the draw button displays the div with id = 'choices'", async () => {
    await driver.get("http://localhost:8000");
    await driver.findElement(By.id("draw")).click();
    //wait until the robots cards appears 
    expect(await driver.findElement(By.id("choices")))
    
  });
  test("clicking an “Add to Duo” button displays the div with id = “player-duo”", async () => {
    await driver.get("http://localhost:8000");
    await driver.findElement(By.id("draw")).click();
    await driver.findElement(By.className("bot-btn")).click();
    expect(await driver.findElement(By.id("player-duo")))
  })
  test("when a bot is “Removed from Duo”, that it goes back to “choices”", async() => {
    await driver.get("http://localhost:8000");
    await driver.findElement(By.id("draw")).click();
    await driver.findElement(By.className('bot-btn')).click();
    expect(await driver.findElement(By.id("choices")))
    
  })
});


// Check that clicking the Draw button displays the div with id = “choices”
// Check that clicking an “Add to Duo” button displays the div with id = “player-duo”
// Check that when a bot is “Removed from Duo”, that it goes back to “choices”

