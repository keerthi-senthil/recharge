import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddonApiService } from '../services/addon-api.service';
import { AdminApiService } from '../services/admin-api.service';

@Component({
  selector: 'app-user-addondisplay',
  templateUrl: './user-addondisplay.component.html',
  styleUrls: ['./user-addondisplay.component.css']
})
export class UserAddondisplayComponent implements OnInit {

  public planDetails:any = [];

  constructor(
    private route:Router,
    private api: AddonApiService,
    ) { }

  ngOnInit(): void {
    this.getPrePlans();
  }
  openPlan(){
    this.route.navigate(['user-addon'])
  };
  openBox(){
    this.route.navigate(['viewdetails'])
  };
  openDia(){
    this.route.navigate(['user-addondisplay'])
  };
  openpop(){
    this.route.navigate(['user-popular'])
  };

  getPrePlans(){
    this.api.getPlans()
    .subscribe({
      next:(res)=>{
        this.planDetails = res;
      },
      error:(err)=>{
        alert("error while fetching records")
      }
    })  
  }
  

  onClick(){
    this.route.navigate(['user-display'])
  }

}