import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ProductForSale } from '../models/ProductForSale';
import { Products } from '../models/Products';
import { Categories } from '../models/categories';
import { city } from '../models/City';
import { suggestedPrices } from '../models/SuggestedPrices';
import { tender } from '../models/Tender';
import { CitiesAreas } from '../models/CitiesAreas';
import { Subject } from 'rxjs';
import { Images } from '../models/Images';

@Injectable()
export class SaleService {

  
    citiesList:city[];
    productList:Products[];
    categoryList:Categories[];
    areasList:CitiesAreas[];

    constructor(private http: HttpClient) {
        this.citiesList=[];
        this.productList=[];
        this.categoryList=[];
        this.areasList=[];
     }

    onInIt() {

    }

    addProductForSale(newProductForSale: ProductForSale): Observable<ProductForSale> {
        return this.http.post("http://localhost:52339/api/sale/addProductForSale", newProductForSale)
            .map((response: ProductForSale) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }

    EditProductForSale(ProductForSale: ProductForSale): Observable<ProductForSale> {
        return this.http.post("http://localhost:52339/api/sale/EditProductForSale", ProductForSale)
            .map((response: ProductForSale) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }

    getProductList(category: number): Observable<Products[]> {
        debugger
        return this.http.get("http://localhost:52339/api/Sale/getProductList/" + category)
            .map((response: Products[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }

    getCitiesList():Observable<city[]> {
        return this.http.get("http://localhost:52339/api/Sale/getCitiesList").map(
            (response: city[]) =>response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    getCategory():Observable<Categories[]> {
        return this.http.get("http://localhost:52339/api/Sale/getCategoriesList")
        .map((response: Categories[]) => response)
        .catch((response: HttpErrorResponse) => Observable.throw(response));
    }

    getProductsList() {       
        return this.http.get("http://localhost:52339/api/Sale/loadProductList/")
        .map((response: Products[]) =>response)
        .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    upload(formData: FormData): Observable<number> {
        return this.http.post("http://localhost:52339/api/uploadImage", formData)
            .map((response: number) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }

    getUserProductForSale(userId: number): Observable<ProductForSale[]> {
        return this.http.get("http://localhost:52339/api/Sale/getUserProductForSale/" + userId)
            .map((response: ProductForSale[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    deleteProductForSale(productForSaleId: number) {
        return this.http.delete("http://localhost:52339/api/Sale/removeProductForSale/" + productForSaleId)
            .map((response: string) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    getAllProductForSale() {
        return this.http.get("http://localhost:52339/api/Sale/getAllProductsForSale")
            .map((response: ProductForSale) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    getProductForSaleById(productId: number) {
        return this.http.get("http://localhost:52339/api/Sale/ProductForSale/getProductById/" + productId)
            .map((response: ProductForSale) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }

    getProductListWithSameProductType(productTypeId: number): Observable<Products[]> {
        return this.http.get("http://localhost:52339/api/Sale/getProductListWithSameProductType/" + productTypeId)
            .map((response: Products[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    getProductForSaleImages(productId: number): Observable<any> {
        return this.http.get("http://localhost:52339/api/Sale/getProductForSaleImages/" + productId)
            .map((response: any) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    // file from event.target.files[0]
    uploadFile(file: File): Observable<HttpEvent<any>> {
        let url = "http://localhost:52339/api/uploadImage";
        let formData = new FormData();
        formData.append('upload', file);

        let params = new HttpParams();

        const options = {
            params: params,
            reportProgress: true,
        };

        const req = new HttpRequest('POST', url, formData, options);
        return this.http.request(req);
    }

    getPictures(): Observable<any> {
        return this.http.get("http://localhost:52339/api/getImg/0ceb4d49-d46e-4ea8-94ae-754b89842abc")
            .map((response: any) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    saveSuggestPrice(suggest: suggestedPrices) {
        debugger
        return this.http.post("http://localhost:52339/api/sale/saveSuggestPrice", suggest)
            .map((response: string) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    getSuitableTenderByProductId(ProductId: number): Observable<tender[]> {
        return this.http.get("http://localhost:52339/api/Sale/getSuitableTenderByProductId/" + ProductId)
            .map((response: tender[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }

    getAreasList():Observable<CitiesAreas[]>
    {
        return this.http.get("http://localhost:52339/api/Sale/getAreasList").map(
            (response: CitiesAreas[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    getCityListAccordingToArea(areaId: number):Observable<city[]>{
          return this.http.get("http://localhost:52339/api/Sale/getCityListAccordingToArea/"+areaId).map(
            (response: city[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
        // var cities=[];
        // this.citiesList.subscribe(c=>{
        //   cities.push( c.filter(x=>x.AreaId==areaId));
        // },
        // (error: HttpErrorResponse) => console.log(error.status + " " + error.statusText));
        // return cities;
    }
    filterProductForSaleList(category:number,product:number,city:number,isNew:boolean): Observable<ProductForSale[]> {
        return this.http.get("http://localhost:52339/api/Sale/filterProductForSaleList/"+category+"/" +product+"/"+city+"/"+isNew)
            .map((response: ProductForSale[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }

    getImagesOfProductsForSaleList(productsForSaleIds: number[]): Observable<Images[]> {
        return this.http.post("http://localhost:52339/api/Sale/getImagesOfProductsForSaleList",productsForSaleIds)
            .map((response: Images[]) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
      }
}
