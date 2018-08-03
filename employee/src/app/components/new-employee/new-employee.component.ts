import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  employee={
    email:'',
    name:'',
    dob:'',
    address:'',
    phone:'',
    password:''
  }
  temp={
    password:''
  }
  constructor(public dataService:DataService, private router: Router) {
    const token = JSON.parse(localStorage.getItem('isAdmin'));
    if(token == null){
      this.router.navigateByUrl('/admin');
    }
   }

  ngOnInit() {
  }
  
  onSubmit(){
    var cpass = this.temp.password;
    if(this.employee.password == cpass){
      const token = JSON.parse(localStorage.getItem('isAdmin'));
      this.dataService.addEmployee(this.employee, token.data).subscribe(employee =>{
        this.router.navigateByUrl('/adminHome');
      });
    }
    else{
      alert("mismatch confirm password");
    }
  }
}
