const axios = require('axios');
const {getAxiosConfig} = require('./axiosUtils');
const updateSchemaFile = require('./updateSchemaFile')
const {POSTMAN_API_BASE_URL} = require('./constants');


jest.mock('axios');
jest.mock('./axiosUtils', () => {
    return {
        getAxiosConfig: jest.fn().mockReturnValue({}),
    };
});
const axiosPut = axios.put;

describe('test updateSchemaFile', () => {
    test('calls the Postman API with the proper payload', async () => {
        axiosPut.mockResolvedValue({status: 200});
        await updateSchemaFile('API_KEY', 'API_ID', 'SCHEMA_ID', 'contents', 'index.json');
        expect(axiosPut).toHaveBeenCalledTimes(1);
        expect(getAxiosConfig).toHaveBeenCalledTimes(1);
        expect(getAxiosConfig).toHaveBeenCalledWith('API_KEY');
        expect(axiosPut).toHaveBeenCalledWith(
            `${POSTMAN_API_BASE_URL}/apis/API_ID/schemas/SCHEMA_ID/files/index.json`,
            {'content': 'contents'},
            {},
        );
    });
});

