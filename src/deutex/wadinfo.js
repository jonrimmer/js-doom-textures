import { Flat } from '../flat';

const EMPTY_RE = /^\s*$/;
const COMMENT_RE = /^\s*#.*$/;
const SECTION_RE = /^\s*\[(\w+)\]\s*$/;

export class WadInfo {
  constructor(raw) {
    this.flats = [];

    const lines = raw.split('\n');
    let context = null;
  
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
  
      if (EMPTY_RE.test(line) || COMMENT_RE.test(line)) {
        continue;
      }
      
      let sectionMatch = SECTION_RE.exec(line);
  
      if (sectionMatch) {
        context = sectionMatch[1];
        continue;
      }
  
      switch(context) {
        case 'flats':
          this.flats.push(new Flat(line));
          break;
        default:
          break;
      }
    }
  }

  toString() {
    return `WadInfo: \n  ${flats.length} Flats`;
  }
}

/**
 * Loads and parses a deutex-format wadinfo.txt.
 * 
 * @param {string} url - The URL from which to load.
 * @returns {WadInfo} The parsed WadInfo.
 */
export function loadWadInfo(url) {
  console.log('Loading textures from ' + url);
  return fetch(url).then(response => {
    console.log(`Response loading ${response.url}: ${response.status}`);
    return response.text().then(content => new WadInfo(content)).then(wadInfo => {
      console.log(wadInfo);
      return wadInfo;
    })
  }).catch(error => {
    console.error(`Error loading ${error.url}: ${error.toString()}`);
    return Promise.error(error);
  });
}