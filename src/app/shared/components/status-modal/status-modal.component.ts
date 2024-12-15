import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialog,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category, Project, Status, Task, UserAssignment } from '@shared/interfaces/interfaces';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AssignationsService } from '@shared/services/assignations.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-status-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckbox,
  ],
  templateUrl: './status-modal.component.html',
  styleUrl: './status-modal.component.scss',
})
export class StatusModalComponent {
  readonly dialogRef = inject(MatDialogRef<StatusModalComponent>);
  readonly data = inject<Status>(MAT_DIALOG_DATA);
  readonly fb = inject(FormBuilder);
  readonly assignationsService = inject(AssignationsService);

  statusForm: FormGroup = this.fb.group({
    id: [null],
    status: [null, Validators.required],
    activeState: [false],
  });

  ngOnInit(): void {
    if (this.data) {
      this.statusForm.patchValue({
        id: this.data.id,
        status: this.data.status,
        activeState: this.data.activeState,
      });
    }
  }

  onSubmit(): void {
    if (this.statusForm.valid) {
      console.log('Form Data:', this.statusForm.value);
      // Emit or handle form submission logic here
      this.assignationsService.createOrUpdateStatus(this.statusForm.value).subscribe({
        next: (response: Status) => {
          this.dialogRef.close(response);
        },
        error: (error: any) => {
          console.error('Error creating category:', error);
        },
        complete: () => {
          console.log('complete');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
