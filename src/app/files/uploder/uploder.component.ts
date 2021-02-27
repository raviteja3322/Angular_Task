import { HttpClient, HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UploadService } from "../upload.service";

@Component({
  selector: "app-uploder",
  templateUrl: "./uploder.component.html",
  styleUrls: ["./uploder.component.scss"],
})
export class UploderComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  public files: any[] = [];
  selectedFiles: FileList;
  
  public filename = "";
  progress: number;
  //showProgress: any = false;
  editable: any = false;
 
  constructor(private uploadService: UploadService, private toastr: ToastrService, private fb: FormBuilder) {
    this.uploadService.getProgress().subscribe((data) => {
      if (data) {
        this.progress = data.progress;
      }
    });
  }

  ngOnInit(): void {}

  onBrowse() {
    this.files = [];
    const fileInput = this.fileInput.nativeElement;
    fileInput.onchange = () => {
      for (let index = 0; index < fileInput.files.length; index++) {
        console.log(fileInput.files[index]);
        const file = fileInput.files[index];
        this.filename = fileInput.files[index].name;
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
    };
    fileInput.click();
  }


  public onUpload(): void {
   this.fileInput.nativeElement.value = "";
     this.files.forEach((file) => {
       console.log(file);
       this.callUploadService(file.data);
     });
   
  }

  callUploadService(file: any) { 
    const formData = new FormData();
    formData.append("files", file);
    file.inProgress = true;
    this.uploadService.upload(formData).then((event) => {
      this.progress = 0;
    });
    console.log(file)
       
  }


  public onClear(): void {
    this.filename = "";
    //this.showProgress = false;
    this.fileInput.nativeElement.value = "";
  }

  public formGroup = this.fb.group({
    file: [null, Validators.required],
  });
}
