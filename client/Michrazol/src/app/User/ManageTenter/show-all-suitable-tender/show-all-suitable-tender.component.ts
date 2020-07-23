import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tender } from '../../../shared/models/Tender';
import { ProductForSale } from '../../../shared/models/ProductForSale';
import { BuyService } from '../../../shared/services/Buy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleService } from '../../../shared/services/Sale.service';
import { Products } from '../../../shared/models/Products';
import { city } from '../../../shared/models/City';

@Component({
  selector: 'app-show-all-suitable-tender',
  templateUrl: './show-all-suitable-tender.component.html',
  styleUrls: ['./show-all-suitable-tender.component.css']
})
export class ShowAllSuitableTenderComponent implements OnInit {

  TenderList:tender [];
  products:Products [];
  cities:city [];
  productId:number;
  constructor(private service:BuyService,private router:Router,private saleService:SaleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['productForSaleId'];
    })

    this.saleService.getSuitableTenderByProductId(this.productId).subscribe((tender: Array<tender>) => {
      this.TenderList = tender;
      this.saleService.getProductList(0).subscribe((products: Array<Products>) => {
        this.products = products;
        this.saleService.getCitiesList().subscribe((cities: Array<city>) => {
          this.cities = cities;
        },
          (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  deleteTender(tenderId:number)
  {
   let tender:tender=this.TenderList.find(t=>t.Id==tenderId);
    this.service.deleteTender(tenderId).subscribe((response:any)=>{
      this.TenderList.splice(this.TenderList.indexOf(tender),1); 
    }),
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText)
  }

  editTender(product:ProductForSale)
  {
    this.router.navigate(['app/userHome/savedTenders/userProductForBuy/EditTender',product.Id]);
  }
  editSuggestPrice(tenderId:number)
  {
    this.router.navigate(['app/userHome/ManageTenter/SuggestPrice/EditSuggestPrice/',this.productId,tenderId]);
  }
}
