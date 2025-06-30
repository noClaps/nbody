export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /** Calculates `this + c` */
  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  /** Calculates `this - c` */
  subtract(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  /** Calculates `this * c` */
  multiply(s: number): Vector {
    return new Vector(this.x * s, this.y * s);
  }

  /** Calculates `this / c` */
  divide(s: number): Vector {
    return new Vector(this.x / s, this.y / s);
  }

  /** Calculates `|this|` */
  mod(): number {
    return Math.hypot(this.x, this.y);
  }

  static sum(vecs: Vector[]): Vector {
    let v = vecs[0];
    for (let i = 1; i < vecs.length; i++) {
      v = v.add(vecs[i]);
    }
    return v;
  }
}
