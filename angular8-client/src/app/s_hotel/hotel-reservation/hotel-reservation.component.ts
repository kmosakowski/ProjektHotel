import { Component, OnInit } from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {Room} from "../../../models/room";
import {City} from "../../../models/city";
import {GlobalVar} from "../../globalVar";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {CityService} from "../../../services/city.service";
import {ReservationService} from "../../../services/reservation.service";
import {ReservationD} from "../../../models/ReservationD";
import {GuestService} from "../../../services/guest.service";
declare var showPopup: any;
declare var validateReservationFromHotel: any;
declare var closePopup: any;
declare var validateTermFromHotel: any;


class Guest {
  name: string;
  surname: string;
  birthDate: string;
  phone: string = "";
  idPassword: number = 99;
}

class Reservation {
  idReservation: number;
  idRoom: number;
  idGuest: number;
  fromDate: string;
  toDate: string;
  comments: string;
  canceled: string = 'N';
}


@Component({
  selector: 'app-hotel-reservation',
  templateUrl: './hotel-reservation.component.html',
  styleUrls: ['./hotel-reservation.component.css']
})
export class HotelReservationComponent implements OnInit {

  reservationDetails: Observable<ReservationD[]>;
  private optionExecute: number = 0;
  private guest: Guest = new Guest();
  private reservation: Reservation = new Reservation();
  private reservationD: ReservationD;
  private checked: boolean = false;
  private checked2: boolean = false;
  rooms: Observable<Room[]>;
  cities: Observable<City[]>;
  id: number;
  private room: Room;

  constructor(public globalVar: GlobalVar,
              private route: ActivatedRoute,
              private roomService: RoomService,
              private reservationService: ReservationService,
              private guestService: GuestService,
              private cityService: CityService,
              private router: Router) {
    this.room = new Room();
    this.reservationD = new ReservationD();
    this.reservationD.fromDate = '2000-01-01';
    this.reservationD.toDate = '2000-01-01';
    this.reservationD.comments = 'BRAK';
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.rooms = this.roomService.getFreeRoomByHotel(this.globalVar.idUser);
    this.reservationDetails = this.reservationService.getReservationDetails(this.globalVar.idUser);
  }

  public selectRoom(event: any, room: any) {
    this.checked = true;
    this.room = room;
    this.reservationD = new ReservationD();
    this.reservationD.fromDate = '';
    this.reservationD.toDate = '';
    this.reservationD.comments = '';
  }

  public selectReservation(event: any, reservation: any) {
    this.checked2 = true;
    this.reservationD = reservation;
    this.reservation.fromDate = reservation['fromDate'].substr(0, 10);
    this.reservation.toDate = reservation['toDate'].substr(0, 10);
  }

  cancelReservation(){
    if(this.checked2){
      console.log(this.reservationD.idReservation);
      this.reservationService.deleteReservation(this.reservationD.idReservation).subscribe( res => {
        this.reloadData();
        alert("Pomyślnie usunięto rezerwację");
      });
    }
  }

  closePopWindow(){
    closePopup();
  }

  execute(){
      if(this.optionExecute == 1){
        if(validateReservationFromHotel()){
          console.log(this.guest);
          this.guestService.createGuest(this.guest).subscribe(res => {
            this.reloadData();
            this.reservation.idGuest = res["idGuest"];
            this.reservation.idRoom = this.room.idRoom;
            this.reservationService.createReservation(this.reservation).subscribe(res => {
              this.reloadData();
              alert("Zarezerwowano");
              this.optionExecute = 0;
            });
          });
        }
      }
      else if(this.optionExecute == 2){
        if(validateTermFromHotel()){
          this.reservation.idRoom = this.reservationD.idRoom;
          this.reservation.idGuest = this.reservationD.idGuest;
          this.reservation.idReservation = this.reservationD.idReservation;
          console.log(this.reservation.idReservation);
          this.reservationService.updateReservation(this.reservation.idReservation, this.reservation).subscribe( res => {
            this.reloadData();
            alert("Pomyślnie zmieniono termin");
            this.optionExecute = 0;
          });
        }
      }
      else{
        alert("Coś poszło nie tak");
      }
  }

  changeTerm(){
    if(this.checked2){
      this.optionExecute = 2;
      showPopup();
    }
  }

  createTerm(){
    if(this.checked){
      this.optionExecute = 1;
      showPopup();
    }
  }
}
