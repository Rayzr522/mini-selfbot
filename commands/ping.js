module.exports = function (message, args) {
    const now = new Date().getTime();
    const diff = now - message.createdTimestamp;

    message.edit(`Pong! \`${diff}ms\``)
        .then(m => m.delete(15000));
};