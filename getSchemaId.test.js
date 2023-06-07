const axios = require('axios');
const {getAxiosConfig} = require('./axiosUtils');
const getSchemaId = require('./getSchemaId')
const {POSTMAN_API_BASE_URL} = require('./constants');


jest.mock('axios');
jest.mock('./axiosUtils', () => {
    return {
        getAxiosConfig: jest.fn().mockReturnValue({}),
    };
});
const axiosGet = axios.get;

describe('test getSchemaId', () => {
    test('calls the Postman API with the proper URL', async () => {
        axiosGet.mockResolvedValue({status: 200, data: {schemas: [{id: 'SCHEMA_ID'}]}});
        await getSchemaId('API_KEY', 'API_ID');
        expect(axiosGet).toHaveBeenCalledTimes(1);
        expect(getAxiosConfig).toHaveBeenCalledTimes(1);
        expect(getAxiosConfig).toHaveBeenCalledWith('API_KEY');
        expect(axiosGet).toHaveBeenCalledWith(
            `${POSTMAN_API_BASE_URL}/apis/API_ID?include=schemas`,
            {},
        );
    });
});

