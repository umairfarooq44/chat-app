var router = require('express').Router()
var config = require('../../config')

router.get('/' , function(req , res , next){
    //console.log('login users walalalala')
    console.log(config.loginUsers.length ,'ksjdfk')
    res.json(config.loginUsers)
})
module.exports =router