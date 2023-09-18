import { ALL_TASKS, fetchOptions } from '../env/constData.js'

// https://stackoverflow.com/a/66309132
// NOTE: not-run main() =>when testing
import path from 'path';
import { fileURLToPath } from 'url'
const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url))
const isRunningDirectlyViaCLI = nodePath === modulePath

// const URL = 'https://wen043.settrade.com/webrealtime/data/fastquote.jsp';
// const URL = 'https://pokeapi.co/api/v2/pokemon/1';

const GLOBAL_URL = fetchOptions.url;

const popSymbol = 'PTT';
const OPTIONS = {
    headers: fetchOptions.options.headers,
    method: fetchOptions.options.method,
    body: `symbol=${popSymbol}&key=${fetchOptions.key}`,
}

const oneFetch = async function (someParams) {
    let hasErr = false;

    const res = await fetch(GLOBAL_URL, OPTIONS).catch(function (err) {
        console.error(err);
        // check-err http
        console.log('err::: http');

        return false;
    });

    if (res === false) {
        hasErr = true;
    } else {
        const hasData = await res.json();
        // console.log(hasData);
        if (typeof hasData.symbol == 'undefined') {
            console.log('err::: permission');

            hasErr = true;
        }
        // console.log(hasData);
    }

    return hasErr;
}


async function main() {
    let hasErr = false;
    let lastLoop_timeMn = 66;

    const sleepTimeMs = 1000;
    while (!hasErr) {
        const currentLoop_timeMn = (new Date()).getUTCMinutes();
        if (currentLoop_timeMn == lastLoop_timeMn) {
            // DEBUG: wait
            // const current_timeSec = (new Date()).getUTCSeconds();
            // console.log('wait Mn.', current_timeSec + 's');

            // wait next(minutes)
            await new Promise(r => setTimeout(r, sleepTimeMs));
            continue;
        }
        lastLoop_timeMn = currentLoop_timeMn;

        const isErr = await
            oneFetch('some param')
                .catch(function (err) {
                    console.log('err::: -------------------');
                    console.error(err);
                });

        const timeDateTime_bangkok = (new Date()).toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
        if (isErr) {
            hasErr = true;
            console.log('err-on: ', timeDateTime_bangkok);

            break;
        }

        // DEBUG: hasRes
        console.log('hasRes-on: ', timeDateTime_bangkok);

        // await new Promise(r => setTimeout(r, sleepTimeMs));
        // continue;
    }

    console.log('Ended-main;');
}

// main()
console.log('isRunningDirectlyViaCLI: ', isRunningDirectlyViaCLI);
if (isRunningDirectlyViaCLI) {
    console.log('console-starting: -- ');
    main();
    console.log('console-ended: -- ');
}


export { oneFetch }