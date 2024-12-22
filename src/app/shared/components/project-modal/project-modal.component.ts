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
  selector: 'app-project-modal',
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
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
})
export class ProjectModalComponent {
  readonly dialogRef = inject(MatDialogRef<ProjectModalComponent>);
  readonly data = inject<Project>(MAT_DIALOG_DATA);
  readonly fb = inject(FormBuilder);
  readonly assignationsService = inject(AssignationsService);

  projectForm: FormGroup = this.fb.group({
    id: [null],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    description: [null],
    trigram: [null, [Validators.required, Validators.pattern(/^[A-Z0-9]{3}$/)]],
  });

  ngOnInit(): void {
    if (this.data) {
      this.projectForm.patchValue({
        id: this.data.id,
        name: this.data.name,
        description: this.data.description,
      });
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      console.log('Form Data:', this.projectForm.value);
      // Emit or handle form submission logic here
      this.assignationsService.createOrUpdateProject(this.projectForm.value).subscribe({
        next: (response: Project) => {
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
