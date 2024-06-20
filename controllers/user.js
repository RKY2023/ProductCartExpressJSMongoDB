const User = require("../models/user");

exports.getPage = (req, res, next) => {
    User.findAll()
    .then((users) => {
        res.render("registration", {
            users: users,
          });
    }).catch(err => console.log(err));
};

exports.postUser = (req, res, next) => {
    const name = req.body.username;
    const email = req.body.email;
    const phoneno = req.body.phoneno;
    console.log('t');
    User.create({
        name: name,
        email: email,
        phoneNo: phoneno
    })
    .then((result) => {
        // console.log(result);
        res.redirect('/user');
    }).catch(err => console.log(err));
};

exports.getUser = (req, res, next) => {
   
    
};

exports.deleteUser = (req, res, next) => {
    const userId = req.body.userId;
    User.findByPk(userId).then((user) => {
        return user.destroy();
    }).then((result) => {
        res.redirect('/user');
    }).catch(err => console.log(err));
};
