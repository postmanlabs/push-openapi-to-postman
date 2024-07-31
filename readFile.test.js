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
    test("retrieves the file contents if it's a valid YAML and formats code", async () => {
        jest.spyOn(fs, 'readFile').mockImplementation(() => Buffer.from('foo: [24,"42"]\n'));
        const content = await readFile("index.yaml");
        expect(content).toEqual("foo: [24,\"42\"]\n");
    });
    test("throws an exception when the contents of the file are not a valid YAML", async () => {
        jest.spyOn(fs, 'readFile').mockImplementation(() => Buffer.from('foo: ,'));
        await expect(readFile("index.yaml")).rejects.toThrow(SyntaxError) ;
    });
});

