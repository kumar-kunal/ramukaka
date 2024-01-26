const constants = require('./constant');

const logger = {
    debug: (message) => {
        console.log(constants.COLOR.debug, `[Ramukaka]: ${message}`);
    },
    info: (message) => {
        console.log(constants.COLOR.info, `[Ramukaka]: ${message}`);
    },
    error: (message) => {
        console.log(constants.COLOR.error, `[Ramukaka]: ${message}`);
    }
};

module.exports = logger;