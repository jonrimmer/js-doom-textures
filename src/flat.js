/**
 * Flat represents a drawable flat image, taken from an image cache.
 */
export class Flat {
  constructor(name) {
    this.name = name;
  }

  draw(flatsCache) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', 64);
    canvas.setAttribute('height', 64);

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#EEE';
    ctx.fillRect(0, 0, 64, 64);

    flatsCache.loadImage(this.name).then(image => {
      ctx.drawImage(image, 0, 0);
    });

    return canvas;
  }
}