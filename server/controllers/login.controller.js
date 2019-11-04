const express = require('express');
const router = express.Router();
const LoginSchema = require("../schemas/login.schema");
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

var sess;

//hashing a password before saving it to the database
// LoginSchema.pre('save', function (next) {
    
//     var user = this;
    
//     bcrypt.hash(user.password, 10, function (err, hash) {
//         if (err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     })
// });

router.post('/', function (req, res, next) {
    
    // let sess = req.session;

    let loginClass = new LoginSchema();

    loginClass.password = req.body.password;
    loginClass.username = req.body.username;

    LoginSchema.findOne({
        username: loginClass.username,
        password: loginClass.password
    }, function (err, result) {

        req.session.username = result.username;
        req.session.userid = result._id;

        return res.json({
            success: true,
            data: {
                username: result.username,
                id: result.id
            }
        });
    });
});

router.get('/authrequired', (req, res) => {
    // console.log('Inside GET /authrequired callback')
    console.log(`\nUser authenticated? ${req.isAuthenticated()}\n`)
    if (req.isAuthenticated()) {
        res.send('you hit the authentication endpoint\n')
    } else {
        res.send('not yet authentication\n');
    }
})

// let loginClass = new LoginSchema();

// loginClass.password = req.body.password;
// loginClass.username = req.body.username;

// loginClass.find({
//     username: loginClass.username,
//     password: loginClass.password
// }, function (err, result) {

//     if (err) return res.send(err);

//     return res.json(result);
// });

router.post('/save', function (req, res, next) {

    let loginClass = new LoginSchema();

    loginClass.password = req.body.password;
    loginClass.username = req.body.username;

    loginClass.save(function (err, result) {

        if (err) return res.send(err);

        return res.json(result);
    });
});

router.post('/get', function( req, res ) {

    let loginClass = new LoginSchema();

    loginClass.password = req.body.password;
    loginClass.username = req.body.username;

    LoginSchema.findOne({
        username: loginClass.username,
        password: loginClass.password
    }, (err, data) => {

        if (err) {
            return res.json({
                success: false,
                error: err
            });
        };
            
        sess = req.session;

        sess.username = loginClass.username;

        return res.json({
            success: true,
            username: data.username,
            id: data._id
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        // res.redirect('/');
        return res.json({
            success: true
        })
    });

});

module.exports = router;
