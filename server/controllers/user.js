const express = require('express');
const router = express.Router();
const User = require('../schemas/user.schema');

// Home page route.
router.get('/', function (req, res) {
    const uniqueId = req.sessionID;
    res.send('Wiki home page <b>' + uniqueId + '</b><br><br>Authenticated: ' + req.isAuthenticated() );
});

// Get All Details Route.
router.get('/get-all-details', function (req, res) {
    User.find(( err, data ) => {

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

// Get One Specific Route
router.get('/get-details', function (req, res) {
    
    let thisUserId = req.session.userid;

    if (!thisUserId || thisUserId == null)
    {
        return res.json({
            success: false,
            error: {
                message: 'Could not fetch data.'
            },
            data: thisUserId
        });
    };

    // User.findById("5d6fd8c1dd7d151924edd1cc", ( err, result ) => {
    User.findOne({
        userId: thisUserId
    }, ( err, result ) => {

        if( err ) {
            return res.json({
                success: false,
                error: err
            });
        };

        return res.json({
            success: true,
            userId: thisUserId,
            data: result
        });
    });
});

router.post('/add-details', function(req, res) {

    let sample = new User();

    sample.dateofbirth = req.body.dateofbirth;
    sample.height = req.body.height;
    sample.weight = req.body.weight;
    sample.heightType = req.body.heightType;
    sample.weightType = req.body.weightType;
    sample.gender = req.body.gender;
    sample.userId = req.session.userid;

    if (!sample.userId || sample.userId == null)
    {
        return res.json({
            success: false,
            error: {
                message: 'Could not add data.'
            }
        })
    }

    sample.save(function(err, result) {
        
        if(err) return res.send(err);

        return res.json(result);
    });
});

module.exports = router;
