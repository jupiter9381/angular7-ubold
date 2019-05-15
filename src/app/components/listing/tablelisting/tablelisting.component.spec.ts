import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablelistingComponent } from './tablelisting.component';

describe('TablelistingComponent', () => {
  let component: TablelistingComponent;
  let fixture: ComponentFixture<TablelistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablelistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
