// @ts-check

/** @import { Planet } from "./planet.js"; */

export class System {
  time = 0; // start at time 0s
  /** @type {Planet[]} */
  planets = [];

  constructor() {}

  step() {
    this.time++;

    for (const p of this.planets) {
      p.updatePos(this.time);
      p.updateVel(this.time);
      p.updateAcc(this.planets.filter((planets) => planets !== p));
    }
  }

  /**
   * @param {Planet} p
   */
  addPlanet(p) {
    this.planets.push(p);
  }

  /**
   * @param {Planet} p
   */
  removePlanet(p) {
    this.planets.splice(this.planets.indexOf(p), 1);
  }
}
