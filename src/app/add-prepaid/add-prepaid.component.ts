import { Component,OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Plan } from '../plan';
import { AdminApiService } from '../services/admin-api.service';


@Component({
  selector: 'app-add-prepaid',
  templateUrl: './add-prepaid.component.html',
  styleUrls: ['./add-prepaid.component.css']
})
export class AddPrepaidComponent implements OnInit {

  PlanDetails !: FormGroup;

  actionBtn : string ="Save";
  public plan!: Plan[];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder:FormBuilder,
    private api: AdminApiService){}
    
  


  
  ngOnInit(): void {
    this.PlanDetails = this.formBuilder.group({
      id:[''],
      planName:['',Validators.required],
      planPrice:['',Validators.required],
      planType:['',Validators.required],
      planOffers:['',Validators.required],
      planValidity:['',Validators.required],
      planDescription:['',Validators.required]
    });
    

    this.getPrePlan();
  




  }

  public getPrePlan():void{
    this.api.getPlans()
    .subscribe({
      next:(response:Plan[])=>{
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
      next:(response:Plan)=>{
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
