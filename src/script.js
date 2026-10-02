// @ts-check

import { Planet } from "./scripts/planet.js";
import { System } from "./scripts/system.js";

const system = new System();
let paused = true;
let timer = 0;

document.addEventListener("click", (ev) => {
  if (!paused) return;

  const x = ev.pageX;
  const y = ev.pageY;

  for (const p of system.planets) {
    // don't spawn planets too close together
    if (Math.abs(p.pos.x - x) < 48 && Math.abs(p.pos.y - y) < 48) return;
  }

  const mass = Math.random() * 1e3;

  const planet = new Planet(mass, x, y);
  planet.addEventListener("contextmenu", (ev) => {
    if (!paused) return;

    if (!ev.ctrlKey) {
      ev.preventDefault();
      system.removePlanet(planet);
      planet.remove();
    }
  });

  system.addPlanet(planet);
});

document.addEventListener("keypress", (ev) => {
  if (ev.key !== " ") return;
  if (system.planets.length < 1) {
    showToast("Not enough planets, add more!", true);
    return;
  }

  if (!paused) {
    showToast("Paused", true);
    for (const p of system.planets) {
      p.contentEditable = "true";
    }
    paused = true;
    clearInterval(timer);
    return;
  }

  showToast("Playing", false);
  for (const p of system.planets) {
    p.contentEditable = "false";
  }
  paused = false;
  timer = setInterval(() => {
    system.step();
  });
});

/** @type {HTMLDivElement | null} */
const toast = document.querySelector("#toast");

/**
 * @param {string} text
 * @param {boolean} stay
 */
function showToast(text, stay) {
  if (!toast) throw "Toast element not found";
  toast.innerText = text;
  toast.style.visibility = "visible";
  toast.style.opacity = "1";

  if (stay) return;
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.visibility = "hidden";
  }, 500);
}

// spawn between 100 and 200 stars
for (let i = 0; i < Math.random() * 100 + 100; i++) {
  const star = document.createElement("div");
  star.className = "star";
  document.body.appendChild(star);
}
