const core = require('@actions/core');
const axios = require('axios');
const {getAxiosConfig} = require('./axiosUtils');
const {POSTMAN_API_BASE_URL} = require('./constants');

const getSchemaId = async (postmanApiKey, apiId) => {
    const url = `${POSTMAN_API_BASE_URL}/apis/${apiId}?include=schemas`;
    core.info(`Getting the schema id for ${apiId}: ${url} ...`);
    const response = await axios.get(url, getAxiosConfig(postmanApiKey));
    core.debug(`Postman API GET response code: ${response.status}`);
    return response.data.schemas[0].id;
}

module.exports = getSchemaId;
