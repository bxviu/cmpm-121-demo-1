import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🦐🦐🦐 Shrimple Game 🦐🦐🦐";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num: number = 0;
const count = document.createElement("div");
// count.innerHTML = `Number of 🐚 : ${num}`;
app.append(count);

interface autoclickers {
  cost: number;
  units: number;
  amount: number;
}

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
    this.name = "Crab";
  }
}

const crabData = new crab();
const growthRate = document.createElement("div");
// growthRate.innerHTML = `Number of 🦀 : ${crabData.amount}`;
app.append(growthRate);

const button = document.createElement("button");
button.innerHTML = "Shromp 🦐";
app.append(button);

button.addEventListener("click", () => {
  button.innerHTML =
    button.innerHTML === "Shromp 🦐" ? "Shrompled 🦐" : "Shromp 🦐";
  num++;
  count.innerHTML = `Number of 🐚 : ${num}`;
});

const crabHelper = document.createElement("button");
crabHelper.innerHTML = "Crab Helper 🦀";
app.append(crabHelper);

crabHelper.addEventListener("click", () => {
  if (num < crabData.cost) {
    return;
  }
  crabData.amount++;
  num -= crabData.cost;
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
    if (crabData.amount > 0) {
      button.innerHTML =
        button.innerHTML === "AutoShromp 🦐"
          ? "AutoShromped 🦐"
          : "AutoShromp 🦐";
      num += crabData.units;
      updateUI();
    }
  }

  if (!crabHelper.disabled && num < 10) {
    crabHelper.disabled = true;
  } else if (crabHelper.disabled && num >= 10) {
    crabHelper.disabled = false;
  }

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

function updateUI() {
  // format number to 2 decimal places
  count.innerHTML = `Number of 🐚 : ${num.toFixed(1)}`;
  growthRate.innerHTML = `Growth Rate: ${crabData.amount}`;
}
