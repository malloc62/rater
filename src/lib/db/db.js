const FILE_SIZE_LIMIT = 1024*1024*16;

const VALID_EXTENSIONS = ['png','jpg','jpeg','svg'];

var ridArray = {};

import sqlite3 from 'sqlite3'
import { writeFile } from 'node:fs/promises';
import { safePath, user } from '../util.js';
import { open } from 'sqlite'
import { createHash } from 'node:crypto';

var db;
async function initDb() {
    db = await open({
      filename: `${process.cwd()}/db/main.db`,
      driver: sqlite3.Database
    });

    await db.run('CREATE TABLE IF NOT EXISTS rating (id CHAR(256), rating INTEGER)');
}

let backendProxy = async ({route, backendParams,}) => {
    if (!db) await initDb();

    const res = await fetch(`https://sanifae.insfa.net/api/token`,{
        'method': 'GET', 'headers': {
            'cookie': backendParams.cookie
        }
    });

    backendParams['admin'] = ((await res.json()).data == user);

    return backend[route](backendParams);
}

var backend = {};


backend.rateOc = async ({admin,id,rating}) => {
    if (admin) {
        await db.run('UPDATE rating SET rating = ? WHERE id = ?', [
            rating,
            id
        ]) 
    }
};

backend.oc = async ({admin}) => {
    return await db.all('SELECT * FROM rating WHERE rating > ? ORDER BY rating DESC', [
        (admin) ? -1000 : -1
    ]);
}

backend.fileCreate = async({img, extension,id, last }) => {
    if (ridArray[id] !== '' && !(ridArray[id])) {
        ridArray[id] = img;
    } else {
        ridArray[id] += img;
    }

    const imgData = ridArray[id];

    if (last != 'true') {
        return {'success': 'Image still proccessing...'}
    } else {
        ridArray[id] = false;
    }

    const imgHash = createHash('md5').update(imgData).digest('hex');

    if (!imgHash)
        return {'success': 'Image not provided.'}

    if (imgHash.length > FILE_SIZE_LIMIT)
        return {'success': 'Image too big.'}

    const extensionSafe = safePath(extension);

    if (VALID_EXTENSIONS.indexOf(extensionSafe) == -1)
        return { success: 'Illegal file extension. Permitted file extensions are: ' + VALID_EXTENSIONS.join(', ') };

    writeFile(`${process.cwd()}/db/post-${imgHash}.${extensionSafe}`,imgData,{encoding: 'base64'});

    await db.run('INSERT INTO rating (id,rating) VALUES (?,?)', [
        `${imgHash}.${extensionSafe}`,
        -1
    ]);

    return { success: 'Successfully uploaded file.', 'href': `/img/${imgHash}.${extensionSafe}`};
}
export {
    backendProxy,
    backend
}