import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service.ts.service';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Name } from '../name';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Plan } from '../plan';

@Component({
  selector: 'app-user-populardisplay',
  templateUrl: './user-populardisplay.component.html',
  styleUrls: ['./user-populardisplay.component.css']
})
export class UserPopulardisplayComponent implements OnInit {

  popup = true;
  addForm!: FormGroup;
   response:any;
  

  constructor(private api:UserService,private route:Router) { }
  

  ngOnInit(): void {
    this.addForm = new FormGroup({
      Type: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      Number: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      plan: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      price: new FormControl('', [Validators.required, Validators.maxLength(5)]),

  });
 
 
}


public Error = (controlName: string, errorName: string) =>{
  return this.addForm.controls[controlName].hasError(errorName);
}
openPlan(){
  this.route.navigate(['user-addon'])
}
openBox(){
  this.route.navigate(['viewdetails'])
};
openDia(){
  this.route.navigate(['user-addondisplay'])
}; 
openpop(){
  this.route.navigate(['user-popular'])
};


  /*recharge(){
    this.api.postPlan(this.myForm.value).subscribe({next:(res:Name) => {
      alert('Recharge Successfully');
      this.myForm.reset();
      this.response=res;
      console.log(res)
    },error:(err: any)=>{
    alert('Error occured while recharging')}} )
    }
  
  }*/
  public recharge(addForm: NgForm): void{
    this.api.postPlan(addForm.value)
    .subscribe({
      next:(response:Name)=>{
        console.log(response);
        alert("Name saved successfully");
        addForm.reset();
        
      },
      error:()=>{
        alert("Error while adding records")
      }
      
    });
   

  }

}
