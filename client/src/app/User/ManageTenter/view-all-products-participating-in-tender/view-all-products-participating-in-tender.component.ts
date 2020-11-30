import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyService } from '../../../shared/services/Buy.service';
import { ProductForSale } from '../../../shared/models/ProductForSale';
import { HttpErrorResponse } from '@angular/common/http';
import { tender } from '../../../shared/models/Tender';
import { LastTenders } from '../../../shared/models/LastTenders';
import { SaleService } from '../../../shared/services/Sale.service';
import { Images } from '../../../shared/models/Images';
import { from } from 'rxjs/observable/from';
import { UpdatesSignalRService } from '../../../shared/services/UpdatesSignalRService .service';
@Component({
  selector: 'app-view-all-products-participating-in-tender',
  templateUrl: './view-all-products-participating-in-tender.component.html',
  styleUrls: ['./view-all-products-participating-in-tender.component.scss']
})
export class ViewAllProductsParticipatingInTenderComponent implements OnInit {

  constructor(private route:ActivatedRoute,private tenderService:BuyService,private saleService:SaleService,private Router:Router,private signalrService:UpdatesSignalRService) { }
  
  tender:tender=new tender();
  productsForSale:ProductForSale[]=[];
  productsList:LastTenders[]=[];
  isChoose:boolean=false;
  isBuy:boolean=false;
  cheepestProduct:LastTenders=new LastTenders();
  productsIdsList:number[]=[];
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['isChoose'] != undefined)
      {
        this.isChoose= params['isChoose'];
      }
      if (params['isBuy'] != undefined)
      {
        this.isBuy= params['isBuy'];
      }
    });
    this.route.params.subscribe(params => {
      if (params['tenderId'] != undefined)
      {
        this.tender.Id = params['tenderId'];
        this.tenderService.getAllProductsOfTenderByTenderId(this.tender.Id).subscribe((x: ProductForSale[]) => {
          this.productsForSale = x;
          x.forEach(element => {
            let y: LastTenders = new LastTenders();
            y.Description = element.Description;
            y.IsNew = element.IsNew;
            y.price = element.InitialBid;
            y.ProductId = element.Id;
            this.productsList.push(y);
          });
          this.productsForSale.forEach(element => {
            this.productsIdsList.push(element.Id)
          });
          this.saleService.getImagesOfProductsForSaleList(this.productsIdsList).subscribe((Images: Array<Images>) => {
            this.productsList.forEach(element => {
              Images.forEach(element2 => {
                if (element.ProductId == element2.ProductId)
                  element.images.push("http://localhost:52339/Images/" + element2.ImgGuid);
              });
            });

            if(this.isBuy)
            {
              this.cheepestProduct=this.productsList[0];
              this.productsList.splice(0,1);
            }
          },
            (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
        }, (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      }
      else this.tenderService.getTenderId().subscribe((x: tender) => {
        this.tender = x;
        this.tenderService.getAllProductsOfTenderByTenderId(this.tender.Id).subscribe((x: ProductForSale[]) => {
          this.productsForSale = x;
          x.forEach(element => {
            let y: LastTenders = new LastTenders();
            y.Description = element.Description;
            y.IsNew = element.IsNew;
            y.price = element.InitialBid;
            y.ProductId = element.Id;
            this.productsList.push(y);
          });
          this.productsForSale.forEach(element => {
            this.productsIdsList.push(element.Id)
          });
          this.saleService.getImagesOfProductsForSaleList(this.productsIdsList).subscribe((Images: Array<Images>) => {
            this.productsList.forEach(element => {
              Images.forEach(element2 => {
                if (element.ProductId == element2.ProductId)
                  element.images.push("http://localhost:52339/Images/" + element2.ImgGuid);
              });
            });
          },
            (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
        }, (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      }, (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    });
    this.signalrService.getChoosedProductsUpdate().subscribe(x=>{
      let y: LastTenders = new LastTenders();
      y.Description = x.Description;
      y.IsNew = x.IsNew;
      y.price = x.InitialBid;
      y.ProductId = x.Id;
      this.productsList.push(y);
      this.productsIdsList.push(x.Id)
      this.saleService.getImagesOfProductsForSaleList(this.productsIdsList).subscribe((Images: Array<Images>) => {
        this.productsList.forEach(element => {
          Images.forEach(element2 => {
            if (element.ProductId == element2.ProductId)
              element.images.push("http://localhost:52339/Images/" + element2.ImgGuid);
          });
        });
      },(error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    })
  }
  showDeatails(ProductId:number)
  {debugger
    this.Router.navigate(["app/userHome/Tender/showProductDetails",ProductId]);
  }
  delete(item:LastTenders)
  {
    let tenderId=this.tender.Id;
    let productForSaleId=item.ProductId;
    this.tenderService.removeOneProductFromTender(tenderId,productForSaleId).subscribe(x=>{
      this.productsList.splice(this.productsList.indexOf(item), 1)
    },(error: HttpErrorResponse) => console.log(error.status + " " + error.statusText))

  }

  buy(item:LastTenders)
  { 
    this.Router.navigate(["app/userHome/ManageTender/buy",this.tender.Id,item.ProductId]);
  }
}

