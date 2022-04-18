import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http : HttpClient) { }
  postPlan(next: any){
  
    return this.http.post<any>(`${this.apiServerUrl}/user-addon-plan/add`,next);
  }
  getPlan(){
    return this.http.get<any>(`${this.apiServerUrl}/user-addon-plan/all`);
  }

  }