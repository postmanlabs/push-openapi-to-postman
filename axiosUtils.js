const getAxiosConfig = (postmanApiKey) => {
    return {
        headers: {
            'x-api-key': postmanApiKey,
            Accept: 'application/vnd.api.v10+json',
            'Content-Type': 'application/json',
        }
    }
}

module.exports = {getAxiosConfig};
