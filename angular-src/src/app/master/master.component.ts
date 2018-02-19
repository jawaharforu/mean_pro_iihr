import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  btnname: String = 'Add';
  // product
  productname : String;
  productlist : any;
  // product detail variable
  productid : String;
  make : String;
  model : String;
  registnum : String;
  nameofsupplier : String;
  fuldate;
  condition : String;
  remark : String;
  date : Date;
  productdetailname : String;
  productdetaillist : any;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProduct().subscribe(data => {
      this.productlist = data.data;
    });
    this.productService.getProductDetail().subscribe(data => {
      this.productdetaillist = data.data;
    });
  }

  onProductAdd(){
    const product = {
      name : this.productname
    };
    if(product.name == undefined){
      this._flashMessagesService.show('Product field should not be empty!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.productService.addProduct(product)
      .subscribe(data => {
        if(data.success){
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.productname = "";
          this.productlist.push(data.data);
        }else{
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
  }
  productDelete(productid){
    this.productService.deleteProduct(productid)
    .subscribe(data => {
      if(data.success){
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.productlist = data.data;
      }else{
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }
  onProductDetailAdd(){
    const date = this.fuldate.day+"/"+this.fuldate.month+"/"+this.fuldate.year;
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
    if(newProductdetail.productid == undefined || newProductdetail.condition == undefined || newProductdetail.name == undefined){
      this._flashMessagesService.show('Please fill all mandatory fields', { cssClass: 'alert-danger', timeout: 3000 });
    }else{
      this.productService.addProductDetail(newProductdetail)
      .subscribe(data => {
        if(data.success){
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.productid = "";this.productdetailname = "";this.make = "";this.model = "";
          this.registnum = "";this.nameofsupplier = "";this.fuldate = "";
          this.condition = "";this.remark = "";
          this.productdetaillist.push(data.data);
        }else{
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    }
  }
}
