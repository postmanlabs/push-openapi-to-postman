const core = require('@actions/core');
const axios = require('axios');
const {getAxiosConfig} = require('./axiosUtils');
const {POSTMAN_API_BASE_URL} = require('./constants');

const updateSchemaFile = async (postmanApiKey, apiId, schemaId, fileContents, fileName) => {
    const url = `${POSTMAN_API_BASE_URL}/apis/${apiId}/schemas/${schemaId}/files/${fileName}`;
    core.info(`Updating file content on Postman: ${url} ...`);
    const response = await axios.put(url,
        {content: fileContents},
        getAxiosConfig(postmanApiKey),
    );
    core.debug(`Postman API PUT updateSchemaFile response code: ${response.status}`);
    return response;
}

module.exports = updateSchemaFile;
