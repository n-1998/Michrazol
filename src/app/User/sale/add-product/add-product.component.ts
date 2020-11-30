import { Component, OnInit } from '@angular/core';
import { ProductForSale } from '../../../shared/models/ProductForSale'
import { SaleService } from '../../../shared/services/Sale.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Products } from '../../../shared/models/Products';
import { Categories } from '../../../shared/models/categories';
import { ActivatedRoute, Router } from '@angular/router';
import { city } from '../../../shared/models/City';
// import Swal from 'sweetalert2'
import { CitiesAreas } from '../../../shared/models/CitiesAreas';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productList: Products[];
  categoryList: Categories[];
  citiesList: city[];
  newProductForSale: ProductForSale;
  image: File;
  imageError: boolean = false;
  src: string = "";
  formData: FormData;
  isDisabledcityList: boolean = true;
  AreasList: CitiesAreas[];

  constructor(private service: SaleService, private router: Router, private route: ActivatedRoute, private saleService: SaleService) {
  }

  isDisabled: boolean = false;

  ngOnInit() {
    this.productList = new Array<Products>();
    this.newProductForSale = new ProductForSale();
    this.newProductForSale.UserId = Number(localStorage.getItem('userId'));

    this.service.getCategory().subscribe(c => {
      this.categoryList = c;
    }, (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));

    this.service.getAreasList().subscribe(a => {
      this.AreasList = a;
    }, (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));

    this.newProductForSale.InitialBid = null;
    // this.onSelectArea(this.AreasList[0].AreaId);

  }
  onSelectCategory(selectedCategory: number) {
    this.service.getProductList(selectedCategory)
      .subscribe((products: Array<Products>) => {
        this.productList = products;
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));

    this.isDisabled = true;
  }

  // displayPhoto(fileInput: any) {
  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = ((e) => {
  //       this.newProductForSale.ImageUrl = e.target['result'];
  //     });
  //     reader.readAsDataURL(fileInput.target.files[0]);
  //   }
  // }

  addProductForSale(): void {
    this.service.addProductForSale(this.newProductForSale)
      .subscribe((product: ProductForSale) => {
        this.saveImg(product.Id);
      },
        (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }

  saveImg(id: number) {
    if (this.formData==null)
      return;
    this.formData.append("id", id.toString());
    this.saleService.upload(this.formData)
      .subscribe((id: number) => {
        // Swal("Great!", "the product was added succussfully!", "success")
        this.router.navigate(['app/userHome/userSavedProductForSale/ProductForSaleDetailsComponent', id]);
      },
        (error: HttpErrorResponse) => console.log(error.status + ", " + error.statusText));
  }

  uploadImg(event: FormData) {
    this.formData = event;
  }
  onSelectArea(selectedarea: number) {
    this.service.getCityListAccordingToArea(selectedarea).subscribe(c => {
      this.citiesList = c;
    }, (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
    this.isDisabledcityList = true;
  }
}
