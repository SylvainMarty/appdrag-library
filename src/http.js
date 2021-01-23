const axios = require('axios');

module.exports = {
    createClient (baseUrl, options) {
        return axios.create(Object.assign({
            baseURL: baseUrl,
            timeout: 10000
        }, options));
    }
}