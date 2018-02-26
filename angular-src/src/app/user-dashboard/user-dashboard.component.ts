import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userbooking: any;
  userid: Number;
  username: String;
  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.bookingService.getUserid()
    .subscribe(data => {
      if (data.data.success) {
        this.userid = data.data.uid;
        this.username = data.data.name;
        this.bookingService.getUserBookedList(this.userid)
        .subscribe(data => {
          this.userbooking = data.data;
        });
      } else {
        window.location.href = 'https://iihr.res.in/user';
      }
    });
  }

}
