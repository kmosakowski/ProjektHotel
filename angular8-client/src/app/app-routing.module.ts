import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StronaGlownaComponent} from "./s_common/strona-glowna/strona-glowna.component";
import {IndexHotelComponent} from "./s_hotel/index-hotel/index-hotel.component";
import {LoginComponent} from "./s_common/login/login.component";
import {RegistrationComponent} from "./s_common/registration/registration.component";
import {BadSideComponent} from "./s_common/bad-side/bad-side.component";
import {IndexUserComponent} from "./s_user/index-user/index-user.component";
import {UserDetailsComponent} from "./s_user/user-details/user-details.component";
import {UserReservationComponent} from "./s_user/user-reservation/user-reservation.component";
import {HotelReservationComponent} from "./s_hotel/hotel-reservation/hotel-reservation.component";
import {UserPreviewComponent} from "./s_user/user-preview/user-preview.component";
import {HotelPreviewComponent} from "./s_hotel/hotel-preview/hotel-preview.component";
import {HotelAddRoomComponent} from "./s_hotel/hotel-add-room/hotel-add-room.component";
import {AdminComponent} from "./s_common/admin/admin.component";
import {AdminDetailsComponent} from "./s_common/admin-details/admin-details.component";
import {AdminDetails2Component} from "./s_common/admin-details2/admin-details2.component";

const routes: Routes = [
  { path: '', component: StronaGlownaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/detailsHotel/:id', component: AdminDetailsComponent },
  { path: 'admin/detailsUser/:id', component: AdminDetails2Component },
  { path: 'registration', component: RegistrationComponent },
  { path: 'badsite', component: BadSideComponent },
  { path: 'indexUser', component: IndexUserComponent },
  { path: 'indexUser/detailsRoom/:id', component: UserDetailsComponent },
  { path: 'indexUser/reservation', component: UserReservationComponent },
  { path: 'indexUser/reservation/preview/:id', component: UserPreviewComponent },
  { path: 'indexHotel', component: IndexHotelComponent },
  { path: 'indexHotel/addRoom', component: HotelAddRoomComponent },
  { path: 'indexHotel/reservation', component: HotelReservationComponent },
  { path: 'indexHotel/reservation/addRoom', component: HotelAddRoomComponent },
  { path: 'indexHotel/preview/:id', component: HotelPreviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
