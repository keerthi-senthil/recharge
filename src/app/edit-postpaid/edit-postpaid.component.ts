import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Plan } from '../plan';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { PostpaidApiService } from '../services/postpaid-api.service';

@Component({
  selector: 'app-edit-postpaid',
  templateUrl: './edit-postpaid.component.html',
  styleUrls: ['./edit-postpaid.component.css']
})
export class EditPostpaidComponent implements OnInit {
  public plan!: Plan[];
  dataSource!: MatTableDataSource<any>;
  public editPlan!: Plan;
  editPlanData!:FormGroup;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formBuilder:FormBuilder,private api: PostpaidApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.editPlanData=this.formBuilder.group({
      id:[''],
      planName:[''],
      planType:[''],
      planPrice:[''],
      planOffers:[''],
      planValidity:[''],
      planDescription:['']
      
    });
    this.getPrePlan();

  }
  public getPrePlan():void{
    const id=parseInt(this.route.snapshot.params['id'],10);
    this.api.getPlanData(id)
    .subscribe({
      next:(response:Plan)=>{
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
      next:(response:Plan)=>{
        console.log(response);
        this.getPrePlan()
      
      },
      error:()=>{
        alert("Error while adding records")
      }
    });


  }

}



