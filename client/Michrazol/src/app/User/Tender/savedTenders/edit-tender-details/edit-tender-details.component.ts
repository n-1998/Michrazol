import { Component, OnInit } from '@angular/core';
import { Products } from '../../../../shared/models/Products';
import { Categories } from '../../../../shared/models/categories';
import { city } from '../../../../shared/models/City';
import { HttpErrorResponse } from '@angular/common/http';
import { tender } from '../../../../shared/models/Tender';
import { SaleService } from '../../../../shared/services/Sale.service';
import { BuyService } from '../../../../shared/services/Buy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-tender-details',
  templateUrl: './edit-tender-details.component.html',
  styleUrls: ['./edit-tender-details.component.css']
})
export class EditTenderDetailsComponent implements OnInit {

  productList: Products[];
  categoryList: Categories[];
  citiesList: city[];
  EditTender: tender;
  image: File;
  imageError: boolean = false;
  src: string = "";
  tenderId: number;
  defaultCategory:string;
  date=new Date();
  constructor(private saleService: SaleService,private BuyService:BuyService, private router: Router, private route: ActivatedRoute,private datePipe: DatePipe) {
  }
  ngOnInit() {
     this.route.params.subscribe(params => {
      this.tenderId = params['tenderId'];
    })
    this.productList = new Array<Products>();
    this.EditTender = new tender();
    this.EditTender.UserId = Number(localStorage.getItem('userId'));
    
    this.BuyService.getTenderById(this.tenderId).subscribe(p => {
      this.EditTender = p;
      this.date=p.EndDate;

      var date=console.log(this.datePipe.transform(this.EditTender.EndDate,"yyyy-MM-dd"));
      //this.datePipe.transform(this.EditTender.EndDate, 'yyyy-MM-dd')
      this.saleService.getCategory().subscribe(c => {
        this.categoryList=c;
    },
       (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
     this.saleService.getCitiesList().subscribe((cities: Array<city>) => {
      this.citiesList = cities;

          this.saleService.getProductListWithSameProductType(this.EditTender.ProductId).subscribe(p => {
            this.productList = p;
            var mProduct=this.productList.find(x=>x.ProductId==this.EditTender.ProductId);
            this.defaultCategory=this.categoryList.find(x=>x.CategoryId==mProduct.CategoryId).CategoryName;
          },
            (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
        },
          (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText)); 
           },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  onSelectCategory(selectedCategory: number) {
    this.saleService.getProductList(selectedCategory)
      .subscribe((products: Array<Products>) => {
        this.productList = products;
      },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  saveChanges()
  {
    this.BuyService.EditTender(this.EditTender).subscribe(p => {
      this.router.navigate(['app/userHome/savedTenders']);
    },
    (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  cancel() {
    this.router.navigate(['app/userHome/savedTenders']);
  }

}
