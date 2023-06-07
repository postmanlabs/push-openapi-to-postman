# push-openapi-to-postman

Pushes an OpenAPI definition in your repository to Postman, creating a new version on an existing API.


## Usage
Example of manual trigger, asking for the required inputs.

```yaml
name: Sync OpenAPI with Postman
on:
  workflow_dispatch:
    inputs:
      versionName:
        description: 'The new version name'
        required: true
        default: '1.0.0'
      releaseNotes:
        description: 'The new version release notes'
        required: false
        default: ''
jobs:
  sync-with-postman-api:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Push OpenAPI to Postman
        id: pushApi
        uses: davidespihernandez/push-openapi-to-postman@v1
        with:
          path-to-definition: ./api_definition.json
          postman-api-key: ${{ secrets.POSTMAN_API_KEY }}
          api-id: ${{ vars.API_ID }}
          api-path-to-file-name: index.json
          version-name: ${{ github.event.inputs.versionName }}
          release-notes: ${{ github.event.inputs.releaseNotes }}
```

For the previous example to work you need to define:
- An environment variable `API_ID` containing the API id that is going to be updated
- A secret called `POSTMAN_API_KEY` containing the Postman API key with admin permission on the API that is going to be modified.

Other things to take into account:

* Make sure the `path-to-definition` points to the file in your repo that contains your OpenAPI definition. 
* The OpenAPI definition must be in JSON format.
* Make sure the file name to update in your API schema matches the value on the `api-path-to-file-name` input.  


## License

MIT

