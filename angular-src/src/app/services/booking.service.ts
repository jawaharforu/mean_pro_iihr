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
  getUserid() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('https://iihr.res.in/getuser/', {headers: headers})
    .map(res => res.json());
  }
  getPendingList() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/bookings/Pending', {headers: headers})
    .map(res => res.json());
  }
  getAllbookedlist() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/allbooked', {headers: headers})
    .map(res => res.json()); 
  }
  updateBooking(bookingid, booking) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/bookingstatus/' + bookingid, booking, {headers: headers})
    .map(res => res.json());
  }
  getUserBookedList(uid: Number) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/bookeduid/' + uid, {headers: headers})
    .map(res => res.json());
  }
}
