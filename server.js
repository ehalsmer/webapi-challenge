const express = require('express');

const server = express();
const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');

server.use("/projects/", projectsRouter)
server.use("/actions/", actionsRouter)

// server.get('/', (req, res) => {
//     res.status(200).json({message: "Server is up!"})
// })


module.exports = server;