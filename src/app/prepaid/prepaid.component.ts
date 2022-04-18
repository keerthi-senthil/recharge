import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { AddPrepaidComponent } from '../add-prepaid/add-prepaid.component';
import { AdminApiService } from '../services/admin-api.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Plan } from 'src/app/plan';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-prepaid',
  templateUrl: './prepaid.component.html',
  styleUrls: ['./prepaid.component.css']
})
export class PrepaidComponent implements OnInit {
  plan!: Plan[];
  plandata!: Plan;
  editPlanData!:FormGroup;
  displayedColumns: string[] = ['planType', 'planName', 'planPrice','planDescription','planOffers','planValidity','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  
  constructor(private formBuilder:FormBuilder,public dialog: MatDialog,
    private api:AdminApiService,private route: ActivatedRoute,
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
      next:(response:Plan[])=>{
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
  editPlan(response:Plan,id:number){
    //this.router.navigate(['editPlan/',this.plandata.id]);
    this.editPlanData.controls['id'].setValue(response.id);
    this.editPlanData.controls['planName'].setValue(response.planName);
    this.editPlanData.controls['planPrice'].setValue(response.planPrice);
    this.editPlanData.controls['planType'].setValue(response.planType);
    this.editPlanData.controls['planOffers'].setValue(response.planOffers);
    this.editPlanData.controls['planDescription'].setValue(response.planDescription);
    this.editPlanData.controls['planValidity'].setValue(response.planValidity);
    
    

   /* console.log(this.route.snapshot.params);
    this.route.params.subscribe((params)=>
    {
      this.api.getPlans().subscribe((res)=>
      {
        this.editPlanData.patchValue({
          planName:response['planName'],
          planPrice:response['planPrice'],
          planOffers:response['planOffers'],
          planType:response['planType'],
          planValidity:response['planValidity'],
          planDescription:response['planDescription']

        })
      })
    }
    )*/
    

    
  }


    
   
    

  }

  
