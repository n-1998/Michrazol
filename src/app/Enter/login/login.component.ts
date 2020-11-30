import { Component, OnInit, NgZone } from '@angular/core';
import { EnterService } from '../../shared/services/Enter.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../shared/models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { from } from 'rxjs/observable/from';
import { debug } from 'util';
import { UpdatesSignalRService } from '../../shared/services/UpdatesSignalRService .service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Service: EnterService, private router: Router,private signalRService:UpdatesSignalRService) { }

  password: string;
  email: string;
  exist: string;
  reset_password:boolean=false;

  ngOnInit() {
  }

  login() {
    this.Service.login(this.password, this.email).subscribe((user: User) => {
      if (user != null) {
        localStorage.setItem("userId", user.UserId.toString());
        localStorage.setItem("userName", user.FirstName);
        this.signalRService.disconnectToHub();
        this.signalRService.start();
        this.Service.updateConnectedUser();
        this.router.navigate(['']);
      }
      else this.exist = "משתמש לא קיים במאגר";

    },
      (error: HttpErrorResponse) => alert("can't connect to database"));
  }
  forgotPassword() {
    this.reset_password=true;
   
  }
  resetPassword()
  {
    debugger
     let user: User = new User();
    user.Mail = this.email;
    this.Service.forggotPassword(user).subscribe(() => {
      alert("אימייל לאיפוס סיסמה נשלח אל כתובת המייל שציינת")
      this.reset_password=false;
    })
      ,
      (error: HttpErrorResponse) => console.log(error.error + "" + error.message);
  }
  cancle() {
    this.router.navigate(['']);
  }

}
