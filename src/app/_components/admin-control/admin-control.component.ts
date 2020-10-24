import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { FilesModel } from 'src/app/_models/files';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.scss'],
})
export class AdminControlComponent implements OnInit {

  listOfFiles: FilesModel[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  currentUser: User;
  attachment: any;
  displayedColumns: any = ['serial', 'name', 'date', 'actions'];
  dataSource;
  showTable = false;
  selection = new SelectionModel<FilesModel>(true, []);

  // paginator: any;
  // sort: any;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  onFileChanged(event: any) {
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      const selectedFile = event.target.files[i];
      this.listOfFiles.push(selectedFile);
      this.dataSource = new MatTableDataSource<FilesModel>(this.listOfFiles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showTable = true;
    }
  }

  removeSelectedFile(index) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    this.dataSource = new MatTableDataSource<FilesModel>(this.listOfFiles);
    if (this.dataSource.filteredData.length === 0) {
      this.showTable = false;
    }
  }

  applyFilter(filterValue: string) {
    // filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.trim().toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    const value = this.listOfFiles.filter(val => val.name.toLowerCase().indexOf(filterValue) > -1);
    this.dataSource = new MatTableDataSource<FilesModel>(value);
  }
}
