import { Component, OnInit } from '@angular/core';
import {Guest} from "../../../models/guest";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {forkJoin} from "rxjs";
import {GuestService} from "../../../services/guest.service";

@Component({
  selector: 'app-admin-details2',
  templateUrl: './admin-details2.component.html',
  styleUrls: ['./admin-details2.component.css']
})
export class AdminDetails2Component implements OnInit {

  users: Guest[];


  constructor(
    private route: ActivatedRoute,
    private guestService: GuestService,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails(){
    this.route.paramMap.subscribe(params => {
      console.log(params);
      console.log(params.get('id'));
      forkJoin(this.guestService.getGuest(Number(params.get('id')))).subscribe(res =>{
        this.users = res;
      });
    });
  }

  backClicked() {
    this.location.back();
  }
}
