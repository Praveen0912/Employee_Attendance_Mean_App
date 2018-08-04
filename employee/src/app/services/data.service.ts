import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:Http) { }
    
   //admin works
    loginAdmin(admin){
     return this.http.post('http://localhost:3000/api/admin_login',admin)
    .pipe(map((response: Response) =>  response.json()));
    }
    
    getAdminDetails(token): Observable<any> {
      var apiUrl ='http://localhost:3000/api/admin_details'; 
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+token
      });
      return this.http.get(apiUrl, { headers: headers })
      .pipe(map((response: any) =>  response.json()));
    }
   
    checkAdminLoggedIn(token): Observable<any> {
      var apiUrl ='http://localhost:3000/api/admin_check'; 
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+token
      });
      return this.http.get(apiUrl, { headers: headers })
      .pipe(map((response: any) =>  response.json()));
    }

    deleteEmployee(id, token): Observable<any> {
      var del_id ={'id':id};
      var apiUrl ='http://localhost:3000/api/delete_employee'; 
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+token
      });
      return this.http.post(apiUrl,del_id, { headers: headers })
      .pipe(map((response: any) =>  response.json()));
    }
    
    
    addEmployee(employee, token): Observable<any> {
      var apiUrl ='http://localhost:3000/api/employee_register'; 
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+token
      });
      return this.http.post(apiUrl,employee, { headers:headers } )
      .pipe(map((response: any) =>  response.json()));
    }

    updateEmployee(employee, token): Observable<any> {
      var apiUrl ='http://localhost:3000/api/employee_update'; 
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+token
      });
      return this.http.post(apiUrl,employee, { headers:headers } )
      .pipe(map((response: any) =>  response.json()));
    }
   
    //employee works
    loginEmployee(employee){
      return this.http.post('http://localhost:3000/api/employee_login',employee)
     .pipe(map((response: Response) =>  response.json()));
     }

     checkEmployeeLoggedIn(token): Observable<any> {
      var apiUrl ='http://localhost:3000/api/employee_check'; 
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+token
      });
      return this.http.get(apiUrl, { headers: headers })
      .pipe(map((response: any) =>  response.json()));
    }
    

   
  
}
