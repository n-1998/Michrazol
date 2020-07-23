import { Component, OnInit } from '@angular/core';
import { ProductForSale } from '../../../../shared/models/ProductForSale';
import { city } from '../../../../shared/models/City';
import { Products } from '../../../../shared/models/Products';
import { HttpErrorResponse } from '@angular/common/http';
import { BuyService } from '../../../../shared/services/Buy.service';
import { Router } from '@angular/router';
import { tender} from '../../../../shared/models/Tender';
import { SaleService } from '../../../../shared/services/Sale.service';

@Component({
  selector: 'app-user-product-for-buy',
  templateUrl: './user-product-for-buy.component.html',
  styleUrls: ['./user-product-for-buy.component.css']
})
export class UserProductForBuyComponent implements OnInit {

  TenderList:tender []=[];
  products:Products []=[];
  cities:city []=[];
  noTender:boolean=true;
  constructor(private service:BuyService,private router:Router,private saleService:SaleService) {

  }

  ngOnInit() { 
       this.service.getUserTenderList(Number(localStorage.getItem("userId"))).subscribe((tender:any) => {
      this.TenderList = tender;
      this.noTender=false;
      this.saleService.getProductList(0).subscribe((products: Array<Products>) => {
        this.products = products;
        this.saleService.getCitiesList().subscribe((cities: Array<city>) => {
          this.cities = cities;
        },
          (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    },
      (error: HttpErrorResponse) => this.noTender=true);
     
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
  chooseProductForTender(tenderId:number)
  {
    this.router.navigate(['app/userHome/Tender/ChooseSuitableProductsComponent',tenderId,true]);
  }
  showManageTenderDetails(tenderId:number)
  {
    this.router.navigate(['app/userHome/ManageTender/showTenderDetails',tenderId]);
  }
}
