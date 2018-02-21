import { Component, OnInit, Inject  } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProductService } from '../services/product.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-productname',
  templateUrl: './productname.component.html',
  styleUrls: ['./productname.component.scss']
})
export class ProductnameComponent implements OnInit {
  productname: String;
  productlist: any;
  updateproductname: String;
  updateproductid: String;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private productService: ProductService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.productService.getProduct().subscribe(data => {
      this.productlist = data.data;
    });
  }
  open(content, productid, updatform) {
    this.productService.getProductById(productid)
      .subscribe( data => {
        console.log(data);
        this.updateproductname = data.data.name;
        this.updateproductid = data.data._id;
    });
    this.activeModal = this.modalService.open(content, { windowClass: 'dark-modal' });
  }
  onProductAdd() {
    const product = {
      name : this.productname
    };
    if (product.name === undefined) {
      this._flashMessagesService.show('Product field should not be empty!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.productService.addProduct(product)
      .subscribe(data => {
        if (data.success) {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.productname = '';
          this.productlist.push(data.data);
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
  }
  productDelete(productid) {
    this.productService.deleteProduct(productid)
    .subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.productlist = data.data;
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }
  onProductUpdate() {
    const product = {
      name : this.updateproductname
    };
    if (product.name === undefined) {
      this._flashMessagesService.show('Product field should not be empty!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.productService.updateProduct(this.updateproductid, product)
      .subscribe(data => {
        if (data.success) {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.updateproductname = '';
          this.productService.getProduct().subscribe(data => {
            this.productlist = data.data;
            this.activeModal.close();
          });
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
  }

}
