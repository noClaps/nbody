import { Planet } from "./planet";

export class System {
  time: number = 0; // start at time 0s
  planets: Planet[];

  constructor(planets: Planet[]) {
    this.planets = planets;
  }

  step() {
    this.time++;

    for (const p of this.planets) {
      p.updatePos(this.time);
      p.updateVel(this.time);
      p.updateAcc(this.planets.filter((planets) => planets !== p));
    }
  }
}
