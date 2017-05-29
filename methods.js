const url = require('url');

exports.get = function (from) {
    return new Promise((resolve, reject) => {
        const parsed = url.parse(from);
        const method = require(parsed.protocol.replace(/:/g, ''));
        method.get(parsed, request => {
            let buffer = Buffer.alloc(0);

            request.on('data', chunk => {
                buffer = Buffer.concat([buffer, chunk]);
            });

            request.on('end', () => {
                resolve(buffer.toString());
            });

            request.on('error', error => {
                reject(error);
            });
        });
    });
};
