import { Component, Input, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { AddOnPlan } from 'src/app/addon-plan';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { filter } from 'rxjs';
import { AddonApiService } from '../services/addon-api.service';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.css']
})
export class AddonsComponent implements OnInit {

  plan!: AddOnPlan[];
  plandata!: AddOnPlan;
  editPlanData!:FormGroup;
  displayedColumns: string[] = ['planType', 'planName', 'planPrice','planDescription','planValidity','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  
  constructor(private formBuilder:FormBuilder,public dialog: MatDialog,
    private api:AddonApiService,private route: ActivatedRoute,
    private router:Router) {}


  ngOnInit(): void{
    this.getPrePlan();

    /*this.editPlanData=this.formBuilder.group({
      id:[''],
      planName:[''],
      planType:[''],
      planPrice:[''],
      planOffers:[''],
      planValidity:[''],
      planDescription:['']
      
    });*/
    

    
  }
  filterPrepaid() {
    const filterValue = "prepaid";
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
 
 
 }
 filterPostpaid() {
  this.router.navigateByUrl('/postpaid');
  const filterValue = "postpaid";
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }


}

  public getPrePlan():void{
    this.api.getPlans()
    .subscribe({
      next:(response:AddOnPlan[])=>{
        this.plan=response;
        this.dataSource=new MatTableDataSource(response);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        /*const filterValue = "Amazon";
        this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      }*/
        
      },
      error:()=>{
        alert("Error while fetching records")
      }
    });
  }

  deletePlan(id:number){
    this.api.deletePlan(id)
    .subscribe({
      next:(res)=>{
        alert("Plan deleted successfully");
        this.getPrePlan();
      },
      error:()=>{
        alert("error on deleting");
      }
    });

  }
  editPlan(response:AddOnPlan,id:number){
    //this.router.navigate(['editPlan/',this.plandata.id]);
    this.editPlanData.controls['id'].setValue(response.id);
    this.editPlanData.controls['planName'].setValue(response.planName);
    this.editPlanData.controls['planPrice'].setValue(response.planPrice);
    this.editPlanData.controls['planType'].setValue(response.planType);
    this.editPlanData.controls['planDescription'].setValue(response.planDescription);
    this.editPlanData.controls['planValidity'].setValue(response.planValidity);
    
    

   
    

    
  }


}
