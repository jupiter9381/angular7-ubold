import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreatelistingComponent } from './components/listing/createlisting/createlisting.component';
import { TablelistingComponent } from './components/listing/tablelisting/tablelisting.component';
import { EditlistingComponent } from './components/listing/editlisting/editlisting.component';
import { ComfirmComponent } from './auth/comfirm/comfirm.component';
import { ResetComponent } from './auth/reset/reset.component';

import { TablereviewComponent } from './components/review/tablereview/tablereview.component';
import { DetailreviewComponent } from './components/review/detailreview/detailreview.component';
import { TablemessageComponent } from './components/message/tablemessage/tablemessage.component';
import { DetailmessageComponent } from './components/message/detailmessage/detailmessage.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuardService } from './service/guard.service';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot', component: ForgotComponent },
    { path: 'confirm', component: ComfirmComponent },
    { path: 'reset', component: ResetComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [GuardService]},
    { path: 'listing/create', component: CreatelistingComponent, canActivate: [GuardService]},
    { path: 'listing/table', component: TablelistingComponent, canActivate: [GuardService]},
    { path: 'listing/detail/:id', component: EditlistingComponent, canActivate: [GuardService]},
    { path: 'review', component: TablereviewComponent, canActivate: [GuardService]},
    { path: 'review/detail/:id', component: DetailreviewComponent, canActivate: [GuardService]},
    { path: 'message', component: TablemessageComponent, canActivate: [GuardService]},
    { path: 'message/detail/:id', component: DetailmessageComponent, canActivate: [GuardService]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [GuardService]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
