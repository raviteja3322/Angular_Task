import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UploadService } from "../upload.service";
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  public files: any[]=[];
  public filename:string;
  public fileList: Observable<any[]> = this.uploadService.list();
  downloadFile: any;
  displayedColumns = ['fileName','download'];


  constructor(private uploadService: UploadService) {
    this.getFiles();
    }

    public getFiles() : void {
      this.uploadService.getFiles().subscribe((data:any) => {
        console.log(data);
        this.files = data.map((res : any)=> {
           return { fileName : res}});
      });
    }

  public findByFileName(fileName: string):  void{
    this.uploadService.findByFileName(fileName);
    console.log("Download"+this.filename)
  }
  public download(fileName: string):  void {
    this.uploadService.download(fileName);
  }

  public delete(fileName: string):  void {
    this.uploadService.delete(fileName).subscribe((data:any)=>{
      this.getFiles();
    });
    console.log("deleted")
    
  }



  ngOnInit(): void {}

  onClear() { 
    alert("You Want to Delete Upload File")
    this.uploadService.clearHistory();
    this.files = this.uploadService.getHistory();
  }
  
  
  


}
