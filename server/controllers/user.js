const express = require('express');
const router = express.Router();
const Sample = require("../schemas/sample");

// Home page route.
router.get('/', function (req, res) {
    res.send('Wiki home page');
});

// About page route.
router.get('/get-details', function (req, res) {
    Sample.find(( err, data ) => {

        if( err ) {
            return res.json({
                success: false,
                error: err
            });
        }

        return res.json({
            success: true,
            data: data
        });
    });
});

router.post('/add-details', function(req, res) {

    let sample = new Sample();

    sample.password = req.body.password;
    sample.username = req.body.username;

    sample.save(function(err, result) {
        
        if(err) return res.send(err);

        return res.json(result);
    });
});

module.exports = router;
