import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService {

  link: String = 'http://localhost:3000/';
  product: any;
  constructor(
    private http: Http
  ) { }
  addBooking( booking ) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.link + 'api/booking', booking, {headers: headers})
    .map(res => res.json());
  }
}
