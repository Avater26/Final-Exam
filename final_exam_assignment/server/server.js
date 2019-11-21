module.exports = async function (app) {
    try {
        await app.listen(process.env.PORT);
        console.log("http://localhost:" + process.env.PORT);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}