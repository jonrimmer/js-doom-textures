/**
 * Patch represents a single patch inside a texture entry.
 */
export class Patch {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  toString() {
    return '*    ' + this.name + ' ' + this.x + ' ' + this.y;
  }
}
