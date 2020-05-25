import { Component, OnInit } from '@angular/core';
import {GlobalVar} from "../../globalVar";
import {forkJoin} from "rxjs";
import {RoomService} from "../../../services/room.service";
import {PhotoService} from "../../../services/photo.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
declare var addRoom: any;

class Room {
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

class Photo {
  idPhoto: number;
  idRoom: number;
  path: string = '../../assets/images/roomsImage/';
  name: string;
}


@Component({
  selector: 'app-hotel-add-room',
  templateUrl: './hotel-add-room.component.html',
  styleUrls: ['./hotel-add-room.component.css']
})
export class HotelAddRoomComponent implements OnInit {

  private room: Room = new Room();
  private photo: Photo = new Photo();
  constructor(
    public globalVar: GlobalVar,
    public roomService: RoomService,
    public photoService: PhotoService,
    private router: Router,
    private location: Location
  ) {
    console.log(globalVar.idUser);
    this.room.idHotel = globalVar.idUser;
  }

  ngOnInit() {
  }

  addRoomie(){
    if(addRoom()){
      forkJoin(this.roomService.createRoom(this.room)).subscribe(
        res => {
          this.photo.path = this.photo.path + this.photo.name;
          this.photo.idRoom = res[0]["idRoom"];
          this.photoService.createPhoto(this.photo);
        }
      );
      alert("Pomyślnie dodano pokój!");
      // this.router.navigate(['/indexHotel']);
      this.location.back();
    }
  }

}
