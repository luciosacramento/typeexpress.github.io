import  config  from "config"
import winston from "winston"

//Configuração do Log da aplicação

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const level = () => {
    const env = config.get<string>("env") || "development"
    const isDevelopment = env === "development"
    return isDevelopment? "debug" : "warm"
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({format:"YYYY-MM-DD HH:mm:ss:ms"}),
    winston.format.colorize({all:true}),
    winston.format.printf(
        (info) => `${info.timestamp} - ${info.level} - ${info.message}`
    )
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error", //cria documento com apenas logs de 'erro'
    }),
    new winston.transports.File({filename: 'logs/all.log'}), //cria documento com todos os logs
]

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
})

export default Logger