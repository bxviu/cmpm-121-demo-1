import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const upgradeMenu: HTMLDivElement = document.createElement("div");
upgradeMenu.id = "upgradeMenu";
const stats: HTMLDivElement = document.createElement("div");
stats.id = "stats";

const game: HTMLDivElement = document.createElement("div");
game.id = "game";

const gameName = "Sand Collector 🏖️";

document.title = gameName;

const header = document.createElement("h1");
header.id = "game-title";
header.innerHTML = gameName;
app.append(header, game);

game.append(upgradeMenu, stats);

let num: number = 0;
const count = document.createElement("div");
stats.append(count);

const autoclickerDisplay = document.createElement("div");
stats.append(autoclickerDisplay);

//manual clicking
const button = document.createElement("button");
button.innerHTML = "Collect Sand ⛱️";
stats.append(button);

button.addEventListener("click", () => {
  num++;
  updateUI();
});

const growthRate = document.createElement("div");
stats.append(growthRate);

interface autoclickers {
  cost: number;
  units: number;
  amount: number;
}

// handClicker
class handClicker implements autoclickers {
  cost: number;
  units: number;
  amount: number;
  disabled: boolean;
  name: string;
  description: string;
  constructor() {
    this.cost = 10;
    this.units = 0.1;
    this.amount = 0;
    this.disabled = true;
    this.name = "Hands 🤚";
    this.description =
      "Much better than the pair of tweezers you originally used.";
  }
}

const handData = new handClicker();

const handButton = document.createElement("button");
handButton.innerHTML = handData.name + "<br/>" + handData.description;
const handContainer = document.createElement("div");
const handDisplay = document.createElement("div");
handDisplay.innerHTML = `Cost: ${handData.cost.toFixed(2)} | Amount: ${
  handData.amount
}`;
upgradeMenu.append(handContainer);
handContainer.append(handButton);
handContainer.append(handDisplay);

handButton.addEventListener("click", () => {
  if (num < handData.cost) {
    return;
  }
  handData.amount++;
  num -= handData.cost;
  handData.cost = handData.cost * 1.15;
  updateUI();
});

//item 2
class spoonClicker implements autoclickers {
  cost: number;
  units: number;
  amount: number;
  disabled: boolean;
  name: string;
  description: string;
  constructor() {
    this.cost = 100;
    this.units = 2;
    this.amount = 0;
    this.disabled = true;
    this.name = "Spoon 🥄";
    this.description = "A spoon that can dig up sand.";
  }
}

const spoonData = new spoonClicker();

const spoonButton = document.createElement("button");
spoonButton.innerHTML = spoonData.name + "<br/>" + spoonData.description;
const spoonContainer = document.createElement("div");
const spoonDisplay = document.createElement("div");
spoonDisplay.innerHTML = `Cost: ${spoonData.cost.toFixed(2)} | Amount: ${
  spoonData.amount
}`;
upgradeMenu.append(spoonContainer);
spoonContainer.append(spoonButton);
spoonContainer.append(spoonDisplay);

spoonButton.addEventListener("click", () => {
  if (num < spoonData.cost) {
    return;
  }
  spoonData.amount++;
  num -= spoonData.cost;
  spoonData.cost = spoonData.cost * 1.15;
  updateUI();
});

//item 3
class shovelClicker implements autoclickers {
  cost: number;
  units: number;
  amount: number;
  disabled: boolean;
  name: string;
  description: string;
  constructor() {
    this.cost = 1000;
    this.units = 50;
    this.amount = 0;
    this.disabled = true;
    this.name = "Shovel ⚒️";
    this.description = "A shovel that can collect sand.";
  }
}

const shovelData = new shovelClicker();

const shovelButton = document.createElement("button");
shovelButton.innerHTML = shovelData.name + "<br/>" + shovelData.description;
const shovelContainer = document.createElement("div");
const shovelDisplay = document.createElement("div");
shovelDisplay.innerHTML = `Cost: ${shovelData.cost.toFixed(2)} | Amount: ${
  shovelData.amount
}`;
upgradeMenu.append(shovelContainer);
shovelContainer.append(shovelButton);
shovelContainer.append(shovelDisplay);

shovelButton.addEventListener("click", () => {
  if (num < shovelData.cost) {
    return;
  }
  shovelData.amount++;
  num -= shovelData.cost;
  shovelData.cost = shovelData.cost * 1.15;
  updateUI();
});

let start: number | undefined;

function step() {
  if (start === undefined) {
    start = performance.now();
  }
  const elapsed = performance.now() - start;

  if (elapsed > 1000) {
    start = undefined;
    if (handData.amount || spoonData.amount || shovelData.amount) {
      num += calculateGrowthRate();
      updateUI();
    }
  }

  if (!handButton.disabled && num < handData.cost) {
    handButton.disabled = true;
  } else if (handButton.disabled && num >= handData.cost) {
    handButton.disabled = false;
  }

  if (!spoonButton.disabled && num < spoonData.cost) {
    spoonButton.disabled = true;
  } else if (spoonButton.disabled && num >= spoonData.cost) {
    spoonButton.disabled = false;
  }

  if (!shovelButton.disabled && num < shovelData.cost) {
    shovelButton.disabled = true;
  } else if (shovelButton.disabled && num >= shovelData.cost) {
    shovelButton.disabled = false;
  }

  window.requestAnimationFrame(step);
}

updateUI();
window.requestAnimationFrame(step);

function updateUI() {
  // format number to 1 decimal place
  count.innerHTML = `Grains of Sand 🏝️: ${num.toFixed(2)}`;
  growthRate.innerHTML = `Growth Rate: ${calculateGrowthRate().toFixed(1)}/sec`;
  handDisplay.innerHTML = `Cost: ${handData.cost.toFixed(2)}<br/>Amount: ${
    handData.amount
  }`;
  spoonDisplay.innerHTML = `Cost: ${spoonData.cost.toFixed(2)}<br/>Amount: ${
    spoonData.amount
  }`;
  shovelDisplay.innerHTML = `Cost: ${shovelData.cost.toFixed(2)}<br/>Amount: ${
    shovelData.amount
  }`;
}

function calculateGrowthRate() {
  return (
    handData.amount * handData.units +
    spoonData.amount * spoonData.units +
    shovelData.amount * shovelData.units
  );
}
