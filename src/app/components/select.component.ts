import {Component} from '@angular/core';
import {AgEditorComponent} from 'ag-grid-angular';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements AgEditorComponent {
  params: any;
  value: any;
  options: any[];

  agInit(params: any) {
    this.params = params;
    this.value = params.value;
    this.options = params.node.data.departments;
  }

  getValue(): any {
    return this.value;
  }
}
