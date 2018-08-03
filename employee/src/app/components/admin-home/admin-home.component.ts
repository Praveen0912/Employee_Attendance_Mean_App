import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {
  employees:any[];
  adminPostData = {
    id:"",
    name:"",
    email:""
  }

  constructor(private dataService:DataService, private router:Router) {
    const token = JSON.parse(localStorage.getItem('isAdmin'));
    if(token == null){
      this.router.navigateByUrl('/admin');
    }
    this.dataService.checkAdminLoggedIn(token.data).subscribe(employees=>{
      this.employees = employees;
    });

    this.dataService.getAdminDetails(token.data).subscribe(adminDetails=>{
      this.adminPostData = adminDetails;
    });
   
    
    
   }

  ngOnInit() {
  }

  onDeleteClick(id){
    const token = JSON.parse(localStorage.getItem('isAdmin'));
    this.dataService.deleteEmployee(id, token.data).subscribe(res =>{
      for(let i = 0;i < this.employees.length;i++){
       if(this.employees[i]._id == id){
          this.employees.splice(i,1);
        }
      }
    });
    
  }


  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/admin');
    
  }

  onViewClick(empid){
    console.log(empid);

  }
  
  onEditClick(employee){
    console.log(employee);
  }
}
