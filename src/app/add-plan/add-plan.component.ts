import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AdminApiService } from '../services/admin-api.service';
import{ MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {
  PlanDetails !: FormGroup;
  actionBtn : string ="Save";
  
  constructor(private formBuilder:FormBuilder,
    private api: AdminApiService,
    private dialogRef: MatDialogRef<AddPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }
  


  
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

    if(this.editData){
      this.actionBtn="Update";
      this.PlanDetails.controls['id'].setValue(this.editData.id);
      this.PlanDetails.controls['planName'].setValue(this.editData.planName);
      this.PlanDetails.controls['planPrice'].setValue(this.editData.planPrice);
      this.PlanDetails.controls['planType'].setValue(this.editData.planType);
      this.PlanDetails.controls['planOffers'].setValue(this.editData.planOffers);
      this.PlanDetails.controls['planValidity'].setValue(this.editData.planValidity);
      this.PlanDetails.controls['planDescription'].setValue(this.editData.planDescription);
    }

  }
  
  addPlan(){
    if(!this.editData){
      if(this.PlanDetails.valid){
        this.api.postPlan(this.PlanDetails.value)
        .subscribe({
          next:(res)=>{
            alert("product added succesfully");
            this.PlanDetails.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the plan")
          }
        });
    }
    }else{
      this.updatePlan()
    }
  }
  
  updatePlan(){
    this.api.putPlan(this.editData.id,this.PlanDetails.value)
    .subscribe({
      next:(res)=>{
        alert("plan updated successfully");
        console.log(res);
        this.PlanDetails.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("error on update");
      }
    })
    
  }


}


