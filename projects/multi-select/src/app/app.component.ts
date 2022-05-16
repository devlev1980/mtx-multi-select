import {Component, OnInit} from '@angular/core';
import {Config} from './models/config.model';
import {FormControl} from '@angular/forms';
import {ItemNode} from "./models/item-node.model";


@Component({
  selector: 'mtx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'multi-select';
  data: Array<ItemNode> = [];
  config?: Config | undefined;
  input: FormControl = new FormControl({value: '',disabled: false})

  ngOnInit() {
    this.data = [
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
                name: 'a'
              },
              {
                name: 'b'
              }
            ]
          },
          {
            name: 'Orange',
          }
        ]
      },
      {
        name: 'Green'
      },
      {
        name: 'Yellow'
      },
      {
        name: 'Blue'
      }
    ]


    this.config = {
      label: 'בחר ישוב',
      selectedText: 'נבחרו',
      itemsText: '',
      addButton: 'אישור',
      clearValuesButton: 'ניקוי בחירה',
      direction: 'rtl'
    }

    this.input.valueChanges.subscribe(res => {
      console.log('result', res)
    })
  }

}
