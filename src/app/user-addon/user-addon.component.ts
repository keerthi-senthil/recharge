import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-addon',
  templateUrl: './user-addon.component.html',
  styleUrls: ['./user-addon.component.css']
})
export class UserAddonComponent implements OnInit {
  

  constructor(private route: Router,private dialog : MatDialog) { }

  ngOnInit(): void {
  }
  openDia(){
    this.route.navigate(['user-addondisplay'])
  };
  openBox(){
    this.route.navigate(['viewdetails'])
  };
  openPlan(){
    this.route.navigate(['user-addon'])
  };
  openpop(){
    this.route.navigate(['user-popular'])
  }

}