const axios = require('axios');

const DEFAULT_AXIOS_OPTIONS = {
    timeout: 10000
};

module.exports = {
    createClient (baseUrl, bearerToken, options) {
        let instance = axios.create(Object.assign({
            baseURL: baseUrl,
        }, DEFAULT_AXIOS_OPTIONS, options));
        if (bearerToken) {
            instance.defaults.headers.common.Authorization = `Bearer ${bearerToken}`;
        }
        return instance;
    }
}