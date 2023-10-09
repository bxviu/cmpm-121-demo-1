import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🦐🦐🦐 Shrimple Game 🦐🦐🦐";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num: number = 0;
const count = document.createElement("div");
count.innerHTML = `Number of 🐚 : ${num}`;
app.append(count);

let crabHelpers: number = 0;
const crabDisplay = document.createElement("div");
crabDisplay.innerHTML = `Number of 🦀 : ${crabHelpers}`;
app.append(crabDisplay);

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
  if (num < 10) {
    return;
  }
  crabHelpers++;
  num -= 10;
  count.innerHTML = `Number of 🐚 : ${num}`;
  crabDisplay.innerHTML = `Number of 🦀 : ${crabHelpers}`;
});

let start: number | undefined;

function step() {
  if (start === undefined) {
    start = performance.now();
  }
  const elapsed = performance.now() - start;

  if (elapsed > 1000) {
    start = undefined;
    if (crabHelpers > 0) {
      button.innerHTML =
        button.innerHTML === "AutoShromp 🦐"
          ? "AutoShromped 🦐"
          : "AutoShromp 🦐";
      num += crabHelpers;
      count.innerHTML = `Number of 🐚 : ${num}`;
    }
  }

  if (!crabHelper.disabled && num < 10) {
    crabHelper.disabled = true;
  } else {
    crabHelper.disabled = false;
  }

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
