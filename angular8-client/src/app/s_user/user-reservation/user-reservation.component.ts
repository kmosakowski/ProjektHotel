import { Component, OnInit } from '@angular/core';
import {GlobalVar} from "../../globalVar";
import {CityService} from "../../../services/city.service";
import {HotelService} from "../../../services/hotel.service";
import {RoomService} from "../../../services/room.service";
import {Router} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {City} from "../../../models/city";
import {Hotel} from "../../../models/hotel";
import {Room} from "../../../models/room";
import {Reservation} from "../../../models/Reservation";
import {ReservationService} from "../../../services/reservation.service";
import {RoomD} from "../../../models/RoomD";
declare var showPopup: any;
declare var validateReservation: any;
declare var closePopup: any;

class Filter {
  userId: number;
  cityId: number;
  hotelId: number;
  chosenDate: string;
}

class Term {
  fromDate: string;
  toDate: string;
  comments: string;
}

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.css']
})
export class UserReservationComponent implements OnInit {

  private filter: Filter = new Filter();
  private term: Term = new Term();
  cities: Observable<City[]>;
  hotels: Observable<Hotel[]>;
  rooms: RoomD[];
  pageOfItems: RoomD[];
  reservation: Reservation[];
  private checked: boolean = false;
  private room: Room;

  constructor(
    public globalVar: GlobalVar,
    private cityService: CityService,
    private hotelService: HotelService,
    private roomService: RoomService,
    private router: Router,
    private reservationService: ReservationService
  ) {
    this.room = new Room();
    this.room.clazz = 'BRAK';
    this.room.idRoom = -1;
    this.reservation = [new Reservation()];
    this.reservation["comments"] = 'BRAK';
    this.reservation["fromDate"] = '2000-01-01';
    this.reservation["toDate"] = '2000-01-01';

  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.filter.userId = this.globalVar.idUser;
    this.cities = this.cityService.getCityByUser(this.globalVar.idUser);
    this.hotels = this.hotelService.getHotelByUser(this.globalVar.idUser);
    this.roomService.getRoomByUser(this.globalVar.idUser).subscribe(res => {
      this.rooms = res;
    });
  }

  showRooms(){
    if(this.filter.chosenDate != undefined){
      this.roomService.filterRoom(this.filter).subscribe(res => {
        this.rooms = res;
      });
      this.filter.chosenDate = undefined;
    }
    else{
      this.roomService.getRoomsFilterWithoutDateDetails(this.filter).subscribe(res => {
        this.rooms = res;
      });
    }
  }

  detailsRooms(){
    if(this.checked){
      console.log(this.room.idRoom);
      this.router.navigate(['/indexUser/reservation/preview/'+this.room.idRoom]).then();
    }
  }

  cancelReservation(){
    if(this.checked){
      console.log(this.room.idRoom);
      this.reservationService.reservationDeleteByRoom(this.room.idRoom, this.globalVar.idUser).subscribe(res => {
        this.reloadData();
      });
      alert("Pomyślnie usunięto rezerwację");
    }
  }

  openPopWindow(){
    if(this.checked){
      forkJoin(this.reservationService.getReservationByUserRoom(this.globalVar.idUser, this.room.idRoom)).subscribe(res => {
        this.reservation = res[0][0];
        console.log(this.reservation);
      });
      showPopup();
    }
  }

  closePopWindow(){
    closePopup();
  }

  changeTerm(){
    if(validateReservation()){
      console.log(this.reservation);
      this.reservation["fromDate"] = this.term.fromDate == undefined ? this.reservation["fromDate"] : this.term.fromDate;
      this.reservation["toDate"] = this.term.toDate == undefined ? this.reservation["toDate"] : this.term.toDate;
      this.reservation["comments"] = this.term.comments == undefined ? this.reservation["comments"] : this.term.comments;
      console.log(this.reservation);
      this.reservationService.updateReservation(Number(this.reservation["idReservation"]), this.reservation).subscribe(res => {
        closePopup();
        alert("Zmieniono temrin!")
        this.reloadData();
      });
    }
  }

  public selectRoom(event: any, room: any) {
    this.checked = true;
    this.room = room;
  }

  onChangePage(pageOfItems: RoomD[]) {
    this.pageOfItems = pageOfItems;
  }
}
