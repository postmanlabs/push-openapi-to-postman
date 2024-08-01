const core = require('@actions/core');
const { readSchemaFile, readReleaseNotes } = require('./readFile');
const updateSchemaFile = require('./updateSchemaFile');
const createNewVersion = require('./createNewVersion');
const getSchemaId = require("./getSchemaId");


async function run() {
  try {
    const postmanApiKey = core.getInput('postman-api-key');
    const path = core.getInput('path-to-definition');
    const apiId = core.getInput('api-id');
    const fileName = core.getInput('api-path-to-file-name');
    const versionName = core.getInput('version-name');
    const releaseNotes = core.getInput('release-notes');
    const releaseNotesFileName = core.getInput('release-notes-file-name');

    core.info(`Inputs:`);
    core.info(`  path-to-definition: ${path}`);
    core.info(`  api-id: ${apiId}`);
    core.info(`  api-path-to-file-name: ${fileName}`);
    core.info(`  version-name: ${versionName}`);
    core.info(`  release-notes: ${releaseNotes}`);
    core.info(`  release-notes-file-name: ${releaseNotesFileName}`);

    core.info(`Retrieving the Schema id from the API ...`);
    const schemaId = await getSchemaId(postmanApiKey, apiId);

    core.info(`Reading OpenAPI definition file ...`);
    const openAPIFileContents = await readSchemaFile(path);

    core.info(`Updating schema file ...`);
    await updateSchemaFile(postmanApiKey, apiId, schemaId, openAPIFileContents, fileName);

    core.info(`Reading Release notes from file or string ...`);
    const releaseNotesContent = releaseNotesFileName ? await readReleaseNotes(releaseNotesFileName) : releaseNotes;

    core.info(`Creating new version ...`);
    const createdVersionId = await createNewVersion(postmanApiKey, apiId, schemaId, versionName, releaseNotesContent);

    core.setOutput('createdVersionId', createdVersionId);
  } catch (error) {
    let message = error.message;
    if (error.response) {
      message = `${message}. Error code: ${error.response.status}. Error body: ${JSON.stringify(error.response.data)}`;
    }
    core.setFailed(message);
  }
}

module.exports = run;
