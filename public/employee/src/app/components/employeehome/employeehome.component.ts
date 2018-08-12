/// <reference types="googlemaps" />
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employeehome',
  templateUrl: './employeehome.component.html',
  styleUrls: ['./employeehome.component.css']
})

export class EmployeehomeComponent implements OnInit {
  flag1: boolean = false;
  flag2: boolean = true;
  flag3: boolean = true;
  work: any;
  remark: any;
  static locationPosition : any;
  employeePostData = {
    id: "",
    lname: "",
    fname:"",
    dob: "",
    email: "",
    phone: "",
    address: ""                                         
  };

   constructor(private dataService: DataService, private router: Router) {
    const token = JSON.parse(localStorage.getItem('isEmployee'));
    if(token == null){
      this.router.navigateByUrl('/employee');
    }
   
    this.dataService.checkEmployeeLoggedIn(token.data).subscribe(employeeDetails=>{
      this.employeePostData = employeeDetails;
      this.dataService.attendanceCheckCompletetion(token.data, employeeDetails.id).subscribe(flag=>{
        
        if(flag == "noEntry"){
          this.flag1 = false;
          this.flag2 = true;  
          this.flag3 = true;

        }
        if(flag == "checkedIn"){
          this.flag1 = true;
          this.flag2 = true;  
          this.flag3 = false; 
        }
        if(flag == false){
          this.flag1 = true;
          this.flag2 = false;  
          this.flag3 = true;
        }  
     });
     
    });

     

    
  
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
            showPosition(position);               
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  }

  function showPosition(position) {
    var latVar=0.0;
    var lngVar=0.0;
  
      latVar = position.coords.latitude ; 
      lngVar =  position.coords.longitude;
      geocodeLatLng(latVar,lngVar);
  
  }
    
  function geocodeLatLng(latGet, lngGet) {
      var geocoder = new google.maps.Geocoder;
      var latlng = {lat: parseFloat(latGet), lng: parseFloat(lngGet)};
      geocoder.geocode({'location': latlng}, function(results, status) {
        
          if (results[0]) {
               
             EmployeehomeComponent.locationPosition = results[0].formatted_address;
          } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
        
    }
  }

  ngOnInit() { 
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/employee');   
  }

  onView(empId){
    this.router.navigate(['/employee/home',empId]);
  }
  onPasswordChange(empId){
    this.router.navigate(['employee/home/changePassword',empId]);
  }
  
  onCheckIn(id, remark, work){
    if(work != undefined){
      if(work == "Work from home"){
        if(remark != undefined){
          if(EmployeehomeComponent.locationPosition != undefined){
            const token = JSON.parse(localStorage.getItem('isEmployee'));
            this.dataService.attendanceCheckIn(id, remark, work,EmployeehomeComponent.locationPosition,token.data).subscribe(details =>{
                this.flag1 = details;
                this.flag2 = !details;
            });
          }
          else{
            alert("Please turn on your location Or Refresh your page");
          }
        }
        else{
          alert("Please enter remark if you are working from home");
        }
      }
      else{
        if(EmployeehomeComponent.locationPosition != undefined){
          const token = JSON.parse(localStorage.getItem('isEmployee'));
          this.dataService.attendanceCheckIn(id, remark, work,EmployeehomeComponent.locationPosition,token.data).subscribe(details =>{
            this.flag1 = details;
            this.flag2 = !details;
          });
        }
        else{
          alert("Please turn on your location Or Refresh your page");
        }
      }
      
    }
    else{
      alert("Please enter work status");
    }
    

  }

 onCheckOut(id){
  
  if(EmployeehomeComponent.locationPosition != undefined){
    const token = JSON.parse(localStorage.getItem('isEmployee'));
    this.dataService.attendanceCheckOut(token.data, id, EmployeehomeComponent.locationPosition).subscribe(flag=> { 
     this.flag1 = flag;
     this.flag2 = flag;  
     this.flag3 = !flag;
    });
  }
  else{
    alert("Please turn on your location Or Refresh your page");
  } 
}

}


