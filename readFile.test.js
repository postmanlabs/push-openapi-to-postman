const { promises: fs } = require('fs');
const readFile = require('./readFile');


describe('test readFile', () => {
    test("retrieves the file contents if it's a valid JSON and formats code", async () => {
        jest.spyOn(fs, 'readFile').mockImplementation(() => Buffer.from('{"field": "value"}'));
        const content = await readFile("index.json");
        expect(content).toEqual('{\n  "field": "value"\n}');
    });
    test("throws an exception when the contents of the file are not a valid JSON", async () => {
        jest.spyOn(fs, 'readFile').mockImplementation(() => Buffer.from('wrong json'));
        await expect(readFile("index.json")).rejects.toThrow(SyntaxError) ;
    });
});

