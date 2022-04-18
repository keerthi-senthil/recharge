import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service.ts.service';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent implements OnInit {

  public rechargeDetails:any = [];
  constructor(
    private route:Router,
    private aap: UserService,
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
    this.aap.getPlan()
    .subscribe({
      next:(res)=>{
        this.rechargeDetails = res;
      },
      error:(err)=>{
        alert("error while fetching records")
      }
    })  
  }


}