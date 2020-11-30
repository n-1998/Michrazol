import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tenderDetails } from '../../../shared/models/tenderDetails';
import { tender } from '../../../shared/models/Tender';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyService } from '../../../shared/services/Buy.service';
import datetimeDifference from "datetime-difference";
import { UpdatesSignalRService } from '../../../shared/services/UpdatesSignalRService .service';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.scss'],
})
export class TenderDetailsComponent implements OnInit {

  tenderId: number=-1;
  details: tenderDetails;
  tender:tender;
  constructor(  private route: ActivatedRoute, private service: BuyService,private router:Router,private signalrservice:UpdatesSignalRService) {
    this.details=new tenderDetails();
    this.tender=new tender();
    this.tender.StartDate=new Date();
    this.tender.EndDate=new Date();
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tenderId = params['tenderId'];
    })
    this.service.getManageTenderDetails(this.tenderId).subscribe(d => {
      this.details = d;
      this.service.getTenderById(this.tenderId).subscribe(t => {
        this.tender = t;
        this.service.tenderId.next(this.tender);
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      this.signalrservice.getPriceUpdates().subscribe(x=>{
        debugger
        this.details.LowestPrice=x.SuggestedPrice;
      }, (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText))
  }
  showProducts()
  {
    this.router.navigate(['app/userHome/ManageTender/AllProductsParticipating',this.tenderId]);
  }
  chooseProducts()
  {
    this.router.navigate(['app/userHome/Tender/ChooseSuitableProductsComponent',this.tenderId,true]);
  }
  closeTender()
  {
    this.router.navigate(['app/userHome/ManageTender/CloseTender',this.tenderId,true]);
  }
}
