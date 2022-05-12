import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import {MultiSelectTreeComponent} from './components/multi-select-tree/multi-select-tree.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TreeViewModule} from '@syncfusion/ej2-angular-navigations';
import {MatRippleModule} from '@angular/material/core';
import {SelectedItemsCountPipe} from './selected-items-count.pipe';


@NgModule({
  declarations: [
    MultiSelectTreeComponent,
    SelectedItemsCountPipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTreeModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    TreeViewModule,
    MatRippleModule

  ],
  exports: [
    MultiSelectTreeComponent
  ]
})
export class MultiSelectLibModule {
}
