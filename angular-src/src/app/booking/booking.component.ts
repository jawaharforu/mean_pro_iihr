import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductdetailService } from '../services/productdetail.service';
import { ProductService } from '../services/product.service';
import { Fuldate } from '../data.model';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  productbookinglist: any;
  productname: String;
  productdetail: String;
  fromdt: any;
  todt: any;
  location: String;
  productdetailid: String;
  productbookedlist: any;
  bookinglists: any[] = [];
  userid: Number;
  username: String;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private productdetailService: ProductdetailService,
    private productService: ProductService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private bookingService: BookingService
  ) {
    this.productdetailService.getProductBookedList().subscribe(data => {
      this.productbookedlist = data.data;
    });
  }

  getItems() {
    this.bookinglists = [];
    this.productdetailService.getProductBookedList().subscribe(data => {
      this.productbookedlist = data.data;
      console.log(this.productbookedlist);
      this.productdetailService.getProductBookingList().subscribe(data => {
        this.productbookinglist = data.data;
        for (const prop of this.productbookinglist) {
          prop.booked = (this.productdetailService.checkingThePid(this.productbookedlist, prop._id));
          this.bookinglists.push(prop);
        }
        console.log(this.bookinglists);
      });
    });
  }
  ngOnInit() {
    this.getItems();
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
  open(content, productdetailid) {
    this.productdetailService.getProductdetailAndProductById(productdetailid).subscribe(data => {
      this.productdetailid = data.data[0]._id;
      this.productname = data.data[0].productname[0].name;
      this.productdetail = data.data[0].name + '-' + data.data[0].make + '-' + data.data[0].model;
    });
    this.activeModal = this.modalService.open(content, { windowClass: 'dark-modal' });
  }
  bookTheItem() {
    const fromdate = this.fromdt.month + '/' + this.fromdt.day + '/' + this.fromdt.year;
    const todate = this.todt.month + '/' + this.todt.day + '/' + this.todt.year;
    const newBooking = {
      productdetailid: this.productdetailid,
      fromdate: fromdate,
      todate: todate,
      location: this.location,
      status: 'Pending',
      uid: this.userid,
      username: this.username
    };
    console.log(newBooking);
    if (this.location === undefined || this.fromdt.day === undefined || this.todt.day === undefined) {
      this._flashMessagesService.show('Please fill all mandatory fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.bookingService.addBooking(newBooking)
    .subscribe(data => {
      if (data.success) {
        this.productdetailid = '';
        this.productname = '';
        this.productdetail = '';
        this.location = ''; this.fromdt = ''; this.todt = '';
        this.productbookinglist = data.data;
        this.activeModal.close();
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.getItems();
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
