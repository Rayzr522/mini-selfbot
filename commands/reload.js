module.exports = function (message, args) {
    let reloaded = 0;

    Object.keys(require.cache).forEach(key => {
        if (key.startsWith(__dirname)) {
            delete require.cache[key];
            reloaded++;
        }
    });

    message.edit(`:+1: Reloaded \`${reloaded}\` commands.`)
        .then(m => m.delete(5000));
};