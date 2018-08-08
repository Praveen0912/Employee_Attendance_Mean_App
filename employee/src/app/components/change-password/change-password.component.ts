import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user ={
   password:"",
   npassword:""
  };
  temp ={
    ncpassword:""
  }
  id:any;
  constructor(private dataService:DataService, private router:Router, private route :ActivatedRoute) { 
    const token1 = JSON.parse(localStorage.getItem('isAdmin'));
    const token2 = JSON.parse(localStorage.getItem('isEmployee')); 
    if(token1 == null){
      if(token2 == null){
        this.router.navigateByUrl('/');
      }
    }
    if(token2 == null){
      if(token1 == null){
        this.router.navigateByUrl('/');
      }
    }
    this.route.params.subscribe(params=>{
      this.id = params.id;
    });
  }

  ngOnInit() {
  }
  onPasswordChange(){
    var cpass = this.temp.ncpassword;
    if(this.user.password !='' && this.user.npassword !='' && this.temp.ncpassword != ''){
      if(this.user.npassword == cpass){
        
      }
      else{
        alert("mismatch confirm password");
      }
    }
    else{
      alert("Please fill all credentials");
    }
  }
}
