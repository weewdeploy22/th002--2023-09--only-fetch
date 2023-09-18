// import { join, dirname } from 'path'
import path from 'path'
import { fileURLToPath } from 'url'


// import fs from 'fs/promises';
import fsFull from 'fs';

const fs = fsFull.promises;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const __dirname = process.cwd();


async function readFileText({ filePath }) {
    // console.log(isNewFile);
    // ------------------------------------
    // --path
    const file = path.join(__dirname, filePath)
    // --read-file
    try {
        const data = await fs.readFile(file, 'utf8')
        return data;
    }
    catch (err) {
        console.log(err)
        return false;
    }

    // return 'bug';
    return false;
}

async function saveFileText({ manyText, filePath, isNewFile = false }) {
    // ------------------------------------
    // --path
    // const dirPath = path.join(__dirname, filePath)
    const filePathFull = path.join(__dirname, filePath);
    // ------------------------------------
    // create-a-directory-if-it-doesnt-exist
    // https://stackoverflow.com/questions/21194934/how-to-create-a-directory-if-it-doesnt-exist-using-node-js
    if (!fsFull.existsSync(path.dirname(filePathFull))) {
        fsFull.mkdirSync(dirPath, { recursive: true });
    }
    // ------------------------------------
    // console.log(isNewFile);
    if (isNewFile) {
        await fs.truncate(filePathFull).catch(err => true);
    }
    // ------------------------------------
    // --append-data
    await fs.appendFile(filePathFull, manyText).catch(function (err) {
        console.error(err);
    });

    return true;
}

async function saveJson(manyText, filename_id, isNewFile) {
    // console.log(isNewFile);
    // ------------------------------------
    // --path
    // const file = join(__dirname + '/db/', `db--${filename_id}.json`)
    const file = path.join(__dirname + '/db/', `db--${filename_id}.json`)
    // --append-data
    await fs.appendFile(file, manyText).catch(function (err) {
        console.error(err);
    });

    return true;
}

export default { saveJson, saveFileText, readFileText };

