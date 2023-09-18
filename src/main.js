import { main as mainOldPromiseAll } from "./httpClient/myNodeFetchOld.js"

import { ALL_TASKS, fetchOptions } from './env/constData.js'

// --runMain
import path from 'path';
import { fileURLToPath } from 'url'
const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url))
const isRunningDirectlyViaCLI = nodePath === modulePath

async function main() {
    console.log('Start: src/main...');

    // TODO: can change-tpye
    const defaultLevel = '30s';
    const reports = await mainOldPromiseAll({
        defaultLevel: defaultLevel,
        initTasks: ALL_TASKS,
        options: fetchOptions.options,
        key: fetchOptions.key,
        url: fetchOptions.url,
    });
    console.log('reports: ', reports);


    // detect[ctrl+c]
    // https://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
    if (process.platform === "win32") {
        var rl = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on("SIGINT", function () {
            console.log('END: SIGINT(with ctrl+c)');
            process.emit("SIGINT");
        });
    }
    process.on("SIGINT", function () {
        //graceful shutdown
        console.log('END: (with ctrl+c)shutdown');
        process.exit();
    });
    console.log('END: src/main...');
}

console.log('isRunningDirectlyViaCLI: ', isRunningDirectlyViaCLI);
if (isRunningDirectlyViaCLI) {
    console.log('console-starting: -- ');
    main();
    console.log('console-ended: -- ');
}