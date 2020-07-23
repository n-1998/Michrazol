import { Component, OnInit } from '@angular/core';
import { ProductForSale } from '../../../../shared/models/ProductForSale';
import { SaleService } from '../../../../shared/services/Sale.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Products } from '../../../../shared/models/Products';
import { city } from '../../../../shared/models/City';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-product-for-sale',
  templateUrl: './user-product-for-sale.component.html',
  styleUrls: ['./user-product-for-sale.component.css']
})
export class UserProductForSaleComponent implements OnInit {

  productForSlaeList:ProductForSale [];
  products:Products [];
  cities:city [];
  noProductForSale:boolean=true;
  constructor(private service:SaleService,private router:Router) { 
  }

  ngOnInit() {
    this.service.getUserProductForSale(Number(localStorage.getItem("userId"))).subscribe((products: Array<ProductForSale>) => {   
      if(products.length==0)
      {  this.noProductForSale=true
        return;
      }  
      this.productForSlaeList = products;
      this.noProductForSale=false;
      this.service.getProductList(0).subscribe((products: Array<Products>) => {
        this.products = products;
        this.service.getCitiesList().subscribe((cities: Array<city>) => {
          this.cities = cities;
        },
          (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    },
      (error: HttpErrorResponse) =>{ this.noProductForSale=true});
  }

  deleteProduct(productId:number)
  {
   let product:ProductForSale=this.productForSlaeList.find(p=>p.Id==productId);
    this.service.deleteProductForSale(productId).subscribe((response:any)=>{
      this.productForSlaeList.splice(this.productForSlaeList.indexOf(product),1); 
    }),
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText)
  }

  viewProductDetails(product:ProductForSale)
  {
    this.router.navigate(['app/userHome/userSavedProductForSale/ProductForSaleDetailsComponent',product.Id]);
  }
}