const mongoose = require('mongoose');

const contactShcema=mongoose.Schema({
name : {type : String,
        require : true},
telephone : {
    type : Number},
email : {type : String,
        require : true},
date : {type : Date,
default : Date.now}
});


module.exports = mongoose.model('Contacts',contactShcema)