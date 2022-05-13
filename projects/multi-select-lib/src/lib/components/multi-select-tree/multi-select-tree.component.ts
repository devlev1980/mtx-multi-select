import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Config} from '../../models/config.model';
import {Option} from '../../models/option.model';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {ItemNode} from "../../models/item-node.model";
import {ItemFlatNode} from "../../models/item-flat-node.model";





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
export class MultiSelectTreeComponent implements OnInit, ControlValueAccessor {
  @Input() data!: Array<ItemNode>;
  @Input() config: Config | undefined;
  isShowMultiSelect: boolean = false;
  isFloatLabel: boolean = false;
  selectedArray: Option[] = [];
  countSelectedItems!: number | undefined;
  selectedOption: string = '';
  @ViewChild('dropdown') dropdownRef!: ElementRef;
  @ViewChild('inputRef') checkboxRef!: ElementRef;
  selectedChildren: Option[] | undefined = [];
  $event: any;
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

  constructor(private elemRef: ElementRef) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  change = (value: any) => {
  };

  touched = (value: any) => {
  }

  getLevel = (node: ItemFlatNode) => node.level;

  isExpandable = (node: ItemFlatNode) => node.expandable;

  getChildren = (node: ItemNode): ItemNode[] => node.children!;

  hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: ItemFlatNode) => _nodeData.item === '';

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

    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);

    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }


  ngOnInit(): void {
    document.body.dir = this.config?.direction!;

    if (this.data.length) {
      this.dataSource.data = this.mappingData(this.data);
    }
    this.checklistSelection.changed.subscribe((el) => {

      const selected = el.added
        .filter((el) => !el.expandable)
        .map((el) => el.item).join(',')
      this.input.patchValue(selected)

    });

    this.input.valueChanges.subscribe(value => {
      const {selected} = this.checklistSelection;
      const mappedSelected = selected
        .filter((el) => !el.expandable)
        .map((el, index) => {
          return {
            name: el.item,
            index: index,
          }
        })
      this.change(mappedSelected);
    });

  }

  mappingData(data: ItemNode[]): ItemNode[] {
    return data.map((el) => {
      return {
        name: el?.name,
        children: el?.children
      }

    })
  }

  onClickOutside(event: any) {
    if (!this.elemRef.nativeElement.contains(event.target)) {
      this.isShowMultiSelect = false;
      this.isFloatLabel = this.input?.value !== null && this.input?.value !== '';

    }
  }

  onShowMultiSelect() {
    this.isShowMultiSelect = !this.isShowMultiSelect;
    this.isFloatLabel = !this.isFloatLabel || this.input?.value !== null;
  }

  onClearValues() {
    this.treeControl.dataNodes.forEach((node, index) => {
      this.checklistSelection.deselect(this.treeControl.dataNodes[index])
    })
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
