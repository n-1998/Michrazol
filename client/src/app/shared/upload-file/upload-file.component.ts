import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FileUploader, FileItem} from 'ng2-file-upload';
import { FileUploadModule } from "ng2-file-upload"; 
import { SaleService } from '../services/Sale.service';
import { HttpEventType,HttpResponse, HttpErrorResponse } from '@angular/common/http';
const URL = 'path_to_api';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit{
  @ViewChild('fileInput') inputEl: ElementRef;
  @Output() uploadEvent: EventEmitter<FormData> = new EventEmitter<FormData>();
  
  constructor(private saleService:SaleService){}
  
  url:"https://httpbin.org/status/200";
  ngOnInit(): void {
   
  }

    uploadFile(event) { 
      let inputEl: HTMLInputElement = this.inputEl.nativeElement;
      let fileCount: number = inputEl.files.length;
      let formData = new FormData();
      if (fileCount > 0) { // a file was selected

          for (let i = 0; i < fileCount; i++) {
              formData.append('img'+i, inputEl.files.item(i));
          }
          this.uploadEvent.emit(formData);
      }
  } 

}
  


