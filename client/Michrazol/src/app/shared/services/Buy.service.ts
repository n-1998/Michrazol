import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { debug } from 'util';
import { ProductForSale } from '../models/ProductForSale';
import { Products } from '../models/Products';
import { Categories } from '../models/categories';
import { city } from '../models/City';
import { tender } from '../models/Tender';
import { tenderDetails } from '../models/tenderDetails';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
//import { TenderDetails } from '../models/TenderDetails';
  
@Injectable()
export class BuyService {

  //משתנה בשביל הקומפוננטה שמציגה את כל המוצרים של מכרז
  public tenderId:Subject<tender>;
  constructor(private http: HttpClient) {
    this.tenderId=new Subject<tender>();
   }
  getTenderId(): Observable<tender> {
    return this.tenderId.asObservable();
  }
  getSuitableProductsForChoose(tenderId: number): Observable<ProductForSale[]> {
    return this.http.get("http://localhost:52339/api/Tender/getSuitableProductsForChoose/"+ tenderId)
          .map((response: ProductForSale[]) => response)
          .catch((response: HttpErrorResponse) => Observable.throw(response));
  }
  getTenderById(tenderId:number): Observable<tender>
  {
       return this.http.get("http://localhost:52339/api/Sale/getTenderById/"+ tenderId)
          .map((response: tender) => response)
          .catch((response: HttpErrorResponse) => Observable.throw(response));
  }
  EditTender(tender: tender): Observable<string> {
    return this.http.post("http://localhost:52339/api/buy/EditTender", tender)
      .map((response: string) => response)
      .catch((response: HttpErrorResponse) => Observable.throw(response));
  }
  getUserTenderList(userId: number): Observable<tender[]> {
    return this.http.get("http://localhost:52339/api/Sale/getUserTendersList/" + userId)
      .map((response: tender[]) => response)
      .catch((response: HttpErrorResponse) => Observable.throw(response));
  }

  deleteTender(tenderId: number) {
    return this.http.delete("http://localhost:52339/api/Sale/removeTender/" + tenderId)
      .map((response: string) => response)
      .catch((response: HttpErrorResponse) => Observable.throw(response));
  }

  addNewTender(newTender: tender): Observable<tender> {
    return this.http.post("http://localhost:52339/api/Tender/addTender", newTender)
      .map((response: tender) => response)
      .catch((response: HttpErrorResponse) => Observable.throw(response));
  }
  uploadFiles(formData:FormData)  
  {     
     return this.http.post("http://localhost:52339/api/Tender/addTender",formData)  
            .map((response: Response) => {  
              return response;                 
            }).catch((response: HttpErrorResponse) => Observable.throw(response));             
  }  
  addProductsToTender(newProductsList: ProductForSale [],tenderId:number):any{
   
    return this.http.post("http://localhost:52339/api/Tender/addProductsToTender/"+tenderId, newProductsList)
    .map((response: Response) => {
      return response;                 
    }).catch((response: HttpErrorResponse) => Observable.throw(response));  
  }
  removeProductFromTender(removedProductsList: ProductForSale [],tenderId:number):any
  {
    return this.http.post("http://localhost:52339/api/Tender/removeProductsFromTender/"+tenderId, removedProductsList)
    .map((response: Response) => {  
      return response;                 
    }).catch((response: HttpErrorResponse) => Observable.throw(response));  
  }
  getSelectedProducts(tenderId: number): Observable<ProductForSale[]>
  {
       return this.http.get("http://localhost:52339/api/Tender/getSelectedProductsForTender/"+ tenderId)
          .map((response: ProductForSale[]) => response)
          .catch((response: HttpErrorResponse) => Observable.throw(response));
  }
  getManageTenderDetails(tenderId: number): Observable<tenderDetails> {
    return this.http.get("http://localhost:52339/api/Tender/getManageTenderDetails/"+ tenderId)
          .map((response: tenderDetails) => response)
          .catch((response: HttpErrorResponse) => Observable.throw(response));
  }
  getSelledProducts(): Observable<ProductForSale[]> {
    return this.http.get("http://localhost:52339/api/Tender/getLastSeledProducts")
          .map((response: ProductForSale[]) => response)
          .catch((response: HttpErrorResponse) => Observable.throw(response));
  }
  getendedTenders(tendersIds:number[]):Observable<tender[]>
  {
    return this.http.post("http://localhost:52339/api/Tender/getLastFinishedTenders", tendersIds)
    .map((response: tender[]) => {  
      return response;                 
    }).catch((response: HttpErrorResponse) => Observable.throw(response));  
  }
  getAllProductsOfTenderByTenderId(tenderId: number): Observable<ProductForSale[]> {
    return this.http.get("http://localhost:52339/api/Tender/getAllProductsOfTenderByTenderId/"+tenderId)
    .map((response: ProductForSale[]) => response)
    .catch((response: HttpErrorResponse) => Observable.throw(response));
  }
  removeOneProductFromTender(tenderId:number, productId:number):any
  {
    return this.http.delete("http://localhost:52339/api/Tender/removeOneProductsFromTender/"+tenderId+"/"+productId)
    .map((response: Response) => {  
      return response;                 
    }).catch((response: HttpErrorResponse) => Observable.throw(response));  
  }
  closeTender(tenderId: number, productId: number): any {
    debugger
    return this.http.get("http://localhost:52339/api/Tender/closeTender/"+tenderId+"/"+productId)
    .map((response: Response) => {  
      return response;                 
    }).catch((response: HttpErrorResponse) => Observable.throw(response));  
  }
  addOneProductForTender(tenderId: number, productForSaleId: number): any {
    return this.http.get("http://localhost:52339/api/Tender/addOneProductForTender/"+tenderId+"/"+productForSaleId)
    .map((response: Response) => {  
      return response;                 
    }).catch((response: HttpErrorResponse) => Observable.throw(response));  
  }
  addTimeToTender(tenderId: number, newDate: Date): any {
    return this.http.get("http://localhost:52339/api/Tender/addTimeToTender/"+tenderId+"/"+newDate)
    .map((response: Response) => {  
      return response;                 
    }).catch((response: HttpErrorResponse) => Observable.throw(response));  
  }

  getAllTenderList(): any {
    return this.http.get("http://localhost:52339/api/Tender/getAllTenders")
    .map((response: Response) => {  
      return response;                 
    }).catch((response: HttpErrorResponse) => Observable.throw(response));  
  }
  
 
}
