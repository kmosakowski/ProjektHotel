import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {HotelService} from "../../../services/hotel.service";
import {forkJoin} from "rxjs";
import {Room} from "../../../models/room";
import {Hotel} from "../../../models/hotel";
import {Photo} from "../../../models/photo";
import {PhotoService} from "../../../services/photo.service";
import {ReservationService} from "../../../services/reservation.service";
import {GlobalVar} from "../../globalVar";
declare var showPopup: any;
declare var validateReservation: any;
declare var closePopup: any;

class Reservation {
  idReservation: number;
  idRoom: number;
  idGuest: number;
  fromDate: Date;
  toDate: Date;
  comment: string;
  canceled: string = 'N';
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private idRoom: number;
  rooms: any;
  hotel: any;
  photo: any;
  private reservation: Reservation = new Reservation();

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private hotelService: HotelService,
    private photoService: PhotoService,
    public globalVar: GlobalVar,
    private reservationService: ReservationService
  ) {
    this.rooms = [new Room()];
    this.rooms[0]['roomNumber'] = -1;
    this.rooms[0]['clazz'] = -1;
    this.rooms[0]['floor'] = -1;
    this.rooms[0]['isSmoker'] = 'BRAK';
    this.rooms[0]['forDisabled'] = 'BRAK';
    this.rooms[0]['description'] = 'BRAK';
    this.hotel = [new Hotel()];
    this.hotel[0]['name'] = 'BRAK';
    this.photo = [new Array(new Photo())];
    this.photo[0][0]['path'] = 'BRAK';
  }


  ngOnInit() {
    this.loadDetails()
  }

  loadDetails(){
    this.route.paramMap.subscribe(params => {
      console.log(params);
      console.log(params.get('id'));
      this.idRoom = Number(params.get('id'));
      this.reservation.idRoom = Number(params.get('id'));
      forkJoin(this.roomService.getRoom(this.idRoom)).subscribe(res =>{
        this.rooms = res;
        console.log(this.rooms[0]);
        console.log(this.rooms[0]['roomNumber']);
        forkJoin(this.hotelService.getHotel(this.rooms[0]['idHotel'])).subscribe(res =>{
          this.hotel = res;
        });
        console.log(this.rooms[0]['roomNumber']);
        forkJoin(this.photoService.getPhotoByRoom(this.rooms[0]['idRoom'])).subscribe(res =>{
          console.log(res[0][0]['path']);
          this.photo = res;
        });
      });
    });
  }

  //TODO: Zarezerwowanie pokoju dla określonego użytkownika
  reserve(){
    this.reservation.idGuest = this.globalVar.idUser;
    if(validateReservation()){
      console.log(this.reservation);
      this.reservationService.createReservation(this.reservation).subscribe();
      alert("Zarezerwowano");
    }
  }

  closePopWindow(){
    closePopup();
  }

  openPopWindow(){
    showPopup();
  }

}
