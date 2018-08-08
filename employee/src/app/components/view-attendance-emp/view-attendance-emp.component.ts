import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-view-attendance-emp',
  templateUrl: './view-attendance-emp.component.html',
  styleUrls: ['./view-attendance-emp.component.css']
})
export class ViewAttendanceEmpComponent implements OnInit {
  attendances:any[];
  constructor(private dataService:DataService, private router:Router, private route :ActivatedRoute) {
    const token = JSON.parse(localStorage.getItem('isEmployee'));
    if(token == null){
      this.router.navigateByUrl('/employee',);
    }
  
    this.route.params.subscribe( params =>{
      this.dataService.viewEmployeeAttendance(token.data, params.empId).subscribe(attendance=>{
        this.attendances = attendance;
      });
    });
   }

  ngOnInit() {
  }

}
