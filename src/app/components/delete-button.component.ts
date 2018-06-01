import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-delete-button',
  template: `
    <button class="btn btn-danger" (click)="deleteRow()">Delete</button>
  `
})
export class DeleteButtonComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  deleteRow() {
    console.log(this.params.node.data);
    this.params.api.updateRowData({ remove: [this.params.node.data] });
  }

  refresh(): boolean {
    return false;
  }
}
