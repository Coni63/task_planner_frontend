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

@Component({
  selector: 'app-category-modal',
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
  ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss',
})
export class CategoryModalComponent {
  readonly dialogRef = inject(MatDialogRef<CategoryModalComponent>);
  readonly data = inject<Category>(MAT_DIALOG_DATA);
  readonly fb = inject(FormBuilder);
  readonly assignationsService = inject(AssignationsService);

  categoryForm: FormGroup = this.fb.group({
    id: [null],
    title: [null, Validators.required],
    juniorFactor: [2.0, Validators.required],
    seniorFactor: [0.8, Validators.required],
  });

  ngOnInit(): void {
    if (this.data) {
      this.categoryForm.patchValue({
        id: this.data.id,
        title: this.data.title,
        juniorFactor: this.data.juniorFactor,
        seniorFactor: this.data.seniorFactor,
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      console.log('Form Data:', this.categoryForm.value);
      // Emit or handle form submission logic here
      this.assignationsService.createOrUpdateCategory(this.categoryForm.value).subscribe({
        next: (response: Category) => {
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
    this.dialogRef.close({});
  }
}
