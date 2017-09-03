import { WadInfo } from '../../src/deutex/wadinfo';

const TEST = `
# DeuTex 5.1.0

# List of levels
[levels]
E1M1

# List of flats
[flats]
FLAT1

# wtf?
FLAT2

# Wat dis?
[blah]
WRONG

  # We're [done] here   
`;

describe('WadInfo', () => {
  test ('parsing constructor', () => {
    let wi = new WadInfo(TEST);
    expect(wi.flats).not.toBeNull();
    expect(wi.flats).toEqual([
      'FLAT1',
      'FLAT2'
    ])
  })
});