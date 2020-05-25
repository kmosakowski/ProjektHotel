import { Component, OnInit } from '@angular/core';
import {Guest} from "../../../models/guest";
import {Hotel} from "../../../models/hotel";
import {HotelService} from "../../../services/hotel.service";
import {GuestService} from "../../../services/guest.service";
import {Router} from "@angular/router";
declare var showPopup: any;
declare var closePopup: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private optionExecute: number = 0;

  private user: Guest;
  private checkedUser: boolean = false;
  users: Guest[];
  pageOfUser: Guest[];

  private hotel: Hotel;
  private checkedHotel: boolean = false;
  hotels: Hotel[];
  pageOfHotel: Hotel[];

  constructor(private guestService: GuestService,
              private hotelService: HotelService,
              private router: Router
  ) {
    this.user = new Guest();
    this.hotel = new Hotel();
  }

  ngOnInit() {
    this.reloadData()
  }

  reloadData() {
    this.hotelService.getHotelList().subscribe(res => {
      this.hotels = res;
    });
    this.guestService.getGuestList().subscribe(res => {
      this.users = res;
    });
  }

  public selectHotel(event: any, hotel: any) {
    this.checkedHotel = true;
    this.hotel = hotel;
  }

  public selectUser(event: any, user: any) {
    this.checkedUser = true;
    this.user = user;
  }

  onChangePageUser(pageOfUser: Guest[]) {
    this.pageOfUser = pageOfUser;
  }

  onChangePageHotel(pageOfHotel: Hotel[]) {
    this.pageOfHotel = pageOfHotel;
  }

  deleteUser() {
    if(this.checkedUser){
      this.guestService.deleteGuest(this.user.idGuest).subscribe(res => {
        this.reloadData();
      });
    }
    else{
      alert("Nie zaznaczyłeś użytkowniak")
    }
  }

  deleteHotel() {
    if(this.checkedHotel){
      this.hotelService.deleteHotel(this.hotel.idHotel).subscribe(res => {
        this.reloadData();
      });
    }
    else{
      alert("Nie zaznaczyłeś hotelu")
    }
  }

  editUser() {
    this.optionExecute = 2;
    showPopup()
  }

  editHotel() {
    this.optionExecute = 1;
    showPopup()
  }

  execute(){
    if(this.optionExecute == 2){
      this.guestService.updateGuest(this.user.idGuest, this.user).subscribe(res => {
        console.log(res);
        this.reloadData();
      })
    }
    else if(this.optionExecute == 1){
      console.log(this.hotel);
      this.hotelService.updateHotel(this.hotel.idHotel, this.hotel).subscribe(res => {
        console.log(res);
        this.reloadData();
      })
    }
  }

  closePopWindow(){
    closePopup();
  }

  detailsUser() {
    this.optionExecute = 2;
    this.router.navigate(['/admin/detailsUser/' + this.user.idGuest]).then();
  }

  detailsHotel() {
    this.optionExecute = 1;
    this.router.navigate(['/admin/detailsHotel/' + this.hotel.idHotel]).then();
  }
}
