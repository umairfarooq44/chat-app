var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chat',function(){
    console.log('Mongodb connected')
})
module.exports = mongoose
