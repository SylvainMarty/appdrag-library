const DEFAULT_JWT_OPTIONS = {
    algorithms: ['RS256']
};

const getToken = (event) => {
    let bearer = event["HEADERS"]["authorization"] || event["HEADERS"]["Authorization"];
    return bearer.replace('Bearer ', '');
}

const getKey = (jwksClient) => {
    return (header, callback) => {
        jwksClient.getSigningKey(header.kid, function(err, key) {
            let signingKey = key.publicKey || key.rsaPublicKey;
            callback(err, signingKey);
        });
    }
}

const verifyRequest = async (jwt, jwksClient, request, options) => {
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

const verify = async (jwt, jwksClient, request, options) => {
    try {
        await verifyRequest(jwt, jwksClient, request, Object.assign(DEFAULT_JWT_OPTIONS, options);
    } catch (e) {
        return e;
    }
};

module.exports = {
    getToken,
    verify,
};
