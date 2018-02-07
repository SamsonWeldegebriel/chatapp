var mongoose= require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    gname: String,
    description: String,
    photo: String,
    users: []

}, { collection: 'usergroup'});


module.exports= mongoose.model('usergroup', GroupSchema);