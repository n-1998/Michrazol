import { Injectable } from '@angular/core';
import { Subject, Observable } from '../../../../node_modules/rxjs';
import { ProductForSale } from '../models/ProductForSale';
import { suggestedPrices } from '../models/SuggestedPrices';


declare var $: any;

@Injectable()
export class UpdatesSignalRService {
    // object
    private updateProductForSaleSubject = new Subject<ProductForSale>();
    private updateLowestPrice=new Subject<suggestedPrices>();
    private updateChoosedProductUpdate=new Subject<ProductForSale>();

    getUpdate(): Observable<ProductForSale> {
        return this.updateProductForSaleSubject.asObservable();
    }
    getPriceUpdates():Observable<suggestedPrices>
    {
        return this.updateLowestPrice.asObservable();
    }
    getChoosedProductsUpdate():Observable<ProductForSale>
    {
        return this.updateChoosedProductUpdate.asObservable();
    }
    updatesHub: any;

    hubConnection: null;

    signalrUrl = "http://localhost:52339/signalr";

    constructor() { }

    start() {
        this.loadUpdatesHubScript();
        setTimeout(() => this.startHub(), 700);
    }

    loadUpdatesHubScript() {
        var s = document.createElement('script');
        s.src = this.signalrUrl + "/hubs";
        s.async = false;
        try {
            document.body.appendChild(s);
        } catch (e) {
            document.body.appendChild(s);
        }
    }

    OnReseiveProductForSaleMessage(message: ProductForSale) {
        this.updateProductForSaleSubject.next(message);
    }
    OnReseiveLowestPriceeMessage(message:suggestedPrices)
    {
        this.updateLowestPrice.next(message);
    }
    OnReseiveChoosedProductUpdate(message:ProductForSale)
    {
        this.updateChoosedProductUpdate.next(message);
    }
    startHub() {
        $.connection.hub.url = this.signalrUrl;
        this.updatesHub = $.connection.updatesHub;
        this.hubConnection = $.connection.hub;
        if(localStorage.getItem("userId") ==null)
            $.connection.hub.qs = { 'userId': 0 };
        else $.connection.hub.qs = { 'userId': localStorage.getItem("userId") };

        if (this.updatesHub == null) {
            return;
        }

        this.updatesHub.logging = true;
        this.updatesHub.client.OnReseiveProductForSaleMessage = (msg) => this.OnReseiveProductForSaleMessage(msg);
        this.updatesHub.client.OnReseiveLowestPriceeMessage=(msg)=>this.OnReseiveLowestPriceeMessage(msg);
        this.updatesHub.client.OnReseiveChoosedProductUpdate = (msg) => this.OnReseiveChoosedProductUpdate(msg);

        this.updatesHub.connection.error((error) => {
            this.updatesHub = $.connection.updatesHub;
            this.reconnectToHub();
        });
        this.connectToHub();
    }

    reconnectToHub() {
        setTimeout(this.connectToHub, 2000);
    }

    connectToHub() {
        var p = $.connection.hub.start().then(() => {
            if ($.connection.hub.state != 1) {
                setTimeout(this.connectToHub, 2000);
            }
        });
    }

    disconnectToHub() {
        $.connection.hub.stop();
    }
}

