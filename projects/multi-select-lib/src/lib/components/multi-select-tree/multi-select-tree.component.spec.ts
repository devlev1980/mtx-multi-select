import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectTreeComponent } from './multi-select-tree.component';

describe('MultiSelectTreeComponent', () => {
  let component: MultiSelectTreeComponent;
  let fixture: ComponentFixture<MultiSelectTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
