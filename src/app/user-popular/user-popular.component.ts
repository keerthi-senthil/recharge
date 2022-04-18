import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminApiService } from '../services/admin-api.service';
import { PostpaidApiService } from '../services/postpaid-api.service';
@Component({
  selector: 'app-user-popular',
  templateUrl: './user-popular.component.html',
  styleUrls: ['./user-popular.component.css']
})
export class UserPopularComponent implements OnInit {

  public planDetails:any = [];

  constructor(
    private route:Router,
    private api: AdminApiService,
    private api1:PostpaidApiService
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
  }

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
    this.api1.getPlans()
    .subscribe({
      next:(res)=>{
        this.planDetails = res;
      },
      error:(err)=>{
        alert("error while fetching records")
      }
    })  
  }
  getPostPlans(){
    this.api1.getPlans()
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
    this.route.navigate(['user-populardisplay'])
  }

}
