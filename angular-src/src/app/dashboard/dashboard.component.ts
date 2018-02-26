import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductdetailService } from '../services/productdetail.service';
import { ProductService } from '../services/product.service';
import { Fuldate } from '../data.model';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pendinglist: any;
  getallbooked: any;
  userid: Number;
  username: String;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.bookingService.getPendingList()
    .subscribe(data => {
      this.pendinglist = data.data;
    });
    this.bookingService.getAllbookedlist()
    .subscribe(data => {
      this.getallbooked = data.data;
    });
    this.bookingService.getUserid()
    .subscribe(data => {
      if (data.data.success) {
        this.userid = data.data.uid;
        this.username = data.data.name;
      } else {
        window.location.href = 'https://iihr.res.in/user';
      }
    });
  }
  updateBooking(bookingid, status) {
    const bookingstatus = {
      status: status
    };
    this.bookingService.updateBooking(bookingid, bookingstatus)
    .subscribe(data => {
      if (data.success) {
        this.bookingService.getPendingList()
        .subscribe(data => {
          this.pendinglist = data.data;
        });
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
