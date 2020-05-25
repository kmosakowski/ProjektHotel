import { Component } from '@angular/core';
import {GlobalVar} from "./globalVar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Strona Główna';
  private logoName = 'Logo';
  constructor(
    public globalVar: GlobalVar,
    private router: Router) {
  }

  ngOnInit() {

  }

  logout(){
    this.globalVar.nameUser = undefined;
    this.router.navigate(['']);
  }

}
