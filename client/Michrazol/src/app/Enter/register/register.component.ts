import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { EnterService } from '../../shared/services/Enter.service'
import { Router } from '@angular/router';
import { UpdatesSignalRService } from '../../shared/services/UpdatesSignalRService .service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User;
  recaptchaImages = [];
  img: any = "";
  firstForm: string = "";
  secondForm: string = "hidden";
  thirdForm: string = "hidden";
  fourthForm: string = "hidden";
  recaptchaValue = "";
  recaptchaError: boolean = false;
  vdiv: string = "vDivhHidden";
  existEmail: boolean=false;
  confirmPassword:string="";
  constructor(private Service: EnterService, private router: Router,private signalRService:UpdatesSignalRService) {

    this.newUser = new User();
  }

  ngOnInit() {
    this.recaptchaImages.push({
      key: "Aus8d4",
      value: "../assets/recaptch-images/Aus8d4.JPG"
    });
    this.recaptchaImages.push({
      key: "4H7wp1",
      value: "../assets/recaptch-images/4H7wp1.JPG"
    });
    this.recaptchaImages.push({
      key: "eE5Y9z",
      value: "../assets/recaptch-images/eE5Y9z.JPG"
    });
    this.createRecaptcha();
  }
  addUser(): void {
    this.Service.addUser(this.newUser)
      .subscribe((userId: Number) => {
        if (userId != 0)
          localStorage.setItem("userId", userId.toString());
        localStorage.setItem("userName", this.newUser.FirstName);
        this.signalRService.disconnectToHub();
        this.signalRService.start();
        this.Service.updateConnectedUser();
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  cancle() {
    this.router.navigate(['']);
  }
  createRecaptcha() {

    var rand;
    rand = Math.floor(Math.random() * 3);
    this.img = this.recaptchaImages[rand];
    //var img =  require(this.recaptchaImages[0].value);
  }

  checkRecaptcha() {
    if (this.recaptchaValue == this.img.key) {
      this.addUser();
      this.fourthForm = "";
      this.thirdForm = "hidden";
      this.vdiv = "vDiv";
    }
    else {
      this.recaptchaError = true;
    }
  }

  completeFirstForm() {
    this.firstForm = "hidden";
    this.secondForm = "";
  }
  completeSecondForm() {
    this.Service.checkExistEmail(this.newUser)
      .subscribe((isExist: boolean) => {
        if(isExist==true)
        this.existEmail=true;
        else
        {
              this.secondForm = "hidden";
    this.thirdForm = "";
        }
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));

  }
  goToUserHome() {
    this.router.navigate(['app/userHome/UserHomeDescpriction']);
  }
}