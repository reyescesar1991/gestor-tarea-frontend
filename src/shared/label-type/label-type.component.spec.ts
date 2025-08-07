import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTypeComponent } from './label-type.component';

describe('LabelTypeComponent', () => {
  let component: LabelTypeComponent;
  let fixture: ComponentFixture<LabelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
