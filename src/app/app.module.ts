import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { WavesModule, ButtonsModule, CardsFreeModule, CarouselModule, ChartsModule, CollapseModule, DropdownModule, ModalModule, NavbarModule, PopoverModule, TooltipModule } from 'angular-bootstrap-md';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
// import { MenuItem } from 'primeng/api';
import 'rxjs';
import { map } from 'rxjs/operators';
// import { NgModule } from '@angular/core;'
import 'rxjs/add/operator/map';
import { AppComponent } from './app.component';
import { LoginComponent } from './Enter/login/login.component'
import { EnterService } from './shared/services/Enter.service';
import { SaleService } from './shared/services/Sale.service';
import { BuyService } from './shared/services/Buy.service'
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgForm, Validator, ValidationErrors, Validators } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { NgModel } from '@angular/forms';
import { RegisterComponent } from './Enter/register/register.component';
import { AddProductComponent } from './User/sale/add-product/add-product.component';
import { SuggestPriceComponent } from './User/sale/suggest-price/suggest-price.component';
import { OpenTenderComponent } from './User/Tender/open-tender/open-tender.component';
import { SuggestionPriceDitailsComponent } from './User/Tender/suggestion-price-ditails/suggestion-price-ditails.component';
import "rxjs";
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { UserProductForSaleComponent } from './User/Sale/savedProductForSale/user-product-for-sale/user-product-for-sale.component';
import { ProductForSaleDetailsComponent } from './User/sale/savedProductForSale/product-for-sale-details/product-for-sale-details.component'
import { EditProductForSaleComponent } from './User/Sale/savedProductForSale/edit-product-for-sale/edit-product-for-sale.component';
import { UserProductForBuyComponent } from './User/Tender/savedTenders/user-product-for-buy/user-product-for-buy.component';
import { EditTenderDetailsComponent } from './User/Tender/savedTenders/edit-tender-details/edit-tender-details.component'
import { DatePipe } from '@angular/common';
import { UploadFileComponent } from './shared/upload-file/upload-file.component';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
// import { Ng2CompleterModule } from "ng2-completer";
// import { CalendarModule } from 'primeng/calendar';
// import { DropdownModule } from 'primeng/dropdown';
import { ShowAllSuitableTenderComponent } from './User/ManageTenter/show-all-suitable-tender/show-all-suitable-tender.component';
// import { ShowHidePasswordModule } from 'ngx-show-hide-password';
// import { ImageUploadModule } from "angular2-image-upload";
import { ChooseSuitableProductsComponent } from './User/Tender/choose-suitable-products/choose-suitable-products.component';
import { ShowProductDetailsComponent } from './User/Tender/show-product-details/show-product-details.component';
import { ShowAllProductsComponent } from './show-all-products/show-all-products.component';
import { ShowAllTendersComponent } from './show-all-tenders/show-all-tenders.component';
import { TenderDetailsComponent } from './User/ManageTenter/tender-details/tender-details.component';
// import { CaptchaModule } from '../../node_modules/primeng/captcha';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import { WavesModule, ButtonsModule, CardsFreeModule,InputsModule } from 'angular-bootstrap-md';
import { InputsModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms'
import {SelectModule} from 'ng2-select';
import { UpdatesSignalRService } from './shared/services/UpdatesSignalRService .service';
import { ResetPasswordComponent } from './Enter/reset-password/reset-password.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { ShowLastTendersComponent } from './show-last-tenders/show-last-tenders.component';
import { ViewAllProductsParticipatingInTenderComponent } from './User/ManageTenter/view-all-products-participating-in-tender/view-all-products-participating-in-tender.component';
import { CloseTenderComponent } from './User/ManageTenter/close-tender/close-tender.component';
import { BuyComponent } from './User/ManageTenter/buy/buy.component';
import { UpdatePersonalDetailsComponent } from './User/update-personal-details/update-personal-details.component';
import { UserHomeDescprictionComponent } from './User/user-home-descpriction/user-home-descpriction.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './shared/services/auth.service';
const route: Routes = [
  {
    path: '', component: HomeComponent
  }, 
  { path: 'app/login', component: LoginComponent },
  { path: 'app/register', component: RegisterComponent },
  { path: 'app/resetPassword/:resetId', component: ResetPasswordComponent },
  
  {
    path: 'app/userHome', component: UserHomeComponent,canActivate: [AuthGuard], children: [
      { path: 'UserHomeDescpriction', component: UserHomeDescprictionComponent },
      { path: 'addProductForSale', component: AddProductComponent },
      { path: 'openTender', component: OpenTenderComponent },
      { path: 'userSavedProductForSale', component: UserProductForSaleComponent },
      { path: 'userSavedProductForSale/EditProductForSaleComponent/:productId', component: EditProductForSaleComponent },
      { path: 'userSavedProductForSale/ProductForSaleDetailsComponent/:productId', component: ProductForSaleDetailsComponent },
      { path: 'savedTenders', component: UserProductForBuyComponent },
      { path: 'savedTenders/userProductForBuy/EditTender/:tenderId', component: EditTenderDetailsComponent },
      { path: 'Tender/ChooseSuitableProductsComponent/:tenderId/:isChoose', component: ChooseSuitableProductsComponent },
      { path: 'ManageTenter/ShowAllSuitableTenderComponent/:productForSaleId', component: ShowAllSuitableTenderComponent },
      { path: 'ManageTenter/SuggestPrice/EditSuggestPrice/:productForSaleId/:TenderId', component: SuggestPriceComponent },
      { path: 'Tender/showProductDetails/:productForSaleId', component: ShowProductDetailsComponent },
      { path: 'ManageTender/showTenderDetails/:tenderId', component: TenderDetailsComponent },
      { path: 'ManageTender/AllProductsParticipating', component: ViewAllProductsParticipatingInTenderComponent },
      { path: 'ManageTender/AllProductsParticipating/:tenderId', component: ViewAllProductsParticipatingInTenderComponent },
      { path: 'ManageTender/CloseTender/:tenderId/:isBuy', component: CloseTenderComponent },
      { path: 'ManageTender/buy/:tenderId/:productId', component: BuyComponent },
      { path: 'UpdatePersonalDetails', component: UpdatePersonalDetailsComponent }
    ]
  },
  { path: 'app/ShowAllProductsForSale', component: ShowAllProductsComponent },
  { path: 'app/ShowAllTenders', component: ShowAllTendersComponent }

]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    SuggestPriceComponent,
    OpenTenderComponent,
    SuggestionPriceDitailsComponent,
    HomeComponent,
    UserHomeComponent,
    UserProductForSaleComponent,
    EditProductForSaleComponent,
    UserProductForBuyComponent,
    EditTenderDetailsComponent,
    UploadFileComponent,
    ProductForSaleDetailsComponent,
    ShowAllSuitableTenderComponent,
    ChooseSuitableProductsComponent,
    ShowProductDetailsComponent,
    ShowAllProductsComponent,
    ShowAllTendersComponent,
    TenderDetailsComponent,
    ResetPasswordComponent,
    ShowLastTendersComponent,
    ViewAllProductsParticipatingInTenderComponent,
    CloseTenderComponent,
    BuyComponent,
    UpdatePersonalDetailsComponent,
    UserHomeDescprictionComponent
  ],
  imports: [
    SlideshowModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(route),
    FileUploadModule,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ButtonsModule,
    CarouselModule.forRoot(),
    ChartsModule,
    CollapseModule.forRoot(),
    DropdownModule.forRoot(),
    InputsModule.forRoot(),
    ModalModule.forRoot(),
    NavbarModule,
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    WavesModule.forRoot()
  ],
  providers: [EnterService, SaleService, BuyService, DatePipe,UpdatesSignalRService,AuthGuard,AuthService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }