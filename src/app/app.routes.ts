import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetComponent } from './asset/asset.component';
import { DeviceComponent } from './device/device.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthGuard } from './auth-guard';
import { SysconfigComponent } from './sysconfig/sysconfig.component';
import { BrandComponent } from './brand/brand.component';
import { MynotificationsComponent } from './mynotifications/mynotifications.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },  // Login page route
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard],  // Add AuthGuard to protect home route
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'asset', component: AssetComponent, canActivate: [AuthGuard] },
    { path: 'device', component: DeviceComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'role', component: RoleComponent, canActivate: [AuthGuard] },
    { path: 'sysconfig', component: SysconfigComponent, canActivate: [AuthGuard] },
    { path: 'brand', component: BrandComponent, canActivate: [AuthGuard] },
    { path: 'mynotifications', component: MynotificationsComponent, canActivate: [AuthGuard] },
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // Default route to login page
  ];
