import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {Passwords} from "../models/passwords";
import {Router, Routes} from "@angular/router";
import {IndexUserComponent} from "../app/s_user/index-user/index-user.component";
import {IndexHotelComponent} from "../app/s_hotel/index-hotel/index-hotel.component";
import {GlobalVar} from "../app/globalVar";

const routes: Routes = [
  { path: 'indexUser', component: IndexUserComponent },
  { path: 'indexHotel', component: IndexHotelComponent }
];

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {

  private baseUrl = 'http://localhost:8080/api/passwords';

  constructor(
    private http: HttpClient,
    private router: Router,
    public globalVar: GlobalVar
  ) { }



  getPasswords(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPasswords(password: Passwords) {
    console.log("createPasswords()");
    return this.http.post(`${this.baseUrl}`, password);
  }

  updatePasswords(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deletePasswords(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getPasswordsList(): Observable<any> {
    console.log("metoda get password");
    return this.http.get(`${this.baseUrl}`);
  }

  isExist(pass: String, login: String) {
    console.log("metoda isExist()");
    return this.http.get(`${this.baseUrl+"/isExist"}/${pass}/${login}`);
  }

  getUserPass(pass: String, login: String) {
    console.log("metoda getUserPass()");

    this.http.get(`${this.baseUrl+"/userPass"}/${pass}/${login}`)
    .toPromise().then(res => {
      console.log(res);
      this.globalVar.idUser = res["idUser"];
      this.globalVar.nameUser = res["name"];
      this.globalVar.typeUser = res["type"];
      console.log(this.globalVar.typeUser);
      if(this.globalVar.typeUser == 'HOTEL'){
        this.router.navigate(['/indexHotel']);
      }
      else if(this.globalVar.typeUser == 'GUEST'){
        this.router.navigate(['/indexUser']);
      }
    });
  }
}
