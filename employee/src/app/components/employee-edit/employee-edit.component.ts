import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee={
    id:'',
    email:'',
    fname:'',
    lname:'',
    dob:'',
    address:'',
    phone:'',
    password:''
  }
  temp={
    password:''
  }
  constructor(private dataService:DataService, private router:Router) { 
    const editEmployee = JSON.parse(localStorage.getItem('isEditEmployee'));
    if(editEmployee == null){
      this.router.navigateByUrl('/adminHome');
    }
    this.employee.id =editEmployee._id;
    this.employee.email =editEmployee.email;
    this.employee.fname =editEmployee.fname;
    this.employee.lname =editEmployee.lname;
    this.employee.dob =editEmployee.dob;
    this.employee.address =editEmployee.address;
    this.employee.phone =editEmployee.phone;
  }

  ngOnInit() {
  }

  onUpdate(){
    if(this.employee.fname !='' && this.employee.lname !='' && this.employee.email !='' && this.employee.dob !='' && this.employee.address !=''){
        var cpass = this.temp.password;
        if(this.employee.password == cpass){
          const token = JSON.parse(localStorage.getItem('isAdmin'));
          this.dataService.updateEmployee(this.employee, token.data).subscribe(employee =>{
          this.router.navigateByUrl('/adminHome');
          });

        }
        else{
          alert("mismatch confirm password");
        }
    } 
    else{
      alert("Please Fill All Credentials First");
    }   
  }
}
