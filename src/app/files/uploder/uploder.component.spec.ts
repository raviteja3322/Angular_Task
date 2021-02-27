import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploderComponent } from './uploder.component';

describe('UploderComponent', () => {
  let component: UploderComponent;
  let fixture: ComponentFixture<UploderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
