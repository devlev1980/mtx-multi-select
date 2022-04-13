import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectLibComponent } from './multi-select-lib.component';

describe('MultiSelectLibComponent', () => {
  let component: MultiSelectLibComponent;
  let fixture: ComponentFixture<MultiSelectLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
