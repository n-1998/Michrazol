import { Component, OnInit } from '@angular/core';
import { Products } from '../../../../shared/models/Products';
import { city } from '../../../../shared/models/City';
import { Categories } from '../../../../shared/models/categories';
import { ProductForSale } from '../../../../shared/models/ProductForSale';
import { SaleService } from '../../../../shared/services/Sale.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product-for-sale',
  templateUrl: './edit-product-for-sale.component.html',
  styleUrls: ['./edit-product-for-sale.component.css']
})
export class EditProductForSaleComponent implements OnInit {

  productList: Products[];
  categoryList: Categories[];
  citiesList: city[];
  EditProductForSale: ProductForSale;
  image: File;
  imageError: boolean = false;
  src: string = "";
  productId: number;
  defaultCategory:string;
  formData: FormData;

  constructor(private service: SaleService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
    })
    this.productList = new Array<Products>();
    this.EditProductForSale = new ProductForSale();
  }
  ngOnInit() {
    this.EditProductForSale.UserId = Number(localStorage.getItem('userId'));
    
    this.service.getProductForSaleById(this.productId).subscribe(p => {
      
      this.EditProductForSale = p;
     
      this.service.getCategory().subscribe(c => {
        this.categoryList=c;
    },
       (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      this.service.getCitiesList().subscribe((cities: Array<city>) => {
        this.citiesList = cities;

          this.service.getProductListWithSameProductType(this.EditProductForSale.ProductId).subscribe(p => {
            this.productList = p;
            var mProduct=this.productList.find(x=>x.ProductId==this.EditProductForSale.ProductId);
            this.defaultCategory=this.categoryList.find(x=>x.CategoryId==mProduct.CategoryId).CategoryName;
          },
            (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
        },
          (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  onSelectCategory(selectedCategory: number) {
    this.service.getProductList(selectedCategory)
      .subscribe((products: Array<Products>) => {
        this.productList = products;
      },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }

  uploadImg(event: FormData) {
    this.formData = event;
  }

  // saveProductForSale(): void {
  //   // //var blob = new ([this.EditProductForSale.ImageUrl], {type : 'image/jpg'});
  //   // //this.EditProductForSale.ImageData = blob;
  //   // console.log(this.EditProductForSale);
  //   // this.service.addProductForSale(this.EditProductForSale)
  //   //   .subscribe((product: ProductForSale) => {
  //   //   },
  //   //     (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  // }

  saveChanges()
  {
    this.service.EditProductForSale(this.EditProductForSale).subscribe(p => {
    this.router.navigate(['app/userHome/userSavedProductForSale/ProductForSaleDetailsComponent',this.EditProductForSale.Id]);
      
    },
    (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  cancle() {
    this.router.navigate(['app/userHome/userSavedProductForSale/ProductForSaleDetailsComponent',this.EditProductForSale.Id]);

  }
}
