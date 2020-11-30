import { Component, OnInit } from '@angular/core';
import { Products } from '../../../shared/models/Products';
import { Categories } from '../../../shared/models/categories';
import {CitiesAreas} from '../../../shared/models/CitiesAreas';
import { city } from '../../../shared/models/City';
import { tender } from '../../../shared/models/Tender';
import { BuyService } from '../../../shared/services/Buy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SaleService } from '../../../shared/services/Sale.service';
// import { CompleterService, CompleterData } from 'ng2-completer';
// import {CheckboxModule} from 'primeng/checkbox';
// import {EditorModule} from 'primeng/editor';
// import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
// import {MenuItem} from 'primeng/api';
// import {SelectItem} from 'primeng/api';
@Component({
  selector: 'app-open-tender',
  templateUrl: './open-tender.component.html',
  styleUrls: ['./open-tender.component.css']
})
export class OpenTenderComponent implements OnInit {
  productList: Products[];
  categoryList: Categories[];
  AreasList:CitiesAreas[];
  citiesList: city[];
  newTender: tender;
  text: string;
  selectedProduct:Products;
  c: boolean = false;
  isDisabledProductList: boolean = false;
  isDisabledcityList:boolean=false;
  selectedCity:city;
  // protected dataService: CompleterData;

  constructor(private buyService: BuyService, private saleService: SaleService,private router:Router, private activateRoute: ActivatedRoute) {
    this.productList = new Array<Products>();
    this.newTender = new tender(); 
  }

  ngOnInit() {
    this.newTender.EndDate=new Date(Date.now());
    this.saleService.getCategory().subscribe(c => {
      this.categoryList=c;

      this.saleService.getAreasList().subscribe(a=>{
        this.AreasList=a;
        this.onSelectArea(this.AreasList[0].AreaId);
      },(error:HttpErrorResponse)=>console.log(error.status+" "+error.statusText));
  },
     (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  onSelectCategory(CategoryId:number) {
    debugger
    this.saleService.getProductList(CategoryId)
      .subscribe((products: Array<Products>) => {
        this.productList = products;
      },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));

    this.isDisabledProductList = true;
  }
  addNewTender(): void {
    this.newTender.StartDate=new Date(Date.now());
    this.newTender.UserId = Number(localStorage.getItem('userId'));
    this.buyService.addNewTender(this.newTender)
      .subscribe((tender: tender) => {
        this.router.navigate(['app/userHome/Tender/ChooseSuitableProductsComponent',tender.Id,true]);
      },
      (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
  }
  onSelectArea(areaId:number) {
    debugger
    this.saleService.getCityListAccordingToArea(areaId).subscribe(c=>{
      this.citiesList=c;
    },(error:HttpErrorResponse)=>console.log(error.status+" "+error.statusText));
    this.isDisabledcityList=true;
  }
}
