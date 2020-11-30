import { Component, OnInit } from '@angular/core';
import { EnterService } from '../shared/services/Enter.service';
import { SaleService } from '../shared/services/Sale.service';
import { Router } from '../../../node_modules/@angular/router';
import { UpdatesSignalRService } from '../shared/services/UpdatesSignalRService .service';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  imageUrlArray: string[] = [
    '../../assets/homeImage.jpg',
    '../../assets/image2.jpg',
    '../../assets/ecommerce-3563183__340.jpg'
  ];
  constructor( private router: Router,private service:EnterService,private saleService:SaleService,private updatesSignalRService:UpdatesSignalRService) { }

  user:number;
  userName:string;
  ngOnInit() {

    this.saleService.onInIt();
    this.user=Number(localStorage.getItem("userId"));
    if(this.user!=0)
        this.userName=localStorage.getItem("userName");
        else this.userName="אורח";
  }

  // signalR(){
  //   debugger;
  //   this.updatesSignalRService.start();
  // }

  userGoOut()
  {
    this.userName="אורח";
    this.user=0;
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    this.router.navigate(['']);
  }
}
