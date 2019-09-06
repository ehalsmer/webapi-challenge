/*
get /projects           get()
get /projects/:id       get(id)
post /projects          insert(object) // returns new resource
put /projects/:id       update(id, object) // returns updated resource or null
del /projects/:id       remove(id) // returns number of records deleted

middleware: id validator (check it exists), project object validator (name and description required)

*/

const express = require('express');
const router = express.Router();
router.use(express.json());

const pModel = require('../data/helpers/projectModel');

//// middleware:
//

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


//// CRUD operations:
// get an array of all projects
router.get('/', (req, res) => {
    pModel.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: 'Error getting projects'})
    })
})

// get a project by id
router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.project)
})

// post a new project



module.exports = router;
