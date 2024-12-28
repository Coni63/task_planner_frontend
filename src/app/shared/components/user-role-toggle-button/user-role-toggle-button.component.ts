import { Component, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLabel } from '@angular/material/form-field';
import { CustomUser, UserAssignmentNoUser } from '@shared/interfaces/interfaces';
import { AssignationsService } from '@shared/services/assignations.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-role-toggle-button',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonToggleModule, MatLabel, CommonModule],
  templateUrl: './user-role-toggle-button.component.html',
  styleUrl: './user-role-toggle-button.component.scss',
})
export class UserRoleToggleButtonComponent implements OnInit {
  rolesForm: FormGroup;

  @Input() set user(value: CustomUser) {
    this._user = value;
    this.initForm();
  }
  get roles(): string[] {
    return this._user.roles || [];
  }
  private _user!: CustomUser;

  constructor(
    private fb: FormBuilder,
    private assignationsService: AssignationsService,
    private toast: ToastrService
  ) {
    this.rolesForm = this.fb.group({
      id: [null, Validators.required],
      roles: [[]],
    });
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    if (this._user) {
      this.rolesForm.patchValue(
        { id: this._user.id, roles: this._user.roles },
        { emitEvent: false }
      );
    }
  }

  onChange(event: MatButtonToggleChange) {
    // Update the form value
    this.rolesForm.patchValue({ roles: event.value });

    // Call service to save the updated roles
    this.assignationsService.createOrUpdateUserRoles(this.rolesForm.value).subscribe({
      next: () => this.toast.success('Assignment updated'),
      error: () => this.toast.error('Failed to update assignment'),
    });
  }
}
