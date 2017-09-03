(() => {
  // Regexps for parsing contents of deutex-format texture definition files.
  EMPTY_RE = /^\s*$/;
  COMMENT_RE = /^\s*;/;
  TEXTURE_RE = /^\s*([A-Za-z0-9_-]+)\s*(-?[0-9]+)\s*(-?[0-9]+)/;
  PATCH_RE = /^\s*\*\s*([A-Za-z0-9_-]+)\s*(-?[0-9]+)\s*(-?[0-9]+)/;

  /**
   * PatchesStore implements a class that will load patches on demand from a
   * specified URL, creating them as `<img>` elements in a hidden `<div>` so that they
   * can be composited into a full texture.
   */
  class PatchesStore {
    constructor(rootPath, extension) {
      this.patches = {};
      this.rootPath = rootPath;
      this.extension = extension;

      // Make a container for holding patch images
      this.container = document.createElement("div");
      this.container.style.display = "none";
      document.body.appendChild(this.container);
    }

    /**
     * Loads the given patch by name, creating an `<img>` element
     * for it if necessary.
     * 
     * @param {string} name - The name of the patch.
     * @returns {Promise<Image>} A promise that resolves with the `<img>` once it is loaded.
     */
    loadPatch(name) {
      name = name.toLowerCase();

      return this.patches[name] || (this.patches[name] = new Promise(resolve => {
        let img = new Image();
        img.onload = () => {
          console.log("Patch loaded: " + name);
          resolve(img);
        };
        let filename = this.rootPath + "/" + name + this.extension;
        img.src = filename;
        this.container.append(img);
      }));
    }
  }

  /**
   * Patch represents a single patch inside a texture entry.
   */
  class Patch {
    constructor(name, x, y) {
      this.name = name;
      this.x = x;
      this.y = y;
    }

    toString() {
      return "*    " + this.name + " " + this.x + " " + this.y;
    }
  }

  /**
   * Texture represents a texture inside the TEXTUREx lump.
   */
  class Texture {
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
      var hdr = this.name + " " + this.width + " " + this.height;
      return hdr + "\n" + this.patches.join("\n");
    }

    /**
     * Renders the texture into a `<canvas>` element which
     * is returned to the caller. A PatchesStore must be passed in.
     * 
     * @param {PatchesStore} ps - The patches store.
     * @return {HTMLCanvasElement} The canvas element into which the texture will be drawn.
     */
    drawTexture(ps) {
      var canvas = document.createElement("canvas");
      canvas.setAttribute("width", this.width);
      canvas.setAttribute("height", this.height);

      var ctx = canvas.getContext("2d");
      ctx.fillStyle = '#EEE';
      ctx.fillRect(0, 0, this.width, this.height);

      Promise.all(this.patches.map(patch => ps.loadPatch(patch.name))).then(images => {
        var ctx = canvas.getContext("2d");
        this.patches.forEach((patch, i) => {
          ctx.drawImage(images[i], patch.x, patch.y);
        });
      });

      return canvas;
    }
  }

  /**
   * Parses the contents of a deutex-format texture definition
   * file. Returned is an array of Texture objects.
   * 
   * @param {string} config - A deutex-format texture file. 
   * @returns {Array<Texture>} The parsed textures.
   */
  function parseTextures(config) {
    var lines = config.split("\n");
    var i;
    var textures = [], tx = null;
    for (i = 0; i < lines.length; ++i) {
      var line = lines[i];
      console.log(line);
      if (COMMENT_RE.exec(line)) {
        continue;
      }
      var m = TEXTURE_RE.exec(line);
      if (m) {
        var w = parseInt(m[2]);
        var h = parseInt(m[3]);
        tx = new Texture(m[1], w, h);
        textures.push(tx);
        continue;
      }
      var m = PATCH_RE.exec(line);
      if (m) {
        var x = parseInt(m[2]);
        var y = parseInt(m[3]);
        tx.addPatch(new Patch(m[1], x, y));
        continue;
      }
      if (!EMPTY_RE.exec(line)) {
        throw "Parse error in texture file: " + line;
      }
    }
    return textures;
  }

  /**
   * Loads and parses a deutex-format texture definition file
   * from the given URL. It returns a promise that resolves with a list of
   * textures from the file.
   * 
   * @param {string} url - The texture file to load.
   * @returns {Promise<Array<Texture>>} The loaded textures.
   */
  function loadTexturesFile(url) {
    console.log("Loading textures from " + url);
    return fetch(url).then(response => {
      console.debug(`Response loading ${response.url}: ${response.status}`);
      return response.text().then(parseTextures).then(textures => {
        console.info(`Loaded ${textures.length} textures from file ${response.url}`);
        return textures;
      })
    }).catch(error => {
      console.debug(`Error loading ${error.url}: ${error.toString()}`);
    });
  }

  /**
   * Loads deutex-format texture definition files from the given
   * array of URLs. It returns a promise that resolves with a concanated
   * list of all the loaded textures.
   * 
   * @param {Array<string>} urls - The URLs from which to load textures.
   * @returns {Promise<Array<Texture>>} The loaded textures.
   */
  function loadAllTextures(urls) {
    return Promise
      .all(urls.map(loadTexturesFile))
      .then(textures => textures.reduce((acc, value) => acc.concat(value), []));
  }

  /**
   * Populates the given HTML container element with <canvas> elements
   * for all textures for the given game. It is expected that there exist
   * directories in the following format:
   * 
   *  <game>/textures/texture[12].txt
   *    - Texture definition files, which will be loaded and parsed.
   *      Both TEXTURE1 and TEXTURE2 are expected, except for 'doom2'.
   * 
   *  <game>/patches/<patch name>.png
   *    - Individual PNG patch files to composite into textures.
   * 
   * @param {HTMLElement} element - The container element.
   * @param {string} game - The game to load the textures for.
   */
  function renderAllTextures(element, game) {
    var ps = new PatchesStore(game + "/patches", ".png");

    urls = [game + "/textures/texture1.txt"];
    if (game != "doom2") {
      urls.push(game + "/textures/texture2.txt");
    }
    loadAllTextures(urls).then(textures => {
      textures.forEach(tx => {
        let canvas = tx.drawTexture(ps);
        element.appendChild(canvas);
      });
    });
  }

  /**
   * Looks for a URL parameter in the loaded page specifying which game
   * to render textures for; if none exists then 'doom1' is the default.
   * @returns {string} The URL string.
   */
  function getGame() {
    var u = new URL(window.location.href);
    var game = u.searchParams.get("game");
    if (game == null) {
      return "freedoom1";
    }
    return game;
  }

  window.onload = function() {
    console.log("page loaded");
    var el = document.getElementById("texture-list");
    var game = getGame();
    console.log("rendering for " + game);
    renderAllTextures(el, game);
  }
})();
