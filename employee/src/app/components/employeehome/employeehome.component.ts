import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeehome',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.css']
})
export class EmployeehomeComponent implements OnInit {
  employeePostData = {
    "id": "",
    "name": "",
    "dob": "",
    "email": "",
    "phone": "",
    "address": ""                                         
  };
  constructor(private dataService: DataService, private router: Router) {
    const token = JSON.parse(localStorage.getItem('isEmployee'));
    if(token == null){
      this.router.navigateByUrl('/employee');
    }
    
    this.dataService.checkEmployeeLoggedIn(token.data).subscribe(employeeDetails=>{
      this.employeePostData = employeeDetails; 
    });
  
  }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/employee');
    
  }

}
