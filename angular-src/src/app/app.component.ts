import { Component } from '@angular/core';
import { BookingService } from './services/booking.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  userid: Number;
  constructor(
    private bookingService: BookingService
  ) {
    console.log("asfd");
    this.bookingService.getUserid()
    .subscribe(data => {
      if (data.data.success) {
        console.log(data.data);
        this.userid = data.data.uid;
      } else {
        window.location.href = 'https://iihr.res.in/user';
      }
    });
  }
}
