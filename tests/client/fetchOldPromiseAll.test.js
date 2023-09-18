import assert from 'assert';
import { main as mainOldPromiseAll } from "../../src/httpClient/myNodeFetchOld.js"

import { ALL_TASKS } from '../../src/env/constData.js'

import fetchOptions from '../../src/env/fetchOptions.js'

describe('myNodeFetchOld', function () {
    describe('#mainOldPromiseAll', function () {
        it('should xxx...', async function () {
            assert.equal(true, true);
        });
        it('should has report.', async function () {
            const defaultLevel = '30s';
            const result = await mainOldPromiseAll(
                {
                    defaultLevel: defaultLevel,
                    initTasks: ALL_TASKS,
                    options: fetchOptions.options,
                    key: fetchOptions.key,
                    url: fetchOptions.url,
                }
            );
            assert.equal(true, true);
        });
    });

    // ...
});