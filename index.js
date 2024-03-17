const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('TEC | Basanti Music'))

app.listen(port, () =>
console.log(`TEC !!!! Your app is listening a http://localhost:${port}`)
);

const chalk = require('chalk');
require('dotenv').config()
require('./Arjun/modules/console');
console.log(chalk.yellow('----------------------------------------------------------------------------------------------'))
console.log()
console.log(chalk.red('TEC !!!! Found a bug? Feel free to join our server'))
console.log(chalk.yellow('TEC | Version: 3'))
console.log()
console.log(chalk.yellow('----------------------------------------------------------------------------------------------'))
console.log()
const Alpine = require('./Arjun/Arjun');

new Alpine().login()
    .catch(err => console.error(err))