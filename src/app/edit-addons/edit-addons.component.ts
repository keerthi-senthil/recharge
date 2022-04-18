import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddOnPlan } from '../addon-plan';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { AddonApiService } from '../services/addon-api.service';

@Component({
  selector: 'app-edit-addons',
  templateUrl: './edit-addons.component.html',
  styleUrls: ['./edit-addons.component.css']
})
export class EditAddonsComponent implements OnInit {

  public plan!: AddOnPlan[];
  dataSource!: MatTableDataSource<any>;
  public editPlan!: AddOnPlan;
  editPlanData!:FormGroup;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formBuilder:FormBuilder,private api: AddonApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.editPlanData=this.formBuilder.group({
      id:[''],
      planName:[''],
      planType:[''],
      planPrice:[''],
      planValidity:[''],
      planDescription:['']
      
    });
    this.getPrePlan();

  }
  public getPrePlan():void{
    const id=parseInt(this.route.snapshot.params['id'],10);
    this.api.getPlanData(id)
    .subscribe({
      next:(response:AddOnPlan)=>{
        console.log(response);
        this.editPlan=response;
        this.editPlanData.setValue(response);
        //this.editPlanData.patchValue({planOffers:"Amazon"});
        this.dataSource=new MatTableDataSource(this.plan);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        
      },
      error:()=>{
        alert("Error while fetching records")
      }
    });
  }

  public OnUpdatePlan(): void{
    const id=parseInt(this.route.snapshot.params['id'],10);
    this.api.updatePlan(id,this.editPlanData.value)
    .subscribe({
      next:(response:AddOnPlan)=>{
        console.log(response);
        this.getPrePlan()
      
      },
      error:()=>{
        alert("Error while adding records")
      }
    });


  }

}
