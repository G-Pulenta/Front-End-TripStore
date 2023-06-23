import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TripModel} from "../../models/trip.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NgForm} from "@angular/forms";
import {TripDataService} from "../../services/trip/trip-data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-trips',
  templateUrl: './view-trips.component.html',
  styleUrls: ['./view-trips.component.css']
})
export class ViewTripsComponent implements OnInit, AfterViewInit{
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllTrips(): void {
    this.tripDataService.getItemList().subscribe((response: TripModel | TripModel[]) => {
      const userIdString = localStorage.getItem('id');
      const userId = userIdString !== null ? +userIdString : 0;
      const trips = Array.isArray(response) ? response : [response]; // Envolver el objeto en un array si es necesario
      const filteredTrips = trips.filter(trip => trip.user.id === userId);
      this.dataSource.data = filteredTrips;
    });
  }
}
