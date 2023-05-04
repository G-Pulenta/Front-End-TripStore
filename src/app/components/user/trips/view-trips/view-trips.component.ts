import {Component, ViewChild} from '@angular/core';
import {TripModel} from "../../../../models/trip.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NgForm} from "@angular/forms";
import {TripDataService} from "../../../../services/trip-data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-trips',
  templateUrl: './view-trips.component.html',
  styleUrls: ['./view-trips.component.css']
})
export class ViewTripsComponent {
  tripData!: TripModel;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'origin', 'destination', 'date']

  isEditMode = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('tripForm', {static: false}) tripForm!: NgForm;

  constructor(
    private tripDataService: TripDataService,
    private snackBar: MatSnackBar,
  ) {
    this.tripData = {} as TripModel;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllTrips();
  }

  getAllTrips(): void {
    this.tripDataService.getItemList().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }
}
