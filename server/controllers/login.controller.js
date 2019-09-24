const express = require('express');
const router = express.Router();
const LoginSchema = require("../schemas/login.schema");

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

    let loginClass = new LoginSchema();

    loginClass.password = req.body.password;
    loginClass.username = req.body.username;

    loginClass.find({
        username: loginClass.username,
        password: loginClass.password
    }, function (err, result) {

        if (err) return res.send(err);

        return res.json(result);
    });
});

router.post('/save', function (req, res, next) {

    let loginClass = new LoginSchema();

    loginClass.password = req.body.password;
    loginClass.username = req.body.username;

    loginClass.save(function (err, result) {

        if (err) return res.send(err);

        return res.json(result);
    });
});

router.post('/get', function( req, res) {

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
        }

        return res.json({
            success: true,
            username: data.username,
            id: data._id
        });
    });
});

module.exports = router;
