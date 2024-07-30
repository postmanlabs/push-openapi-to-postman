const core = require('@actions/core');
const { promises: fs } = require('fs');
const yaml = require('yaml');

const readFile = async (path) => {

    core.info(`Reading ${path} file ...`);
    let content = await fs.readFile(path, 'utf8');

    try {
        core.debug(`File read`);
        return JSON.stringify(JSON.parse(content.toString()), null, 2);
    } catch (e) {
        try {
            const [doc] = new yaml.Parser().parse(content.toString())
            if (doc.value.items && doc.value.items.length > 0) {
                return yaml.stringify(yaml.parse(content.toString()));
            }
        } catch (ye) { /* empty */ }
        throw e;
    }
}

module.exports = readFile;
