var router = require('express').Router()
var bcrypt = require('bcryptjs')
var jwt = require('jwt-simple')
var User = require('../../models/user')
var config = require('../../config')
var websocket = require('../../websockets')
var pubsub = require('../../pubsub')





router.get('/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        return res.send(401)
    }
    var auth = jwt.decode(req.headers['x-auth'], config.secret)
    console.log('get user')
    User.findOne({username: auth.username}, function (err, user) {
        if (err) { return next(err) }
        config.loginUsers.push(user)
        pubsub.publish('new_user' ,  config.loginUsers)
        //websocket.broadcast()
        res.json(user)
    })
})

router.post('/', function (req, res, next) {
    var user = new User({username: req.body.username})
    console.log("user saved")
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) { return next(err) }
        user.password = hash
        user.save(function (err) {
            if (err) { return next(err) }

            res.send(201)
        })
    })
})
pubsub.subscribe('new_user', function (users) {
    websocket.broadcast('new_user' , users)
})

module.exports = router