import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slider_one ="./../../assets/images/slider4.jpg";
   slider_two="./../../assets/images/slider2.jpg";
   slider_three ="./../../assets/images/slider3.jpg";
  slider_four ="../../../assets/images/slider1.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
