import { ImageCache } from './image-cache';
import { loadAllTextures } from './deutex/textures';
import { loadWadInfo } from './deutex/wadinfo';

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
  let patchesCache = new ImageCache(game + '/patches', '.png');

  let urls = [game + '/textures/texture1.txt'];
  if (game != 'doom2') {
    urls.push(game + '/textures/texture2.txt');
  }
  loadAllTextures(urls).then(textures => {
    textures.forEach(tx => {
      let canvas = tx.drawTexture(patchesCache);
      element.appendChild(canvas);
    });
  });
}

/**
 * Populates the given HTML container with <cavas> elemtns for all flats
 * for the given game. It is expected that there exist the following:
 * 
 *   <game>/wadinfo.txt
 *     - A valid deutex wadinfo.txt, containing a list of flats.
 * 
 *   <game>/flats/<flat name>.png
 *     - Indvidual PNG flat files.
 * 
 * @param {HTMLElement} element - The container element.
 * @param {*} game - The game to load the flats for.
 */
function renderAllFlats(element, game) {
  let flatsCache = new ImageCache(game + '/flats', '.png');

  loadWadInfo(game + '/wadinfo.txt').then(wadInfo => {
    wadInfo.flats.forEach(flat => {
      let canvas = flat.draw(flatsCache);
      element.appendChild(canvas);
    })
  })
}

/**
 * Looks for a URL parameter in the loaded page specifying which game
 * to render textures for; if none exists then 'freedoom1' is the default.
 * @returns {string} The game to load.
 */
function getGame() {
  let url = new URL(window.location.href);
  return url.searchParams.get('game') || 'freedoom1';
}

window.onload = function() {
  console.log('Page loaded');

  let game = getGame();
  console.log('Rendering for ' + game);

  renderAllTextures(
    document.getElementById('texture-list'),
    game
  );

  renderAllFlats(
    document.getElementById('flats-list'),
    game
  );
}