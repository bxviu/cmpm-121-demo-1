import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🦐🦐🦐 Shrimple Game 🦐🦐🦐";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num: number = 0;
const count = document.createElement("div");
app.append(count);

const autoclickerDisplay = document.createElement("div");
app.append(autoclickerDisplay);

//manual clicking
const button = document.createElement("button");
button.innerHTML = "Shromp 🦐";
app.append(button);

button.addEventListener("click", () => {
  button.innerHTML =
    button.innerHTML === "Shromp 🦐" ? "Shrompled 🦐" : "Shromp 🦐";
  num++;
  updateUI();
});

const growthRate = document.createElement("div");
app.append(growthRate);

interface autoclickers {
  cost: number;
  units: number;
  amount: number;
}

// crab
class crab implements autoclickers {
  cost: number;
  units: number;
  amount: number;
  disabled: boolean;
  name: string;
  constructor() {
    this.cost = 10;
    this.units = 0.1;
    this.amount = 0;
    this.disabled = true;
    this.name = "Crab Helper 🦀";
  }
}

const crabData = new crab();

const crabHelper = document.createElement("button");
crabHelper.innerHTML = crabData.name;
app.append(crabHelper);

crabHelper.addEventListener("click", () => {
  if (num < crabData.cost) {
    return;
  }
  crabData.amount++;
  num -= crabData.cost;
  crabData.cost = crabData.cost * 1.15;
  updateUI();
});

//item 2
class crab2 implements autoclickers {
  cost: number;
  units: number;
  amount: number;
  disabled: boolean;
  name: string;
  constructor() {
    this.cost = 100;
    this.units = 2;
    this.amount = 0;
    this.disabled = true;
    this.name = "Crab Helper 2🦀";
  }
}

const crabData2 = new crab2();

const crabHelper2 = document.createElement("button");
crabHelper2.innerHTML = crabData2.name;
app.append(crabHelper2);

crabHelper2.addEventListener("click", () => {
  if (num < crabData2.cost) {
    return;
  }
  crabData2.amount++;
  num -= crabData2.cost;
  crabData2.cost = crabData2.cost * 1.15;
  updateUI();
});

//item 3
class crab3 implements autoclickers {
  cost: number;
  units: number;
  amount: number;
  disabled: boolean;
  name: string;
  constructor() {
    this.cost = 1000;
    this.units = 50;
    this.amount = 0;
    this.disabled = true;
    this.name = "Crab Helper 3🦀";
  }
}

const crabData3 = new crab3();

const crabHelper3 = document.createElement("button");
crabHelper3.innerHTML = crabData3.name;
app.append(crabHelper3);

crabHelper3.addEventListener("click", () => {
  if (num < crabData3.cost) {
    return;
  }
  crabData3.amount++;
  num -= crabData3.cost;
  crabData3.cost = crabData3.cost * 1.15;
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
    if (crabData.amount || crabData2.amount || crabData3.amount) {
      num += calculateGrowthRate();
      updateUI();
    }
  }

  if (!crabHelper.disabled && num < crabData.cost) {
    crabHelper.disabled = true;
  } else if (crabHelper.disabled && num >= crabData.cost) {
    crabHelper.disabled = false;
  }

  if (!crabHelper2.disabled && num < crabData2.cost) {
    crabHelper2.disabled = true;
  } else if (crabHelper2.disabled && num >= crabData2.cost) {
    crabHelper2.disabled = false;
  }

  if (!crabHelper3.disabled && num < crabData3.cost) {
    crabHelper3.disabled = true;
  } else if (crabHelper3.disabled && num >= crabData3.cost) {
    crabHelper3.disabled = false;
  }

  window.requestAnimationFrame(step);
}

updateUI();
window.requestAnimationFrame(step);

function updateUI() {
  // format number to 1 decimal place
  count.innerHTML = `Number of 🐚 : ${num.toFixed(2)}`;
  growthRate.innerHTML = `Growth Rate: ${calculateGrowthRate().toFixed(1)}/sec`;
  autoclickerDisplay.innerHTML = `Crab Helper 1: ${
    crabData.amount
  }, Cost: ${crabData.cost.toFixed(2)} | Crab Helper 2: ${
    crabData2.amount
  }, Cost: ${crabData2.cost.toFixed(2)} | Crab Helper 3: ${
    crabData3.amount
  }, Cost: ${crabData3.cost.toFixed(2)}`;
}

function calculateGrowthRate() {
  return (
    crabData.amount * crabData.units +
    crabData2.amount * crabData2.units +
    crabData3.amount * crabData3.units
  );
}
