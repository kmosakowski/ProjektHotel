import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {City} from "../../../models/city";
import {CityService} from "../../../services/city.service";
import {HotelService} from "../../../services/hotel.service";
import {Hotel} from "../../../models/hotel";
import {RoomService} from "../../../services/room.service";
import {Room} from "../../../models/room";
import {GlobalVar} from "../../globalVar";

class Filter {
  cityId: number;
  hotelId: number;
}

@Component({
  selector: 'app-strona-glowna',
  templateUrl: './strona-glowna.component.html',
  styleUrls: ['./strona-glowna.component.css']
})
export class StronaGlownaComponent implements OnInit {

  private filter: Filter = new Filter();
  cities: Observable<City[]>;
  hotels: Observable<Hotel[]>;
  rooms: Room[];
  pageOfItems: Room[];

  constructor(private cityService: CityService,
              private hotelService: HotelService,
              private roomService: RoomService,
              public globalVar: GlobalVar) {}

  ngOnInit() {
    this.reloadData();
    this.globalVar.typeUser = undefined;
    this.globalVar.nameUser = undefined;
    this.globalVar.idUser = undefined;
  }

  reloadData() {
    this.cities = this.cityService.getCityWithoutReservation();
    this.hotels = this.hotelService.getHotelWithoutReservation();
    this.roomService.getRoomListNotReserved().subscribe( res => {
      this.rooms = res;
    });
  }

  showRooms(){
    this.roomService.filterRoomWithoutDate(this.filter).subscribe( res => {
      this.rooms = res;
    });
  }

  onChangePage(pageOfItems: Room[]) {
    this.pageOfItems = pageOfItems;
  }
}
