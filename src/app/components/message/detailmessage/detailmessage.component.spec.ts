import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmessageComponent } from './detailmessage.component';

describe('DetailmessageComponent', () => {
  let component: DetailmessageComponent;
  let fixture: ComponentFixture<DetailmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
