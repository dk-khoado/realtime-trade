const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
var path = require('path');
var appDir = path.dirname(require.main.filename);

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const Logging = function (label_log, msg, level = "info") {
    let time = new Date()    
    let path_log = `${appDir}/logs/${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`    
    let logger = createLogger({
        format: combine(
            label({ label: label_log }),
            timestamp(),
            myFormat
        ),
        transports: [
            new transports.File({ filename: path_log + '-error.log', level: 'error' }),
            new transports.File({ filename: path_log + '-combined.log' }),
        ],
        defaultMeta: { service: 'user-service' },
        exitOnError: true,
    })
    logger.log(level, msg)
}
module.exports = { Logging }