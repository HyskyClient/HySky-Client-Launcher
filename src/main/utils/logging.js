const textRed = "\x1b[31m"
const textYellow = "\x1b[33m"
const textWhite = "\x1b[0m"

function log(textColor, msgType, msg) {
    const date = new Date()

    console.log(format("{0}[{1}:{2}:{3}] {4}: {5}",
        textColor,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        msgType,
        msg
    ))
    console.log(textWhite)
}

export function format(str, ...args) {
    return str.replace(/\{(\d+)\}/g, (match, index) => args[index]);
}

export function logInfo(msg) {
    log(textWhite, "INFO", msg)
}

export function logWarning(msg) {
    log(textYellow, "WARN", msg)
}

export function logError(msg) {
    log(textRed, "ERROR", msg)
}