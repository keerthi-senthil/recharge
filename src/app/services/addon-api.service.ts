import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddOnPlan } from 'src/app/addon-plan'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddonApiService {

  private apiServerUrl=environment.apiBaseUrl;
  
  constructor(private http : HttpClient) { }
  
  public getPlans(): Observable<AddOnPlan[]> {
    return this.http.get<AddOnPlan[]>(`${this.apiServerUrl}/addon-plan/all`);
  }
  public getPlanData(planId:number): Observable<AddOnPlan>{
    return this.http.get<AddOnPlan>(`${this.apiServerUrl}/addon-plan/find/`+planId);

  }

  public addPlan(plan: AddOnPlan): Observable<AddOnPlan> {
    return this.http.post<AddOnPlan>(`${this.apiServerUrl}/addon-plan/add`, plan);
  }

  updatePlan(planId:number,plan:AddOnPlan): Observable<AddOnPlan>{
    return this.http.put<AddOnPlan>(`${this.apiServerUrl}/addon-plan/update/`+planId,plan);
  }

  public deletePlan(planId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addon-plan/delete/${planId}`);
  }

  
  


  
}
