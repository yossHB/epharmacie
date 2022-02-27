import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host:string="http://localhost:8080";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) {
  }

  public getResource(url){
    let res = this.http.get(url,this.httpOptions);
    console.log("res"+ res);
      return res;
  }
  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public patchResource(url,data){
    return this.http.patch(url,data);
  }


}