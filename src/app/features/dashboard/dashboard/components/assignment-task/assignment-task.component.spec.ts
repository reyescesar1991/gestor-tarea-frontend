import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTaskComponent } from './assignment-task.component';

describe('AssignmentTaskComponent', () => {
  let component: AssignmentTaskComponent;
  let fixture: ComponentFixture<AssignmentTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignmentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
