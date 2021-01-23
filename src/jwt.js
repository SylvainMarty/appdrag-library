const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');

const DEFAULT_JWT_OPTIONS = {
    algorithms: ['RS256']
};

const createJwksClient = (endpoint) => {
    return jwks({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${endpoint}.well-known/jwks.json`
    })
};

const getToken = (event) => {
    let bearer = event["HEADERS"]["authorization"] || event["HEADERS"]["Authorization"];
    if (!bearer) {
        throw new Error('No authorization header found');
    }
    return bearer.replace('Bearer ', '');
};

const getKey = (jwksClient) => {
    return (header, callback) => {
        jwksClient.getSigningKey(header.kid, function(err, key) {
            let signingKey = key.publicKey || key.rsaPublicKey;
            callback(err, signingKey);
        });
    }
};

const verifyRequest = async (jwksClient, request, options) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(getToken(request), getKey(jwksClient), options, (err, key) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

const verify = async (jwksClient, request, options) => {
    try {
        await verifyRequest(jwksClient, request, Object.assign(DEFAULT_JWT_OPTIONS, options));
    } catch (e) {
        return e;
    }
};

module.exports = {
    createJwksClient,
    getToken,
    verify,
};
