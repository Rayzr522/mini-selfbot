module.exports = async function (message, args) {
    const messages = await message.channel.fetchMessages({
        before: message.id,
        limit: parseInt(args[0]) || 1
    });

    const me = this.client.user.id;
    const results = await Promise.all(
        messages.filter(message => message.author.id === me)
            .map(message => message.delete())
    );

    message.edit(`:fire: Pruned \`${results.length}\` messages.`)
        .then(m => m.delete(5000));
}