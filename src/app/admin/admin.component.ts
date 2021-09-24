import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public isAdmin:any;
  public admin :any;
  public users:any;
  constructor(private service:UserService,
    private router:Router ) { }

  ngOnInit(): void {
    this.service.allUser().subscribe((data)=>{
    this.users= data;
    },(err)=>{
      console.error(err);
    })
  }
  delete(userId:any){
    console.log(userId);
    this.service.deleteUser(userId).subscribe((data)=>{
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
        this.router.navigate(['/admin']).then(r=>{})
      })
    },(err)=>{
      console.log(err);
    })
  }
  isType(){
    this.isAdmin = this.service.profile();
    if(this.isAdmin.user.type == 'Admin'){
      return true
    }
    else{
      return false;
    }
  }
}
