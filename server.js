const express = require("express");

const server = express();
const projectsRouter = require("./projects/projectsRouter");
const actionsRouter = require("./actions/actionsRouter");

function logger(req, res, next) {
  console.log(req.method, req.originalUrl, new Date());
  next();
}

server.use("/projects/", logger, projectsRouter);
server.use("/actions/", logger, actionsRouter);

// server.get('/', (req, res) => {
//     res.status(200).json({message: "Server is up!"})
// })

module.exports = server;
