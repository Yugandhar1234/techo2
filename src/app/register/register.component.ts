import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private service:UserService,
    private router:Router) { }
  public reactForm = this.formBuilder.group({
    firstName:['',[Validators.minLength(4),Validators.required]],
    lastName:['',[Validators.minLength(3),Validators.required]],
    email: ['', [Validators.email,Validators.required] ],
    phone:['',[Validators.maxLength(10),Validators.required]],
    password: ['',[Validators.minLength(8),Validators.required]],
    confirmPas: ['',[Validators.minLength(8),Validators.required]],
    type:['',[Validators.required]],
  });

  public isEmpty:boolean;
  public errMsg:string;
  
  ngOnInit(): void { }

  public getFname() {
    return this.reactForm.get('firstName');
  }
  public getLname() {
    return this.reactForm.get('lastName');
  }
  public getemail() {
    return this.reactForm.get('email');
  }
  public getPhone(){
    return this.reactForm.get('phone');
  }
  public getpassword() {
    return this.reactForm.get('password');
  }
  public getconfirmPas(){
    return this.reactForm.get('confirmPas');
  }
  public getType(){
    return this.reactForm.get('type');
  }


  // submitRegisterData
  public submitRegister(){
    let user = {
      firstName : this.getFname().value,
      lastName : this.getLname().value,
      email : this.getemail().value,
      phone : this.getPhone().value,
      password : this.getpassword().value,
      confirm : this.getconfirmPas().value,
      type : this.getType().value
    };
    if(user.firstName !== '' && user.type !== '' && user.firstName !== ''&& user.email !== '' && user.password !== '' && user.confirm !== ''){
      this.isEmpty = false;
      this.service.addUser(user).subscribe((data)=>{
        this.router.navigate(['/login']);
      },(err)=>{
        this.errMsg = err.error.msg;
        console.log(err);
      })
    }
    else{
      this.isEmpty = true;
      
    }
  }

}
