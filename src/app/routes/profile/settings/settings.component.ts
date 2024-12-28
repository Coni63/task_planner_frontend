import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ControlsOf } from '@shared';
import { CustomUser } from '@shared/interfaces/interfaces';
import { AssignationsService } from '@shared/services/assignations.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
  ],
})
export class ProfileSettingsComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private assignationsService: AssignationsService,
    private toast: ToastrService
  ) {
    this.reactiveForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      avatar: [null],
    });
  }

  ngOnInit(): void {
    this.assignationsService.getCurrentUser().subscribe((user: CustomUser) => {
      this.reactiveForm.patchValue(user);
    });
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email')?.hasError('required')
      ? 'You must enter a value'
      : form.get('email')?.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  submit() {
    if (this.reactiveForm.valid) {
      let userId = this.reactiveForm.get('id')?.value;
      this.assignationsService.patchUser(userId, this.reactiveForm.value).subscribe(
        user => {
          this.toast.success('Profile updated');
        },
        error => {
          this.toast.error('Error updating profile');
        }
      );
    }
  }
}
