export class suggestedPrices {

    constructor(
        public TenderId: number = 0,
        public UserProductId: number = 0,
        public SuggestedPrice:number=0,
        public LastModifiedDate:Date=null
    ) { }
}