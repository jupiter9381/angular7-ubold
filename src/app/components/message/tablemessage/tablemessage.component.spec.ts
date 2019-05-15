import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablemessageComponent } from './tablemessage.component';

describe('TablemessageComponent', () => {
  let component: TablemessageComponent;
  let fixture: ComponentFixture<TablemessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablemessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablemessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
