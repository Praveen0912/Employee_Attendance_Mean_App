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
        const token1 = JSON.parse(localStorage.getItem('isAdmin'));
        const token2 = JSON.parse(localStorage.getItem('isEmployee'));
        if(token1 == null){
           var data ={
             id:this.id,
             flag:"e",
             password:this.user.password,
             npassword:this.user.npassword
           };
          this.dataService.changePassword(token2.data, data).subscribe(signal=>{
            if(signal == true){
              
              this.router.navigateByUrl('/employeeHome');
            }
            else{
              alert(signal.message);
            }  
          });   
        } 
        if(token2 == null){
          var data ={
            id:this.id,
            flag:"a",
            password:this.user.password,
            npassword:this.user.npassword
          };
          this.dataService.changePassword(token1.data, data).subscribe(signal=>{
            if(signal == true){
              alert("Your password has been changed");
              this.router.navigateByUrl('/adminHome');
            }
            else{
              alert(signal.message);
            }  
          });
        }
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
