import {Component, OnInit} from '@angular/core';
import {Option} from './models/option.model';
import {Config} from './models/config.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'mtx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'multi-select';
  options: Array<Option> = [];
  config?: Config | undefined;
  input: FormControl = new FormControl('')

  ngOnInit() {
    this.options = [
      {
        primaryKey: 0,
        text: 'Ankara',
        selected: false,
        children: [
          {
            primaryKey: 0,
            text: 'Australia',
            selected: false
          },
          {
            primaryKey: 0,
            text: 'Australia',
            selected: false
          },
          {
            primaryKey: 0,
            text: 'Australia',
            selected: false
          }
        ]
      },
      {
        primaryKey: 1,
        text: 'Abuja',
        selected: false
      }, {
        primaryKey: 2,
        text: 'Kuala Lumpur',
        selected: false
      },
      {
        primaryKey: 3,
        text: 'Sydney',
        selected: false
      },
      {
        primaryKey: 4,
        text: 'Dubai',
        selected: false
      },
      {
        primaryKey: 5,
        text: 'Kyoto',
        selected: false
      }, {
        primaryKey: 6,
        text: 'Harbin',
        selected: false
      },
      {
        primaryKey: 7,
        text: 'Jinan',
        selected: false
      },
      {
        primaryKey: 8,
        text: 'Bhopal',
        selected: false
      },
      {
        primaryKey: 9,
        text: 'Manila',
        selected: false
      }, {
        primaryKey: 10,
        text: 'Abidjan',
        selected: false
      },
      {
        primaryKey: 11,
        text: 'Montevideo',
        selected: false
      },
      {
        primaryKey: 12,
        text: 'Jaipur',
        selected: false
      },
      {
        primaryKey: 13,
        text: 'Tokyo',
        selected: false
      }, {
        primaryKey: 14,
        text: 'Curitiba',
        selected: false
      },
      {
        primaryKey: 15,
        text: 'Oran',
        selected: false
      },
      {
        primaryKey: 16,
        text: 'Hyderabad',
        selected: false
      },
      {
        primaryKey: 17,
        text: 'Hamburg',
        selected: false
      }, {
        primaryKey: 18,
        text: 'Birmingham',
        selected: false
      },
      {
        primaryKey: 19,
        text: 'Beijing',
        selected: false
      },
      {
        primaryKey: 20,
        text: 'Mandalay',
        selected: false
      },
      {
        primaryKey: 21,
        text: 'Faisalabad',
        selected: false
      }, {
        primaryKey: 22,
        text: 'Ho Chi Minh City',
        selected: false
      },
      {
        primaryKey: 23,
        text: 'Hamburg',
        selected: false
      },
    ];
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

  onSelect(options: Option[]) {
    console.log('option', options)
  }

  onSelectItem(option: Option) {
    // console.log('option',option);
  }
}
