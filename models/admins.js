var mongoose = require('mongoose');
var crypto = require('crypto');
// admin Schema
var adminsSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

var Admin = module.exports = mongoose.model('Admin',adminsSchema);

//database query

//check admins

module.exports.getAdmin = function(username, callback){
    var query = {email: username};
    Admin.findOne(query, callback);
    
}


module.exports.getAdminById = function(id, callback){
    Admin.findById(id, callback);
}



module.exports.updateAdmin = function(id, admin, callback, options){
    var  query = {_id: id};
    var update = {
        password: admin.password
    }
    Admin.findOneAndUpdate(query, update, options, callback);
}
module.exports.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  
