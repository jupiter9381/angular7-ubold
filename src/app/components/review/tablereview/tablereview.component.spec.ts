import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablereviewComponent } from './tablereview.component';

describe('TablereviewComponent', () => {
  let component: TablereviewComponent;
  let fixture: ComponentFixture<TablereviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablereviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
