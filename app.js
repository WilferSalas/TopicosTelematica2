const express = require('express');
const config = require('./config/config');
const glob = require('glob');
const mongoose = require('mongoose');
const sleep = require('system-sleep');
sleep(2000);

mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

const models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
const app = express();

module.exports = require('./config/express')(app, config);

/*********************************************************************************
 *  * APP SERVER CONFIGURATION
 *   */
var appServer = app.listen(config.port, () => {
    console.log('App server running on port ' + config.port + '');
});

process.on('SIGINT', () => {
    setTimeout(() => {
        appServer.close(() => {
            console.log('App server is stopping...');
            mongoose.connection.close();
            process.exit(0);
        });
    }, 500);
});

