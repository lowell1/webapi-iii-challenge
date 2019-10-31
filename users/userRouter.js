const express = require('express');
const router = express.Router();
const db = require("./userDb");

router.use(validateUser, validatePost, validateUserId);

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware


const validateUser = (req, res, next) => {
    if(req.body) {
        if(req.body.name)
            next();
        else
            req.status(400).json({ message: "missing required name field" });
    } else {
        res.status(400).json({ message: "missing user data" });
    }
}

const validatePost = (req, res, next) => {
    if(req.body) 
        if(req.body.text)
            next();
        else
            rest.status(400).json({ message: "missing required text field" });
    else 
        req.status(400).json({ message: "missing post data" });
}

const validateUserId = (req, res, next) => {
    db.getById(req.params.id)
    .then(users => {
        if(users.length) {
            req.body.user = {id: req.params.id}
            next();
        } else {
            res.status(400).json({ message: "invalid user id" });
        }
    })
    .catch(() => res.status(500).json({message: "could not retrieve user information from database"}))
}


module.exports = router;
