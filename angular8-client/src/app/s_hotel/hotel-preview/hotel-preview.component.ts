import { Component, OnInit } from '@angular/core';
import {forkJoin} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {HotelService} from "../../../services/hotel.service";
import {PhotoService} from "../../../services/photo.service";
import {GlobalVar} from "../../globalVar";
import {ReservationService} from "../../../services/reservation.service";
import {Location} from "@angular/common";
import {Room} from "../../../models/room";
import {Hotel} from "../../../models/hotel";
import {Photo} from "../../../models/photo";
declare var addRoom: any;

class RoomLocal {
  idRoom: number;
  idHotel: number;
  floor: number;
  roomNumber: number;
  clazz: string;
  isSmoker: string;
  forDisabled: string;
  price: number;
  description: string;
}

class PhotoLocal{
  idPhoto: number;
  idRoom: number;
  path: string = '../../assets/images/roomsImage/';
  name: string;
}


@Component({
  selector: 'app-hotel-preview',
  templateUrl: './hotel-preview.component.html',
  styleUrls: ['./hotel-preview.component.css']
})
export class HotelPreviewComponent implements OnInit {

  private idRoom: number;
  rooms: any;
  hotel: any;
  photo: any;
  private roomLocal: RoomLocal = new RoomLocal();
  private photoLocal: PhotoLocal = new PhotoLocal();

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
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
      forkJoin(this.roomService.getRoom(this.idRoom)).subscribe(res =>{
        this.rooms = res;
        console.log(this.rooms[0]);
        console.log(this.rooms[0]['roomNumber']);
        this.roomLocal.idRoom = this.rooms[0]['idRoom'];
        this.roomLocal.idHotel = this.rooms[0]['idHotel'];
        this.roomLocal.floor = this.rooms[0]['floor'];
        this.roomLocal.roomNumber = this.rooms[0]['roomNumber'];
        this.roomLocal.clazz = this.rooms[0]['clazz'];
        this.roomLocal.isSmoker = this.rooms[0]['isSmoker'];
        this.roomLocal.forDisabled = this.rooms[0]['forDisabled'];
        this.roomLocal.price = this.rooms[0]['price'];
        this.roomLocal.description = this.rooms[0]['description'];
        forkJoin(this.photoService.getPhotoByRoom(this.rooms[0]['idRoom'])).subscribe(res =>{
          console.log(res[0][0]);
          this.photo = res;
          this.photoLocal.idPhoto = this.photo[0][0]['idPhoto'];
          this.photoLocal.idRoom = this.photo[0][0]['idRoom'];
          this.photoLocal.path = this.photo[0][0]['path'];
          this.photoLocal.name = this.photo[0][0]['name'];
        });
      });
    });
  }

  backClicked() {
    this.location.back();
  }

  updateRoom(){
    if(addRoom()){
      console.log(this.roomLocal);
      forkJoin(this.roomService.updateRoom(this.roomLocal.idRoom, this.roomLocal)).subscribe(
        res => {
          this.photo.path = this.photo.path + this.photo.name;
          console.log(this.photoLocal);
          this.photoService.updatePhoto(this.photoLocal.idPhoto, this.photoLocal).subscribe();
        }
      );
      alert("Pomyślnie zaktualizowano!");
    }

  }
}
