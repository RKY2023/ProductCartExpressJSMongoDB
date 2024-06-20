const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router();


// routes /admin/add-product => GET
router.get("/login", (req, res, next) => {
  res.send(
    '<form action="/" method="POST"> <input type="text" name="username" /><button type="submit">login</button> </form>'
  );
});
// routes
router.post("/", (req, res, next) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
     
    if(req.body.username){
        localStorage.setItem('username', req.body.username);
        const username = localStorage.getItem('username');
        const text = username + ': ' +req.body.username;
        fs.writeFileSync('username.txt', text);
    }
    next();
});

router.post("/", (req, res, next) => {
    let text = fs.readFileSync('username.txt');
    // if(req.body.username){
    //     localStorage.setItem('username', req.body.username);
    //     const stringbody = req.body.username+': '+req.body.username;
    //     fs.writeFileSync('username.txt', stringbody);
    // }
    if(req.body.message){
        text = text+req.body.message;
        fs.writeFileSync('username.txt', text);
    }
    
    const formContent = '<form action="/" method="POST"><input type="text" name="message"/><button type="submit">message</button></form>';
    res.send('<html>'+text+'<br/>'+formContent+'</html>');
    console.log('tt',req.body);
    // res.redirect("/");
});

module.exports = router;
