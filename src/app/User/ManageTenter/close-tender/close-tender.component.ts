import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuyService } from '../../../shared/services/Buy.service';

@Component({
  selector: 'app-close-tender',
  templateUrl: './close-tender.component.html',
  styleUrls: ['./close-tender.component.scss']
})
export class CloseTenderComponent implements OnInit {

  tenderId:number=0;
  newDateToTender=false;
  newDate:Date=null;
  constructor(private route:ActivatedRoute,private tenderService:BuyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tenderId = params['tenderId'];
    })
  }
  moreTime(){
    this.newDateToTender=true;
  }
  saveMoreTime()
  {
    this.tenderService.addTimeToTender(this.tenderId,this.newDate).subscribe(x=>
      {
        alert("השינויים נשמרו בהצלחה");
        this.newDateToTender=false;
      })
  }
  cancle()
  {
    this.newDateToTender=false;
  }
}
