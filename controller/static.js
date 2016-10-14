var router = require ('express').Router()
router.use(require ('express').static(__dirname + '/../assets'))
router.get('/',function(req ,res , next)
{
    res.sendfile('layout/app.html')
})
router.use(require ('express').static(__dirname + '/../templates'))
module.exports = router