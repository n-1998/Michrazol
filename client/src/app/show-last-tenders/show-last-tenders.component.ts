import { Component, OnInit } from '@angular/core';
import { ProductForSale } from '../shared/models/ProductForSale';
import { tender} from '../shared/models/Tender';
import { BuyService } from '../shared/services/Buy.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Images } from '../shared/models/Images';
import { SaleService } from '../shared/services/Sale.service';
import { LastTenders } from '../shared/models/LastTenders';
import { Products } from '../shared/models/Products';

@Component({
  selector: 'app-show-last-tenders',
  templateUrl: './show-last-tenders.component.html',
  styleUrls: ['./show-last-tenders.component.scss']
})
export class ShowLastTendersComponent implements OnInit {

  productTypes:Products[]=[];
  lastTenders:LastTenders[]=[];
  selledProducts:ProductForSale[]=[];
  endedTenders:tender[]=[];
  tenderIds:number[]=[];
  productsForSaleIds:number[]=[];
  ImagesForProducts = new Map<number, string[]>();
  localhost="http://localhost:52339/Images/";
  constructor(private tenderService:BuyService,private saleService:SaleService) { }

  ngOnInit() {
    this.tenderService.getSelledProducts().subscribe((products: Array<ProductForSale>)=>{
      this.selledProducts=products;
      console.log(this.selledProducts);
      this.selledProducts.forEach(element => {
        this.tenderIds.push(element.SelledToTenderId);
      });
      this.tenderService.getendedTenders(this.tenderIds).subscribe((tender: Array<tender>) => {
        this.endedTenders = tender;
        console.log(this.endedTenders);
        products.forEach(element => {
          this.productsForSaleIds.push(element.Id);
        });
        this.saleService.getImagesOfProductsForSaleList(this.productsForSaleIds).subscribe((Images: Array<Images>) => {
          Images.forEach(element => {
            if(this.ImagesForProducts.has(element.ProductId)==false)
            {
              let img=[];
              img.push(this.localhost+ element.ImgGuid);
              this.ImagesForProducts.set(element.ProductId,img)
            }
            else
            {
              this.ImagesForProducts.get(element.ProductId).push(this.localhost+element.ImgGuid);
            }
          // this.ImagesForProducts.set("John", { firstName: "John", lastName: "Doe" });

          // // Checking for the presence of a key:
          // this.ImagesForProducts.has("John"); // true

          // // Retrieving a value by a key:
          // this.ImagesForProducts.get("John").lastName; // "Doe"

          // // Deleting an item by a key:
          // this.ImagesForProducts.delete("John");
          });
          console.log(this.ImagesForProducts);
          this.selledProducts.forEach(element => {
            let last:LastTenders=new LastTenders();
            last.ProductId=element.ProductId;
            last.IsNew=element.IsNew;
            last.Description=element.Description;
            last.EndDate=element.LastModifiedDate;
            last.price=element.InitialBid;
            console.log(this.ImagesForProducts.get(element.Id));
              last.images=this.ImagesForProducts.get(element.Id);
            this.lastTenders.push(last);
          });
          console.log(this.lastTenders);
          this.saleService.getProductsList().subscribe((p:Products[])=>
          {
            this.productTypes=p;
          },
          (error:HttpErrorResponse)=>console.log(error.status+" "+error.statusText));
        },
          (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }

}
