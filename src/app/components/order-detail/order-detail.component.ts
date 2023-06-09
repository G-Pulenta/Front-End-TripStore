import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, NgForm, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

interface WaitingTime {
  value: string;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  // orderData!: OrderModel;
  dataSource = new MatTableDataSource();
  @ViewChild('orderForm', {static: false}) orderForm!: NgForm;


  // Waiting time input - Step 2
  waitingTimeControl = new FormControl<WaitingTime | null>(null, Validators.required);
  selectedWaitingTime = new FormControl('Up to 1 month', Validators.required);
  waitingTimes: WaitingTime[] = [
    {value: 'Up to 1 month'},
    {value: 'Up to 2 months'},
    {value: 'Up to 2 weeks'},
    {value: 'Up to 3 weeks'},
  ];

  constructor(
    // private orderDataService: OrderDataService,
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // this.orderData = {} as OrderModel;
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      this.orderForm.resetForm();
      this.snackBar.open('Order data is invalid', 'Close', {
        duration: 3500
      });
      return;
    }
    else {
      //this.addShipment();
    }
    this.orderForm.resetForm();
  }
}
