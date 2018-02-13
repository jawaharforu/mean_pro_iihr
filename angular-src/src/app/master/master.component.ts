import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  productname : String;
  productlist : any;
  constructor( 
    private _flashMessagesService: FlashMessagesService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProduct().subscribe(data => {
      this.productlist = data.data;
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
}
