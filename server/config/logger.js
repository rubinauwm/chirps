var winston = require('winston')
fs = require('fs');

var env = process.env.NODE_ENV || 'development';
var logDir = 'log';
var tsFormat = () => (new Date()).toLocaleTimeString();

if (!fs.existsSync(logDir)) { fs.mkdirSync(logDir); }

var logger = new (winston.Logger)({
 
  transports: [

    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    })
  ]
});

new (require('winston-daily-rotate-file'))({
  filename: `${logDir}/-results.log`,
  timestamp: tsFormat,
  datePattern: 'yyyy-MM-dd',
  prepend: true,
  level: env === 'development' ? 'verbose' : 'info'
});


log = function (message, level) {
  level = level || 'info';
  logger.log(level, message);
}

exports.log = log;
