import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { AdminApiService } from './services/admin-api.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 title="adminplan";
 displayedColumns: string[] = ['planType', 'planName', 'planPrice','planDescription','planOffers','planValidity','action'];
 dataSource!: MatTableDataSource<any>;
 item!: any;
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

 constructor(public dialog: MatDialog,private api:AdminApiService) {}

 openDialog() {
   this.dialog.open(AddPlanComponent,{
     width:"70%",
   }).afterClosed().subscribe(val=>{
     if(val==='save'){
       this.getPrePlans();
     }
   });

 }
 ngOnInit(): void{
   this.getPrePlans();
 }
 
 getPrePlans(){
   this.api.getPlan()
   .subscribe({
     next:(res)=>{
       this.dataSource=new MatTableDataSource(res);
       this.dataSource.paginator=this.paginator;
       this.dataSource.sort=this.sort;
     },
     error:(err)=>{
       alert("error while fetching records")
     }
   })  
 }
 

 editPlan(row:any){
   this.dialog.open(AddPlanComponent,{
     width:"70%",
     data:row 
   }).afterClosed().subscribe(val=>{
     if(val==='update'){
       this.getPrePlans();
     }
   });

 }
 deletePlan(id:number){
   this.api.deletePlan(id)
   .subscribe({
     next:(res)=>{
       alert("Plan deleted successfully");
       this.getPrePlans();
     },
     error:()=>{
       alert("error on deleting");
     }
   });

 }
 filterData() {
   const filterValue = "prepaid";
   this.dataSource.filter = filterValue.trim().toLowerCase();

   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }


}
filterPost() {
  const filterValue = "postpaid";
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }


}
filterAddons() {
  const filterValue = "addons";
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }


}

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();

   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }
}
