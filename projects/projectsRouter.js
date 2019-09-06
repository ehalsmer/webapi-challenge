/*
get /projects           get()
get /projects/:id       get(id)
post /projects          insert(object) // returns new resource
put /projects/:id       update(id, object) // returns updated resource or null
del /projects/:id       remove(id) // returns number of records deleted

middleware: id validator (check it exists), project object validator (name and description required)

*/

const express = require("express");
const router = express.Router();
router.use(express.json());

const pModel = require("../data/helpers/projectModel");

//// middleware:

function validateId(req, res, next) {
  let id = req.params.id;
  // console.log(id)
  if (id) {
    pModel
      .get(id)
      .then(response => {
        if (response) {
          req.project = response;
          next();
        } else {
          res.status(400).json({ message: "invalid id" });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "error looking up that id" });
      });
  } else {
    res.status(400).json({ message: "provide an id" });
  }
}

function validateProject(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).json({ message: "missing required project data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "missing required description field" });
  } else if (typeof req.body.description != 'string' || typeof req.body.name != 'string') {
    res.status(400).json({error: "description and name must be of type string"})
  }
  next();
}

//// CRUD operations:
// get an array of all projects
router.get("/", (req, res) => {
  pModel
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Error getting projects" });
    });
});

// get a project by id
router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.project);
});

// post a new project
router.post("/", validateProject, (req, res) => {
  pModel.insert(req.body)
  .then(response => {
      res.status(201).json(response)
  })
  .catch(error => {
      console.log(error)
      res.status(500).json({error: 'error adding project to database'})
  })
});

module.exports = router;
