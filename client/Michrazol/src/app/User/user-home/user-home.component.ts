import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {MatTabsModule} from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from '../../shared/services/Sale.service';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  public isCollapsed = true;
  userName:string;
  constructor(private route: ActivatedRoute,private service:SaleService) { }

  ngOnInit() {
    this.userName =localStorage.getItem("userName");
    // this.route.params.subscribe(params => {
    //   this.userName = params['userName'];
    // })
  }
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

}