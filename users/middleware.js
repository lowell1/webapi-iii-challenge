module.exports = [
    (req, res, next) => {
        console.log("validateuser");
        if(req.body) {
            if(req.body.name) {
                console.log("name = ", req.body.name);
                next();
            }
            else
                res.status(400).json({ message: "missing required name field" });
        } else {
            res.status(400).json({ message: "missing user data" });
        }
    },
    
    (req, res, next) => {
        console.log("validatepost");
        if(req.body) 
            if(req.body.text)
                next();
            else
                res.status(400).json({ message: "missing required text field" });
        else 
            res.status(400).json({ message: "missing post data" });
    },
    
    (req, res, next) => {
        console.log("validateuserid");
        if(req.params.id)
        db.getById(req.params.id)
        .then(users => {
                if(users.length) {
                    req.body.user = {id: req.params.id}
                    next();
                } else {
                    res.status(400).json({ message: "invalid user id" });
                }
            })
            .catch(() => res.status(500).json({message: "could not retrieve user information from database"}));
        else
            next();
    }
]