import { city } from "./City";
import { suggestedPrices } from "./SuggestedPrices";
import { Products } from "./Products";
import { User } from "./User";

export class ProductForSale {

    constructor(
        public Id: number = 0,
        public UserId: number = 0,
        public ProductId: number = 0,
        public Description: string = "",
        public City: number = 0,
        //public ImageData : ByteString = "" ,
        public InitialBid :number=0,
        public InterestedInMessages :boolean=true,
        public LastModifiedDate:Date=new Date(),
        public IsNew:boolean=false,
        public SelledToTenderId:number=0
        //public ImageId:number=0
    ) { }
}