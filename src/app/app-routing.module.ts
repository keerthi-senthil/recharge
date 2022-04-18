import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddonsComponent } from './add-addons/add-addons.component';
import { AddPostpaidComponent } from './add-postpaid/add-postpaid.component';
import { AddPrepaidComponent } from './add-prepaid/add-prepaid.component';
import { AddonsComponent } from './addons/addons.component';
import { EditAddonsComponent } from './edit-addons/edit-addons.component';
import { EditPostpaidComponent } from './edit-postpaid/edit-postpaid.component';
import { EditPrepaidComponent } from './edit-prepaid/edit-prepaid.component';
import { PostpaidComponent } from './postpaid/postpaid.component';
import { PrepaidComponent } from './prepaid/prepaid.component';
import { UserAddonComponent } from './user-addon/user-addon.component';
import { UserAddondisplayComponent } from './user-addondisplay/user-addondisplay.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { UserPopularComponent } from './user-popular/user-popular.component';
import { UserPopulardisplayComponent } from './user-populardisplay/user-populardisplay.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';

const routes: Routes = [
  {path:'prepaid',component:PrepaidComponent},
  {path:'addPostpaid',component:AddPostpaidComponent},
  {path:'editpostpaid/:id',component:EditPostpaidComponent},
  {path:'editprepaid/:id',component:EditPrepaidComponent},
  {path:'postpaid',component:PostpaidComponent},
  {path:'addPrepaid',component:AddPrepaidComponent},
  {path:'addOns',component:AddonsComponent},
  {path:'addaddOnsPlan',component:AddAddonsComponent},
  {path:'editaddOns/:id',component:EditAddonsComponent},
  { path: 'user-addondisplay', component: UserAddondisplayComponent},
  { path: 'user-addon', component: UserAddonComponent},
 { path: 'user-display', component: UserDisplayComponent} ,
 { path: 'viewdetails', component:ViewdetailsComponent},
 {path:'user-popular',component:UserPopularComponent},
 {path:'user-populardisplay',component:UserPopulardisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
