import { Component, OnInit } from '@angular/core';
import {PasswordsService} from "../../../services/passwords.service";

class Password {
  password: string;
  login  : string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private password: Password = new Password();

  constructor(public passwordsService: PasswordsService) {

  }

  ngOnInit() {
  }

  submitFun(){
    this.passwordsService.isExist(this.password.password, this.password.login).subscribe(res => {
      if(res != 0){
        this.passwordsService.getUserPass(this.password.password, this.password.login);
      }
      else{
        alert("Nie ma takiego użytkownika, spróbuj ponownie")
      }
    });
  }
}
