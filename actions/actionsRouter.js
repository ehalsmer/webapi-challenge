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

module.exports = router;
