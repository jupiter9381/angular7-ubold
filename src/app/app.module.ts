import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import { MaterialModule } from './module/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToasterService, ToasterModule } from 'angular2-toaster';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { CreatelistingComponent } from './components/listing/createlisting/createlisting.component';
import { TablelistingComponent } from './components/listing/tablelisting/tablelisting.component';
import { EditlistingComponent } from './components/listing/editlisting/editlisting.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { ComfirmComponent } from './auth/comfirm/comfirm.component';
import { ResetComponent } from './auth/reset/reset.component';
import { TablereviewComponent } from './components/review/tablereview/tablereview.component';
import { DetailreviewComponent } from './components/review/detailreview/detailreview.component';
import { TablemessageComponent } from './components/message/tablemessage/tablemessage.component';
import { DetailmessageComponent } from './components/message/detailmessage/detailmessage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    SidebarComponent,
    CreatelistingComponent,
    TablelistingComponent,
    EditlistingComponent,
    ForgotComponent,
    ComfirmComponent,
    ResetComponent,
    TablereviewComponent,
    DetailreviewComponent,
    TablemessageComponent,
    DetailmessageComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
		apiKey: 'AIzaSyDTCQc8JvRvCS5z-AZPv3UpX1HxesohbFs',
		libraries: ['places']
    }),
    BrowserAnimationsModule, 
    ToasterModule.forRoot(),
    //MaterialModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
