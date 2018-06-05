import {Component, OnDestroy} from '@angular/core';
import {ColDef, GridOptions} from 'ag-grid';
import {DeleteButtonComponent} from './delete-button.component';
import {GridDataService} from '../grid-data.service';
import {PhotoComponent} from './photo.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnDestroy {
  gridOptions: GridOptions;
  rowData: any[];
  columnDefs: any[];
  frameworkComponents: any;
  context: any;
  getDataSubscription: any;

  constructor(private gridDataService: GridDataService) {
    this.gridOptions = <GridOptions>{};
    this.setDataOne();
  }

  ngOnDestroy() {
    if (this.getDataSubscription) {
      this.getDataSubscription.unsubscribe();
    }
  }

  addNewLine() {
    this.gridOptions.api.updateRowData({add: [{gender: 'male'}]});
  }

  setDataOne() {
    this.gridOptions.rowHeight = 25;
    this.columnDefs = [
      {headerName: 'Name', field: 'fullName', editable: true, sort: 'asc', sortingOrder: ['asc', 'desc']},
      {
        headerName: 'Departments',
        field: 'departments',
        editable: true,
        cellStyle: {'white-space': 'pre-line'},
        autoHeight: true
      },
      {headerName: 'Gender', field: 'gender', editable: true},
      {headerName: 'Username', field: 'login.username'},
      {headerName: 'Email', field: 'email', editable: true},
      {headerName: 'Phone', field: 'phone', editable: true},
      {headerName: 'Cell', field: 'cell', editable: true},
      {headerName: '', field: 'deleteButton', cellRenderer: 'deleteButton'}
    ];
    this.frameworkComponents = {
      deleteButton: DeleteButtonComponent,
      photo: PhotoComponent
    };
    this.context = {parentComp: this};
    this.loadGridData();
  }

  setDataTwo() {
    this.gridOptions.rowHeight = 72;
    this.columnDefs = [
      {headerName: '', field: 'photo', cellRenderer: 'photo'},
      {headerName: 'Title', field: 'displayTitle'},
      {headerName: 'Name', field: 'fullName'},
      {headerName: 'Address', field: 'address'},
      {headerName: 'Gender', field: 'gender', editable: true},
      {headerName: 'Birth Date', field: 'birthDate'},
      {headerName: '', field: 'deleteButton', cellRenderer: 'deleteButton'}
    ];
    this.frameworkComponents = {
      deleteButton: DeleteButtonComponent,
      photo: PhotoComponent
    };
    this.context = {parentComp: this};
    this.loadGridData();
  }

  private loadGridData() {
    this.getDataSubscription = this.gridDataService.getData()
      .subscribe((data: any[]) => {
        this.rowData = data;
      });
  }
}
