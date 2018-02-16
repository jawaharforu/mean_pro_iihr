import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  link : String = 'http://localhost:3000/';
  product : any;
  constructor(
    private http:Http
  ) { }

  getProduct(){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.get(this.link+'api/products', {headers: headers})
    .map(res => res.json());
  }
  addProduct(product){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post(this.link+'api/product', product, {headers: headers})
    .map(res => res.json());
  }
  deleteProduct(productid){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.delete(this.link+'api/product/'+productid, {headers: headers})
    .map(res => res.json());
  }
  //Product Detail
  addProductDetail(productdetail){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post(this.link+'api/productdetail', productdetail, {headers: headers})
    .map(res => res.json());
  }
  getProductDetail(){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.get(this.link+'api/productdetails', {headers: headers})
    .map(res => res.json());
  }
}
