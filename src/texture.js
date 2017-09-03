
/**
 * Texture represents a texture inside the TEXTUREx lump.
 */
export class Texture {
  constructor(name, width, height) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.patches = [];
  }

  addPatch(p) {
    this.patches.push(p);
  }

  toString() {
    var hdr = this.name + ' ' + this.width + ' ' + this.height;
    return hdr + '\n' + this.patches.join('\n');
  }

  /**
   * Renders the texture into a `<canvas>` element which
   * is returned to the caller. An ImageCache must be passed in.
   * 
   * @param {ImageCache} patchesCache - The cache containing patch images.
   * @return {HTMLCanvasElement} The canvas element into which the texture will be drawn.
   */
  drawTexture(patchesCache) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', this.width);
    canvas.setAttribute('height', this.height);

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#EEE';
    ctx.fillRect(0, 0, this.width, this.height);

    Promise.all(this.patches.map(patch => patchesCache.loadImage(patch.name))).then(images => {
      var ctx = canvas.getContext('2d');
      this.patches.forEach((patch, i) => {
        ctx.drawImage(images[i], patch.x, patch.y);
      });
    });

    return canvas;
  }
}