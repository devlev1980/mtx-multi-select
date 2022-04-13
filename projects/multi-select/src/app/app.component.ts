import {Component, OnInit} from '@angular/core';
import {Option} from './models/option.model';
import {Config} from './models/config.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'mtx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'multi-select';
  options: Array<Option>   = [];
  config?: Config | undefined;
  input: FormControl = new FormControl('')

  ngOnInit() {
    this.options = [
      {
        text:'Ankara',
        selected: false
      },
      {
        text:'Abuja',
        selected: false
      }, {
        text:'Kuala Lumpur',
        selected: false
      },
      {
        text:'Sydney',
        selected: false
      },
      {
        text:'Dubai',
        selected: false
      },
      {
        text:'Kyoto',
        selected: false
      }, {
        text:'Harbin',
        selected: false
      },
      {
        text:'Jinan',
        selected: false
      },
      {
        text:'Bhopal',
        selected: false
      },
      {
        text:'Manila',
        selected: false
      }, {
        text:'Abidjan',
        selected: false
      },
      {
        text:'Montevideo',
        selected: false
      },
      {
        text:'Jaipur',
        selected: false
      },
      {
        text:'Tokyo',
        selected: false
      }, {
        text:'Curitiba',
        selected: false
      },
      {
        text:'Oran',
        selected: false
      },
      {
        text:'Hyderabad',
        selected: false
      },
      {
        text:'Hamburg',
        selected: false
      }, {
        text:'Birmingham',
        selected: false
      },
      {
        text:'Beijing',
        selected: false
      },
      {
        text:'Mandalay',
        selected: false
      },
      {
        text:'Faisalabad',
        selected: false
      }, {
        text:'Ho Chi Minh City',
        selected: false
      },
      {
        text:'Hamburg',
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
    this.input.valueChanges.subscribe(res=>{
      console.log('result',res)
    })
  }

  onSelect(options: Option[]) {
    console.log('option',options)
  }

  onSelectItem(option: Option) {
    // console.log('option',option);
  }
}
