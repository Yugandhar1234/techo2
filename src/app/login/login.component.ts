import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private service:UserService,
    private router:Router) { }
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.email,Validators.required] ],
    password: ['',[Validators.minLength(8),Validators.required]],
  });
  public isEmpty:boolean;
  public errMsg:string;
  ngOnInit(): void {
  }
  public getemail() {
    return this.loginForm.get('email');
  }
  public getpassword() {
    return this.loginForm.get('password');
  }
  public login(){
    let user = {
      email:this.getemail().value,
      password : this.getpassword().value
    }
    if(user.email !=='' && user.password !==''){
      this.isEmpty = false;
      this.service.userLogin(user).subscribe((data)=>{
        this.router.navigate(['/profile']);
        localStorage.setItem('token',JSON.stringify(data));
      },(err)=>{
        console.log(err);
        this.errMsg = err.error.msg;
      })
    }
    else{
      this.isEmpty = true
    }
  }

}
