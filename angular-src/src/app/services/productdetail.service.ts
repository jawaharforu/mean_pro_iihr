import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductdetailService {

  link: String = 'http://localhost:3000/';
  product: any;
  constructor(
    private http: Http
  ) { }
  addProductDetail(productdetail) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.link + 'api/productdetail', productdetail, {headers: headers})
    .map(res => res.json());
  }
  getProductDetail() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/productdetails', {headers: headers})
    .map(res => res.json());
  }
  deleteProductDetail(productdetailid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.link + 'api/productdetail/' + productdetailid, {headers: headers})
    .map(res => res.json());
  }
  updateProductDetail(productdetailid, productdetail) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/productdetail/' + productdetailid, productdetail, {headers: headers})
    .map(res => res.json());
  }
  getProductdetailById(productdetailid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/productdetail/' + productdetailid, {headers: headers})
    .map(res => res.json());
  }
  getProductBoolingList() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/productbookinglist', {headers: headers})
    .map(res => res.json());
  }
  getProductdetailAndProductById(productdetailid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/getlistforbook/' + productdetailid, {headers: headers})
    .map(res => res.json());
  }
}
