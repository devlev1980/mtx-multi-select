import {Component, OnInit} from '@angular/core';
import {Config} from './models/config.model';
import {FormControl} from '@angular/forms';
import {ItemNode} from "../../../multi-select-lib/src/lib/components/multi-select-tree/multi-select-tree.component";

@Component({
  selector: 'mtx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'multi-select';
  options: Array<ItemNode> = [];
  config?: Config | undefined;
  input: FormControl = new FormControl('')

  ngOnInit() {
    this.options = [
      {
        name: 'Fruit',
        children: [
          {
            name: 'Apple'
          },
          {
            name: 'Banana'
          },
          {
            name: 'Ananias'
          },

        ],

      },
      {
        name: 'Vegetables',
        children: [
          {
            name: 'Green',
            children: [
              {
                name: 'Broccoli'
              },
              {
                name: 'Brussels sprouts'
              }
            ]
          },
          {
            name: 'Orange',
            children: [
              {
                name: 'Pumpkins'
              },
              {
                name: 'Carrots'
              }
            ]
          }
        ]
      }
    ]


    this.config = {
      label: 'בחר ישוב',
      selectedText: 'נבחרו',
      itemsText: '',
      addButton: 'אישור',
      clearValuesButton: 'ניקוי בחירה',

    }
    this.input.valueChanges.subscribe(res => {
      console.log('result', res)
    })
  }

}
