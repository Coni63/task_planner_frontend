import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleToggleButtonComponent } from './user-role-toggle-button.component';

describe('UserRoleToggleButtonComponent', () => {
  let component: UserRoleToggleButtonComponent;
  let fixture: ComponentFixture<UserRoleToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleToggleButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
