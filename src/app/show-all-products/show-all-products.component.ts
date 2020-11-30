import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { ProductForSale } from '../shared/models/ProductForSale';
import { Products } from '../shared/models/Products';
import { city } from '../shared/models/City';
import { SaleService } from '../shared/services/Sale.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Categories } from '../shared/models/categories';
import { CitiesAreas } from '../shared/models/CitiesAreas';
import { UpdatesSignalRService } from '../shared/services/UpdatesSignalRService .service';

@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.css']
})
export class ShowAllProductsComponent implements OnInit {
  productForSlaeList: ProductForSale[] = [];
  products: Products[] = [];
  productList: Products[] = [];
  categoryList: Categories[] = [];
  AreasList: CitiesAreas[] = [];
  citiesList: city[] = [];//list of filter by city;
  cities: city[] = [];//list of all cities
  selectedProduct: Products = new Products();
  selectedCity: city;
  selectedArea: CitiesAreas;
  selectedCategory: Categories;
  // MaxCost: number;
  isNew: boolean = false;
  allProducts: Products = new Products();
  constructor(private service: SaleService, private router: Router, private UpdatesSignalRService: UpdatesSignalRService) {
  }

  ngOnInit() {
    this.allProducts.CategoryId = 0;
    this.allProducts.ProductId = 0;
    this.allProducts.ProductName = "כל המוצרים";

    var category = new Categories();
    category.CategoryId = 0;
    category.CategoryName = "הכל";
    this.categoryList.push(category);
    this.service.getAllProductForSale().subscribe((products: Array<ProductForSale>) => {
      this.productForSlaeList = products;
      this.service.getCitiesList().subscribe((cities: Array<city>) => {
        this.citiesList = cities;
        this.service.getCategory().subscribe(c => {
          this.categoryList = c;
          this.service.getAreasList().subscribe(a => {
            this.AreasList = a;
            this.selectedArea = this.AreasList[0];
            this.service.getCityListAccordingToArea(this.AreasList[0].AreaId).subscribe(c => {
              this.citiesList = c;
              this.selectedCity = this.citiesList[0];
              this.productList.push(this.allProducts);
              this.selectedProduct = this.allProducts;
              this.selectedCategory = this.categoryList[0];
              this.service.getProductsList().subscribe(p => {
                this.products=p;
                this.service.getCitiesList().subscribe(x=>{
                  this.cities=x;
                },
                  (error:HttpErrorResponse)=>console.log(error.status+" "+error.statusText));
            },
                (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
            }, (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
          }, (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
        },
          (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    this.UpdatesSignalRService.getUpdate().subscribe((product: ProductForSale) => {
      this.productForSlaeList.push(product);
    });
  }

  viewProductDetails(product: ProductForSale) {
    this.router.navigate(['app/userHome/Tender/ChooseSuitableProductsComponent/showProductDetails', product.Id]);
  }
  filterProductForSaleList() {
    this.service.filterProductForSaleList(this.selectedCategory.CategoryId, this.selectedProduct.ProductId, this.selectedCity.CityId, this.isNew).subscribe((products: Array<ProductForSale>) => {
      this.productForSlaeList = products;
    },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  onSelectCategory(selectedCategory: number) {
    this.selectedCategory.CategoryId = selectedCategory;
    this.service.getProductList(selectedCategory).subscribe(p=>{
      this.productList=p;
    },(error:HttpErrorResponse)=>console.log(error.status+" "+error.statusText));
    this.productList = [];
    this.productList.push(this.allProducts);
    this.filterProductForSaleList();
  }
  onSelectArea(selectedarea: number) {
    this.service.getCityListAccordingToArea(selectedarea).subscribe(c=>{
      this.citiesList=c;
    },(error:HttpErrorResponse)=>console.log(error.status+" "+error.statusText));
    this.selectedCity = this.citiesList[0];
    this.filterProductForSaleList();
  }
  onSelectProduct(product: number) {
    this.selectedProduct.ProductId = product;
    this.filterProductForSaleList();
  }
  onSelectCity(city: number) {
    debugger
    this.selectedCity.CityId = city;
    this.filterProductForSaleList();
  }
  onChangeIsNew() {
    this.isNew = !this.isNew;
    this.filterProductForSaleList();
  }
  // onMaxCostChange()
  // {
  //   this.filterProductForSaleList();    
  // }
}