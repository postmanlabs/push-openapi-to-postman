const core = require('@actions/core');
const { promises: fsAsync, existsSync } = require('fs');
const yaml = require('yaml');

const readSchemaFile = async (path) => {

    core.info(`Reading ${path} file ...`);
    let content = await fsAsync.readFile(path, 'utf8');

    try {
        core.debug(`File read`);
        return JSON.stringify(JSON.parse(content.toString()), null, 2);
    } catch (e) {
        try {
            const [doc] = new yaml.Parser().parse(content.toString())
            if (doc.value.items && doc.value.items.length > 0 && yaml.stringify(yaml.parse(content.toString()))) {
                return content.toString();
            }
        } catch (ye) { /* empty */ }
        throw e;
    }
};

const readReleaseNotes = async (path) => {
    if (existsSync(path)) {
        let content = await fsAsync.readFile(path, 'utf8');
        return content.toString();
    }
};

module.exports = { readSchemaFile, readReleaseNotes };
