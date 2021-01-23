const axios = require('axios');

const DEFAULT_AXIOS_OPTIONS = {
    timeout: 10000
};

module.exports = {
    createClient (baseUrl, options) {
        return axios.create(Object.assign({
            baseURL: baseUrl
        }, DEFAULT_AXIOS_OPTIONS, options));
    }
}