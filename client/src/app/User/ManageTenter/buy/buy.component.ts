import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuyService } from '../../../shared/services/Buy.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  tenderId:number=0;
  productId:number=0;
  constructor(private route:ActivatedRoute,private tenderService:BuyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tenderId = params['tenderId'];
    })
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
    })
    this.tenderService.closeTender(this.tenderId,this.productId).subscribe(x=>{

    },(error:HttpErrorResponse)=>console.log(error.status+" "+error.statusText))

  }

}
