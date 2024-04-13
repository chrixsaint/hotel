// Import the built-in Node.js module 'http'
const http = require("http");
const db = require("./models")
const app = require("./app");

const port = 30071;
async function initdb() {
    await db.sequelize.sync({force: true });
};
initdb();
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







