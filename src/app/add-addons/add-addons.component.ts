import { Component,OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddOnPlan } from '../addon-plan';
import { AddonApiService } from '../services/addon-api.service';

@Component({
  selector: 'app-add-addons',
  templateUrl: './add-addons.component.html',
  styleUrls: ['./add-addons.component.css']
})
export class AddAddonsComponent implements OnInit {

  PlanDetails !: FormGroup;

  actionBtn : string ="Save";
  public plan!: AddOnPlan[];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder:FormBuilder,
    private api: AddonApiService){}
    
  


  
  ngOnInit(): void {
    this.PlanDetails = this.formBuilder.group({
      id:[''],
      planName:['',Validators.required],
      planPrice:['',Validators.required],
      planType:['',Validators.required],
      planValidity:['',Validators.required],
      planDescription:['',Validators.required]
    });
    

    this.getPrePlan();
  




  }

  public getPrePlan():void{
    this.api.getPlans()
    .subscribe({
      next:(response:AddOnPlan[])=>{
        this.plan=response;
        this.dataSource=new MatTableDataSource(response);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        
      },
      error:()=>{
        alert("Error while fetching records")
      }
    });
  }
  
  public OnAddPlan(addForm: NgForm): void{
    this.api.addPlan(addForm.value)
    .subscribe({
      next:(response:AddOnPlan)=>{
        console.log(response);
        this.getPrePlan();
        alert("Plan saved successfully");
        addForm.reset();
        
      },
      error:()=>{
        alert("Error while adding records")
      }
    });


  }
  
 





}
