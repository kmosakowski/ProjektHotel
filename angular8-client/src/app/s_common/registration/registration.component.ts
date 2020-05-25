import {Component, OnInit} from '@angular/core';
import {HotelService} from "../../../services/hotel.service";
import {GuestService} from "../../../services/guest.service";
import {PasswordsService} from "../../../services/passwords.service";
import {forkJoin, Observable} from "rxjs";
import {City} from "../../../models/city";
import {CityService} from "../../../services/city.service";
declare var registerValidation: any;
import {Router} from '@angular/router';

class User {
  name: string;
  surname: string;
  birthDate: Date;
  phone: string;
  idPassword: number;
}

class PasswordUser {
  password: string;
  login  : string;
}

class Hotel {
  name: string;
  address: Date;
  classStar: string;
  parking: boolean;
  idCity: number;
  idPassword: number;
}

class PasswordHotel {
  password: string;
  login: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  private user: User = new User();
  private passwordUser: PasswordUser = new PasswordUser();
  private hotel: Hotel = new Hotel();
  private passwordHotel: PasswordHotel = new PasswordHotel();
  private checkHotel: boolean;
  cities: Observable<City[]>;

  constructor(
    public hotelService: HotelService,
    public guestService: GuestService,
    public passwordsService: PasswordsService,
    public cityService: CityService,
    private router: Router) {

  }


  ngOnInit() {
    this.cities = this.cityService.getCityList();
  }

  submitFun(){
    if(registerValidation()){
      if(this.checkHotel){
        forkJoin(this.passwordsService.createPasswords(this.passwordHotel)).subscribe(
          res => {
            this.hotel.idPassword = res[0]["idPassword"];
            this.hotelService.createHotel(this.hotel).subscribe(res => {
              this.router.navigate(['/login']).then();
            }, error => {
              this.passwordsService.deletePasswords(this.hotel.idPassword).subscribe();
              console.log(error);
              alert("Błąd podczas tworzenia użytkownika");
            });
          });
      }
      else{
        forkJoin(this.passwordsService.createPasswords(this.passwordUser)).subscribe(
          res => {
            this.user.idPassword = res[0]["idPassword"];
            this.guestService.createGuest(this.user).subscribe(res => {
              this.router.navigate(['/login']).then();
            }, error => {
              this.passwordsService.deletePasswords(this.hotel.idPassword).subscribe();
              console.log(error);
              alert("Błąd podczas tworzenia użytkownika");
            });
          });
      }
    }
  }
}
