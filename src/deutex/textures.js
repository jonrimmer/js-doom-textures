import { Texture } from '../texture';
import { Patch } from '../patch';

// Regexps for parsing contents of deutex-format texture definition files.
const EMPTY_RE = /^\s*$/;
const COMMENT_RE = /^\s*;/;
const TEXTURE_RE = /^\s*([A-Za-z0-9_-]+)\s*(-?[0-9]+)\s*(-?[0-9]+)/;
const PATCH_RE = /^\s*\*\s*([A-Za-z0-9_-]+)\s*(-?[0-9]+)\s*(-?[0-9]+)/;

/**
 * Parses the contents of a deutex-format texture definition
 * file. Returned is an array of Texture objects.
 * 
 * @param {string} config - A deutex-format texture file. 
 * @returns {Array<Texture>} The parsed textures.
 */
export function parseTextures(config) {
  var lines = config.split('\n');
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
      throw 'Parse error in texture file: ' + line;
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
export function loadTexturesFile(url) {
  console.log('Loading textures from ' + url);
  return fetch(url).then(response => {
    console.debug(`Response loading ${response.url}: ${response.status}`);
    return response.text().then(parseTextures).then(textures => {
      console.info(`Loaded ${textures.length} textures from file ${response.url}`);
      return textures;
    })
  }).catch(error => {
    console.error(`Error loading ${error.url}: ${error.toString()}`);
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
export function loadAllTextures(urls) {
  return Promise
    .all(urls.map(loadTexturesFile))
    .then(textures => textures.reduce((acc, value) => acc.concat(value), []));
}
