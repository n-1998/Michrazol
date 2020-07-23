import { city } from "./City";
import { Time } from "@angular/common";
import { Data } from "@angular/router/src/config";

export class tender {

    constructor(
        public Id: number = 0,
        public ProductId: number = 0,
        public MaxCost: number = 0,
        public UserId: number = 0,
        public StartDate: Date=null,
        public City: number=0,
        public Description: string = "",
        public LastModifiedDate:Date=null,
        public EndDate:Date=null,
        public IsNew:boolean=false
    ) { }
}