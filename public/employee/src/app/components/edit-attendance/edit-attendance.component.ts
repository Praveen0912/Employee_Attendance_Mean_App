/// <reference types="googlemaps" />
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute,Router } from '@angular/router';
import { tokenKey } from '../../../../node_modules/@angular/core/src/view';
@Component({
  selector: 'app-edit-attendance',
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.css']
})
export class EditAttendanceComponent implements OnInit {
  work: any;
  remark: any;
  edittableAttendance:any;
  static locationPosition : any;
  constructor(private dataService:DataService, private router:Router, private route :ActivatedRoute) {
    const token = JSON.parse(localStorage.getItem('isAdmin'));
    if(token ==null){
      this.router.navigateByUrl("/admin");
    }
    this.route.params.subscribe( params =>{
       this.dataService.getAttendance(token.data, params.id).subscribe(attendance =>{
          this.edittableAttendance = attendance;
          console.log(attendance);
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
                 
              EditAttendanceComponent.locationPosition = results[0].formatted_address;
            } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
          
      }
   }

  ngOnInit() {
  }

}
