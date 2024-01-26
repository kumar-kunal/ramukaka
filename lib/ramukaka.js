const spawn = require("child_process").spawn;
const path = require("path");
const chokidar = require("chokidar");
const logger = require("./logger");


class Ramukaka {
    debouncedRestart = null;
    constructor() {
        this.init();
    }

    init = () => {
        this.args = process.argv;
        this.fileName = this.args[2];
        this.cwd = process.cwd();
        this.watchPaths = [ path.join(this.cwd, "/**/*.js") ];
        this.ignorePaths = "**/node_modules/*";
        this.restart();
        this.watch();
        this.listenEvents();

        logger.info("Ramukaka is watching your files...");
        logger.info("Press RK + enter to restart your app");
    }

    restart = () => {
        logger.debug(`Starting ${this.fileName}`);
        if(this.nodeServer){
            this.nodeServer.kill('SIGTERM');
        }
        this.nodeServer = spawn("node", [this.fileName], {stdio: "inherit"});
        this.nodeServer.on("close", () => {
            logger.error("Error detected, waiting for changes to restart...");
        });
    }

    watch = () => {
        const watcher = chokidar.watch(this.watchPaths, {
            ignored: this.ignorePaths,
            ignoreInitial: true
        });

        watcher.on("all", () => {
            if(this.debouncedRestart === null){
                this.debouncedRestart = this.debounce(this.restart, 1000);
            }
            this.debouncedRestart();
        });

        watcher.on("error", (error) => {
            logger.error(`Watcher error: ${error}`);
            process.exit(1);
        });
    }

    listenEvents = () => {
        process.stdin.on("data", (data) => {
            if(data.toString() === "RK\n"){
                this.restart();
            }
        });
    }

    debounce = (func, wait) => {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

module.exports = new Ramukaka();