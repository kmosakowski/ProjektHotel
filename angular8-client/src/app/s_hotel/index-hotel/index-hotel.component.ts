import { Component, OnInit } from '@angular/core';
import {Room} from "../../../models/room";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {CityService} from "../../../services/city.service";
import {GlobalVar} from "../../globalVar";

@Component({
  selector: 'app-index-hotel',
  templateUrl: './index-hotel.component.html',
  styleUrls: ['./index-hotel.component.css']
})
export class IndexHotelComponent implements OnInit {

  private checked: boolean = false;
  rooms: Room[];
  pageOfItems: Room[];
  id: number;
  private room: Room;

  constructor(public globalVar: GlobalVar,
              private route: ActivatedRoute,
              private roomService: RoomService,
              private cityService: CityService,
              private router: Router) {
    this.room = new Room();
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.roomService.getRoomByHotel(this.globalVar.idUser).subscribe(res => {
      this.rooms = res;
    });
  }

  public selectRoom(event: any, room: any) {
    this.checked = true;
    this.room = room;
  }

  delRoom(){
    if(this.checked){
      this.roomService.deleteRoom(this.room.idRoom).subscribe(res => {
        this.reloadData();
      });
      alert("Pomyślnie usunięto rezerwację");
    }
  }

  detailsRooms(){
    if(this.checked){
      this.router.navigate(['/indexHotel/preview/'+this.room.idRoom]).then();
    }
  }

  onChangePage(pageOfItems: Room[]) {
    this.pageOfItems = pageOfItems;
  }
}
