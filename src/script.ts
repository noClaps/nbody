import { Planet } from "./scripts/planet";
import { System } from "./scripts/system";

const planets: Planet[] = [];
let paused = true;
let timer: number;

document.addEventListener("click", (ev) => {
  if (!paused) return;

  const x = ev.pageX;
  const y = ev.pageY;

  for (const p of planets) {
    if (Math.abs(p.pos.x - x) < 48 && Math.abs(p.pos.y - y) < 48) return;
  }

  const mass = Math.random() * 1e3;

  const planet = new Planet(mass, x, y);
  planet.addEventListener("contextmenu", (ev) => {
    if (!ev.ctrlKey) {
      ev.preventDefault();
      planets.splice(planets.indexOf(planet), 1);
      planet.remove();
    }
  });

  planets.push(planet);
});

document.addEventListener("keypress", (ev) => {
  if (ev.key !== " ") return;
  if (planets.length < 1) {
    showToast("Not enough planets, add more!", true);
    return;
  }

  const system = new System(planets);

  if (!paused) {
    showToast("Paused", true);
    paused = true;
    clearInterval(timer);
    return;
  }

  showToast("Playing", false);
  paused = false;
  timer = setInterval(() => {
    system.step();
  });
});

const toast = document.querySelector<HTMLDivElement>("#toast")!;
function showToast(text: string, stay: boolean) {
  toast.innerText = text;
  toast.style.visibility = "visible";
  toast.style.opacity = "1";

  if (stay) return;
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.visibility = "hidden";
  }, 500);
}
