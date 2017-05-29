module.exports = async function (message, args) {
    const data = await global.methods.get("http://random.cat/meow");

    try {
        json = JSON.parse(data);
    } catch (error) {
        console.error(error);
        return message.edit(':x: Failed to load cat image. Check the console for more info.');
    }

    message.edit(json.file);
};