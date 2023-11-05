const exec = require('child_process').exec;
const { Client, Authenticator } = require('minecraft-launcher-core');
const { Auth } = require('msmc');
const path = require('path')
const win = require('./window')

const launcher = new Client();

const token = {
    token: null,

    get getToken() {return this.token},
    set setToken(t) {this.token = t}
}

async function login() {
    const authManager = new Auth("select_account");
    authManager.launch("raw").then(async xboxManager => {
        //Generate the Minecraft login token
        token.setToken =  await xboxManager.getMinecraft();
        // console.log(token.getToken)
        const _token = await xboxManager.getMinecraft();
        win.window.getWindow.webContents.send("setSkin", _token.profile.id)
        win.window.getWindow.webContents.send("setName", _token.profile.name)
    });
}

async function launchGame() {
    console.log(path.join(__dirname, "forge-1.8.9.jar"))
    exec("export JAVA_HOME=`/usr/libexec/java_home -v 1.8`")
    let opts = {
        clientPackage: null,
        // Simply call this function to convert the msmc Minecraft object into a mclc authorization object
        authorization: token.getToken.mclc(),
        root: "./.minecraft",
        version: {
            number: "1.8.9",
            type: "release",
        },
        forge: path.join(__dirname, "forge-1.8.9.jar"),
        memory: {
            max: "6G",
            min: "4G"
        }
    };
    console.log("[Lime]: Launching MC");
    launcher.launch(opts);

    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));
}

exports.login = login;
exports.launchGame = launchGame;