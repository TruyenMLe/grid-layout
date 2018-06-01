import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnChanges {
  @Input() columnDefs: any[];
  @Output() search = new EventEmitter();

  searchString: string;
  selectedSearchField: string;
  columns: any[];

  constructor() {
    this.selectedSearchField = 'all';
  }

  ngOnChanges(changes) {
    if (changes && changes.columnDefs && changes.columnDefs.currentValue) {
      this.columns = [];
      for (let col of changes.columnDefs.currentValue) {
        if (col.headerName) {
          this.columns.push({name: col.headerName, value: col.field});
        }
      }
    }
  }

  onSearch() {
    this.search.emit({searchString: this.searchString, searchField: this.selectedSearchField});
  }
}
