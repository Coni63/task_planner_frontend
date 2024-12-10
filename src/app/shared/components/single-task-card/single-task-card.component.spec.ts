import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTaskCardComponent } from './single-task-card.component';

describe('SingleTaskCardComponent', () => {
  let component: SingleTaskCardComponent;
  let fixture: ComponentFixture<SingleTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleTaskCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
