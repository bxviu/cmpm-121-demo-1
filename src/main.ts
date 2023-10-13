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
const collectButton = document.createElement("button");
collectButton.innerHTML = "Collect Sand ⛱️";
stats.append(collectButton);

collectButton.addEventListener("click", () => {
  num++;
  updateUI();
});

const growthRate = document.createElement("div");
stats.append(growthRate);

interface Item {
  name: string;
  cost: number;
  rate: number;
  amount: number;
  description: string;
  htmlData?: {
    button?: HTMLButtonElement;
    display?: HTMLDivElement;
    container?: HTMLDivElement;
  };
}

const availableItems: Item[] = [
  {
    name: "Hands 🤚",
    cost: 10,
    rate: 0.1,
    amount: 0,
    description: "Much better than the pair of tweezers you originally used.",
  },
  {
    name: "Spoon 🥄",
    cost: 100,
    rate: 2,
    amount: 0,
    description: "A spoon that can dig up sand.",
  },
  {
    name: "Shovel ⚒️",
    cost: 1000,
    rate: 50,
    amount: 0,
    description: "A shovel that can collect sand.",
  },
];

availableItems.forEach((item) => {
  item.htmlData = {};
  item.htmlData.button = document.createElement("button");
  item.htmlData.button.innerHTML = item.name + "<br/>" + item.description;
  item.htmlData.container = document.createElement("div");
  item.htmlData.display = document.createElement("div");
  item.htmlData.display.innerHTML = `Cost: ${item.cost.toFixed(2)} | Amount: ${
    item.amount
  }`;
  upgradeMenu.append(item.htmlData.container);
  item.htmlData.container.append(item.htmlData.button);
  item.htmlData.container.append(item.htmlData.display);

  item.htmlData.button.addEventListener("click", () => {
    if (num < item.cost) {
      return;
    }
    item.amount++;
    num -= item.cost;
    item.cost = item.cost * 1.15;
    updateUI();
  });
});

let start: number | undefined;

function step() {
  if (start === undefined) {
    start = performance.now();
  }
  const elapsed = performance.now() - start;

  if (elapsed > 1000) {
    start = undefined;
    availableItems.forEach((item) => {
      if (item.amount > 0) {
        num += item.amount * item.rate;
      }
    });
    updateUI();
  }

  availableItems.forEach((item) => {
    const button = item.htmlData!.button!;
    if (!button.disabled && num < item.cost) {
      button.disabled = true;
    } else if (button.disabled && num >= item.cost) {
      button.disabled = false;
    }
  });

  window.requestAnimationFrame(step);
}

updateUI();
window.requestAnimationFrame(step);

function updateUI() {
  count.innerHTML = `Grains of Sand 🏝️: ${num.toFixed(2)}`;
  growthRate.innerHTML = `Growth Rate: ${calculateGrowthRate().toFixed(1)}/sec`;

  availableItems.forEach((item) => {
    item.htmlData!.display!.innerHTML = `Cost: ${item.cost.toFixed(
      2,
    )}<br/>Amount: ${item.amount}`;
  });
}

function calculateGrowthRate(): number {
  return availableItems.reduce(
    (total, item) => total + item.amount * item.rate,
    0,
  );
}
