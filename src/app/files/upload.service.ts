import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { finalize } from "rxjs/operators";


@Injectable({
  providedIn: "root",
})
export class UploadService {
  private subject = new Subject<any>();
  private headers = new Headers({ "Content-Type": "application/json" });
  //File Download
  private fileList: any[] = new Array<any>();
  private fileList$: Subject<any[]> = new Subject<any[]>();
  private displayLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  downLoadFile: any;

  public isLoading(): Observable<boolean> {
    return this.displayLoader$;
  }

  progress: number;
  files: string[] = [];

  constructor(private httpClient: HttpClient) {}

  geHeaders() {
    const httpheaders = {
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data",
      }),
    };
    return httpheaders;
  }




  public upload(formData: any): Promise<any> {
    console.log(formData);
    this.displayLoader$.next(true);
    return this.httpClient.post("/saveFile", formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);
            this.setProgress(this.progress);
          } else if (event.type == HttpEventType.Response) {
            this.progress = null;
            this.setProgress(null);
          }
        }),
        catchError((err: any) => {
          this.progress = null;
          // alert(err.message);
          return throwError(err.message);
        })
      )
      .toPromise();
  }


  setProgress(progress: any) {
    this.subject.next({ progress });
  }

  clearMessages() {
    this.subject.next();
  }

  getProgress(): Observable<any> {
    return this.subject.asObservable();
  }

  public clearHistory(): void {
    this.files = [];
  }

  public getHistory(): string[] {
    return this.files;
    console.log(this.files);
  }

  public getFiles(): Observable<any> {
    return this.httpClient.get<any>("/findAll").
    pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      }))
  }

  public findByFileName(fileName : string) {
     let params = new HttpParams().set('fileName',fileName);
    const test= this.httpClient.get('/findByName?'+params, { responseType: 'blob' }).subscribe((res)=>{
      window.open(window.URL.createObjectURL(res));
    });
  }


  public download(fileName : string){
    this.httpClient.get("/download/"+fileName, { responseType: 'blob' }).subscribe((res) => {
      const a= document.createElement('a')
      const objectURL = URL.createObjectURL(res)
      a.href = objectURL
      a.download =  fileName;
      a.click();
      URL.revokeObjectURL(objectURL);
    });
  }

  public delete(fileName: any):Observable<any>{
    return this.httpClient.delete<any>("/delete/"+ fileName);
   
  }

  public list(): Observable<string[]> {
    return this.fileList$;
  }

  private addFileToList(formData: string): void {
    this.fileList.push(formData);
    this.fileList$.next(this.fileList);
  }
}
