import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeelogin',
  templateUrl: './employeelogin.component.html',
  styleUrls: ['./employeelogin.component.css']
})
export class EmployeeloginComponent implements OnInit {
  token:any;
  employee ={
    email:'',
    password:''
  }
  constructor(private dataService:DataService, private router:Router) { 
    const data = JSON.parse(localStorage.getItem('isEmployee'));
    if(data != null){
      this.router.navigateByUrl('/employeeHome');
    }
  }

  ngOnInit() {
  }

  login(){
   
    if(this.employee.email!='' && this.employee.password !=''){
      this.dataService.loginEmployee(this.employee).subscribe(tokenfromapi =>{
        this.token = tokenfromapi.data;
        if(tokenfromapi.message == 'NoUser'){
          alert("Your are not an employee of this company");
          
        }
        if(tokenfromapi.message == 'WrongPassword'){
          alert("Wrong Password");
          
        }

        if(this.token != undefined){
         var employeeLink = {
           "visibility":"hidden"
          } 
         localStorage.clear();
         localStorage.setItem('isEmployee',JSON.stringify(tokenfromapi));
         localStorage.setItem('isEmployeeLink',JSON.stringify(employeeLink));
         this.router.navigateByUrl('/employeeHome');
        }
        
      });
   }
   else{
     if(this.employee.email !=''){
       if(this.employee.password ==''){
         alert('Please Enter Password');
       }
     }
     if(this.employee.password !=''){
       if(this.employee.email ==''){
        alert('Please Enter Your Email');
       }
     }
     if(this.employee.email =='' && this.employee.password == ''){
       alert('Please Enter Email & Password');
     }
   }
  }

}
