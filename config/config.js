const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'mongodb'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongodb:27017'
  },
};

module.exports = config[env];
