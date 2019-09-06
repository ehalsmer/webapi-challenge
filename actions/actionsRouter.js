// get / get all actions

// get /:id get action by action id

// put /:id edit action by id

const express = require("express");
const router = express.Router();
router.use(express.json());

const aModel = require("../data/helpers/actionModel");

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

module.exports = router;
