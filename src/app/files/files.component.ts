import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UploadService } from "./upload.service";

@Component({
  selector: "app-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.scss"],
})
export class FilesComponent implements OnInit {
  ngOnInit(): void {}
  
  public displayLoader: Observable<boolean> = this.fileService.isLoading();

 constructor(private fileService: UploadService) {}
}
