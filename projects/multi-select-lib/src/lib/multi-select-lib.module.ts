import {NgModule} from '@angular/core';
import {MultiSelectComponent} from './components/multi-select/multi-select.component';
import {CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import {MultiSelectTreeComponent} from './components/multi-select-tree/multi-select-tree.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    MultiSelectTreeComponent
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
    MatInputModule
  ],
  exports: [
    MultiSelectTreeComponent,

  ]
})
export class MultiSelectLibModule {
}
