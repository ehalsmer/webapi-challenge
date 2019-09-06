// get / get all actions

// get /:id get action by action id

// put /:id edit action by id

const express = require("express");
const router = express.Router();
router.use(express.json());

const aModel = require("../data/helpers/actionModel");

//// middleware

function validateId(req, res, next){
    let id = req.params.id
    if (id) {
        aModel
          .get(id)
          .then(response => {
            if (response) {
              req.action = response;
              next();
            } else {
              res.status(400).json({ message: "invalid action id" });
            }
          })
          .catch(error => {
            res.status(500).json({ error: "error looking up that action id" });
          });
      } else {
        res.status(400).json({ message: "provide an action id" });
      }
}

function validateAction(req, res, next) {
    if (Object.keys(req.body).length == 0) {
      res.status(400).json({ message: "missing required action data" }).end();
    } else if (!req.body.description) {
      res.status(400).json({ message: "missing required description field" }).end();
    } else if (req.body.description.length >= 128) {
      res
        .status(400)
        .json({ message: "description too long - enter up to 128 characters" }).end();
    } else if (!req.body.notes) {
      res.status(400).json({ message: "missing required notes field" }).end();
    } else if (
      typeof req.body.description != "string" ||
      typeof req.body.notes != "string"
    ) {
      res
        .status(400)
        .json({ message: "description and notes must be of type string" }).end();
    } else {
      req.action = { ...req.action, ...req.body};
      next();
    }
  }

// CRUD operations on actions which don't need a project ID:

router.get("/", (req, res) => {
    aModel.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "error getting actions"})
    })
})

router.get("/:id", validateId, (req, res) => {
    res.status(200).json(req.action)
})

router.put("/:id", validateId, validateAction, (req, res) => {
    aModel.update(req.params.id, req.action)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "error updating action"})
    })
})

module.exports = router;
