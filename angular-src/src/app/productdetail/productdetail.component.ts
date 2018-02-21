import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProductService } from '../services/product.service';
import { ProductdetailService } from '../services/productdetail.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {
  productlist: any;
  productid: String;
  make: String;
  model: String;
  registnum: String;
  nameofsupplier: String;
  fuldate;
  condition: String;
  remark: String;
  date: Date;
  productdetailname: String;
  productdetaillist: any;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private productService: ProductService,
    private productdetailService: ProductdetailService
  ) { }

  ngOnInit() {
    this.productService.getProduct().subscribe(data => {
      this.productlist = data.data;
    });
  }
  onProductDetailAdd() {
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
      this.productdetailService.addProductDetail(newProductdetail)
      .subscribe(data => {
        if (data.success) {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.productid = ''; this.productdetailname = ''; this.make = ''; this.model = '';
          this.registnum = ''; this.nameofsupplier = ''; this.fuldate = '';
          this.condition = ''; this.remark = '';
          this.productdetailService.getProductDetail().subscribe(data => {
            this.productdetaillist = data.data;
          });
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    }
  }
}
