const path = require('path');

const root = p => path.resolve(__dirname, '..', p);

module.exports = {
  entry: root('./src/app.js'),
  output: {
    path: root('./out'),
    filename: 'bundle.js'
  },
  devtool: 'cheap-eval-source-map'
};