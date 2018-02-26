import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master/master.component';
import { BookingComponent } from './booking/booking.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';

import { AppRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ProductService } from './services/product.service';
import { ProductdetailService } from './services/productdetail.service';
import { HttpModule } from '@angular/http';
import { ProductnameComponent } from './productname/productname.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailListComponent } from './product-detail-list/product-detail-list.component';
import { BookingService } from './services/booking.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MasterComponent,
    BookingComponent,
    UserBookingComponent,
    NavBarComponent,
    SideBarComponent,
    ProductnameComponent,
    ProductdetailComponent,
    ProductlistComponent,
    ProductDetailListComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule.forRoot(),
    FlashMessagesModule.forRoot(),
    HttpModule
  ],
  providers: [ValidateService, ProductService, ProductdetailService, NgbActiveModal, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
