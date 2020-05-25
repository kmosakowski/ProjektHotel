import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {HotelService} from "../../../services/hotel.service";
import {PhotoService} from "../../../services/photo.service";
import {GlobalVar} from "../../globalVar";
import {ReservationService} from "../../../services/reservation.service";
import {Room} from "../../../models/room";
import {Hotel} from "../../../models/hotel";
import {Photo} from "../../../models/photo";
import {forkJoin} from "rxjs";
import {Location} from '@angular/common';

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
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {

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
    private reservationService: ReservationService,
    private location: Location
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

  backClicked() {
    this.location.back();
  }

}
