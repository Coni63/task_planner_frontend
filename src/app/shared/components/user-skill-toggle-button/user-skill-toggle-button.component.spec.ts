import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSkillToggleButtonComponent } from './user-skill-toggle-button.component';

describe('UserSkillToogleButtonComponent', () => {
  let component: UserSkillToggleButtonComponent;
  let fixture: ComponentFixture<UserSkillToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSkillToggleButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSkillToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
