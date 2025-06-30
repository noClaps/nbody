import { Planet } from "./planet";

export class System {
  time: number = 0; // start at time 0s
  planets: Planet[] = [];

  constructor() {}

  step() {
    this.time++;

    for (const p of this.planets) {
      p.updatePos(this.time);
      p.updateVel(this.time);
      p.updateAcc(this.planets.filter((planets) => planets !== p));
    }
  }

  addPlanet(p: Planet) {
    this.planets.push(p);
  }

  removePlanet(p: Planet) {
    this.planets.splice(this.planets.indexOf(p), 1);
  }
}
