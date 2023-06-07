const core = require('@actions/core');
const { promises: fs } = require('fs');


const readFile = async (path) => {
    core.info(`Reading ${path} file ...`);
    let content = await fs.readFile(path, 'utf8');
    core.debug(`File read`);
    return JSON.stringify(JSON.parse(content.toString()), null, 2);
}

module.exports = readFile;
