import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient:HttpClient, private router:Router) { }
  //register user info
  addUser(user:any):Observable<any>{
    let url  = `http://127.0.0.1:9000/users/register`;
    return this.httpclient.post<any>(url,user).pipe(retry(1))
  }
  //login user info
  userLogin(user:any):Observable<any>{
    let url  = `http://127.0.0.1:9000/users/login`;
    return this.httpclient.post<any>(url,user).pipe(retry(1))
  }

  //get all user data
  allUser():Observable<any>{
    let url  = `http://127.0.0.1:9000/users/all`;
    return this.httpclient.get<any>(url).pipe(retry(1))
  }

  // delete Product
  public deleteUser(userId:any):Observable<any>{
    let url= `http://127.0.0.1:9000/users/${userId}`;
    return this.httpclient.delete<any>(url).pipe(
      retry(1)
    )
  }

  //Based on login
  isLogged():any{
    if(localStorage.getItem('token')){
      return true
    }
    else{
      false
    }
  }

  isLogout():any{
    return localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  profile(){
    return JSON.parse(localStorage.getItem('token'));
  }
}
