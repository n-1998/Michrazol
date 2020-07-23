import { Component, OnInit } from '@angular/core';
import { EnterService } from '../../shared/services/Enter.service';
import { User } from '../../shared/models/User';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-personal-details',
  templateUrl: './update-personal-details.component.html',
  styleUrls: ['./update-personal-details.component.scss']
})
export class UpdatePersonalDetailsComponent implements OnInit {

  user:User=new User();

  constructor(private enterService:EnterService) { }

  ngOnInit() {

    this.user.UserId=Number(localStorage.getItem("userId"));
      this.enterService.getUserById(this.user).subscribe(u=>{
        this.user=u;
    })
  }

  saveDetails(){
    this.enterService.updateUserDetails(this.user).subscribe((x:boolean)=>{
      if (x = true)
        alert("הפרטים נשמרו בהצלחה");
    })
  }
}
