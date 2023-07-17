# push-openapi-to-postman

> This code is part of a blog post and is **not** actively maintained by Postman.

Pushes an OpenAPI definition in your repository to Postman and creates a new API version.

You will need to add the following values to your repository:

- The `API_ID` environment variable that contains the ID of the API you want to update.
- The `POSTMAN_API_KEY` secret that contains your valid Postman API key. The API key requires admin permissions.

## Usage

The following is an example of manual trigger and its required input:

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

**Note:**

- The `path-to-definition` value must point to the file in your repo that contains your OpenAPI definition.
- Your OpenAPI definition must be in JSON format.
- The file name in your API schema must match the `api-path-to-file-name` value.

## License

MIT