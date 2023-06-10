import {Component, ViewChild} from '@angular/core';
import {TripModel} from "../../models/trip.model";
import {NgForm} from "@angular/forms";
import {TripDataService} from "../../services/trip/trip-data.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent {
  tripData!: TripModel;
  dataSource = new MatTableDataSource();

  isEditMode = false;
  @ViewChild('tripForm', {static: false}) tripForm!: NgForm;

  constructor(
    private tripDataService: TripDataService,
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.tripData = {} as TripModel;
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.tripForm.invalid) {
      this.cancelEdit();
      return;
    }
    else if (this.isEditMode) {
      this.updateTrip();
    }
    else {
      this.addTrip();
    }
    this.tripForm.resetForm();
  }

  addTrip() {
    this.tripDataService.createItem(this.tripData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => {return o});
    })

    this.snackBar.open('Trip added successfully', 'Close', {
      duration: 3500
    });
  }

  updateTrip() {
    this.tripDataService.updateItem(this.tripData.id, this.tripData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      })
    })
  }

  cancelEdit() {
    this.isEditMode = false;
    this.tripForm.resetForm();

    this.snackBar.open('Trip submission cancelled', 'Close', {
      duration: 3500
    });
  }
}
