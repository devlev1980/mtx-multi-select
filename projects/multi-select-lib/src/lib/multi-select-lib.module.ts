import {NgModule} from '@angular/core';
import {MultiSelectComponent} from './components/multi-select/multi-select.component';
import {CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import { SearchPipe } from './components/pipes/search.pipe';
import { MultiSelectControlComponent } from './components/multi-select-control/multi-select-control.component';


@NgModule({
  declarations: [
    MultiSelectComponent,
    SearchPipe,
    MultiSelectControlComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  exports: [
    MultiSelectComponent,

  ]
})
export class MultiSelectLibModule {
}
