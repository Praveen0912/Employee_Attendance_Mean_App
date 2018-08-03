var mongoose = require('mongoose');

// Attednance Schema
var attendanceSchema = mongoose.Schema({
    empid:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    check:{
        type:Boolean,
        default: false
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Attendance = module.exports = mongoose.model('Attendance',attendanceSchema);

//database query

//get attendace

module.exports.getAttendance = function(callback, limit){
    Attendance.find(callback).limit(limit);
}

module.exports.getAttendanceById = function(id, callback){
    Attendance.findById(id, callback);
}

module.exports.addAttendance = function(attendace, callback){
    Attendance.create(attendace, callback);
}

module.exports.updateAttendance = function(id, attendance, callback, options){
    var  query = {_id: id};
    var update = {
        check: attendance.check
    }
    Attendance.findOneAndUpdate(query, update,options,callback);
}

module.exports.removeAttendance = function(id, callback){
    var  query = {_id: id};
    Attendance.remove(query,callback);
}