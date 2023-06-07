const core = require('@actions/core');
const axios = require('axios');
const {getAxiosConfig} = require('./axiosUtils');
const {POSTMAN_API_BASE_URL} = require('./constants');

const createNewVersion = async (postmanApiKey, apiId, schemaId, versionName, releaseNotes) => {
    const url = `${POSTMAN_API_BASE_URL}/apis/${apiId}/versions`;
    core.info(`Creating new version on Postman: ${url} ...`);
    const response = await axios.post(
        url,
        {
            'name': versionName,
            'releaseNotes': releaseNotes,
            'collections': [],
            'schemas': [
                {
                    'id': schemaId
                }
            ]
        },
        getAxiosConfig(postmanApiKey),
    );
    core.debug(`Postman API PUT createNewVersion response code: ${response.status}`);
    return response.data['id'];
}

module.exports = createNewVersion;
