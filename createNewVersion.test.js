const axios = require('axios');
const {getAxiosConfig} = require('./axiosUtils');
const createNewVersion = require('./createNewVersion')
const {POSTMAN_API_BASE_URL} = require('./constants');

jest.mock('axios');
jest.mock('./axiosUtils', () => {
    return {
        getAxiosConfig: jest.fn().mockReturnValue({}),
    };
});
const axiosPost = axios.post;

describe('test updateSchemaFile', () => {
    test('calls the Postman API with the proper payload', async () => {
        axiosPost.mockResolvedValue({status: 200, data: {id: "CREATED_ID"}});
        const versionCreated = await createNewVersion('API_KEY', 'API_ID', 'SCHEMA_ID', '1.0.0', 'First release');
        expect(axiosPost).toHaveBeenCalledTimes(1);
        expect(getAxiosConfig).toHaveBeenCalledTimes(1);
        expect(getAxiosConfig).toHaveBeenCalledWith('API_KEY');
        expect(axiosPost).toHaveBeenCalledWith(
            `${POSTMAN_API_BASE_URL}/apis/API_ID/versions`,
            {
                'name': '1.0.0',
                'releaseNotes': 'First release',
                'collections': [],
                'schemas': [
                    {
                        'id': 'SCHEMA_ID'
                    }
                ]
            },
            {},
        );
        expect(versionCreated).toEqual("CREATED_ID")
    });
});

