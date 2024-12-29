import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
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
import { StatusWithTransition } from '@shared/interfaces/interfaces';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AssignationsService } from '@shared/services/assignations.service';
import { CommonModule } from '@angular/common';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-status-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    MatRadioModule,
  ],
  templateUrl: './status-modal.component.html',
  styleUrl: './status-modal.component.scss',
})
export class StatusModalComponent {
  readonly dialogRef = inject(MatDialogRef<StatusModalComponent>);
  readonly data = inject<StatusWithTransition>(MAT_DIALOG_DATA);
  readonly fb = inject(FormBuilder);
  readonly assignationsService = inject(AssignationsService);

  statusForm: FormGroup = this.fb.group({
    id: [null],
    status: [null, Validators.required],
    state: ['blocked'],
    color: ['#ffffff'],
    darkColor: ['#000000'],
  });

  ngOnInit(): void {
    if (this.data) {
      this.statusForm.patchValue({
        id: this.data.id,
        status: this.data.status,
        state: this.data.state,
        color: this.data.color,
        darkColor: this.data.darkColor,
      });
    }
  }

  onSubmit(): void {
    if (this.statusForm.valid) {
      console.log('Form Data:', this.statusForm.value);
      // Emit or handle form submission logic here
      this.assignationsService.createOrUpdateStatus(this.statusForm.value).subscribe({
        next: (response: StatusWithTransition) => {
          this.dialogRef.close(response);
        },
        error: (error: any) => {},
        complete: () => {},
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
