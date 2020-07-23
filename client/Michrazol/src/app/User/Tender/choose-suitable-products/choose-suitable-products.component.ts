import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductForSale } from '../../../shared/models/ProductForSale';
import { Products } from '../../../shared/models/Products';
import { city } from '../../../shared/models/City';
import { SaleService } from '../../../shared/services/Sale.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BuyService } from '../../../shared/services/Buy.service';
import { LastTenders } from '../../../shared/models/LastTenders';
import { tender } from '../../../shared/models/Tender';
import { Images } from '../../../shared/models/Images';

@Component({
  selector: 'app-choose-suitable-products',
  templateUrl: './choose-suitable-products.component.html',
  styleUrls: ['./choose-suitable-products.component.css']
})
export class ChooseSuitableProductsComponent implements OnInit {
  constructor(private route:ActivatedRoute,private tenderService:BuyService,private saleService:SaleService,private Router:Router) { }
  
  tender:tender=new tender();
  productsForSale:ProductForSale[]=[];
  productsList:LastTenders[]=[];
  isChoose:boolean=false;
  isBuy:boolean=false;
  cheepestProduct:LastTenders=new LastTenders();
  todisplay:boolean=true;
  tab1hidden="";
  tab2hidden="hidden";

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.tender.Id = params['tenderId'];
        this.tenderService.getSuitableProductsForChoose(this.tender.Id).subscribe((x: ProductForSale[]) => {
         debugger
          this.productsForSale = x;
          x.forEach(element => {
            let y: LastTenders = new LastTenders();
            y.Description = element.Description;
            y.IsNew = element.IsNew;
            y.price = element.InitialBid;
            y.ProductId = element.Id;
            this.productsList.push(y);
          });
          let productsIdsList = [];
          this.productsForSale.forEach(element => {
            productsIdsList.push(element.Id)
          });
          this.saleService.getImagesOfProductsForSaleList(productsIdsList).subscribe((Images: Array<Images>) => {
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
    });
  }
  showDeatails(ProductId:number)
  {
    this.Router.navigate(["app/userHome/Tender/showProductDetails",ProductId]);
  }
  choose(item:LastTenders)
  {
    let tenderId=this.tender.Id;
    let productForSaleId=item.ProductId;
    this.tenderService.addOneProductForTender(tenderId,productForSaleId).subscribe(x=>{
      debugger
      this.productsList.splice(this.productsList.indexOf(item), 1)
    },(error: HttpErrorResponse) => console.log(error.status + " " + error.statusText))
  }
  display()
  {
    debugger
    if(this.tab1hidden=="hidden")
    {
      this.tab1hidden = "";
      this.tab2hidden = "hidden";
    }
    else
    {
      this.tab1hidden = "hidden";
      this.tab2hidden = "";
      this.ngOnInit();
    }
  }
}
//   productForSlaeList: ProductForSale[];
//   products: Products[];
//   cities: city[];
//   selectedProducts: ProductForSale[] = [];
//   removedProducts: ProductForSale[] = [];
//   newProducts: ProductForSale[] = [];
//   tenderId: number;
//   constructor(private service: BuyService, private saleService: SaleService, private router: Router, private route: ActivatedRoute) {
//   }

//   ngOnInit() {
//     this.route.params.subscribe(params => {
//       this.tenderId = params['tenderId'];
//     })
//     this.saleService.getCitiesList().subscribe((cities: Array<city>) => {
//       this.cities = cities;
//     this.service.getSuitableProductsForChoose(this.tenderId).subscribe((products: Array<ProductForSale>) => {
//       this.productForSlaeList = products;
//       this.saleService.getProductList(0).subscribe((products: Array<Products>) => {
//         this.products = products;
//         this.service.getSelectedProducts(this.tenderId).subscribe((products: Array<ProductForSale>) => {
//           this.selectedProducts = products;
//           this.productForSlaeList.forEach(element => {
//             if (this.selectedProducts.find(x => x.Id == element.Id) != null)
//               this.productForSlaeList.splice(this.productForSlaeList.indexOf(element), 1);
//           });
//         },
//           (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
//       },
//         (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
//     },
//       (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
//    },
//       (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
//   }

//   // deleteProduct(productId:number)
//   // {
//   //  let product:ProductForSale=this.productForSlaeList.find(p=>p.Id==productId);
//   //   this.service.deleteProductForSale(productId).subscribe((response:any)=>{
//   //     this.productForSlaeList.splice(this.productForSlaeList.indexOf(product),1); 
//   //   }),
//   //     (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText)
//   // }

//   viewProductDetails(product: ProductForSale) {
//     this.router.navigate(['app/userHome/Tender/ChooseSuitableProductsComponent/showProductDetails', product.Id]);
//   }
//   selectedProduct(product: ProductForSale) {
//     this.selectedProducts.push(product);
//     this.productForSlaeList.splice(this.productForSlaeList.indexOf(product), 1);
//     if (this.removedProducts.find(x => x.Id == product.Id) != null)
//       this.removedProducts.splice(this.removedProducts.indexOf(product), 1)
//     else this.newProducts.push(product);
//   }
//   removeProduct(product: ProductForSale) {
//     this.selectedProducts.splice(this.selectedProducts.indexOf(product), 1);
//     this.productForSlaeList.push(product);
//     if (this.newProducts.find(x => x.Id == product.Id) != null)
//       this.newProducts.splice(this.newProducts.indexOf(product), 1)
//     else this.removedProducts.push(product);
//   }
//   saveSelectedProducts() {
//     this.service.addProductsToTender(this.newProducts, this.tenderId).subscribe((response: any) => {
//       this.service.removeProductFromTender(this.removedProducts,this.tenderId).subscribe((response:any)=>{
//         this.removedProducts=[];
//         this.newProducts=[];
//       }),
//       (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText)
//     }),
//       (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText)
//   }
// }

