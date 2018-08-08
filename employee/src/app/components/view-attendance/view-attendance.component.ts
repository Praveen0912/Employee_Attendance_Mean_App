import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {
  
  attendances:any[];
  constructor(private dataService:DataService, private router:Router, private route :ActivatedRoute) {
    const token = JSON.parse(localStorage.getItem('isAdmin'));
    if(token == null){
      this.router.navigateByUrl('/admin',);
    }
    
    this.route.params.subscribe( params =>{
      this.dataService.viewEmployeeAttendance(token.data, params.empId).subscribe(attendance=>{
        console.log(attendance);
        this.attendances = attendance;
      });
    });
    
   }

  ngOnInit() {
  }

}
