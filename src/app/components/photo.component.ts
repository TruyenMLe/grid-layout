import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-photo',
  template: `
    <img [src]="photoSrc" alt="">
  `
})
export class PhotoComponent implements ICellRendererAngularComp {
  public params: any;
  public photoSrc: any;

  agInit(params: any): void {
    this.params = params;
    this.photoSrc = params.node.data.picture ? params.node.data.picture.medium : '';
  }

  refresh(): boolean {
    return false;
  }
}
