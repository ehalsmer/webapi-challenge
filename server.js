const express = require('express');

const server = express();
const projectsRouter = require('./projects/projectsRouter');

server.use("/projects/", projectsRouter)

// server.get('/', (req, res) => {
//     res.status(200).json({message: "Server is up!"})
// })


module.exports = server;