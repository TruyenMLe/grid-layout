import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid';

@Component({
  selector: 'app-base',
  templateUrl: './base-layout.component.html'
})
export class BaseLayoutComponent implements OnInit, OnChanges {
  @Input() gridOptions: GridOptions;
  @Input() rowData: any[];
  @Input() columnDefs: any[];
  @Input() frameworkComponents: any;
  @Input() context: any;

  isEditing: boolean;
  originalData: any[];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes && changes.rowData && changes.rowData.currentValue) {
      this.originalData = JSON.parse(JSON.stringify(changes.rowData.currentValue));
    }
  }

  addNewLine() {
    this.gridOptions.context.parentComp.addNewLine();
  }

  cellValueChanged() {
    this.isEditing = true;
  }

  save() {
    this.isEditing = false;
  }

  onSearchGrid({searchString, searchField}) {
    if (searchString) {
      let arr = [];
      let searchReg = new RegExp(searchString, 'i'); // use regex instead of indexOf or others to check for case insensitive

      for (let row of this.originalData) {
        if (searchField === 'all') {
          if (this.searchObj(searchReg, row)) {
            arr.push(row);
          }
        } else {
          if (this.searchProp(searchReg, searchField, row)) {
            arr.push(row);
          }
        }
      }
      this.rowData = arr;
    } else {
      this.rowData = this.originalData;
    }
  }

  private searchObj(str, obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        let val = obj[prop];
        if (!val) {
          continue;
        }

        if (typeof val === 'string' && str.test(val)) {
          return true;
        }

        if (typeof val === 'object' && this.searchObj(str, val)) {
          return true;
        }
      }
    }
    return false;
  }

  private searchProp(str, field, obj) {
    if (obj.hasOwnProperty(field)) {
      let val = obj[field];
      if (!val) {
        return false;
      }

      if (typeof val === 'string' && str.test(val)) {
        return true;
      }
    }
    return false;
  }
}
