import assert from 'assert';
// import libLowDB from '../../src/bench/bench-conn.js'
import { oneFetch } from '../../src/bench/bench-conn.js'

describe('bench-conn', function () {
    describe('#32-conn s', function () {
        it('should xxx...', async function () {
            assert.equal(true, true);
        });
        it('should hasData in oneFetch()', async function () {
            const result = await oneFetch();
            assert.equal(true, true);
        });
    });

    // ...
});