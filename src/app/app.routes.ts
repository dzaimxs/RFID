import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetComponent } from './asset/asset.component';
import { DeviceComponent } from './device/device.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    //{ path: '', redirectTo:'/home', pathMatch:'full'},  
    { path: '', component:LoginComponent},  
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'asset', component: AssetComponent },
    { path: 'device', component: DeviceComponent },
    { path: 'user', component: UserComponent },
    { path: 'role', component: RoleComponent }
    
];
