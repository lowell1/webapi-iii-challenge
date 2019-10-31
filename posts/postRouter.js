const express = require('express');
const db = require("./postDb");
const router = express.Router();
router.use(validatePostId);

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    db.getById(req.params.id)
    .then(posts => posts.length ? next() : res.status(404).json({error: "no posts match id"}))
    .catch(() => res.status(500).json({error: "could not retrieve post information"}));
};

module.exports = router;