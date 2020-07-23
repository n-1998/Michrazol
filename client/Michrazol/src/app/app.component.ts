import { Component, OnInit  } from '@angular/core';
import { EnterService } from './shared/services/Enter.service'
import { SaleService } from './shared/services/Sale.service';
import { InputsModule, WavesModule, ButtonsModule, CardsFreeModule } from 'angular-bootstrap-md'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router } from '../../node_modules/@angular/router';
import { UpdatesSignalRService } from './shared/services/UpdatesSignalRService .service';
import { User } from './shared/models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { Inject, HostListener } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public navWhite: string = ""; 
  constructor(@Inject(DOCUMENT) private doc: Document, private router: Router,private service:EnterService,private saleService:SaleService,private signalRservice:UpdatesSignalRService) { }

  isAtHome:boolean=true;
  activeLink:string="activeLink";
  user:User=new User();
  ngOnInit() {
    this.signalRservice.start();
    this.saleService.onInIt();
    this.service.getConnectedUser().subscribe((u: User) => {
      this.user=u;
    }),
    (error: HttpErrorResponse) => { console.log(error.error + "" + error.message)}; 
       this.service.updateConnectedUser();
  }
  logOut()
  {
    localStorage.clear();
    this.service.updateConnectedUser();
    this.signalRservice.disconnectToHub();
    this.signalRservice.start();
    this.router.navigate(['']);
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
     let num = window.scrollY;
     if ( num > 250 ||this.isAtHome==false) {
         this.navWhite = "navWhite";
     }else {
         this.navWhite = "";
     }
  }
  removeActive()
  {
    this.isAtHome=false;
    this.activeLink="";
    this.navWhite="navWhite";
  }

  backWhite()
  {
    this.isAtHome=true;
    this.navWhite="";
  }
}