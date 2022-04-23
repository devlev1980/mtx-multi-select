import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Option} from '../multi-select/models/option.model';
import {Config} from '../multi-select/models/config.model';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {SelectionModel} from '@angular/cdk/collections';
/**
 * Node for to-do item
 */
export class ItemNode {
  children?: ItemNode[] = [];
  name: string = '';
}
export class ItemFlatNode {
  item: string  = '';
  level: number  = 0;
  expandable: boolean = false;
}



const TREE_DATA: ItemNode[] = [
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










@Component({
  selector: 'mtx-multi-select-tree',
  templateUrl: './multi-select-tree.component.html',
  styleUrls: ['./multi-select-tree.component.scss'],
  host: {
    '(document:click)': 'onClickOutside($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiSelectTreeComponent,
      multi: true,
    },

  ]
})
export class MultiSelectTreeComponent implements OnInit,ControlValueAccessor {
  @Input() options: Array<Option> | undefined;
  @Input() config: Config | undefined;
  isShowMultiSelect: boolean = false;
  isFloatLabel: boolean = false;
  selectedArray: Option[] = [];
  @Output() addSelectedOptions: EventEmitter<Option[]> = new EventEmitter<Option[]>();
  @Output() selectChange: EventEmitter<Option> = new EventEmitter<Option>();
  countSelectedItems!: number | undefined;
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






  // Tree
  flatNodeMap = new Map<ItemFlatNode, ItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<ItemNode, ItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: ItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<ItemFlatNode>;

  treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;

  dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ItemFlatNode>(true /* multiple */);

  getLevel = (node: ItemFlatNode) => node.level;

  isExpandable = (node: ItemFlatNode) => node.expandable;

  getChildren = (node: ItemNode): ItemNode[] => node.children!;

  hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: ItemFlatNode) => _nodeData.item === '';

  constructor(private elemRef: ElementRef) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = TREE_DATA
    // database.dataChange.subscribe(data => {
    //   this.dataSource.data = data;
    // });
  }



  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: ItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.name
      ? existingNode
      : new ItemFlatNode();
    flatNode.item = node.name
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: ItemFlatNode): void {
    console.log(node);
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    console.log('checklistSelection',this.checklistSelection)
  }

  /** Select the category so we can insert the new item. */
  // addNewItem(node: ItemFlatNode) {
  //   const parentNode = this.flatNodeMap.get(node);
  //   this.database.insertItem(parentNode!, '');
  //   this.treeControl.expand(node);
  // }

  /** Save the node to database */
  // saveNode(node: TodoItemFlatNode, itemValue: string) {
  //   const nestedNode = this.flatNodeMap.get(node);
  //   this.database.updateItem(nestedNode!, itemValue);
  // }


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

  onClearValues() {
    this.selectedArray = this.selectedArray.map((el) => {
      el.selected = false;
      return el
    });

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


//  Tree


  onChange(event: boolean) {
    console.log(event)
  }
}
