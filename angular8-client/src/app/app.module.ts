import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StronaGlownaComponent } from './s_common/strona-glowna/strona-glowna.component';
import { IndexHotelComponent } from './s_hotel/index-hotel/index-hotel.component';
import { HotelReservationComponent } from './s_hotel/hotel-reservation/hotel-reservation.component';
import { HotelAddRoomComponent } from './s_hotel/hotel-add-room/hotel-add-room.component';
import { HotelPreviewComponent } from './s_hotel/hotel-preview/hotel-preview.component';
import { BadSideComponent } from './s_common/bad-side/bad-side.component';
import { LoginComponent } from './s_common/login/login.component';
import { RegistrationComponent } from './s_common/registration/registration.component';
import { IndexUserComponent } from './s_user/index-user/index-user.component';
import { UserPreviewComponent } from './s_user/user-preview/user-preview.component';
import { UserReservationComponent } from './s_user/user-reservation/user-reservation.component';
import { UserDetailsComponent } from './s_user/user-details/user-details.component';
import {GlobalVar} from "./globalVar";
import {JwPaginationComponent} from "jw-angular-pagination";
import { AdminComponent } from './s_common/admin/admin.component';
import { AdminDetailsComponent } from './s_common/admin-details/admin-details.component';
import { AdminDetails2Component } from './s_common/admin-details2/admin-details2.component';

@NgModule({
  declarations: [
    AppComponent,
    StronaGlownaComponent,
    IndexHotelComponent,
    HotelReservationComponent,
    HotelAddRoomComponent,
    HotelPreviewComponent,
    BadSideComponent,
    LoginComponent,
    RegistrationComponent,
    IndexUserComponent,
    UserPreviewComponent,
    UserReservationComponent,
    UserDetailsComponent,
    JwPaginationComponent,
    AdminComponent,
    AdminDetailsComponent,
    AdminDetails2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GlobalVar],
  bootstrap: [AppComponent]
})
export class AppModule { }
