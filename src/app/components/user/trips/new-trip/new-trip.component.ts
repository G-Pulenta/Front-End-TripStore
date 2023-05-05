import {Component, ViewChild} from '@angular/core';
import {TripModel} from "../../../../models/trip.model";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TripDataService} from "../../../../services/trip/trip-data.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent {
  startDate = new Date(2023,0,1);

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
    this.getAllTrips();
  }

  onSubmit() {
    if (this.tripForm.invalid) {
      return;
    }
    if (this.isEditMode) {
      this.updateTrip();
    } else {
      this.addTrip();
    }
    this.tripForm.resetForm();
  }

  getAllTrips() {
    this.tripDataService.getItemList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  addTrip() {
    this.tripDataService.createItem(this.tripData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => {return o})
    })

    this.snackBar.open('Trip added successfully!', 'Close', {
      duration: 3000,
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

  editTrip(element: any) {
    this.tripData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEditTrip() {
    this.isEditMode = false;
    this.tripForm.resetForm();
  }
}
