const express = require('express');
const router = express.Router();
const db = require("./userDb");
const middleware = require("./middleware");

router.use(middleware);

router.post('/', (req, res) => {
    db.insert(req.body)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(() => res.status(500).json({message: "error adding user to database"}));
});

router.post('/:id/posts', (req, res) => {
});

router.get('/', (req, res) => {
    db.get()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({message: "error retrieving users from database"}));
});

router.get('/:id', (req, res) => {
    db.getById(req.params.id)
    .then(user => user ? res.status(200).json(user) : res.status(404).json({message: "user not found"}))
    .catch(() => res.status(500).json({message: "error retrieving user information"}));
});

router.get('/:id/posts', (req, res) => {
    db.getById(req.params.id)
    .then(user => user ? 
        db.getUserPosts(req.params.id)
        .then(posts => res.status(200).json(posts))
        .catch(() => res.status(500).json({message: "could not retrieve user's posts"})) : 
        res.status(404).json({message: "user not found"}))
        .catch(() => res.status(500).json({message: "error retrieving user information"}));
    });
    
    router.delete('/:id', (req, res) => {
        db.getById(req.params.id)
        .then(user => user ? 
            db.remove(req.params.id)
            .then(() => res.status(200).json(user))
            .catch(() => res.status(500).json({message: "error removing user"})): 
            res.status(404).json({message: "user not found"}))
        .catch(() => res.status(500).json({message: "error retrieving user information"}));
});

router.put('/:id', (req, res) => {
    db.getById(req.params.id)
    .then(user => {
        if(user) {
            db.update(req.params.id, {...user, name: req.body.name})
            .then(() => res.sendStatus(200))
            .catch(() => res.status(500).json({message: "could not update user name"}))
        } else {
            res.status(404).json({message: "user id not found"})
        }
    })
    .catch(() => res.status(500).json({message: "could not retrieve user information"}));
});

//custom middleware


// const validateUser = (req, res, next) => {
//     console.log("validateuser");
//     if(req.body) {
//         if(req.body.name) {
//             console.log("name = ", req.body.name);
//             next();
//         }
//         else
//             res.status(400).json({ message: "missing required name field" });
//     } else {
//         res.status(400).json({ message: "missing user data" });
//     }
// }

// const validatePost = (req, res, next) => {
//     console.log("validatepost");
//     if(req.body) 
//     if(req.body.text)
//             next();
//         else
//             rest.status(400).json({ message: "missing required text field" });
//             else 
//         req.status(400).json({ message: "missing post data" });
// }

// const validateUserId = (req, res, next) => {
//     console.log("validateuserid");
//     if(req.params.id)
//     db.getById(req.params.id)
//     .then(users => {
//             if(users.length) {
//                 req.body.user = {id: req.params.id}
//                 next();
//             } else {
//                 res.status(400).json({ message: "invalid user id" });
//             }
//         })
//         .catch(() => res.status(500).json({message: "could not retrieve user information from database"}));
//     else
//         next();
// }



// router.use(express.json())
// router.use(validateUser);
// router.use(validatePost);
// router.use(validateUserId);
// router.use(validateUser, validatePost, validateUserId);

module.exports = router;