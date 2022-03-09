import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService { 
  private apiServerUrl=environment.apiBaseUrl;
  
  constructor(private http : HttpClient) { }
  
  postPlan(data: any){
    return this.http.post<any>(`${this.apiServerUrl}/admin-plan/add`,data);
  }
  getPlan(){
    return this.http.get<any>(`${this.apiServerUrl}/admin-plan/all`);
  }
  putPlan(id:number,data:any){
    return this.http.put<any>(`${this.apiServerUrl}/admin-plan/update/`+id,data);
  }
  deletePlan(id:number){
    return this.http.delete<any>(`${this.apiServerUrl}/admin-plan/delete/`+id);
  }


  
}
