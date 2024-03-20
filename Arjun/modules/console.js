const chalk = require('chalk');
const log = console.log;
const error = console.error;

console.log = function () {
    let args = Array.from(arguments);
    args = args.map(x => chalk.yellowBright(`${require('moment')().format("") + ": "}${x}`))
    log.apply(console, args);
}

console.error = function () {
    let args = Array.from(arguments);
    args = args.map(x => chalk.yellowBright(`${require('moment')().format("") + ": "}${x}`))
    error.apply(console, args);
}
