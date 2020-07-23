import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs/observable/from';
import { ProductForSale } from '../../../../shared/models/ProductForSale';
import { SaleService } from '../../../../shared/services/Sale.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Images } from '../../../../shared/models/Images';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-product-for-sale-details',
  templateUrl: './product-for-sale-details.component.html',
  styleUrls: ['./product-for-sale-details.component.css']
})
export class ProductForSaleDetailsComponent implements OnInit {
  counter: number=1;
  productId: number;
  image: string[];
  productForSale: ProductForSale;
  productName: string;
  city: string;
  categoryName: string;
  productImages: Images[];
  localhost:string;
  // variables for display images
  numbersOfImages:number[]=[];
  className:string[]=[];
  hidden:string[]=[];
  slideIndex:number = 1;
  aaa="hidden";
  apiTimer : any
  // public InitialBid :number=0,
  private sTimeout: number; // Storing Timeout ID - to clear it - if needed


  constructor(private service: SaleService, private router: Router, private route: ActivatedRoute) {
    this.productForSale = new ProductForSale();
  
  }
  ngOnInit() {
    // this.getPicture();
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
    })
    this.localhost="http://localhost:52339/Images/"
    //this.src = "http://localhost:52339/Images/1d7f5de5-90a3-4e2a-ba3a-8d83fdc23400.jpg"
    this.service.getProductForSaleById(this.productId).subscribe(p => {
      this.service.getProductForSaleImages(this.productId).subscribe((img: Images[]) => {
        this.productImages=img;
        for (let index = 0; index < img.length; index++) {
          this.numbersOfImages.push(index+1);
          
        }
       //setTimeout(() => this.showDivs(this.slideIndex), 5000);
       this.showDivs(this.slideIndex);
      this.apiTimer= setInterval(() => {
        this.slideIndex+=1
                 this.showDivs(this.slideIndex)
               }, (this.counter*3000));
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText);
      }, )
      this.productForSale = p;
      this.service.getProductsList().subscribe(x => {
        this.productName = x.find(y => y.ProductId == this.productForSale.ProductId).ProductName;
        var Category = x.find(y => y.ProductId == this.productForSale.ProductId).CategoryId;
        this.service.getCategory().subscribe(c => {
          this.categoryName = c.find(x => x.CategoryId == Category).CategoryName;
        },
          (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText)); 
      this.service.getCitiesList().subscribe(y => {
        this.city = y.find(x => x.CityId == this.productForSale.City).CityName;
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      this.service.getCitiesList().subscribe(y => {
        this.city = y.find(x => x.CityId == this.productForSale.City).CityName;
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    //   this.productName = this.service.productList.find(x => x.ProductId == this.productForSale.ProductId).ProductName;
    //   this.city = this.service.citiesList.find(x => x.CityId == this.productForSale.City).CityName;
    //   var Category = this.service.productList.find(x => x.ProductId == this.productForSale.ProductId).CategoryId;
    //   this.categoryName = this.service.categoryList.find(x => x.CategoryId == Category).CategoryName;
     },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
   
  }
  editProduct() {
    this.router.navigate(['app/userHome/userSavedProductForSale/EditProductForSaleComponent', this.productForSale.Id]);
  }
  displayPhoto(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();

      reader.onload = ((e) => {
        this.image.push(e.target['result']);
      });
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  goToSuggestPrice() {
    this.router.navigate(['app/userHome/ManageTenter/ShowAllSuitableTenderComponent', this.productForSale.Id]);
  }
  getPicture() {
    this.service.getPictures().subscribe((response: any) => {
    })
  }
  // ****************************

  

  plusDivs(n:number) {
    this.showDivs(this.slideIndex += n);
  }

  currentDiv(n:number) {
    this.showDivs(this.slideIndex = n);
  }

  showDivs(n:number) {
    var i;
    var x = this.productImages.length;
    if (n > x) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = x };
    for (i = 0; i < x; i++) {
      this.hidden[i] = "hidden";
    }
    for (i = 0; i < x; i++) {
      this.className[i]="";
    }
    this.hidden[this.slideIndex - 1] = "";
    this.className[this.slideIndex - 1] = " w3-white";
  }
}
