import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { suggestedPrices } from '../../../shared/models/SuggestedPrices';
import { SaleService } from '../../../shared/services/Sale.service';
import { HttpErrorResponse } from '@angular/common/http';
// import Swal from 'sweetalert2'

@Component({
  selector: 'app-suggest-price',
  templateUrl: './suggest-price.component.html',
  styleUrls: ['./suggest-price.component.css']
})
export class SuggestPriceComponent implements OnInit {

  suggest:suggestedPrices;
  tenderId:number;
  productId:number;
  constructor(private route: ActivatedRoute,private service:SaleService,private router: Router) {
    this.suggest=new suggestedPrices();
   }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.suggest.UserProductId = params['productForSaleId'];
      this.suggest.TenderId=params['TenderId'];
    })
  }

  save()
  {
    this.suggest.LastModifiedDate=new Date(Date.now());
    this.service.saveSuggestPrice(this.suggest) .subscribe((x: string) => {
      console.log(x);
      // Swal( "הצעת המחיר החדשה נשמרה בהצלחה","", "success")
      this.router.navigate(['app/userHome/ManageTenter/ShowAllSuitableTenderComponent',this.suggest.UserProductId]);  
    },
    (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  cancle()
  {
  this.router.navigate(['app/userHome/ManageTenter/ShowAllSuitableTenderComponent',this.suggest.UserProductId]);  
  }
}
