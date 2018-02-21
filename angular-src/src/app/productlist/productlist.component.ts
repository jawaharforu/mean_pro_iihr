import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductdetailService } from '../services/productdetail.service';
import { ProductService } from '../services/product.service';
import { Fuldate } from '../data.model';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})

export class ProductlistComponent implements OnInit {
  productdetaillist: any;
  productlist: any;
  productid: String;
  make: String;
  model: String;
  registnum: String;
  nameofsupplier: String;
  fuldate: Fuldate;
  condition: String;
  remark: String;
  date: Date;
  productdetailname: String;
  productdetailid: String;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private productdetailService: ProductdetailService,
    private productService: ProductService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.productdetailService.getProductDetail().subscribe(data => {
      this.productdetaillist = data.data;
    });
    this.productService.getProduct().subscribe(data => {
      this.productlist = data.data;
    });
  }
  open(content, productdetailid) {
    this.productdetailService.getProductdetailById(productdetailid).subscribe(data => {
      const date = new Date(data.data.date);
      this.fuldate = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      this.productdetailid = data.data._id;
      this.productid = data.data.productid;
      this.productdetailname = data.data.name;
      this.make = data.data.make;
      this.model = data.data.model;
      this.registnum = data.data.registnum;
      this.condition = data.data.condition;
      this.remark = data.data.remark;
      this.nameofsupplier = data.data.nameofsupplier;
      this.date = data.data.date;
    });
    this.activeModal = this.modalService.open(content, { windowClass: 'dark-modal', size: 'lg' });
  }
  productdetailDelete(productdetailid) {
    this.productdetailService.deleteProductDetail(productdetailid)
    .subscribe(data => {
      if ( data.success ) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.productdetaillist = data.data;
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }
  onProductDetailUpdate() {
    const date = this.fuldate.day + '/' + this.fuldate.month + '/' + this.fuldate.year;
    const newProductdetail = {
      productid: this.productid,
      name: this.productdetailname,
      make: this.make,
      model: this.model,
      registnum: this.registnum,
      nameofsupplier: this.nameofsupplier,
      date: date,
      condition: this.condition,
      remark: this.remark
    };
    if (newProductdetail.productid === undefined || newProductdetail.condition === undefined || newProductdetail.name === undefined) {
      this._flashMessagesService.show('Please fill all mandatory fields', { cssClass: 'alert-danger', timeout: 3000 });
    } else {
      this.productdetailService.updateProductDetail(this.productdetailid, newProductdetail)
      .subscribe(data => {
        if (data.success) {
          this.activeModal.close();
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.productid = ''; this.productdetailname = ''; this.make = ''; this.model = '';
          this.registnum = ''; this.nameofsupplier = '';
          this.condition = ''; this.remark = '';
          this.productdetailService.getProductDetail().subscribe(data => {
            this.productdetaillist = data.data;
            this.activeModal.close();
          });
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    }
  }
}
