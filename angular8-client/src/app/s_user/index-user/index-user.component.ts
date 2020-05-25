import {Component, OnInit} from '@angular/core';
import {GlobalVar} from "../../globalVar";
import {Observable} from "rxjs";
import {City} from "../../../models/city";
import {Hotel} from "../../../models/hotel";
import {Room} from "../../../models/room";
import {CityService} from "../../../services/city.service";
import {HotelService} from "../../../services/hotel.service";
import {RoomService} from "../../../services/room.service";
import {Router} from "@angular/router";

class Filter {
  cityId: number;
  hotelId: number;
}

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {

  private filter: Filter = new Filter();
  private checked: boolean = false;
  private room: Room;
  cities: Observable<City[]>;
  hotels: Observable<Hotel[]>;
  rooms: Room[];
  pageOfItems: Room[];

  constructor(
    public globalVar: GlobalVar,
    private cityService: CityService,
    private hotelService: HotelService,
    private roomService: RoomService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.cities = this.cityService.getCityWithoutReservation();
    this.hotels = this.hotelService.getHotelWithoutReservation();
    this.roomService.getRoomListNotReserved().subscribe( res => {
      this.rooms = res;
    });
  }

  showRooms(){
    this.roomService.filterRoomWithoutDate(this.filter).subscribe(res => {
      this.rooms = res;
    });
  }

  detailsRooms(){
    if(this.checked){
      this.router.navigate(['/indexUser/detailsRoom/' + this.room.idRoom]).then();
    }
  }

  public selectRoom(event: any, room: any) {
    this.checked = true;
    this.room = room;
  }

  onChangePage(pageOfItems: Room[]) {
    this.pageOfItems = pageOfItems;
  }
}
