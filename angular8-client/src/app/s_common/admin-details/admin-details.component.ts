import { Component, OnInit } from '@angular/core';
import {forkJoin} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HotelService} from "../../../services/hotel.service";
import {Hotel} from "../../../models/hotel";
import {Location} from "@angular/common";

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {

  hotels: Hotel[];

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails(){
    this.route.paramMap.subscribe(params => {
      console.log(params);
      console.log(params.get('id'));
      forkJoin(this.hotelService.getHotel(Number(params.get('id')))).subscribe(res =>{
        this.hotels = res;
      });
    });
  }

  backClicked() {
    this.location.back();
  }
}
