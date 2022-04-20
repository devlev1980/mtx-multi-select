import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SearchPipe} from '../pipes/search.pipe';
import {Config} from './models/config.model';
import {Option} from './models/option.model';

@Component({
  selector: 'mtx-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  host: {
    '(document:click)': 'onClickOutside($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    }
  ]
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
  @Input() options: Array<Option> | undefined;
  @Input() config: Config | undefined;
  isShowMultiSelect: boolean = false;
  isFloatLabel: boolean = false;
  selectedArray: Option[] = [];
  @Output() addSelectedOptions: EventEmitter<Option[]> = new EventEmitter<Option[]>();
  @Output() selectChange: EventEmitter<Option> = new EventEmitter<Option>();
  countSelectedItems!: number | undefined;
  childrenSelectedCount: number = 0;
  selectedOption: string = '';
  @ViewChild('dropdown') dropdownRef!: ElementRef;
  @ViewChild('inputRef') checkboxRef!: ElementRef;
  selectedChildren: Option[] | undefined = [];
  $event: any;
  change = (value: any) => {
  };
  touched = (value: any) => {
  }
  input: FormControl = new FormControl('')
  parentToCheck!: Array<Option> | undefined;

  constructor(private elemRef: ElementRef) {
  }


  ngOnInit(): void {
    this.input.valueChanges.subscribe(value => this.change(this.selectedArray));

  }

  onClickOutside(event: any) {
    if (!this.elemRef.nativeElement.contains(event.target)) {
      this.isShowMultiSelect = false;
      this.isFloatLabel = this.input?.value !== '';

    }
  }

  onShowMultiSelect() {
    this.isShowMultiSelect = true;
    this.isFloatLabel = true;
  }

  onCheckParent(option: Option) {
    option.selected = !option.selected;
    if (option.selected && this.selectedArray.indexOf(option) === -1) {
      this.selectedArray?.push(option);
      this.selectedArray.forEach((option) => {
        if (option.children) {
          this.selectedChildren = option.children.map((child) => {
            child.selected = true;
            return child;
          })
        } else {
          this.selectedChildren = [];
        }
      });
    } else {
      this.selectedArray = this.selectedArray.filter((el) => el.selected !== option.selected )
    }
    this.selectedOption = this.selectedArray.map((el) => el.text).join(',');
    this.input?.patchValue(this.selectedOption);
    this.calculateSelectedNumbers(this.selectedArray)
  }



  private calculateSelectedNumbers(selectedArray: Option[]) {
    console.log('selectedArray',selectedArray)
    this.countSelectedItems = this.selectedArray.length
  }

  onAddSelectedOption() {
    this.addSelectedOptions.emit(this.selectedArray);
    this.isShowMultiSelect = false;
    this.isFloatLabel = this.input?.value !== '';
  }

  onClearValues() {
    this.selectedArray = this.selectedArray.map((el) => {
      el.selected = false;
      return el
    });
    // this.countSelectedItems = this.selectedArray.filter((option) => {
    //   !option.selected ;
    //   option.children?.map((el)=> {
    //     if(el.selected){
    //        el.selected = false
    //     }
    //   })
    // }).length;
    this.selectedArray = [];
    this.input.patchValue('');
  }


  registerOnChange(fn: any) {
    this.change = fn;
  }

  writeValue(obj: any) {
    if (obj) {
      this.input.patchValue(this.selectedArray);
    } else {
      this.input.reset();
    }

  }

  registerOnTouched(fn: any) {
    this.touched = fn;
    this.input.valueChanges.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean) {
  }


}



