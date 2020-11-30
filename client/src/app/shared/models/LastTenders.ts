import { city } from "./City";
import { suggestedPrices } from "./SuggestedPrices";
import { Products } from "./Products";
import { User } from "./User";

export class LastTenders {

    constructor(
        public ProductId: number = 0,
        public IsNew:boolean=false,
        public Description: string = "",
        public EndDate:Date=null,
        public images:string[]=[],
        public price:number=0
        //public ImageId:number=0
    ) { }
}