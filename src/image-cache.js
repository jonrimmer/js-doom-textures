
/**
 * ImageCache implements a class that will load images on demand from a
 * specified URL, creating them as `<img>` elements in a hidden `<div>` so that they
 * can be composited into a full texture.
 * 
 * In browsers that support service worker, this cache probably adds very little. But
 * in those that don't, it helps cut down a lot on multiple network requests.
 */
export class ImageCache {
  constructor(rootPath, extension) {
    this.images = {};
    this.rootPath = rootPath;
    this.extension = extension;

    // Make a container for holding images.
    this.container = document.createElement('div');
    this.container.style.display = 'none';
    document.body.appendChild(this.container);
  }

  /**
   * Loads the given image by name, creating an `<img>` element
   * for it if necessary.
   * 
   * @param {string} name - The name of the image.
   * @returns {Promise<Image>} A promise that resolves with the `<img>` once it is loaded.
   */
  loadImage(name) {
    name = name.toLowerCase();

    return this.images[name] || (this.images[name] = new Promise(resolve => {
      let img = new Image();
      img.onload = () => {
        resolve(img);
      };
      let filename = this.rootPath + '/' + name + this.extension;
      img.src = filename;
      this.container.append(img);
    }));
  }
}
