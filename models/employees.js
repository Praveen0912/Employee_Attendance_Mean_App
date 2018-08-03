var mongoose = require('mongoose');
var crypto = require('crypto');

// employee Schema
var employeesSchema = mongoose.Schema({
    email:{
        type: String,
        unique:true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    hash: String,
    salt: String
});

var Employee = module.exports = mongoose.model('Employee',employeesSchema);

//database query

//get employees

module.exports.getEmployees = function(callback, limit){
    Employee.find(callback).limit(limit);
}

module.exports.getEmployee = function(email, callback){
    var query = {email: email};
    Employee.findOne(query, callback);
    
}
module.exports.getEmployeeById = function(id, callback){
    Employee.findById(id, callback);
}

module.exports.addEmployee = function(employee, callback){
    var password = setPassword(employee.password);
    Employee.create({
      email : employee.email,
      name : employee.name,
      dob : employee.dob,
      address: employee.address,
      phone: employee.phone,
      salt: password.salt,
      hash: password.hash
    }, callback); 
}

module.exports.updateEmployee = function(id, employee, callback, options){
    var  query = {_id: id};
    var update = {
        name: employee.name
    }
    Employee.findOneAndUpdate(query, update,options,callback);
}

module.exports.removeEmployee = function(id, callback){
    var  query = {_id: id};
    Employee.remove(query,callback);
}

function setPassword(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return ({salt:this.salt,hash:this.hash});
  };
  