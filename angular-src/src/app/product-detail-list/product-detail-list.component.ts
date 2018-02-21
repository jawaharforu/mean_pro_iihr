import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductdetailService } from '../services/productdetail.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail-list',
  templateUrl: './product-detail-list.component.html',
  styleUrls: ['./product-detail-list.component.scss']
})
export class ProductDetailListComponent implements OnInit {

  productbookinglist: any;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private productdetailService: ProductdetailService,
    private productService: ProductService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.productdetailService.getProductBoolingList().subscribe(data => {
      this.productbookinglist = data.data;
    });
  }
  open(content, productdetailid) {
    this.activeModal = this.modalService.open(content, { windowClass: 'dark-modal', size: 'lg' });
  }
  bookTheItem() {

  }
}
