import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MultiSelectLibModule} from '../../../multi-select-lib/src/lib/multi-select-lib.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserAnimationsModule,
        MultiSelectLibModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
