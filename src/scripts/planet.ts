import { Vector } from "./vector";

const G = 6.67343e-11;

export class Planet extends HTMLElement {
  mass: number;
  pos: Vector;
  vel: Vector = new Vector(0, 0); // starting at rest
  acc: Vector = new Vector(0, 0); // starting at rest

  /**
   * @param mass The mass of the planet
   * @param x The x coordinate of the planet
   * @param y The y coordinate of the planet
   */
  constructor(mass: number, x: number, y: number) {
    super();

    this.mass = mass;
    this.pos = new Vector(x, y);

    this.style.left = `${x}px`;
    this.style.top = `${y}px`;

    const brightness = Math.max(Math.random(), 0.5);
    this.style.backgroundColor = `oklch(${brightness} ${Math.random() * 0.25} ${Math.random() * 360})`;
    if (brightness > 0.6) {
      this.style.color = "#222";
    } else {
      this.style.color = "#ccc";
    }

    this.contentEditable = "true";
    this.style.width = `${48 + Math.pow(Math.log(mass), 2)}px`;
    this.innerText = mass.toPrecision(3);

    this.addEventListener("input", () => {
      const mass = Number.parseInt(this.innerText);
      this.mass = mass;
      this.style.width = `${48 + Math.pow(Math.log(mass), 2)}px`;
    });

    document.body.appendChild(this);
  }

  remove() {
    document.body.removeChild(this);
  }

  /** Calculates the acceleration for a planet. */
  updateAcc(planets: Planet[]) {
    const r1 = this.pos;

    const interactions: Vector[] = [];
    for (const p of planets) {
      const mp = p.mass;
      const rp = p.pos;

      const interactionWithP = r1
        .subtract(rp)
        .divide(Math.pow(r1.subtract(rp).mod(), 2))
        .multiply(-G * mp);
      interactions.push(interactionWithP);
    }

    this.acc = Vector.sum(interactions);
  }

  updateVel(time: number) {
    this.vel = this.vel.add(this.acc.multiply(time));
  }

  updatePos(time: number) {
    this.pos = this.pos
      .add(this.vel.multiply(time))
      .add(this.acc.multiply(time * time));

    this.style.left = `${this.pos.x}px`;
    this.style.top = `${this.pos.y}px`;
  }
}

customElements.define("planet-3b", Planet);
