import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🦐🦐🦐 Shrimple Game 🦐🦐🦐";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num: number = 0;
const count = document.createElement("div");
count.innerHTML = `Number of 🦐 Interactions : ${num}`;
app.append(count);

const button = document.createElement("button");
button.innerHTML = "Shromp 🦐";
app.append(button);

button.addEventListener("click", () => {
  button.innerHTML =
    button.innerHTML === "Shromp 🦐" ? "Shrompled 🦐" : "Shromp 🦐";
  num++;
  count.innerHTML = `Number of 🦐 Interaction : ${num}`;
});
