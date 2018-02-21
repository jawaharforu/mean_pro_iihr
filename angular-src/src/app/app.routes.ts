import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master/master.component';
import { BookingComponent } from './booking/booking.component';
import { UserBookingComponent } from './user-booking/user-booking.component';

export const AppRoutes : Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'master',
        component: MasterComponent
    },
    {
        path: 'booking',
        component: BookingComponent
    }
];
