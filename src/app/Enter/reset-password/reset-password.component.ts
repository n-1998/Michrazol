import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterService } from '../../shared/services/Enter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  password:string="";
  resetId:number;
  user:User=new User();
  isEffectiveResetPassword:boolean=true;
  constructor(private route:ActivatedRoute,private service:EnterService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resetId = params['resetId'];
    })
    this.service.checkEffectiveResetPassword(this.resetId).subscribe((x:boolean)=>{
      if(x==false)
      this.isEffectiveResetPassword=false;
    },
    (error:HttpErrorResponse)=>console.log(error.status+ " "+error.statusText));
  }
  resetPassword()
  {
    this.user.UserId=this.resetId;
    this.user.Password=this.password;
    this.service.resetPassword(this.user).subscribe(x=>{
      alert("הסיסמה שונתה בהצלחה");
      this.router.navigate(['app/login']);
    },
    (error:HttpErrorResponse)=>console.log(error.status+ " "+error.statusText));
  }
}
