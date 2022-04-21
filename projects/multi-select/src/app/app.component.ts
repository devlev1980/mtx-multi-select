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
        id: 0,
        text: 'Ankara',
        selected: false,
        children: [
          {
            id: 1,
            text: 'Australia',
            selected: false
          },
          {
            id: 2,
            text: 'Australia',
            selected: false
          },
          {
            id: 3,
            text: 'Australia',
            selected: false
          }
        ]
      },
      {
        id: 1,
        text: 'Abuja',
        selected: false
      }, {
        id: 2,
        text: 'Kuala Lumpur',
        selected: false,
        children: [
          {
            id: 4,
            text: 'Berlin-1',
            selected: false
          },
          {
            id: 5,
            text: 'Berlin-2',
            selected: false
          },
          {
            id: 6,
            text: 'Berlin-3',
            selected: false
          }
        ]
      },
      {
        id: 3,
        text: 'Sydney',
        selected: false
      },
      {
        id: 4,
        text: 'Dubai',
        selected: false
      },
      {
        id: 5,
        text: 'Kyoto',
        selected: false
      }, {
        id: 6,
        text: 'Harbin',
        selected: false
      },
      {
        id: 7,
        text: 'Jinan',
        selected: false
      },
      {
        id: 8,
        text: 'Bhopal',
        selected: false
      },
      {
        id: 9,
        text: 'Manila',
        selected: false
      }, {
        id: 10,
        text: 'Abidjan',
        selected: false
      },
      {
        id: 11,
        text: 'Montevideo',
        selected: false
      },
      {
        id: 12,
        text: 'Jaipur',
        selected: false
      },
      {
        id: 13,
        text: 'Tokyo',
        selected: false
      }, {
        id: 14,
        text: 'Curitiba',
        selected: false
      },
      {
        id: 15,
        text: 'Oran',
        selected: false
      },
      {
        id: 16,
        text: 'Hyderabad',
        selected: false
      },
      {
        id: 17,
        text: 'Hamburg',
        selected: false
      }, {
        id: 18,
        text: 'Birmingham',
        selected: false
      },
      {
        id: 19,
        text: 'Beijing',
        selected: false
      },
      {
        id: 20,
        text: 'Mandalay',
        selected: false
      },
      {
        id: 21,
        text: 'Faisalabad',
        selected: false
      }, {
        id: 22,
        text: 'Ho Chi Minh City',
        selected: false
      },
      {
        id: 23,
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
