var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var path = require('path');
var crypto = require('crypto');


Admin = require('./models/admins');
Employee = require('./models/employees');
Attendance = require('./models/attendance');

//adding middleware  -cors
app.use(cors());

//body - parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//connect to mongoose 
mongoose.connect('mongodb://root:123@localhost:27017/management?authSource=admin');
var db = mongoose.connection;


//Admin Login
app.post('/api/admin_login',function(req,res){
    var req_admin_username = req.body.username;
    var req_admin_password = req.body.password;
    Admin.getAdmin(req_admin_username,function(err, admin){
        if(err){
            throw err;
        }
        else{
            if(admin == null){    
              res.send({message: 'NoUser'});  
            }
            else{
                var hash = crypto.pbkdf2Sync(req_admin_password, admin.salt, 1000, 64, 'sha512').toString('hex');
             if(admin.hash === hash){ 
                // create a token
                 var token = jwt.sign({
                    id: admin._id,
                    email: admin.email,
                    name: admin.name
                  }, 'secretkey', {
                    expiresIn: 86400 // expires in 24 hours
                });
                
                res.status(200).send({ data: token });
             } 
             else{
                res.send({message: 'WrongPassword'});
             }
            }
        }
        
    });

});

//To fetch employee details by verify token
app.get('/api/admin_check',verifyToken,(req, res)=>{
      jwt.verify(req.token,'secretkey',function(err, authData){
       if(err){
        res.sendStatus(403);

       } else{
        Employee.getEmployees(function(err, employees){
            if(err){
                throw err;
            }
            else{
                res.json(employees);
            }
        });
       }
    });
    
});

//Delete employee on admin portal
app.post('/api/delete_employee',verifyToken,(req, res)=>{
    jwt.verify(req.token,'secretkey',function(err, authData){
     if(err){
      res.sendStatus(403);

     } else{
        id = req.body.id;
        Employee.removeEmployee(id,function(err,employee){
            if(err){
               throw err;
            }
            res.json(true);
           });
           
     }
  });
  
});


//get admin details
app.get('/api/admin_details',verifyToken,(req, res)=>{
    jwt.verify(req.token,'secretkey',function(err, authData){
     if(err){
      res.sendStatus(403);

     } else{ 
           res.json(authData);
        
     }
  });
  
});

//employee registration by admin portal
app.post('/api/employee_register',verifyToken,(req, res)=>{
    jwt.verify(req.token,'secretkey',function(err, authData){
     if(err){
      res.sendStatus(403);

     } else{ 
         employee = req.body;
       Employee.addEmployee(employee, function (err, employee) {
            if (err) return res.status(500).send("There was a problem registering the employee.");
            else{
                res.json(true);
            }
            
          });
     }
  });
  
});



//Format of token
//Authorization:bearer<access_token>

//Verify Token
function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //check  if bearer is undefined

    if(typeof bearerHeader !== "undefined"){
     //split at space
     const bearer = bearerHeader.split(' ');
     //Get token from array
     const bearerToken = bearer[1];
     //set the token
     req.token = bearerToken;
    
     //next middleware
     next();
    }
    else{
       //Forbidden
       res.sendStatus(403);
    }
}




//UPDATE Admin
/*
app.put('/api/admins/:_id',function(req,res){
    var id = req.params._id;
    var genre = req.body;
    Genre.updateAdmin(id,admin,{},function(err,genre){
     if(err){
        throw err;
     }
     res.json(true);
    });
});
*/


//Employee Login
app.post('/api/employee_login',function(req,res){
    var req_employee_email = req.body.email;
    var req_employee_password = req.body.password;
    Employee.getEmployee(req_employee_email,function(err, employee){
        if(err){
            throw err;
        }
        else{
            if(employee == null){    
              res.send({message: 'NoUser'});  
            }
            else{
                var hash = crypto.pbkdf2Sync(req_employee_password, employee.salt, 1000, 64, 'sha512').toString('hex');
             if(employee.hash === hash){ 
                // create a token
                 var token = jwt.sign({id: employee._id,name: employee.name, dob:employee.dob, email: employee.email,
                    phone: employee.phone, address: employee.address}, 'secretkey', {
                    expiresIn: 86400 // expires in 24 hours
                });
                
                res.status(200).send({ data: token });
             } 
             else{
                res.send({message: 'WrongPassword'});
             }
            }
        }
        
    });

});

//To fetch employee details by verify token
app.get('/api/employee_check',verifyToken,(req, res)=>{
      jwt.verify(req.token,'secretkey',function(err, authData){
       if(err){
        res.sendStatus(403);

       } else{
        
                res.json(authData);
            }
       
    });
    
});




 

app.get('/api/employees/:_id',function(req,res){
    Employee.getEmployeeById(req.params._id,function(err, employee){
        if(err){
            throw err;
        }
        else{
            res.json(employee);
        }
    });
});

app.put('/api/employees/:_id',function(req,res){
    var id = req.params._id;
    var employee = req.body;
    Employee.updateEmployee(id,employee,{},function(err,employee){
     if(err){
        throw err;
     }
     res.json(true);
    });
});




//route attendance
app.get('/api/attendance',function(req,res){
    Attendance.getAttendance(function(err, attendance){
        if(err){
            throw err;
        }
        else{
            res.json(attendance);
        }
    });
});

app.post('/api/attendance', function(req,res){
    var attendance = req.body;
    Attendance.addAttendance(attendance,function(err, attendance){
        if(err){
            throw err;
        }
        res.json(attendance);
    });
});

app.get('/api/attendance/:_id',function(req,res){
    Attendance.getAttendanceById(req.params._id,function(err, attendance){
        if(err){
            throw err;
        }
        else{
            res.json(attendance);
        }
    });
});

app.put('/api/attendance/:_id',function(req,res){
    var id = req.params._id;
    var attendance = req.body;
    Attendance.updateAttendance(id,attendance,{},function(err,attendance){
     if(err){
        throw err;
     }
     res.json(true);
    });
});

//Delete attendance
app.delete('/api/attendance/:_id',function(req,res){
   var id = req.params._id;
    Attendance.removeAttendance(id,function(err,attendance){
     if(err){
        throw err;
     }
     res.json(true);
    });
});


app.listen(3000);
console.log("Running on port 3000");
