// @ts-check

export class Vector {
  /** @type {number} */
  x;
  /** @type {number} */
  y;

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Calculates `this + c`
   * @param {Vector} v
   */
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  /**
   * Calculates `this - c`
   * @param {Vector} v
   */
  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  /**
   * Calculates `this * s`
   * @param {number} s
   */
  multiply(s) {
    return new Vector(this.x * s, this.y * s);
  }

  /**
   * Calculates `this / s`
   * @param {number} s
   */
  divide(s) {
    return new Vector(this.x / s, this.y / s);
  }

  /**
   * Calculates `|this|`
   */
  mod() {
    return Math.hypot(this.x, this.y);
  }

  /**
   * @param {Vector[]} vecs
   */
  static sum(vecs) {
    let v = vecs[0];
    for (let i = 1; i < vecs.length; i++) {
      v = v.add(vecs[i]);
    }
    return v;
  }
}
