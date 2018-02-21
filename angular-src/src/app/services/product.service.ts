import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  link: String = 'http://localhost:3000/';
  product: any;
  constructor(
    private http: Http
  ) { }

  getProduct() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/products', {headers: headers})
    .map(res => res.json());
  }
  getProductById(productid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/product/' + productid, {headers: headers})
    .map(res => res.json());
  }
  addProduct(product) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.link + 'api/product', product, {headers: headers})
    .map(res => res.json());
  }
  updateProduct(productid, product) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/product/' + productid, product, {headers: headers})
    .map(res => res.json());
  }
  deleteProduct(productid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.link + 'api/product/' + productid, {headers: headers})
    .map(res => res.json());
  }
}
