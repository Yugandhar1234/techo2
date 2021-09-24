import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile:any;
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.profile =  this.service.profile();
    
  }


}
